/**
 * Created by dcl on 2017/6/12 0012.
 */

let zco = require("zco");
let soap = require("soap");
let fs = require('fs');
let cheerio = require("cheerio");
let options = {};
options.url = `http://192.168.15.171:9080/htpdf/services/WebServicePDF?wsdl`;
options.form = {
    ipid : "000025663800_4",
    functionId : "HospitalRecord",
    xmlStr: ""
};

let getPdf = function( options ){

    return zco( function*( next ){

        let retObj = {
            success: true,
            fileName: "",
            msg: "",
            err: ""
        };

        let [err,client] = yield soap.createClient( options.url, next );
        if( err ){
            retObj = {
                success: false,
                fileName: "",
                msg:"createClient Error!",
                err: err
            };
            return retObj;
        }

        let [errGetPdf, xmlRet] = yield client.getPdf(options.form, next);
        if( errGetPdf ){
            retObj = {
                success: false,
                fileName: "",
                msg:"getPdf Error!",
                err: errGetPdf
            };
            return retObj;
        }

        let xml = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
                        <soapenv:Body>
                            <getPdfResponse xmlns="http://pdf.haitaiinc.com">
                                <getPdfReturn>${xmlRet.getPdfReturn}</getPdfReturn>
                            </getPdfResponse>
                        </soapenv:Body>
                    </soapenv:Envelope>`;

        let $ = cheerio.load( xml );
        let txt = $("PdfFlow").text();

        let [errFs,fsData] = yield fs.writeFile(`./${options.form.ipid}.pdf`, new Buffer(txt,"base64"), next);
        if( errFs || fsData ){
            retObj = {
                success: false,
                fileName: "",
                msg:"writeFile Error!",
                err: errFs
            };
            return retObj;
        }
        retObj.fileName = `${options.form.ipid}.pdf`;

        return retObj;

    } );

}

getPdf( options )( (err,result) =>{
    console.log( result );
});
