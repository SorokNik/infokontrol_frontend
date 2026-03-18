const { src, dest } = require('gulp');
const changed = require('gulp-changed');
const imagemin = require('gulp-imagemin');
const recompress = require('imagemin-jpeg-recompress');
const bs = require('browser-sync');
const plumber = require('gulp-plumber');

module.exports = function rastr() {
	return src('src/img/**/*.+(png|jpg|jpeg|gif|svg|ico)')
		.pipe(plumber())
		.pipe(changed('build/img'))
		.pipe(imagemin([
			recompress({
				loops: 6,
				min: 90,
				max: 95,
				quality: 'lossless', // Использование lossless сжатия для JPEG
			}),
			imagemin.gifsicle(),
			imagemin.optipng(),
			imagemin.svgo()
		]))
		.pipe(dest('build/img'))
		.pipe(bs.stream());
}
