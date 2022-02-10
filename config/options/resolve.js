import {paths} from '../store';

/**
 * Эти параметры изменяют способ разрешения модулей
 *
 * @see https://webpack.js.org/configuration/resolve
 */

export const resolve = {
    alias: {
        '@': paths.src.scripts,
        '@scripts': paths.src.scripts,
        '@components': paths.src.components,
    },
    extensions: ['.js', '.jsx', '.json'],
    modules: [paths.src.base, 'node_modules', paths.src.components],
    roots: [paths.src.base, paths.src.scripts, paths.src.components],
    preferAbsolute: true,
    preferRelative: true,
};
