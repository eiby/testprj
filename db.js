//connect to DB
var mongoose = require('mongoose');
//var db = mongoose.connect('mongodb://42.121.109.221:20099/baba');
var db = mongoose.connect('mongodb://182.254.214.210:20099/baba, mongodb://182.254.215.229:20099/baba, mongodb://182.254.215.35:20099/baba', {read_secondary:true}); //业务服务器

Date.prototype.format = function(format)
{
    var o = {
        "M+" : this.getMonth()+1, //month
        "d+" : this.getDate(),    //day
        "h+" : this.getHours(),   //hour
        "m+" : this.getMinutes(), //minute
        "s+" : this.getSeconds(), //second
        "q+" : Math.floor((this.getMonth()+3)/3),  //quarter
        "S" : this.getMilliseconds() //millisecond
    };
    if(/(y+)/.test(format)) format=format.replace(RegExp.$1,
        (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    for(var k in o)if(new RegExp("("+ k +")").test(format))
        format = format.replace(RegExp.$1,
            RegExp.$1.length==1 ? o[k] :
                ("00"+ o[k]).substr((""+ o[k]).length));
    return format;
};

// Define Model
var Schema = mongoose.Schema;

// 终端日志
var data_log = new Schema({
    device_id : String,
    content : String,
    rcv_time : Date,
    server_ip: String
});

var m_data_log = mongoose.model('data_log', data_log);

exports.saveDataLog = function (deviceID, content, server_ip){
    var i_data_logs = new m_data_log();
    i_data_logs.device_id = deviceID;
    i_data_logs.content = content;
    i_data_logs.server_ip = server_ip;
    i_data_logs.rcv_time = new Date().toLocaleString();
    i_data_logs.save(function(err){
        if(err){
            console.log(err);
        }else{
            console.log('Data Log Saved!');
        }
    });
};