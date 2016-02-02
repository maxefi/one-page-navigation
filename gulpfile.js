var gulp         = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var sass         = require('gulp-sass');
var browserSync  = require('browser-sync').create();

gulp.task('serve', ['autoprefixer'], function() {

    browserSync.init({
        server: "./app"
    });

    gulp.watch("app/scss/*.scss", ['sass', 'autoprefixer']);
    gulp.watch("app/*.html").on('change', browserSync.reload);
    gulp.watch("app/js/*.js").on('change', browserSync.reload);
});

gulp.task('sass', function() {
    return gulp.src("app/scss/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("app/css"))
        .pipe(browserSync.stream());
});

gulp.task('autoprefixer', ['sass'], function () {
  return gulp.src('app/css/*.css')
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('app/css'));
});

gulp.task('default', ['serve']);
