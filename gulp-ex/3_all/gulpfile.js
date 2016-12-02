


var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var clean = require('gulp-clean');
var browserSync = require('browser-sync').create();

gulp.task('concat', function(){
	return gulp.src('src/*.js')
		.pipe(concat('all.js'))
		.pipe(gulp.dest('dist'))
		.pipe(uglify())
		.pipe(rename('all.min.js'))		
		.pipe(gulp.dest('dist'));
});

gulp.task('uglify', function(){
	return gulp.src('./dist/all.js')		
		.pipe(rename('all.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./dist/'));
});

gulp.task('copy', function () {
    return gulp.src('img/*')
        .pipe(gulp.dest('dist/img/'));
});

gulp.task('clean', function () {
    return gulp.src('dist', {read: false})
        .pipe(clean());
});

// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch("src/*.js", ['concat']);
    gulp.watch("index.html").on('change', browserSync.reload);
});

gulp.task('build', ['clean', 'concat']);
gulp.task('serve', ['build', 'browser-sync']);