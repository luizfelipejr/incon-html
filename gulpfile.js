var gulp = require('gulp'),
  autoprefixer = require('gulp-autoprefixer'),
  sass = require('gulp-sass'),
  bourbon = require("node-bourbon").includePaths,
  rename = require("gulp-rename"),
  minifyCss = require('gulp-minify-css'),
  sourcemaps = require('gulp-sourcemaps');

gulp.task('sass', () => {
  return gulp.
  src('./assets/sass/*.scss').
  pipe(sourcemaps.init()).
  pipe(sass({
    includePaths: ["styles"].concat(bourbon)
  })).
  pipe(autoprefixer('last 4 versions')).
  pipe(gulp.dest('./public/css')).
  pipe(sourcemaps.write('maps')).
  pipe(minifyCss({processImport: false})).
  pipe(rename({
    suffix: '.min'
  })).
  pipe(gulp.dest('./public/css'));
});

gulp.task('watch', function() {
  gulp.watch(['assets/sass/**/*.scss'], ['sass']);
});

gulp.task('default', ['sass']);
