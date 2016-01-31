var gulp = require('gulp'),
  autoprefixer = require('gulp-autoprefixer'),
  sass = require('gulp-sass'),
  bourbon = require('node-bourbon').includePaths,
  neat = require("node-neat").includePaths,
  cssnano = require('gulp-cssnano'),
  sourcemaps = require('gulp-sourcemaps'),
  browserSync = require('browser-sync').create();

// Static Server + watching scss/html files
gulp.task('watch', ['sass'], function() {

    browserSync.init({
        server: "./public"
    });

    gulp.watch("./assets/sass/**/*.scss", ['sass']);
    gulp.watch("./public/*.html").on('change', browserSync.reload);
});

// Compile SASS
gulp.task('sass', () => {
  return gulp.src("./assets/sass/**/*.scss")
    .pipe(sourcemaps.init())
    .pipe(sass({
      includePaths: bourbon,
      includePaths: neat
    }))
    .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 9'], { cascade: true }))
    .pipe(cssnano())
    .pipe(sourcemaps.write('./', {
          includeContent: false,
          sourceRoot: './assets/sass/**/*.scss'
      }))
    .pipe(gulp.dest('./public/css'))
    .pipe(browserSync.stream({match: '**/*.css'}));
});

// Compiles all tasks
gulp.task('default', ['sass']);
