import {dest, src} from "gulp";
import plumber from "gulp-plumber";
import svgstore from "gulp-svgstore";
import svgmin from "gulp-svgmin";
import {paths} from "../store";
import notify from 'gulp-notify';

/**
 * Компиляция отдельных svg файлов в единый спрайт
 * @see https://github.com/w0rm/gulp-svgstore/
 */

function svgSprites() {
    return src(`${paths.src.svgSprites}/*.svg`)
        .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
        .pipe(
            svgmin({
                plugins: [
                    'cleanupIDs',
                    'removeTitle',
                    'removeComments',
                    'removeDoctype',
                    'removeEmptyContainers',
                    'sortAttrs',
                    {
                        removeViewBox: false
                    },
                ]
            })
        )
        .pipe(svgstore())
        .pipe(dest(paths.build.svgSprites));
}

export {
    svgSprites,
};
