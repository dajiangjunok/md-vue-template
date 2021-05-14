const gulp = require('gulp')
const sass = require('gulp-sass')

const themeWatch = [
  'src/assets/theme/*.scss',
  'node_modules/@mediinfo-ued/theme-default/*.scss',
  'node_modules/@mediinfo-ued/theme-pink/*.scss',
  'node_modules/@mediinfo-ued/theme-green/*.scss',
]

gulp.task('watch', function () {
  gulp.watch(themeWatch, ['sass'])
})

gulp.task('build:theme', function () {
  return gulp.src(['src/assets/theme/*.scss']).pipe(sass()).pipe(gulp.dest('public/css'))
})
