# lodash-template-cli
Provides a handy command-line interface for using lodash templating.

## Installation

Install locally for use in npm scripts:
```
npm install lodash-template-cli
```

Or globally to run from anywhere:
```
npm install -g lodash-template-cli
```

## Usage

Run the command with the path to a JSON data file containing a dictionary with the data to template, a template file and finally an output file.

```
Usage: lodash-template-cli [options] <input-data-file> <input-template-file> <output-file>

Options:

  -h, --help     output usage information
  -V, --version  output the version number
```

## Why?
I was migrating my portfolio site to use a more simple build system based on NPM scripts. The previous solution used grunt-template which in turn used lodash's template syntax. Now I can easily compile these templates from the command-line!

## Copyright
lodash-template-cli - Provides a handy command-line interface for compiling lodash templates.

Written in 2016 by Jesper Oskarsson jesosk@gmail.com

To the extent possible under law, the author(s) have dedicated all copyright
and related and neighboring rights to this software to the public domain worldwide.
This software is distributed without any warranty.

You should have received a copy of the CC0 Public Domain Dedication along with this software.
If not, see <http://creativecommons.org/publicdomain/zero/1.0/>.
