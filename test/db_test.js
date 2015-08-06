/**
 * Created by 1 on 15/8/6.
 */
var db = require("../db.js");

this.TestForDB = {
    'TestSaveDataLog': function (test) {
        var device_id = "56621885699";
        var content = "*HQ20056621885699,BA&A1211352629398710638594360900160615&B0100000000&E00003292&F0198#";
        db.saveDataLog(device_id, content, "localhost", function(err, doc){
            test.ifError(err, 'save data log fail.');
            test.equal(device_id, doc.device_id);
            test.equal(content, doc.content);
            test.done();
            console.log("");
        });
    }
};

