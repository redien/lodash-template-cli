#!/usr/bin/env node

// lodash-template-cli - Provides a handy command-line interface for compiling lodash templates.
// Written in 2016 by Jesper Oskarsson jesosk@gmail.com
//
// To the extent possible under law, the author(s) have dedicated all copyright
// and related and neighboring rights to this software to the public domain worldwide.
// This software is distributed without any warranty.
//
// You should have received a copy of the CC0 Public Domain Dedication along with this software.
// If not, see <http://creativecommons.org/publicdomain/zero/1.0/>.

var fs = require('fs');
var path = require('path');

var shell = require('shelljs');
var argv = require('minimist')(process.argv.slice(2));

var templateTransformer = require('../template-transformer');

var exitWithHelp = function () {
    console.log(
    'usage: lodash-template-cli [options] <template>\n' +
    '                           [<json-files>* <output-directory>]\n' +
    '\n' +
    'options:\n' +
    '    -v, --version     Displays version.\n' +
    '    -h, --help        Displays usage information.\n');

    process.exit(1);
};

if (argv.help || argv.h) {
    exitWithHelp();

} else if (argv.version || argv.v) {
    var pkg = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json')).toString());
    console.log(pkg.version);

} else if (argv._.length === 1) {
    var templatePath = argv._[0];
    var template = fs.readFileSync(templatePath).toString();

    var inputStream = process.stdin;
    var outputStream = process.stdout;

    inputStream.pipe(templateTransformer.transformWith(template)).pipe(outputStream);

} else if (argv._.length >= 3) {
    var templatePath = argv._[0];
    var template = fs.readFileSync(templatePath).toString();

    var files = argv._.slice(1, -1);
    var outputDirectory = argv._[argv._.length - 1];

    files.forEach(function (file) {
        var outputPath = path.join(outputDirectory, file);

        shell.mkdir('-p', path.dirname(outputPath));

        var inputStream = fs.createReadStream(file);
        var outputStream = fs.createWriteStream(outputPath);

        inputStream.pipe(templateTransformer.transformWith(template)).pipe(outputStream);
    });

} else {
    exitWithHelp();
}
