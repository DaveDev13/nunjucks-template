import Nunjucks from 'nunjucks';
import path from 'path';
import {config} from '../../config';

/**
 * Глобальные функции для nunjucks
 */

/**
 * Поддержка для
 * @example {{ asset('/assets/images/px.jpg' )}}
 */
const hashRandom = Math.random().toString(36).substring(2, 20) + Math.random().toString(36).substring(2, 20);

function asset(file, hash = hashRandom) {
    const dirname = path.dirname(file);
    const extname = path.extname(file);
    const name = path.basename(file, extname);

    return `${config.html.prefix}${dirname}/${name}.${extname.slice(1)}${hash && Boolean(hash) ? `?${hash}` : ''}`;
}

/**
 * Поддержка для
 * @example {% block title %}...{% endblock %}
 * @example {{block('title')}}
 */
function block(name) {
    let output = '';

    if (name in this.blocks && this.blocks[name].length) {
        this.blocks[name][0](this.env, this.ctx, [], Nunjucks.runtime, function (error, blockContent) {
            output = blockContent || '';
        });
    }

    return output;
}

/**
 * Генератор случайных чисел
 * @example {{ random() }}
 * @example {{ random(10, 20) }}
 */
function random(min, max) {
    min = typeof min !== 'number' ? 0 : min;
    max = typeof max !== 'number' ? Number.MAX_SAFE_INTEGER : max;

    return Math.round(Math.random() * (max - min) + min);
}

export {
    asset,
    block,
    random
}
