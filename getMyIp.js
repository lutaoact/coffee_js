var os = require('os');
var hostname = os.hostname();
var ifaces = os.networkInterfaces();

for (var dev in ifaces) {
    ifaces[dev].forEach(function(detail) {
        if (detail.family == "IPv4") {
            console.log(dev, detail.address);
        }
    });
}
/*
var os = require('os');
var IPv4,hostName;
hostName=os.hostname();
for(var i=0;i<os.networkInterfaces().eth0.length;i++){
    if(os.networkInterfaces().eth0[i].family=='IPv4'){
        IPv4=os.networkInterfaces().eth0[i].address;
    }
}
console.log('----------local IP: '+IPv4);
console.log('----------local host: '+hostName);
*/
