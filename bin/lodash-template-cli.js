
// lodash-template-cli - Provides a handy command-line interface for compiling lodash templates.
// Written in 2016 by Jesper Oskarsson jesosk@gmail.com
//
// To the extent possible under law, the author(s) have dedicated all copyright
// and related and neighboring rights to this software to the public domain worldwide.
// This software is distributed without any warranty.
//
// You should have received a copy of the CC0 Public Domain Dedication along with this software.
// If not, see <http://creativecommons.org/publicdomain/zero/1.0/>.

var program = require('commander');
var chalk = require('chalk');
var fs = require('fs');
var _ = require('lodash');

program
  .version('1.0.0')
  .arguments('<input-data-file> <input-template-file> <output-file>')
  .parse(process.argv);

if (program.args.length < 3) {
    console.error(chalk.red('lodash-template-cli requires 3 arguments.\nSee lodash-template-cli --help for usage.'));
    process.exit(-1);
}

var dataPath = program.args[0];
var templatePath = program.args[1];
var outputPath = program.args[2];

var data = fs.readFileSync(dataPath).toString();
var parsedData = JSON.parse(data);
var template = fs.readFileSync(templatePath).toString();

var compiledTemplate = _.template(template);
var output = compiledTemplate(parsedData);

fs.writeFileSync(outputPath, output);
