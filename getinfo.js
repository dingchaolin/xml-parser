/**
 * Created by dcl on 2017/6/12 0012.
 */

let cheerio = require("cheerio");
let fs = require("fs");

let xml = fs.readFileSync("./emr-pdf-10006.xml");

let $ = cheerio.load( xml );

let txt = $("PdfFlow").text();

console.log( "txt===",txt );

fs.writeFile("./test.pdf", new Buffer(txt,"base64"), function( err ){
    console.log( "写入成功")
})


