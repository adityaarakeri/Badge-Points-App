const http = require('http');
const router = require('./router').router;


http.createServer(function(request, respose){
    // console.log(req.url);
    router.home(request, respose);
    router.user(request, respose);
    
}).listen(3000);