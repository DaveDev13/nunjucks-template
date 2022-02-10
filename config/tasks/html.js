import fs from 'fs';
import path from 'path';
import {src, dest} from 'gulp';
import nunjucksRender from 'gulp-nunjucks-render';
import inject from 'gulp-inject';
import htmlmin from 'gulp-htmlmin';
import plumber from 'gulp-plumber';
import {reload} from 'browser-sync';
import {isDev, paths} from '../store';
import notify from 'gulp-notify';
import gulpIf from 'gulp-if';
import htmlhint from 'gulp-htmlhint';
import {config} from '../../config';
import * as nunjucksFilters from '../utils/nunjucks-filters';
import * as nunjucksFunctions from '../utils/nunjucks-functions';

/**
 * Сборка html из файлов nunjucks
 * @see https://github.com/carlitoplatanito/gulp-nunjucks-render
 */

function validateJSON(data) {
    let stringData = JSON.stringify(data);

    stringData = stringData.replace(/`/g, '\\"');

    try {
        var data = JSON.parse(stringData);
        return data;
    } catch (e) {
        console.log('JSON is incorrect', e);
        return null;
    }
}

function html() {
    let data = {};

    fs.readdirSync(paths.src.data).map((item) => {
        if (path.extname(item).indexOf('.json') > -1) {
            data = {...data, ...JSON.parse(fs.readFileSync(path.resolve(paths.src.data, item)))};
        }
    });

    return src([
        `${paths.src.html}/pages/**/*.*(njk|html|nunjucks)`,
        `!${paths.src.html}/pages/**/_*.*(njk|html|nunjucks)`,
    ])
        .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
        .pipe(nunjucksRender({
            path: paths.src.html,
            ext: config.html.extname,
            data: validateJSON(data),
            inheritExtension: false,
            envOptions: {
                watch: false,
            },
            manageEnv: (env) => {
                // Filters
                Object.keys(nunjucksFilters).forEach((name) => {
                    if (name.indexOf('esModule') > -1) {
                        return;
                    }

                    env.addFilter(name, nunjucksFilters[name]);
                });

                // Global functions
                Object.keys(nunjucksFunctions).forEach((name) => {
                    if (name.indexOf('esModule') > -1) {
                        return;
                    }

                    env.addGlobal(name, nunjucksFunctions[name]);
                });
            },
            loaders: null
        }))
        .pipe(dest(paths.build.html))
        .pipe(
            gulpIf(config.html.inject.css,
                inject(
                    src(`${paths.build.styles}/**/*.css`, {read: false}), {
                    relative: true,
                    addPrefix: config.html.inject.prefix,
                })
            )
        )
        .pipe(gulpIf(!isDev(), htmlmin({
            collapseWhitespace: true, // удаляем все переносы
            conservativeCollapse: true, // сворачиваем все в 1 строку
            removeComments: true // удаляем все комментарии
        })))
        .pipe(dest(paths.build.html))
        .pipe(reload({stream: true}))
}

/**
 * Проверка html на корректность
 * @see https://www.npmjs.com/package/gulp-htmlhint
 */

function htmlLint() {
    return src([
        `${paths.src.html}/**/*.*(njk|html|nunjucks)`,
        `!${paths.src.html}/**/_*.*(njk|html|nunjucks)`,
    ])
        .pipe(htmlhint('.htmlhintrc'))
        .pipe(htmlhint.failAfterError())
}

function htmlInject() {
    return src(`${paths.build.base}/**/*.html`)
        .pipe(
            gulpIf(config.html.inject.css,
                inject(
                    src(`${paths.build.styles}/**/*.css`, {read: false}), {
                    relative: true,
                    addPrefix: config.html.inject.prefix,
                })
            )
        )
        .pipe(gulpIf(!isDev(), htmlmin({
            collapseWhitespace: true, // удаляем все переносы
            removeComments: true // удаляем все комментарии
        })))
        .pipe(dest(paths.build.base))
}

export {
    html,
    htmlLint,
    htmlInject,
}
