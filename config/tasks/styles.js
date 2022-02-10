import {src, dest} from 'gulp';
import {isDev, paths} from '../store';
import dartSass from 'sass';
import sourcemaps from 'gulp-sourcemaps';
import autoprefixer from 'gulp-autoprefixer';
import gulpStylelint from '@ronilaukkarinen/gulp-stylelint';
import gulpif from 'gulp-if';
import gulpSass from 'gulp-sass';
import plumber from 'gulp-plumber';
import hash from 'gulp-hash-filename';
import notify from 'gulp-notify';
import postcss from 'gulp-postcss';

const sass = gulpSass(dartSass);

/**
 * Сбор стилей из файлов scss и css
 * @see https://github.com/dlmanning/gulp-sass
 */

function styles() {
    const contextOptions = {
        modules: true,
    };

    return src([
        `${paths.src.styles}/**/*.*(css|scss)`,
        `!${paths.src.styles}/**/_*.*(css|scss)`,
        // `${paths.src.components}/**/*.*(css|scss)`,
        // `!${paths.src.components}/**/_*.*(css|scss)`,
    ])
        .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
        .pipe(gulpif(isDev(), sourcemaps.init()))
        .pipe(sass.sync({
            includePaths: ['node_modules'],
            outputStyle: isDev() ? 'expanded' : 'compressed',
            sourceComments: isDev(),
        }).on('error', sass.logError))
        .pipe(gulpif(!isDev(), autoprefixer()))
        .pipe(postcss(contextOptions))
        .pipe(gulpif(isDev(), sourcemaps.write()))
        .pipe(gulpif(!isDev(),
            hash({
                "format": "{name}.{hash:20}.{ext}"
            })
        ))
        .pipe(dest(paths.build.styles))
}

function stylesLint() {
    return src([
        `${paths.src.styles}/**/*.*(css|scss)`,
        `!${paths.src.styles}/**/_*.*(css|scss)`,
        `${paths.src.components}/**/*.*(css|scss)`,
        `!${paths.src.components}/**/_*.*(css|scss)`,
    ])
        .pipe(gulpStylelint({
            reporters: [
                {formatter: 'string', console: true}
            ],
            reporterOptions: {verbose: true},
            debug: true,
            fix: true,
            reportOutputDir: 'reports/lint',
        }))
}

export {
    styles,
    stylesLint,
};
