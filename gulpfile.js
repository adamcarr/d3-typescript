'use strict';

var browserify = require('browserify');
var gulp = require('gulp');
var tsify = require('tsify');
var fs = require('fs');
var connect = require('gulp-connect');

gulp.task('connect', function() {
  connect.server();
});

gulp.task('build', function () {

	browserify()
		.add('src/index.ts')
		.plugin('tsify', { noImplicitAny: false })
		.bundle()
		.pipe(fs.createWriteStream('bundle.js'));
});

gulp.task('default', ['build', 'connect']);