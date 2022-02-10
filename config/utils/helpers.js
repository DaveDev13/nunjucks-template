import del from "del";
import {paths} from "../store";

/**
 * Удаление файлов из папки
 */

function htaccess() {
    if (!process.argv.htaccess) {
        console.log(`Файл: htaccess был удален из папки ${paths.build.base}`);
        return del([`${paths.build.base}/.htaccess`]);
    } else {
        return Promise.resolve();
    }
}

function htpasswd() {
    if (!process.argv.htpasswd) {
        console.log(`Файл: htpasswd был удален из папки ${paths.build.base}`);
        return del([`${paths.build.base}/.htpasswd`]);
    } else {
        return Promise.resolve();
    }
}

function robots() {
    if (!process.argv.robots) {
        console.log(`Файл: robots.txt был удален из папки ${paths.build.base}`);
        return del([`${paths.build.base}/robots.txt`]);
    } else {
        return Promise.resolve();
    }
}

export {
    htaccess,
    htpasswd,
    robots,
};
