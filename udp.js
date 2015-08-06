var net = require("net");
var db = require("./db.js");

var devices = [];

//hq tcp Server
var hqtcpserver = net.createServer({allowHalfOpen: true}, function (c) {
    //c.write("welcome login server!");
    c.on('connect', function(){
        //console.log("device connected (" + c.remoteAddress + ":" + c.remotePort + ")");
    });
    // 监听socket关闭事件
    c.on('end', function() {
        //console.log('device disconnected ( ' +
        //    c.remoteAddress + ' ' + c.remotePort + ')');
        c.end();
        c = null;
    });
    c.on('error', function() {
        console.log('socket error. ');
    });
    c.on('data', function(data){
        var content = data.toString();
        console.log("hq tcp server got: " + content + " from " +
            c.remoteAddress + ":" + c.remotePort);
        // 取出DeviceID
        var p = content.indexOf("*HQ2");
        if( p == -1 ){
            return;
        }
        p = content.indexOf(",");
        var deviceID = content.substring(6, p);
        var gpsData = content.substring(p + 1, content.length - 1);
        console.log("deviceID: " + deviceID + ", gpsData: " + gpsData);
        devices["mdt_" + deviceID] = c;

        db.saveDataLog(deviceID, content, "localhost");
    });
});

hqtcpserver.listen(9966, function() { //'listening' listener
    var address = hqtcpserver.address();
    console.log("hq tcp server listening " +
        address.address + ":" + address.port);
});