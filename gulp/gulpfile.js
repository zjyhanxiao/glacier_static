var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var minifycss = require('gulp-minify-css');
var rename = require('gulp-rename');
var gzip = require('gulp-gzip');
var livereload = require('gulp-livereload');
var uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');

gulp.task('img_compress', () => {
    return gulp.src('../static/version_1.0/meixin_invest/img/**/*.+(jpg|jpeg|gif|png)')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            optimizationLevel: 7,
        }))
        .pipe(gulp.dest('../static/version_1.0/dist/meixin_invest/img'))
        .pipe(livereload());
});

/* Watch JS For Changes */
gulp.task('js', function() {
    return gulp.src(['../static/version_1.0/meixin_invest/js/*.js', '../static/version_1.0/meixin_invest/meixin/*.js','!../static/version_1.0/meixin_invest/js/*.min.js', '!../static/meixin_invest/meixin/*.min.js'])
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('../static/version_1.0/dist/meixin_invest/js'))
        .pipe(livereload());
});

/* Watch CSS For Changes */
gulp.task('css', function () {
    return gulp.src('../static/version_1.0/meixin_invest/css/*.css')
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest('../static/version_1.0/dist/meixin_invest/css'))
        .pipe(livereload());
    ;
});

/* copy images files under /img/ over to under /dist/ and watch them for changes */
/* p - v20160317 */
gulp.task('img', function () {
    return gulp.src('../static/version_1.0/meixin_invest/img/**/*.+(jpg|jpeg|gif|png)')
        .pipe(gulp.dest('../static/version_1.0/dist/meixin_invest/img_old'))
        .pipe(livereload());
    ;
});

/* Watch Files For Changes */
gulp.task('watch', function() {
    livereload.listen();
    // Trigger a live reload on any css changes
    gulp.watch('../static/version_1.0/meixin_invest/css/*.css', ['css']);
    gulp.watch('../static/version_1.0/meixin_invest/css/*.css').on('change', livereload.changed);

    gulp.watch('../static/version_1.0/meixin_invest/js/*.js', ['js']);
    gulp.watch('../static/version_1.0/meixin_invest/js/*.js').on('change', livereload.changed);
    // Trigger a live reload on any Django template changes
    gulp.watch('../web/**').on('change', livereload.changed);

});

/* void ../templates/critical_index.html
 * p - v20160414
 */

gulp.task('clean-critical', () => {
    fs.writeFile('../web/critical_index.html', '', (err) => {
    if (err) throw err;

console.log('voided critical_index.html.');
});
});

gulp.task('default', ['clean-critical', 'img_compress', 'js', 'css', 'img', 'watch']);

var ccsss = require('./node_modules/ccsss/lib/server');
var curlrequest = require('curlrequest');
var fs = require('fs');
var http = require('http');

/* generate critical styles for homepage
 * it loads homepage, and extracts critical styles into ../templates/critical_index.html
 * p - v20160414
 */
gulp.task('critical', ['clean-critical'], function() {
    /* based on top 10 screen sizes stats from Google Analytics(GA)
     * and bootstrap grid options: http://getbootstrap.com/css/#grid-options
     * criterion:
     * * witdh: possible maximum width of a device - based on bootstrap
     * * height: possible maximum height - based on GA stats
     *
     * p - v20160419
     */
    var screenDimensions = [{
        // width < 768px
        'width': 767,
        'height': 1024
    }, {
        // width: [768px, 991px]
        'width': 991,
        'height': 1024
    }, {
        // width: [992px, 1199px]
        'width': 1199,
        'height': 1920
    }, {
        // width: >= 1200px
        'width': 1920,
        'height': 1080
    }];

    var hostname = '127.0.0.1';

    var investPortalPort = 8000;

    // ccsss service
    var ccsssPort = 8888;
    var ccsssServer = ccsss.start(ccsssPort);

    // notification receiver server
    var notificationReceiverPort = 3333;
    var notificationReceiverServer = http.createServer();

    notificationReceiverServer.on('request', (req, res) => {
        req.on('data', function (chunk) {
        var notification = JSON.parse(chunk.toString());

        if (notification.status === 'success') {
            curlrequest.request({url: notification.resultLocation}, (err, criticalStylesText) => {
                if (err) throw err;

            console.log('fetched critical style...');

            fs.writeFile('../web/critical_index.html', '<style>' + criticalStylesText + '</style>', (err) => {
                if (err) throw err;

            console.log('critical styles saved!');

            // stop ccsss server
            ccsssServer.stop(function () {
                console.log('ccsss server stopped...');

                res.end(function () {
                    // stop notification receiver server
                    notificationReceiverServer.close(function () {
                        console.log('notification receiver stopped...');
                    });
                });
            });
        });
        });
        } else {
            console.log('error could have happened in extracting critical styles...');
            console.log(JSON.stringify(notification));
        }
    });
});

    notificationReceiverServer.listen(notificationReceiverPort, hostname);

    notificationReceiverServer.on('listening', () => {
        console.log(`notification receiver server running at http://${hostname}:${notificationReceiverPort}/`);

    var postData = {
        'dimensions': screenDimensions,
        'url': 'http://' + hostname + ':' + investPortalPort,
        'notificationUrl': 'http://' + hostname + ':' + notificationReceiverPort,
        /* currently ignores relative path (../) due to no auto-prefix
         * ZP - 20160414
         */
        'ignoreRe': ['.*\.\.\/.*']
    };

    var postOptions = {
        'url': 'http://' + hostname + ':' + ccsssPort + '/generation/request',
        'method': 'POST',
        'headers': {
            'Content-Type': 'application/json'
        },
        verbose: true,
        include: true,
        data: JSON.stringify(postData)
    };

    // send screen dimensions and related parameters to ccsss service
    curlrequest.request(postOptions, function (err, res) {
        if (err) throw err;

        console.log('generating critical styles for ' + postData.url + '............');
    });
});
});
