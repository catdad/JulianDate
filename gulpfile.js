/* jshint node: true */

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var mincss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('css', function(){
    return gulp.src('page.css')
        .pipe(sourcemaps.init())
        .pipe(mincss())
        .pipe(rename('page.min.css'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('.'));
});

gulp.task('js', function(){
    return gulp.src('julian.js')
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(rename('julian.min.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('.'));

});

gulp.task('watch', function(){
    gulp.watch('julian.js', ['js']);
    gulp.watch('page.css', ['css']);
});

gulp.task('default', ['css', 'js', 'watch']);
