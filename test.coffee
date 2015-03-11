config = require 'config'
console.log config


bucket=wind&key=videos%2Fsample.mp4&fops=avthumb%2Fsubtitle%2FaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL2x1dGFvYWN0L2dhbGUvbWFzdGVyL2xvY2FsX2RhdGEvTDAxLTU0L2xlc3NvbjAxJUU1JThGJThDJUU4JUFGJUFELnNydA%3D%3D
QBox ZgraDo7E1x5ngVQQZFI_2CrcKTDnGNeMS8HDctYT:1EOyMxnAM0URjkK2HmPxny_E9RI=

Host: api.qiniu.com  
Content-Type: application/x-www-form-urlencoded  

curl -d 'bucket=wind&key=videos%2Fsample.mp4&fops=avthumb%2Fsubtitle%2FaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL2x1dGFvYWN0L2dhbGUvbWFzdGVyL2xvY2FsX2RhdGEvTDAxLTU0L2xlc3NvbjAxJUU1JThGJThDJUU4JUFGJUFELnNydA%3D%3D' -H 'Authorization: QBox ZgraDo7E1x5ngVQQZFI_2CrcKTDnGNeMS8HDctYT:1EOyMxnAM0URjkK2HmPxny_E9RI=' -H 'Host: api.qiniu.com' -H 'Content-Type: application/x-www-form-urlencoded' http://api.qiniu.com/pfop/
{"persistentId":"55000cb27823de4068753dd1"}

curl 'http://api.qiniu.com/status/get/prefop?id=55000cb27823de4068753dd1'

bucket=wind&key=videos%2Fsample.mp4&fops=avthumb%2Fmp4%2Fsubtitle%2FaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL2x1dGFvYWN0L2dhbGUvbWFzdGVyL2xvY2FsX2RhdGEvTDAxLTU0L2xlc3NvbjAxJUU1JThGJThDJUU4JUFGJUFELnNydA%3D%3D
QBox ZgraDo7E1x5ngVQQZFI_2CrcKTDnGNeMS8HDctYT:k5XoB-h0pLj5JEM4MLEwxMj3LnI=

curl -d 'bucket=wind&key=videos%2Fsample.mp4&fops=avthumb%2Fmp4%2Fsubtitle%2FaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL2x1dGFvYWN0L2dhbGUvbWFzdGVyL2xvY2FsX2RhdGEvTDAxLTU0L2xlc3NvbjAxJUU1JThGJThDJUU4JUFGJUFELnNydA%3D%3D' -H 'Authorization: QBox ZgraDo7E1x5ngVQQZFI_2CrcKTDnGNeMS8HDctYT:k5XoB-h0pLj5JEM4MLEwxMj3LnI=' -H 'Host: api.qiniu.com' -H 'Content-Type: application/x-www-form-urlencoded' http://api.qiniu.com/pfop/
{"persistentId":"55000fe27823de406875562b"}

curl 'http://api.qiniu.com/status/get/prefop?id=55000fe27823de406875562b'
