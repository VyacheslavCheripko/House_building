const { watch } = require('gulp');
const gulp = require('gulp');
const less = require('gulp-less');
const cssmin = require('gulp-cssmin');
const rename = require('gulp-rename');


lesstranslate = function () {
    return gulp.src('./src/styles/styles.less')
        .pipe(less())
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./dist/styles'));
};

exports.watch = function () {
    gulp.watch('./src/styles/*.less', lesstranslate)
};
