/**
 * Created by dcl on 2017/6/12 0012.
 */


let request = require("request");
let zco = require("zco");

let options = {};
options.url = `http://192.168.15.171:9080/htpdf/services/WebServicePDF`;
options.method = "GET";
options.qs = {
    ipid : "0000001195_113",
    functionId : "HoptitalRecord",
    xmlStr: ""
};

let getPdf = function(  ){
    return zco( function*(next){
        let [err,data] = yield request( options, next );
        if( err ){
            console.log( err );
            throw err;
        }
        return data;
    });

}

getPdf()( (err,data) => {
    console.log(data);
})
