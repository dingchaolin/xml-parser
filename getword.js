/**
 * Created by dcl on 2017/6/12 0012.
 */


var ak = '4d30d98ef3d64363b9f9e9cf6b03792c';
var sk = 'd50ced4b4b9a4d38a19f7eafee1c511d';
var ocr = require("baidu-ocr-api").create(ak,sk);
// 外部图片
ocr.scan({
    url:'./test1.png', // 支持本地路径
    type:'text',
}).then(function (result) {
    return console.log( result.results.words );
}).catch(function (err) {
    console.log('err', err);
})
