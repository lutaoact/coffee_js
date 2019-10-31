var delay_time = function(ms, param) {
    return new Promise(function(resolve) {
        setTimeout(function() {
            console.log(new Date().getTime());
            resolve(param);
        }, ms)
    } )
}
var asyn_fun = async function (params) {
    var time_out = 1000;
    const results = await params.map(async (param) => {
      time_out = time_out + 1000;
      var out =  await delay_time(time_out, param);
      return out //这里返回的都是promise对象
    });
    var target = [];
    for(var ret of results) {
         target.push(await ret);
    }
    return await target;
};
asyn_fun(['First','Second','Third','Last']).then(function(result){
    console.log(JSON.stringify(result))  // ["First","Second","Third","Last"]
});

// 虽然map方法的参数是async函数，但它是并发执行的，因为只有async函数内部是继发执行，外部不受影响。后面的for..of循环内部使用了await，因此实现了按顺序输出
