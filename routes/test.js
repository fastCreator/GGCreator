'use strict';
var router = require('express').Router();
/**
 * Created by tangxuelong on 15-10-16.
 * validateToken
 * ���ļ�ֻ����TOKEN��֤
 */
//var config = require('./http.config')//����module
//var api = require('wechat-api');//npm wx
var url = require("url");
var crypto = require("crypto");

//΢�ŽӿڵĹ�ϣ���ܷ���  
function sha1(str) {
    var md5sum = crypto.createHash("sha1");
    md5sum.update(str);
    str = md5sum.digest("hex");
    return str;
}
//΢��·��token��֤  
function validate_token(req,res){
    //��ȡ�����qurey�����Ժ����  
    var query = url.parse(req.url, true).query;
    var signature = query.signature;
    var echostr = query.echostr;
    var timestamp = query['timestamp'];
    var nonce = query.nonce;
    var oriArray = new Array();
    oriArray[0] = nonce;
    oriArray[1] = timestamp;
    oriArray[2] = "hellowggcreator";
    oriArray.sort();
    var original = oriArray.join('');
    var scyptoString = sha1(original);
    if (signature == scyptoString) {
        res.end(echostr);
        console.log("Confirm and send echo back");
    } else {
        res.end("false");
        console.log("Failed!");
    }
}

router.get('/', function(req, res) {
    validate_token(req,res);
});

module.exports = router;