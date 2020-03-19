const fs = require('fs')

fs.readFile("messages.json",(err,data)=>{
    if(err) throw err;
    let objectifiedData = JSON.parse(data)
    fs.writeFile('messages.pretty.json',JSON.stringify(objectifiedData,null,2),()=>console.log("Done"))
})