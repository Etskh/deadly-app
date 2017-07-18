
const path = require('path');

const gulp = require('gulp');
const less = require('gulp-less');
const sourcemaps = require('gulp-sourcemaps');
const watch = require('gulp-watch');

const webpack = require('webpack');
const gulpWebpack = require('webpack-stream');

gulp.task('less', function () {
  return gulp.src('./src/theme/app.less')
    .pipe(sourcemaps.init())
    .pipe(less({
      paths: [ path.join(__dirname, 'src', 'theme') ]
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./www/css'));
});

gulp.task('webpack', function() {
  return gulp.src('./src/lib/application.jsx')
    .pipe(gulpWebpack(require('./webpack.config.js'), webpack))
    .pipe(gulp.dest('www/js/'));
});

gulp.task('watch', function () {
    // Endless stream mode
    return watch('src/**/*.*', {
        ignoreInitial: false
      })
      .pipe(gulp.dest('www'));
});


gulp.task('default', ['less', 'webpack']);
