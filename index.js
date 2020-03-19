#!/usr/bin/env node

//@ts-check
const fs = require('fs')
const path = require('path')
const yargs = require('yargs')
    .version()
    .scriptName("igdc")
    .usage('$0 -i <filename> [-o <filename>]')
    .demandOption('i')
    .option('i', {
        'alias': 'input',
        'describe': 'Input file path'
    })
    .option('o', {
        'alias': 'output',
        'describe': 'Output file path'
    })
    .epilogue("Give me the messages.json file")

//const read = require('./utility/readPromise')
const writeToMarkDown = require('./utility/writeToMarkdown')

//console.log("Started")

let answer = yargs.argv.input.toString()
//if(answer==""){answer = "messages.json"}
fs.exists(answer, exists => {
    if (exists) {
        fs.readFile(path.normalize(answer), (err, data) => {
            if (err) throw err;
            let readObjects = JSON.parse(data.toString())
            // eslint-disable-next-line no-unused-vars
            getProperties(readObjects).then(_reply => {
                
            },
                console.log
            )
        })
    } else {
        console.log("File does not exist")
        //read.close()
    }

})



/**
 * 
 * @param {Array<Object>} objectsRead 
 */
async function getProperties(objectsRead) {

    //console.log("Got Answer:" + answer)

    /** @type {Array<String>} */
    let people = objectsRead.reduce((total, element) => {
        //console.log(element)

        element.participants.forEach(e => {
            if (!total.find(pred => { return pred == e })) {
                total.push(e)
            }
        })
        return total
    }, [])
    //console.log(people.join(", "))


    //Create a table
    let table = []
    for (const value in people) {
        table.push({
            person: people[value],
            ...await getLength(objectsRead, people[value])
        })
    }
    let answer = yargs.argv.o

    table.sort((a, b) => { return b.count - a.count })
    if(answer){
        writeToMarkDown(table, path.normalize(answer.toString()));
    }else{
        printOut(table)
    }
    return table
}


/**
 * 
 * @param {Array<{participants:Array<String>,conversation:Object}>} objectsRead 
 * @param {String} answer Name to search for
 * @returns {Promise<{parts:Number,count:Number}>} 
 */
async function getLength(objectsRead, answer) {
    //let answer = await read.ask("Get which username?")
    let numbers = objectsRead.reduce((total, element) => {
        if (element.participants.find(participant => { return participant == answer })) {
            //console.log(Object.keys(element.conversation).length)
            //total+=1
            total.parts += 1
            total.count += Object.keys(element.conversation).length
        }
        return total
    }, { parts: 0, count: 0 })
    return numbers;
}

/**
 * @param {{ parts: number; count: number; person: string; }[]} table
 */
function printOut(table){
    console.log("Username\tMsgCount\tParts")
    table.forEach(element=>{
        console.log(`${element.person}\t${element.count}\t${element.parts}`)
    })
}