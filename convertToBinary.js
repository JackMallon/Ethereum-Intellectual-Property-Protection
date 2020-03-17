var express = require('express');
var crypto = require('crypto');
var fs = require("fs");

module.exports = {
    convert: function (file, callback) { 
        fs.readFile(file.path, function(err, data) {
            if (err) throw err;      
            var encodedFile = new Buffer(data, 'binary').toString('hex');
            var hash = crypto.createHash('sha256').update(encodedFile).digest('hex');
            callback(hash);
        }); 
    }
};
  