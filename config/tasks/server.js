import {create as browserSync} from 'browser-sync';
import {config} from '../../config';
import history from 'connect-history-api-fallback';
import {cwd, paths} from '../store';

const bs = browserSync('server');

/**
 * Виртуальный веб-сервер
 * @see https://browsersync.io/
 */

function server() {
    let middleware = [];

    if (config.server.spa) {
        middleware.push(
            history({
                verbose: true,
            })
        );
    }

    bs.init({
        cwd: cwd,
        logPrefix: "Nunjucks templator",
        files: paths.build.base,
        server: {
            baseDir: paths.build.base,
            middleware,
        },
        tunnel: config.server.tunnel,
        open: config.server.open,
        cors: config.server.cors,
    });
}

export {
    server,
};
