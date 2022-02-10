import {isDev, paths} from '../store';

/**
 * Где webpack выводит assets и bundles
 *
 * @see https://webpack.js.org/concepts/output
 */

export const output = {
    path: paths.build.scripts,
    filename: isDev() ? '[name].js' : '[name].[contenthash].js',
    chunkFilename: isDev() ? '[name].js' : '[name].[contenthash].js',
    crossOriginLoading: 'anonymous',
    module: true,
    environment: {
        arrowFunction: true,
        bigIntLiteral: false,
        const: true,
        destructuring: true,
        dynamicImport: false,
        forOf: true
    }
};
