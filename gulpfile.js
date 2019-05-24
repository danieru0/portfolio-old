const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('cssnano');
const del = require('del');
const postcss = require('gulp-postcss');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const htmlReplace = require('gulp-html-replace');
const htmlMin = require('gulp-htmlmin');
const eslint = require('gulp-eslint');
const newer = require('gulp-newer');
const imagemin = require('gulp-imagemin');
const replace = require('gulp-replace');

gulp.task('reload', () => {
	browserSync.reload();
});

gulp.task('sass', () => {
	return gulp.src('./app/scss/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 3 versions'],
		}))
		.pipe(gulp.dest('./app'))
		.pipe(browserSync.stream());
});

gulp.task('eslint', () => {
	return gulp.src(['./app/scripts/main.js'])
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failAfterError());
});

gulp.task('serve', gulp.series('sass', () => {
	browserSync({
		server: './app',
	});

	gulp.watch('./app/*.html').on('change', browserSync.reload);
	gulp.watch('./app/scss/**/*.scss', gulp.series('sass')).on('change', browserSync.reload);
	gulp.watch('./app/scripts/**/*.js', gulp.series('eslint')).on('change', browserSync.reload);
}));

gulp.task('css', () => {
	return gulp.src('./app/scss/**/*.scss')
		.pipe(sass())
		.pipe(autoprefixer({
			browsers: ['last 3 versions'],
		}))
		.pipe(postcss([cssnano]))
		.pipe(gulp.dest('./dist'));
});

gulp.task('js', () => {
	return gulp.src('./app/scripts/**/*.js')
		.pipe(concat('script.js'))
		.pipe(replace('../assets/projects.json', 'assets/projects.json'))
		.pipe(uglify())
		.pipe(gulp.dest('./dist'));
});

gulp.task('html', () => {
	return gulp.src('./app/*.html')
		.pipe(htmlReplace({
			js: 'script.js',
		}))
		.pipe(htmlMin({
			sortAttributes: true,
			sortClassName: true,
			collapseWhitespace: true,
		}))
		.pipe(gulp.dest('./dist'));
});

gulp.task('imgs', () => {
	return gulp.src('./app/imgs/**/*')
		.pipe(newer('./dist/imgs'))
		.pipe(imagemin())
		.pipe(gulp.dest('./dist/imgs'));
});

gulp.task('assets', () => {
	return gulp.src('./app/assets/**/*')
		.pipe(gulp.dest('./dist/assets'));
});

gulp.task('clean', () => {
	return del('./dist');
});

gulp.task('build', gulp.series('clean', 'css', 'js', 'html', 'imgs', 'assets'));

gulp.task('dev', gulp.series('serve'));
