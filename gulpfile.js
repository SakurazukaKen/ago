const { task, input, output, watch } = require('gulp-named')
const babel = require('gulp-babel')

const babelOptions = {
  presets: [
    ['env']
  ]
}

task('js', () => {
  input('src/**/*.js')
    .pipe(babel(babelOptions))
    .pipe(output('./dist/'))
})

task('watch', () => {
  watch('src/**/*.js', ['js'])
})

task('build', ['js'])

task('default', ['build', 'watch'])
