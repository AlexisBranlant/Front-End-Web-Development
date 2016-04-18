var gulp = require('gulp');
var sass = require('gulp-sass');
var twig = require('gulp-twig');
var path = require('path');
var flatten = require('gulp-flatten');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var iconfont = require('gulp-iconfont');
var consolidate = require('gulp-consolidate');
var rename = require('gulp-rename');
var cleanCss = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var buffer = require('vinyl-buffer');

/* Compilation des css */
gulp.task('sass',function(){
	console.log('sass');
	//gulp.src('src/pages/home/home.scss')
	gulp.src('src/**/*.scss')
		.pipe(sass())
		.pipe(cleanCss())
		.pipe(flatten())
		.pipe(gulp.dest('dist/css'));
});

/* compilation des html */
gulp.task('html', function(){
	console.log('html');
	gulp.src('src/pages/**/*.twig')
		.pipe(twig())
		.pipe(flatten())
		.pipe(gulp.dest(path.join(__dirname,'dist')));
});

/* compilation des fichiers JS */
gulp.task('js', function(){
	console.log('js');
	var stream = browserify({
		entries : 'src/pages/home/home.js'
	})
		.bundle()
		.pipe(source('home.js'));
	stream = stream.pipe(buffer())
				.pipe(uglify())
				.pipe(gulp.dest('dist/js'));
	return stream;
});

/* compilation de la police d'icones */
gulp.task('icons', function(){
	console.log('icons');
	gulp.src('src/icons/**/*.svg')
		.pipe(iconfont({
			fontName: 'icons',
			formats:['ttf','eot','woff','svg','woff2']
		}))
		.on('glyphs',function(glyphs){
			var options = {
				glyphs: glyphs.map(function(glyph){
					return {
						name:glyph.name,
						codepoint: glyph.unicode[0].charCodeAt(0)
					};
				}),
				fontName: 'icons',
				fontPath: '../medias/fonts/',
				exempleFontPath: 'medias/fonts/'
			};
			
			gulp.src('src/utils/templateIcon.css')
				.pipe(consolidate('lodash',options))
				.pipe(rename({basename:'icons'}))
				.pipe(gulp.dest('src/utils'));
				
			gulp.src('src/layouts/templateIcons.html')
				.pipe(consolidate('lodash',options))
				.pipe(gulp.dest('dist'));
		})
		.pipe(gulp.dest('dist/medias/fonts'));
});


/* mise en place de l'ecouteur pour recompilation 
	a chaque modification de fichier de dev */
gulp.task('watch', function(){
	console.log('watch');
	gulp.watch('src/**/*.scss',['sass']);
	gulp.watch('src/**/*.twig',['html']);
	gulp.watch('src/**/*.js',['js']);
	gulp.watch('src/icons/**/*.svg',['icons']);
});

/* tache default de lancement de toute l'appli */
gulp.task('default',['sass','html','js','icons','watch'], function(){
	console.log('default');
});








