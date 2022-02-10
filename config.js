export const config = {
    html: {
        extname: '.html', // итоговое расширение файла
        prefix: '.', // . или .. - слеш ставить не нужно
        inject: {
            css: true, // нужно ли записывать ссылку на файлы стилей динамически
            js: true, // нужно ли записывать ссылку на файлы скриптов динамически
        }
    },
    server: {
        spa: false, // вхключение spa режима
        cors: true, // обходить cors ошибки при запросах
        open: true, // открывать ли страницу в браузере при старте
        tunnel: "nunjucks", // нужен ли онлайн путь до локальной сборки
    },
    images: {
        optimize: true, // нужно ли оптимизировать картинки в production версии
        components: {
            /**
             * название путей папок находящихся в компонентах которые можно обрезать
             * @example components/home/images/filename -> images/home/filename
            */
            paths: ['img', 'images', 'assets'],
        },
        webpOptions: { // настройки для webp (squoosh)
            lossless: true,
            segments: 3,
            quality: 85,
        },
        mozJpegOptions: { // настройки для jpeg (squoosh)
            progressive: true,
            quality: 85,
        },
        oxiPngOptions: { // настройки для png (squoosh)
        },
        gifOptions: { // настройки для gif (imagemin)
            interlaced: true,
            optimizationLevel: 2,
        },
        svgOptions: { // настройки для svg (imagemin)
            floatPrecision: 5,
            plugins: [
                {optimizationLevel: 3},
                {progessive: true},
                {interlaced: true},
                {removeViewBox: false},
                {removeUselessStrokeAndFill: false},
                {moveElemsAttrsToGroup: true},
                {moveGroupAttrsToElems: true},
                {convertEllipseToCircle: true},
                {removeEmptyContainers: true},
                {removeUnusedNS: true},
                {removeTitle: true},
                {removeDesc: true},
                {removeDimensions: true},
                {cleanupIDs: false}
            ]
        }
    },
};
