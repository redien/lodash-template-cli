var should = require('should');
var stream = require('stream');
var templateTransformer = require('./template-transformer');

var streamFromString = function (string) {
    return new stream.Readable({
        read: function () {
            this.push(string);
            this.push(null);
        }
    });
};

var stringFromStream = function (stream, callback) {
    return new Promise(function (resolve, reject) {
        var string = '';

        stream.on('data', function (data) {
            string += data.toString();
        });

        stream.on('end', function () {
            resolve(string);
        });

        stream.on('error', function (error) {
            reject(error);
        });
    });
};

describe('template-transformer', function () {
    describe('transformWith', function () {
        it('should transform the stream with the template', function () {
            var inputStream = streamFromString('{"key": "cd"}');
            var template = 'ab<%= key %>ef';

            var outputStream = inputStream.pipe(templateTransformer.transformWith(template));

            return stringFromStream(outputStream).should.eventually.equal('abcdef');
        });
    });
});
