/* global process */

/*
 * Фильтры для nunjucks
 */

/**
 * @see: https://mozilla.github.io/nunjucks/templating.html#slice
 */
function arraySlice(data, start, length) {
    // JS array slice is [start, end]
    return data.slice(start, start + length);
}


/**
 * nunjucks фильт слияния
 */
function merge(dataA, dataB) {
    if (Array.isArray(dataA)) {
        return [].concat(dataA).concat(dataB);
    } else {
        return Object.assign({}, dataA, dataB);
    }
}


/**
 * nunjucks фильтр разделения
 * не поддерживает ограничения
 */
function split(data, delimiter) {
    return String(data).split(delimiter || '');
}


/**
 * JSON encode
 */
function jsonEncode(data) {
    return JSON.stringify(data);
}

/**
 * Keys
 */
function keys(data) {
    return Object.keys(data);
}

/**
 * Аналогично фильтру "dump" выводит данные в консоль браузера
 * @example {{ data | console | safe }}
 */
function console(data) {
    return '<script>console.log(' + JSON.stringify(data) + ')</script>';
}

/**
 * Lodash omit
 * В nunjucks нет фильтра с такой функциональностью
 */
function omit(data, keys) {
    const output = {};

    for (let key in data) {
        if (keys.indexOf(key) === -1) {
            output[key] = data[key];
        }
    }

    return output;
}

/**
 * Lodash pick
 * В nunjucks нет фильтра с такой функциональностью
 */
function pick(data, keys) {
    const output = {};

    for (let key in data) {
        if (keys.indexOf(key) !== -1) {
            output[key] = data[key];
        }
    }

    return output;
}

/**
 *
 * В nunjucks нет фильтра с такой функциональностью
 * экранирует шаблонные строки (${}) в старый формат js кода,
 * потому что в nunjucks пока нет такой поддержки
 * @example {{ 'Changelog for ${project.name}' | format }}
 */
function format(data) {
    return (new Function('with (this) { return `' + data + '` }')).call(this.ctx);
}

/**
 * Проверка значения
 */
function isString(string) {
    return typeof string === 'string';
}

export {
    arraySlice,
    merge,
    split,
    jsonEncode,
    keys,
    console,
    omit,
    pick,
    format,
    isString,
}
