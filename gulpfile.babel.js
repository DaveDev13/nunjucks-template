import {series, parallel, task} from 'gulp';
import {server} from './config/tasks/server';
import {html, htmlInject, htmlLint} from './config/tasks/html';
import {images, optimizeImages, originImages} from './config/tasks/images';
import {scripts} from './config/tasks/scripts';
import {styles, stylesLint} from './config/tasks/styles';
import {copy} from './config/utils/copy';
import {clean} from './config/utils/clean';
import {fonts, ttfConverter, woff2Converter, woffConverter} from './config/utils/fonts';
import {watcher} from './config/tasks/watcher';
import {svgSprites} from './config/utils/svgSprites';
import {zip} from './config/utils/zip';
import {htaccess, htpasswd, robots} from './config/utils/helpers';

// Перепроверка на существование записи о режиме разработки
function setDev(cb) {
    if (!process.pathsToFiles) {
        process.pathsToFiles = [];
    }
    if (!process.env.NODE_ENV) {
        process.env.NODE_ENV = 'development';
    }

    cb();
}

// Перепроверка на существование записи о режиме разработки
function setProd(cb) {
    if (!process.pathsToFiles) {
        process.pathsToFiles = [];
    }
    if (!process.env.NODE_ENV) {
        process.env.NODE_ENV = 'production';
    }

    cb();
}

// Оптимизация картинок
task('image:optimize', parallel(originImages, optimizeImages));

// Создание импортов скриптов и стилей внутри html файлов
task('html:inject', series(html, htmlInject));

// Линтер для стилей
task('styles:lint', series(stylesLint));

// Линтер для html
task('html:lint', series(htmlLint));

// Удаление htaccess архива из билда
task('del:htaccess', series(htaccess));

// Удаление htpasswd архива из билда
task('del:htpasswd', series(htpasswd));

// Удаление robots архива из билда
task('del:robots', series(robots));

// Удаление htpasswd и robots архива из билда
task('del:extra-files', series(robots, htpasswd));

// Конвертирование шрифтов
task('font:converter', series(ttfConverter, woff2Converter, woffConverter));

// Удаление билда
task('clean', series(clean));

// Создание zip архива из билда
task('zip', series(zip));

// Продакшн версия
task('build',
    series(clean, setProd, styles, svgSprites, copy, fonts, scripts, html)
);

// Девелопер версия
task('dev',
    series(clean, setDev, parallel(styles, images, svgSprites, copy, fonts), series(scripts), series(html))
    // series(clean, setDev, series(html))
);

// Дефолтная версия для разработки
task('default',
    series('dev',
        parallel(server, watcher)
    )
);
