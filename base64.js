/**
 * Created by Administrator on 2017/6/12 0012.
 */
let url = `http://123.233.117.50:801/jnwt/vericode.jsp?0.9671762000911881`;

let options = {};
options.url = url;
options.method = "get";
options.gizp = true;
options.encoding = null;
let request = require("request");
request(options, ( err, res, body )=>{
    console.log( body )
    require('fs').writeFile("./png.png", body, (err)=>{
        console.log("写入成功")
    })
})