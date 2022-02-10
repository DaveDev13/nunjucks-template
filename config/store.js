import path from 'path';

// Получить режим разработки
export function isDev() {
    if (process.env.NODE_ENV) {
        return process.env.NODE_ENV === 'development';
    }
}

// Получить текущий рабочий каталог
export const cwd = process.cwd();

// Получить пути к проекту
export const paths = {
    // Откуда брать файлы
    src: {
        base      : path.resolve(cwd, 'src'),
        html      : path.resolve(cwd, 'src'),
        data      : path.resolve(cwd, 'src/data'),
        scripts   : path.resolve(cwd, 'src/scripts'),
        styles    : path.resolve(cwd, 'src/styles'),
        components: path.resolve(cwd, 'src/components'),
        fonts     : path.resolve(cwd, 'src/assets/fonts'),
        images    : path.resolve(cwd, 'src/assets/images'),
        static    : path.resolve(cwd, 'src/assets/static'),
        svgSprites: path.resolve(cwd, 'src/assets/svg-sprites'),
    },
    // За чем следить
    watch: {
        base      : path.resolve(cwd, 'src'),
        fonts     : path.resolve(cwd, 'src/assets/fonts/**/*.*'),
        data      : path.resolve(cwd, 'src/data/**/*.*json'),
        images    : [
                        path.resolve(cwd, 'src/assets/images/**/*.*'),
                        path.resolve(cwd, 'src/components/**/*.*(jpg|jpeg|webp|png)'),
                    ],
        svgSprites: path.resolve(cwd, 'src/assets/svg-sprites/*.*svg'),
        html      : [
                        path.resolve(cwd, 'src/data/**/*.*json'),
                        path.resolve(cwd, 'src/**/*.*(njk|html|nunjucks)'),
                    ],
        scripts   : [
                        path.resolve(cwd, 'src/data/**/*.*json'),
                        path.resolve(cwd, 'src/scripts/**/*.*(js|jsx|ts|tsx)'),
                        path.resolve(cwd, 'src/components/**/*.*(js|jsx|ts|tsx)'),
                    ],
        styles    : [
                        path.resolve(cwd, 'src/styles/**/*.*(css|scss)'),
                        path.resolve(cwd, 'src/components/**/*.*(css|scss)'),
                    ],
        static    : [
                        path.resolve(cwd, 'src/assets/static/**/.*'),
                        path.resolve(cwd, 'src/assets/static/**/*.*'),
                    ],
    },
    // Куда положить
    build: {
        base        : path.resolve(cwd, 'build'),
        html        : path.resolve(cwd, 'build'),
        static      : path.resolve(cwd, 'build'),
        data        : path.resolve(cwd, 'build/data'),
        scripts     : path.resolve(cwd, 'build/scripts'),
        styles      : path.resolve(cwd, 'build/styles'),
        fonts       : path.resolve(cwd, 'build/assets/fonts'),
        images      : path.resolve(cwd, 'build/assets/images'),
        svgSprites  : path.resolve(cwd, 'build/assets/svg-sprites'),
        imagesOrigin: path.resolve(cwd, 'build/assets/images/origin'),
    },
    // Что почистить
    clean: path.resolve(cwd, './build')
};
