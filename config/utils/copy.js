import {dest, src} from "gulp";
import plumber from "gulp-plumber";
import notify from "gulp-notify";
import {paths} from "../store";

/**
 * Копирование статических файлов
 */

function copy() {
    return src(`${paths.src.static}/**/*.*`, {
        dot: true,
    })
        .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
        .pipe(dest(paths.build.static));
}

export {
    copy,
};
