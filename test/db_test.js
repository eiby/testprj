/**
 * Created by 1 on 15/8/6.
 */

exports.testSomething = function(test){
    test.expect(1);
    test.ok(true, "this assertion should pass");
    test.done();
};

exports.testSomethingElse = function(test){
    test.ok(true, "this assertion should fail");
    test.done();
};