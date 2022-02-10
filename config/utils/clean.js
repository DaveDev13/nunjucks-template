import del from "del";
import {paths} from "../store";

/**
 * Удаление файлов из папки
 */

function clean() {
    console.log(`Папка ${paths.clean} была очищена`);
    return del(paths.clean);
}

export {
    clean,
};
