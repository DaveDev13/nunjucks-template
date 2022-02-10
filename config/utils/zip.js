import {dest, src} from 'gulp';
import gulpZip from 'gulp-zip';
import {cwd, paths} from '../store';

const correctNumber = number => number < 10 ? '0' + number : number;

const getDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = correctNumber(now.getMonth() + 1);
    const day = correctNumber(now.getDate());
    const hours = correctNumber(now.getHours());
    const minutes = correctNumber(now.getMinutes());

    return `${year}-${month}-${day}-${hours}_${minutes}`;
};

/**
 * Архивация билда в зип
 * @see https://www.npmjs.com/package/gulp-zip
 */

function zip() {
    const zipName = `build-${getDateTime()}.zip`;

    return src([`${paths.build.base}/**/*`, `!${paths.build.base}/*.zip`])
        .pipe(gulpZip(zipName))
        .pipe(dest(cwd));
}

export {
    zip,
};
