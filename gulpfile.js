var gulp = require('gulp');
var concat = require('gulp-concat');
var plumber = require('gulp-plumber');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var useref = require('gulp-useref');
var obfuscate = require('gulp-js-obfuscator');
var browserSync = require('browser-sync').create();

gulp.task('template-watch',['templates'], browserSync.reload);

//SCRIPTS-MINIFY
gulp.task('controllerMinify', function () {
  return gulp.src('src/assets/js/controllers/*.js')
    .pipe(plumber())
    .pipe(concat('controller.min.js'))
    .pipe(uglify())
    .pipe(obfuscate())
    .pipe(gulp.dest('./dist/js/'))
});

gulp.task('script-watch',['controllerMinify'], browserSync.reload);

//COMPRESS IMAGE
gulp.task('compressImage',function(){
  return gulp.src('./src/assets/img/*')
    .pipe(plumber())
		.pipe(imagemin())
		.pipe(gulp.dest('./dist/images'))
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./dist/"
        }
    });
});

gulp.task('watch', function() {
  gulp.watch('src/js/assets/**/*.js', ['script-watch']);
  gulp.watch('src/assets/images/**', ['compressImage']);
});

gulp.task('default',['styleCompress','controllerMinify','compressImage','browser-sync','watch']);
