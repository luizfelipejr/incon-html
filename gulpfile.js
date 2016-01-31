var gulp = require('gulp'),
  browserSync = require('browser-sync'),
  autoprefixer = require('gulp-autoprefixer'),
  sass = require('gulp-sass'),
  bourbon = require('node-bourbon').includePaths,
  neat = require("node-neat").includePaths,
  cssnano = require('gulp-cssnano'),
  sourcemaps = require('gulp-sourcemaps');

  // Live reload
  gulp.task('watch', ['browserSync', 'sass'], function() {
  	gulp.watch('./assets/sass/*.scss', ['sass']);
  	gulp.watch('./public/*.html').on('change', browserSync.reload);
  });

  // Compile SASS
  gulp.task('sass', () => {
    return gulp.
    src('./assets/sass/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      includePaths: bourbon,
      includePaths: neat
    }))
    .pipe(autoprefixer('last 4 versions'))
    .pipe(cssnano())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./public/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
  });

  // Compiles all tasks
  gulp.task('default', ['sass']);