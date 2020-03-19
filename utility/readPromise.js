const rd = require('readline').createInterface(process.stdin,process.stdout)


/**
 * Get an answer from a reply
 * @param {String} askQuestion
 * @returns {Promise<String>}
 */
module.exports.ask = (askQuestion)=>{
    // eslint-disable-next-line no-unused-vars
    return new Promise((resolve,reject)=>{
        rd.question(askQuestion,answer=>{
            if(answer){
                resolve(answer)
            }
            // else{
            //     reject(new Error("REE NO ANSWER"))
            // }
        })
    })
}
module.exports.close = ()=>(rd.close())