//connect to DB
var mongoose = require('mongoose');
var config = require("./config.js");
var dbPath = config.mongo.url;
var db = mongoose.connect(dbPath, {read_secondary:true});

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

exports.saveDataLog = function (deviceID, content, server_ip, callback){
    var i_data_logs = new m_data_log();
    i_data_logs.device_id = deviceID;
    i_data_logs.content = content;
    i_data_logs.server_ip = server_ip;
    i_data_logs.rcv_time = new Date().toLocaleString();
    i_data_logs.save(function(err){
        if(err){
            callback(err);
        }else{
            callback(null, i_data_logs);
            console.log('Data Log Saved!');
        }
    });
};

exports.getLastDataLog = function(callback){
    m_data_log.findOne({}, {}, {"sort": {"rcv_time": -1}}, function(err, doc){
        callback(err, doc);
    });
};