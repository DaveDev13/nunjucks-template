import common from './common.js';
import TerserJSPlugin from 'terser-webpack-plugin';
import {optimization} from '../options/optimization.js';

/**
 * Конфигурация для оптимизации javascript
 * так же смотрите файл options/optimization.js
 * @see https://webpack.js.org/configuration/optimization
 */
export default {
    ...common,
    mode: 'production',
    optimization: {
        ...optimization,
        chunkIds: "size",
        moduleIds: "size",
        mangleExports: "size",
        minimize: true,
        nodeEnv: 'production',
        minimizer: [
            new TerserJSPlugin({
                terserOptions: {
                    compress: true,
                    toplevel: true,
                    output: {
                        comments: false,
                    },
                },
                extractComments: false,
            })
        ],
    },
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000,
    },
};
