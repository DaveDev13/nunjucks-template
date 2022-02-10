import path from 'path';
import {src, dest} from 'gulp';
import gulpSquoosh from 'gulp-squoosh';
import notify from 'gulp-notify';
import rename from 'gulp-rename';
import {paths} from '../store';
import gulpImagemin, {gifsicle, svgo} from 'gulp-imagemin';
import plumber from 'gulp-plumber';
import {config} from '../../config';
import gulpIf from 'gulp-if';

function renamePaths(name) {
    let dirname = name.dirname;

    config.images.components.paths.map((item) => {
        if (path.basename(item).indexOf(item) > -1) {
            dirname = dirname.replace(item, '');
        }
    });

    return {
        dirname,
        basename: name.basename,
        extname: name.extname,
    };
}

/**
 * Сбор картинок из папки images и components
 * Есть доп. конфиг для обрезания путей внутри папок components, при желании можно отключить
 * @example components/home/images/filename -> images/home/filename
*/

function images() {
    return src([
        `${paths.src.images}/**/*.*(gif|jpg|jpeg|png|svg|webp)`,
        `!${paths.src.images}/**/_*.*(gif|jpg|jpeg|png|svg|webp)`,
        `${paths.src.components}/**/*.*(gif|jpg|jpeg|png|svg|webp)`,
        `!${paths.src.components}/**/_*.*(gif|jpg|jpeg|png|svg|webp)`,
    ])
        .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
        .pipe(rename((path) => renamePaths(path)))
        .pipe(dest(paths.build.images))
}

function watchImages(path) {
    return new Promise((resolve) => {
        src(path)
            .pipe(dest(paths.build.images))
            .on('end', resolve)
    });
}

/**
 * Оптимизация картинок
 * webp формируются автоматически
 * @see https://github.com/GoogleChromeLabs/squoosh
 * @see https://github.com/sindresorhus/gulp-imagemin#readme
*/

function optimizeImages() {
    src([
        `${paths.src.images}/**/*.*(gif|svg)`,
        `!${paths.src.images}/**/_*.*(gif|svg)`,
        `${paths.src.components}/**/*.*(gif|svg)`,
        `!${paths.src.components}/**/_*.*(gif|svg)`,
    ])
        .pipe(rename((path) => renamePaths(path)))
        .pipe(gulpIf(config.images.optimize,
            gulpImagemin([
                gifsicle(config.images.gifOptions),
                svgo(config.images.svgOptions)
            ], {
                verbose: true, // информирование в консоли
            })
        ))
        .pipe(dest(paths.build.images));

    return src([
        `${paths.src.images}/**/*.*(jpg|jpeg|png|webp)`,
        `!${paths.src.images}/**/_*.*(jpg|jpeg|png|webp)`,
        `${paths.src.components}/**/*.*(jpg|jpeg|png|webp)`,
        `!${paths.src.components}/**/_*.*(jpg|jpeg|png|webp)`,
    ])
        .pipe(rename((path) => renamePaths(path)))
        .pipe(gulpIf(config.images.optimize,
            gulpSquoosh(({width, height, size, filePath}) => ({
                preprocessOptions: {},
                encodeOptions: {
                    webp: config.images.webpOptions,
                    ...(path.extname(filePath) === ".png"
                        ? {
                            oxipng: config.images.oxiPngOptions
                        }
                        : {
                            mozjpeg: config.images.mozJpegOptions
                        }),
                },
            }))
        ))
        .pipe(dest(paths.build.images));
}

function originImages() {
    return src([
        `${paths.src.images}/**/*.*(gif|svg)`,
        `!${paths.src.images}/**/_*.*(gif|svg)`,
        `${paths.src.components}/**/*.*(gif|svg)`,
        `!${paths.src.components}/**/_*.*(gif|svg)`,
        `${paths.src.images}/**/*.*(jpg|jpeg|png|webp)`,
        `!${paths.src.images}/**/_*.*(jpg|jpeg|png|webp)`,
        `${paths.src.components}/**/*.*(jpg|jpeg|png|webp)`,
        `!${paths.src.components}/**/_*.*(jpg|jpeg|png|webp)`,
    ])
        .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
        .pipe(dest(paths.build.imagesOrigin));
}

export {
    images,
    watchImages,
    originImages,
    optimizeImages,
};
