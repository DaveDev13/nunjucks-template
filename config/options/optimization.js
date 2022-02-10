/**
 * Конфигурация для оптимизации javascript
 * так же смотрите файл webpack/production.js
 * @see https://webpack.js.org/configuration/optimization
 */

export const optimization = {
    splitChunks: {
        chunks: 'all',
        cacheGroups: {
            default: false,
            defaultVendors: false,
            vendors: {
                minSize: 0,
                chunks: 'all',
                name: 'vendors',
                enforce: true,
                test: /[\\/]node_modules[\\/]/i,
                // разделение файлов импорта на отдельные куски
                // name(module) {
                //     // получает имя, то есть node_modules/packageName/not/this/part.js
                //     // или node_modules/packageName
                //     const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

                //     // имена npm-пакетов можно, не опасаясь проблем, использовать
                //     // в URL, но некоторые серверы не любят символы наподобие @
                //     return `import-${packageName.replace('@', '')}`;
                // },
            },
        },
    },
};
