'use strict';

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    prefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    cssmin = require('gulp-clean-css'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    rimraf = require('rimraf'),
    browserSync = require("browser-sync"),
    postcss = require("gulp-postcss"),
    mqpacker = require("css-mqpacker"),
    reload = browserSync.reload,
    rename = require('gulp-dynamic-name'),
    svgSprite = require("gulp-svg-sprites");

var path = {
    build: {
        html: 'build/',
        js: 'build/js/',
        css: 'build/css/',
        img: 'build/img/',
        fonts: 'build/fonts/',
        sprites: 'src/img/'
    },
    src: {
        html: 'src/pages/*.html',
        js: 'src/js/main.js',
        css: 'src/style.scss',
        svg: 'src/img/src-svg/*.svg',
        img: 'src/img/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    watch: {
        html: 'src/pages/*.html',
        js: 'src/js/**/*.js',
        css: 'src/**/**/*.scss',
        img: ['!src/img/*.svg', 'src/img/*.*'],
        fonts: 'src/fonts/**/*.*'
    },
    clean: './build'
};

var config = {
    server: {
        baseDir: "./build"
    },
    tunnel: true,
    host: 'localhost',
    port: 9000,
    logPrefix: "LKTN"
};

gulp.task('webserver', function () {
    browserSync(config);
});

gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});

gulp.task('html:build', function () {
    gulp.src(path.src.html) 
        .pipe(gulp.dest(path.build.html))
        .pipe(reload({stream: true}));
});

gulp.task('js:build', function () {
    gulp.src(path.src.js) 
        //.pipe(sourcemaps.init()) 
        .pipe(uglify()) 
        //.pipe(sourcemaps.write()) 
        .pipe(gulp.dest(path.build.js))
        .pipe(reload({stream: true}));
});

gulp.task('css:build', function () {
    gulp.src(path.src.css) 
        //.pipe(sourcemaps.init())
        .pipe(sass({
        	//подключение бурбона и normalize
            includePaths: [require('node-bourbon').includePaths, require('node-normalize-scss').includePaths, require('include-media').includePaths],
            //outputStyle: 'compressed',
            //sourceMap: true,
            errLogToConsole: true
        }))
        .pipe(prefixer({browsers: ['last 2 versions']}))
        .pipe(postcss([
        	mqpacker({
        		sort: true
        	})
        ]))
        .pipe(gulp.dest(path.build.css))
        .pipe(cssmin())
        .pipe(rename({
                    suffix: '.min'
                }))
        //.pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.css))
        .pipe(reload({stream: true}));

});

gulp.task('image:build', function () {
    gulp.src(path.src.img) 
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.img))
        .pipe(reload({stream: true}));
});

gulp.task('sprites', function () { //Необходимо править путь к sprite.svg в _sprite.scss
    return gulp.src(path.src.svg)
        .pipe(svgSprite({
            cssFile: "../blocks/_sprite.scss",
            preview: false,
            svgPath: "../img/"

        }))
        .pipe(gulp.dest(path.build.sprites));
});


gulp.task('fonts:build', function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
});

gulp.task('build', [
    'html:build',
    'js:build',
    'css:build',
    'fonts:build',
    'image:build',
]);


gulp.task('watch', function(){
    watch([path.watch.html], function(event, cb) {
        gulp.start('html:build');
    });
    watch([path.watch.css], function(event, cb) {
        gulp.start('css:build');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:build');
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start('image:build', 'spritees:build');
    });
    watch([path.watch.fonts], function(event, cb) {
        gulp.start('fonts:build');
    });
});


gulp.task('default', ['build', 'webserver', 'watch']);