#!/usr/bin/env node

// intended to be temporary script to sync contributing doc from the main repo

const got = require('got');
const fs = require('fs');
const Transform = require('stream').Transform;
const path = require('path');

console.log('Pulling CONTRIBUTING.md from mochajs/mocha into contributing' +
  '/index.md...');

got.stream(
  'https://raw.githubusercontent.com/mochajs/mocha/master/CONTRIBUTING.md')
  .pipe(new Transform({
    transform(chunk, encoding, done) {
      if (this.first) {
        this.push(chunk);
      } else {
        // add front matter
        this.push(`---
layout: page
title: Mocha - Contributing
description: Contributing to Mocha
---
`);
        // remove top-level header
        this.push(String(chunk)
          .replace(/#\s.+\n\n/im, ''));
        this.first = true;
      }
      done();
    },
  }))
  .pipe(fs.createWriteStream(
    path.join(__dirname, '..', 'contributing', 'index.md')));

console.log('...done.  Run scripts/import-contributing.js to sync the doc ' +
  'again.');
