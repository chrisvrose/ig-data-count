//@ts-check
const fs = require('fs')
const path = require('path')

const read = require('./utility/readPromise')
const writeToMarkDown = require('./utility/writeToMarkdown')

console.log("Started")
read.ask("File name(messages.json)\n:").then(answer => {
    //if(answer==""){answer = "messages.json"}
    fs.exists(answer, exists => {
        if (exists) {
            fs.readFile(path.normalize(answer), (err, data) => {
                if (err) throw err;
                let readObjects = JSON.parse(data.toString())
                //console.log(readObjects.length)
                getProperties(readObjects).then(reply => {
                    //console.log(`Stats:\nParts:${reply.parts}\nCount:${reply.count}`)
                    reply.forEach(e=>{
                        console.log(`Name: ${e.person},Count: ${e.count},Parts: ${e.parts}`)
                    })
                    writeToMarkDown(reply);
                    read.close()
                },
                    console.log
                )
            })
        } else {
            console.log("File does not exist")
            read.close()
        }

    })
})


/**
 * 
 * @param {Array<Object>} objectsRead 
 */
async function getProperties(objectsRead) {
    //let answer = await read.ask("Get List of users?(Y/N)\n:")
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
    for(const value in people){
        table.push({
            person: people[value],
            ...await getLength(objectsRead,people[value])
        })
    }

    table.sort((a,b)=>{return a.count-b.count})
    return table
}


/**
 * 
 * @param {Array<{participants:Array<String>,conversation:Object}>} objectsRead 
 * @param {String} answer Name to search for
 * @returns {Promise<{parts:Number,count:Number}>} 
 */
async function getLength(objectsRead,answer) {
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
