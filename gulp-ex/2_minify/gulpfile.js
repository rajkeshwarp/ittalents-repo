

var gulp = require('gulp');
var uglify = require('gulp-uglify');

gulp.task('uglify', function(){
	return gulp.src('src/all.js')
		.pipe(uglify())
		.pipe(gulp.dest('./dist/'));
})