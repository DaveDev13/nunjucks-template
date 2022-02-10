import fs from "fs";
import {dest, series, src} from "gulp";
import gulpIf from "gulp-if";
import fonter from 'gulp-fonter';
import notify from 'gulp-notify';
import plumber from "gulp-plumber";
import ttf2woff from 'gulp-ttf2woff';
import ttf2woff2 from 'gulp-ttf2woff2';
import {paths} from "../store";

/**
 * Woff2 конвертер
 * @see https://npmjs.org/package/gulp-ttf2woff2
 */

function woff2Converter() {
    return src(`${paths.src.fonts}/**/*.ttf`)
        .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
        .pipe(ttf2woff2())
        .pipe(dest(paths.src.fonts));
}

/**
 * Woff конвертер
 * @see https://npmjs.org/package/gulp-ttf2woff
 */

function woffConverter() {
    return src(`${paths.src.fonts}/**/*.ttf`)
        .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
        .pipe(ttf2woff())
        .pipe(dest(paths.src.fonts));
}

/**
 * Otf в ttf конвертер
 * @see https://github.com/Mazgrze/gulp-fonter
 */

function ttfConverter() {
    return src(`${paths.src.fonts}/**/*.*(otf|svg|eot)`)
        .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
        .pipe(fonter({
            formats: ['ttf']
        }))
        .pipe(dest(paths.src.fonts));
}

/**
 * Перенос шрифтов
 */

function fonts() {
    let message = '';
    // попробовать https://medium.com/shopback-tech-blog/https-medium-com-shopback-engineering-construct-gulp-series-tasks-dynamically-db744b923229#:~:text=How%20to%20custom%20the%20dynamical%20function%20name
    fs.readdirSync(paths.src.fonts).map((item) => {
        if (item.indexOf('.woff') < 1) {
            new Promise((resolve) => {
                series(woff2Converter, woffConverter, ttfConverter, (cb) => {
                    message = 'Похоже кто-то забыл сделать правильные шрифты, но я позаботился об этом! :)';
                    console.debug('Похоже кто-то забыл сделать правильные шрифты, но я позаботился об этом! :)');
                    resolve(cb);
                });
            });
        }
    });

    return src(`${paths.src.fonts}/**/*.*(woff|woff2)`)
        .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
        .pipe(gulpIf(message.length > 1, notify({message, onLast: true})))
        .pipe(dest(paths.build.fonts));
}

export {
    fonts,
    ttfConverter,
    woffConverter,
    woff2Converter,
};
