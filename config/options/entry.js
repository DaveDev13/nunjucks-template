import {paths} from '../store';

/**
 * Где webpack собирается начать сборку пакета
 *
 * @see https://webpack.js.org/concepts/entry-points
 */

export const entry = {
    main: `${paths.src.scripts}/main.js`,
};
