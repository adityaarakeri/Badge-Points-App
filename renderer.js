var fs = require('fs');

function mergeValues(values, content){
    for(var key in values){
        content = content.replace(`{{${key}}}`, values[key]);
    }
    return content;
}

function view(templateName, values, response){
    var fileContents = fs.readFileSync(`./views/${templateName}.html`, {encoding: "utf8"});
    // var fileContents = fs.readFileSync('./views/' + templateName + '.html', {encoding: "utf8"});
    fileContents = mergeValues(values, fileContents);
    response.write(fileContents.toString());


    // response.end();
    // fs.readFile(`./views/${templateName}.html`, function(err, fileContents){
    //     if (err) throw err.message;

    //     fileContents = mergeValues(fileContents);
    //     response.write(fileContents);

    // });
}

module.exports.view = view;