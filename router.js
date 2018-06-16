const Profile = require('./profile');
const renderer = require('./renderer.js');
const querystring = require('querystring');

// https://en.wikipedia.org/wiki/List_of_HTTP_header_fields
const commonHeaders = {
    "Content-Type": "text/html"
};

module.exports.router = {
    home: function(request, response){
        if (request.url === '/'){
            if(request.method.toLowerCase() === "get"){
                response.writeHead(200, commonHeaders);
                renderer.view("header", {}, response);
                renderer.view("search", {}, response);
                renderer.view("footer", {}, response);
                response.end();
            } else {
                request.on("data", function(postBody){
                    var query = querystring.parse(postBody.toString());;
                    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/303
                    // https://en.wikipedia.org/wiki/List_of_HTTP_status_codes#3xx_Redirection
                    // get the POST and redirect it to a GET to /username
                    response.writeHead(303, {"Location": `/${query.username}`});
                    response.end();
                });
            }
        }
    },

    user: function(request, response){
        var username = request.url.replace('/', '');
        if (username.length > 0 ){
            var studentProfile = new Profile(username);

            studentProfile.on('end', function(profileJSON){
                var values = {
                    username: profileJSON.profile_name,
                    avatarUrl: profileJSON.gravatar_url,
                    badges: profileJSON.badges.length,
                    javascriptPoints: profileJSON.points.JavaScript
                };

                response.writeHead(200, commonHeaders);
                renderer.view("header", {}, response);
                renderer.view("profile", values, response);
                renderer.view("footer", {}, response);
                
                // to end the page request
                response.end();

            });
            
            studentProfile.on('error', function(error){
                // page content
                response.writeHead(200, commonHeaders);
                renderer.view("header", {}, response);
                renderer.view("error", { errorMessage: error.message }, response);
                renderer.view("search", {}, response);
                renderer.view("footer", {}, response);
                
                // to end the page request
                response.end();

            });
        }
    }
};