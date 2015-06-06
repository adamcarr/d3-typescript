'use strict';

var gulp = require('gulp');
var connect = require('gulp-connect');
var ts = require('gulp-typescript');

gulp.task('connect', function() {
  connect.server();
});

gulp.task('build', function () {
  gulp.src('src/**/*.ts')
    .pipe(ts({
    	typescript: require('typescript'),
        noImplicitAny: true,
		module: 'commonjs',
		target: 'ES5',
        outDir: 'dist'
      }));
});

var tsProject = ts.createProject({
    typescript: require('typescript'),
    noImplicitAny: true,
	module: 'commonjs',
	target: 'ES5',
    outDir: 'dist'
});

gulp.task('scripts', function() {
    gulp.src('src/**/*.ts').pipe(ts(tsProject))
        .pipe(gulp.dest('dist'));

    // return merge([ // Merge the two output streams, so this task is finished when the IO of both operations are done.
    //     tsResult.dts.pipe(gulp.dest('release/definitions')),
    //     tsResult.js.pipe(gulp.dest('release/js'))
    // ]);
});
gulp.task('watch', ['scripts'], function() {
    gulp.watch('src/**/*.ts', ['scripts']);
});

gulp.task('default', ['watch', 'connect']);