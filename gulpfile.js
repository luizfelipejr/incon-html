var gulp = require('gulp'),
  prefix = require('gulp-autoprefixer'),
  sass = require('gulp-sass'),
  bourbon = require('node-bourbon').includePaths,
  neat = require("node-neat").includePaths,
  minifyCss = require('gulp-minify-css');
  sourcemaps = require('gulp-sourcemaps'),
  browserSync = require('browser-sync').create();

// Static Server + watching html/css files
gulp.task('watch', ['sass'], function() {

    browserSync.init({
        server: "./"
    });

    gulp.watch("./assets/sass/**/*.scss", ['sass']);
    gulp.watch("./*.html").on('change', browserSync.reload);
});

// Compile SASS
gulp.task('sass', () => {
  return gulp.src("./assets/sass/**/*.scss")
    .pipe(sourcemaps.init())
    .pipe(sass({
      includePaths: bourbon,
      includePaths: neat
    }))
    .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(sourcemaps.write('./', {
          includeContent: false,
          sourceRoot: './assets/sass/**/*.scss'
      }))
    .pipe(gulp.dest('./assets/css'))
    .pipe(browserSync.stream({match: '**/*.css'}));
});

// Compiles all tasks
gulp.task('default', ['sass']);
