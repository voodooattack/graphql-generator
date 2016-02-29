/*
 * Usage:
 * 1. npm install lodash
 * 2. node json-to-graphql.js <filename>
 *
 * Only support
     GraphQLObjectType
     GraphQLList
     GraphQLString
     GraphQLBoolean
     GraphQLInt
     GraphQLFloat
 * See: https://github.com/graphql/graphql-js/blob/master/src/type/index.js
 */
var _ = require('lodash')
var fs = require('fs')
var path = require('path')

var INDENT = 4
var TAB = new Array(INDENT).fill(' ').join('')
function transform(json, level, name) {
    var definition
    if (_.isArray(json)) {
        if (name.slice(-1) === 's') {
            name = name.slice(0, -1)
        } else {
            name = name + 'Item'
        }
        definition = transform(json[0], level + INDENT, name)
        if (!definition) return
        return `new GraphQLList(${definition})`
    } else if (_.isString(json)) {
        return `GraphQLString`
    } else if (_.isBoolean(json)) {
        return `GraphQLString`
    } else if (isInt(json)) {
        return `GraphQLInt`
    } else if (isFloat(json)) {
        return `GraphQLFloat`
    } else if (_.isObject(json)) {
        if (Object.keys(json).length === 0) return

        var field, value
        var spaces = new Array(level).fill(' ').join('')
        var name = name ? (name[0].toUpperCase() + name.slice(1)) : ''

        var schema = `new GraphQLObjectType({
${spaces}${TAB}name: "${name}",
${spaces}${TAB}description: "",
${spaces}${TAB}fields: () => ({`
        for (field in json) {
            value = json[field]
            definition = transform(value, level + INDENT * 2, field)
            if (!definition) continue
            schema += `
${spaces}${TAB}${TAB}"${field}": {
${spaces}${TAB}${TAB}${TAB}type: ${definition}
${spaces}${TAB}${TAB}},`
        }
        schema += `
${spaces}${TAB}})
${spaces}})`
        return schema
    }
}

// http://stackoverflow.com/questions/3885817/how-to-check-that-a-number-is-float-or-integer
function isInt(n){
    return Number(n) === n && n % 1 === 0;
}

function isFloat(n){
    return n === Number(n) && n % 1 !== 0;
}

if (process.argv.length < 3) {
    console.error(`Usage: node json-to-graphql.js <filename>`)
    process.exit(1)
}

var filename = process.argv[2]
var json = fs.readFileSync(filename, 'utf8')
json = JSON.parse(json)
var schema = transform(json, 0, path.basename(filename, path.extname(filename)))
schema = `// Auto generate by https://gist.github.com/CatTail/2ed985c5afc5b41a4e06
import {
  GraphQLInt,
  GraphQLFloat,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql'

var Type = ${schema}

export default Type
`
console.log(schema)
