import {src, dest} from 'gulp';
import {isDev, paths} from '../store';
import webpackStream from 'webpack-stream';
import webpack from 'webpack';
import named from 'vinyl-named';
import development from '../webpack/development';
import production from '../webpack/production';
import {reload} from 'browser-sync';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';

/**
 * Сбор скриптов с помощью webpack
 * Доп конфиг можно посмотреть в папке options и webpack
 * @see https://github.com/shama/webpack-stream
 * @see https://github.com/webpack/webpack
 * @see https://github.com/shama/vinyl-named
 */

function scripts() {
    return src([
        `${paths.src.scripts}/*.*(js|jsx|ts|tsx)`,
        `!${paths.src.scripts}/_*.*(js|jsx|ts|tsx)`,
    ])
        .pipe(named())
        .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
        .pipe(
            webpackStream({
                devtool: isDev() ? 'source-map' : false,
                // watch: isDev(),
                config: isDev()
                    ? development
                    : production,
            }, webpack)
        )
        .pipe(dest(paths.build.scripts))
        .pipe(reload({stream: true}))
}

export {
    scripts,
};
