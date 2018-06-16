var prompt = require('prompt');
var fs = require('fs');

var schema = {
    properties: {
      email: {
        pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/g,
        message: 'Name must be only letters, spaces, or dashes',
        required: true
      },
      password: {
        hidden: true
      }
    }
  };

console.log('Please enter the Treehouse credentials:\n');

prompt.start();

prompt.get(schema, function (err, result) {

  var auth = 'Basic ' + new Buffer(result.email + ':' + result.password).toString('base64');
  var fileString = `AUTH=${auth}`;
  fs.writeFileSync('./.env', fileString);
  console.log('\n.env file has been created, add it to .gitignore \n');

});