var gulp = require('gulp');
var server = require('gulp-webserver');
var minCss = require('gulp-clean-css');
var sass = require('gulp-sass');

var path = require('path');
var url = require('url');
var fs = require('fs');

gulp.task('sass', function() {
    return gulp.src('./src/sass/*.scss')
        .pipe(sass())
        .pipe(minCss())
        .pipe(gulp.dest('./src/css'))
});

gulp.task('server', function() {
    return gulp.src('src')
        .pipe(server({
            port: 8800,
            open: true,
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;
                if (pathname === '/favicon.ico') {
                    res.end('');
                    return;
                }
                pathname = pathname === '/' ? 'index.html' : pathname;
                res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)));
            }
        }))
});

gulp.task('watch', function() {
    return gulp.watch('./src/sass/*.scss', gulp.series('sass'));
});

gulp.task('default', gulp.series('sass', 'server', 'watch'));