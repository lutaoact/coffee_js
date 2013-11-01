var port = 4080;
var server = require('./basicServer').createServer();
server.useFavicon('localhost', './docroot/favicon.ico');
server.docroot('localhost', '/', './docroot');
require('./httpsniffer').sniffOn(server);
server.listen(port);
