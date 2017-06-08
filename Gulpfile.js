var gulp          = require('gulp'),
    connect       = require('gulp-connect-php');
var browserSync   = require('browser-sync');
var sass          = require('gulp-sass');
var concat        = require('gulp-concat');
var autoprefixer  = require('gulp-autoprefixer');
var cleanCSS      = require('gulp-clean-css');

gulp.task('connect', function() {
    connect.server({
      bin: 'C:/wamp64/bin/php/php7.0.10/php.exe', // PC PHP7
      ini: 'C:/wamp64/bin/php/php7.0.10/php.ini', // PC PHP7
      // bin: '/Applications/MAMP/bin/php/php7.0.12/bin/php', // MAC PHP7
    }, function(){
      browserSync({
        proxy: 'localhost/austin'
      });
    });

    gulp.watch('**/*.php').on('change', function () {
      browserSync.reload();
    });
    gulp.watch('**/*.twig').on('change', function () {
      browserSync.reload();
    });
    gulp.watch('sass/**/*.scss', ['sass']);
    gulp.watch("static/*.js" , ['scripts']).on('change', browserSync.reload);
});


gulp.task('scripts', function() {
  gulp.src([
    'js/*.js'
  ])
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./js/main/'))
});


gulp.task('sass', function() {
    return gulp.src("sass/style.scss")
        .pipe(sass())
        .pipe(autoprefixer('last 2 versions'))
        .pipe(gulp.dest("./css/"))
        .pipe(browserSync.stream());
});

gulp.task('default', ['connect']);
