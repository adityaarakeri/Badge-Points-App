require('dotenv').config();
var EventEmitter = require("events").EventEmitter;
var https = require("https");
var http = require("http");
var util = require("util");


if (process.env.AUTH === undefined){
    console.log('\nplease run $ npm run auth , to create .env file');
    process.exit();
}

/**
 * An EventEmitter to get a Treehouse students profile.
 * @param username
 * @constructor
 */
function Profile(username) {

    var options = {
        protocol: 'https:',
        hostname: 'teamtreehouse.com',
        path: `/${username}.json`,
        method: 'GET',
        headers: {
            'Authorization': `${process.env.AUTH}`
        }
    };

    EventEmitter.call(this);

    var profileEmitter = this;

    //Connect to the API URL (https://teamtreehouse.com/username.json)
    var request = https.get(options, function(response) {
        var body = "";

        if (response.statusCode !== 200) {
            request.abort();
            //Status Code Error
            profileEmitter.emit("error", new Error("There was an error getting the profile for " + username + ". (" + http.STATUS_CODES[response.statusCode] + ")"));
        }

        //Read the data
        response.on('data', function (chunk) {
            body += chunk;
            profileEmitter.emit("data", chunk);
        });

        response.on('end', function () {
            if(response.statusCode === 200) {
                try {
                    //Parse the data
                    var profile = JSON.parse(body);
                    profileEmitter.emit("end", profile);
                } catch (error) {
                    profileEmitter.emit("error", error);
                }
            }
        }).on("error", function(error){
            profileEmitter.emit("error", error);
        });
    });
}

util.inherits( Profile, EventEmitter );

module.exports = Profile;