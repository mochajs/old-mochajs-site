'use strict';

const chalk = require('chalk');
const join = require('path').join;

exports.scripts = {
  serve: {
    script: 'bundle exec jekyll serve --safe --drafts --watch --host 0.0.0.0',
    description: `Build site via Jekyll, watch for changes, serve at ${chalk.underline(
      'http://localhost:4000/')}`
  },
  build: {
    script: 'bundle exec jekyll build --safe --drafts',
    description: 'Build site via Jekyll'
  },
  toc: {
    script: join(__dirname, 'toc.js'),
    description: `Rebuild table of contents; mutates ${chalk.bold('index.md')}`
  },
  postinstall: {
    script: join(__dirname, 'postinstall.js'),
    description: 'Displays help after installing'
  },
  test: {
    script: 'stylelint styles/*.css'
  },
  css: {
    script: 'postcss -c .postcss.json --dir css styles/*'
  }
};
