var Delay_Time = function(ms) {
    return new Promise(function(resolve) {
        setTimeout(resolve, ms);
    } );
}
var Delay_Time_Second = async function (ms) {
    setTimeout(function() {
      console.log('in Delay_Time_Second');
    }, ms);
    return 2
}
var Delay_Print = async function(ms) {
    Delay_Time_Second(2000).then((data) => {
      console.log(data);
    });
    console.log("After Delay_Time_Second");
    await Delay_Time(ms);
    console.log("After Delay_Time");
    return "END"
}

Delay_Print(2000).then(function(resolve) {
    console.log(resolve);
})

/* OUTPUT:
After Delay_Time_Second
2
in Delay_Time_Second
After Delay_Time
END
*/
