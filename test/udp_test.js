/**
 * Created by 1 on 15/8/6.
 * udp.js test unit
 */
var net = require("net");
var db = require("../db.js");

this.TestForUDP = {
    'TestConnectionAndSendData': function (test) {
        var device_id = "56621885699";
        var content = "*HQ20056621885699,BA&A1211352629398710638594360900160615&B0100000000&E00003292&F0198#";
        // 创建模拟客户端，连接，然后发送数据，再从数据库中获取数据，看数据是否和发送的一致
        var c = net.connect(9966, function () {
            console.log('client 1: connect server!');
            c.write(content, function (err, bytes) {
                db.getLastDataLog(function(err, doc){
                    c.end();
                    test.ifError(err, 'get data log fail.');
                    test.equal(device_id, doc.device_id);
                    test.equal(content, doc.content);
                    setTimeout(process.exit, 5000);
                    test.done();
                });
            });
        });

        c.on('data', function (data) {
            console.log("client 1 got: " + data.length + " Bytes");
        });

        c.on('error', function () {
            console.log('client 1 socket error. ');
//            test.ok(false, "connect server fail.");
        });
    }
};
