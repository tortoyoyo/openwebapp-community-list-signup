var gulp = require('gulp');
var handlebars = require('gulp-handlebars');
var wrap = require('gulp-wrap');
var declare = require('gulp-declare');
var concat = require('gulp-concat');
var clean = require('gulp-clean');

gulp.task('templates', function(){
    gulp.src('app/templates/*.hbs')
        .pipe(handlebars())
        .pipe(wrap('Handlebars.template(<%= contents %>)'))
        .pipe(declare({
            namespace: 'SignUpApp.templates',
            noRedeclare: true, // Avoid duplicate declarations
        }))
        .pipe(concat('templates.js'))
        .pipe(gulp.dest('app/'));
});

gulp.task('clean', function () {
  return gulp.src('cordova/www')
    .pipe(clean({force: true}));
});

gulp.task('copy', ['clean'], function() {
   gulp.src('app/**/*')
   .pipe(gulp.dest('cordova/www'));
});

gulp.task('default', ['templates'], function() {
    //a list of watchers, so it will watch all of the following files waiting for changes
    gulp.watch('app/templates/**', ['templates']);
});
