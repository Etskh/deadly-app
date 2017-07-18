
const path = require('path');

const gulp = require('gulp');
const less = require('gulp-less');
const sourcemaps = require('gulp-sourcemaps');
const watch = require('gulp-watch');

const webpack = require('webpack');
const gulpWebpack = require('webpack-stream');


const WEB_ROOT = 'cordova/www/';

gulp.task('less', function () {
  return gulp.src('./src/theme/app.less')
    .pipe(sourcemaps.init())
    .pipe(less({
      paths: [ path.join(__dirname, 'src', 'theme') ]
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./' + WEB_ROOT + '/css'));
});

gulp.task('webpack', function() {
  return gulp.src('./src/lib/application.jsx')
    .pipe(gulpWebpack(require('./webpack.config.js'), webpack))
    .pipe(gulp.dest(WEB_ROOT + 'js/'));
});

gulp.task('watch', function () {
    // Endless stream mode
    return watch('src/**/*.*', {
        ignoreInitial: false
      })
      .pipe(gulp.dest(WEB_ROOT));
});


gulp.task('default', ['less', 'webpack']);
