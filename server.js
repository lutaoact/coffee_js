var port = 4080;
var server = require('./basicServer').createServer();
//server.addContainer('.*', '/l/(.*)$', require('./redirector'), { });
server.useFavicon('localhost', './docroot/favicon.ico');
server.docroot('localhost', '/', './docroot');
server.useFavicon('example.com', './docroot/favicon.ico');
server.docroot('example.com', '/', './docroot');
require('./httpsniffer').sniffOn(server);
server.listen(port);
