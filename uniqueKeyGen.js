const fs = require('fs');
const crypto = require('crypto')
let outObj = []
let rawdata = fs.readFileSync('html/movies.json');
let json = JSON.parse(rawdata);

json.forEach(element => {
    let currentElement = element
    currentElement["uniqueKey"] = crypto.createHash('md5').update(JSON.stringify(element)).digest("hex")
    outObj.push(currentElement)
});

console.log(JSON.stringify(outObj))
