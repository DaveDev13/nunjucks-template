import * as bodyScrollLock from 'body-scroll-lock';
import UaParser from 'ninelines-ua-parser';
import $ from 'jquery';

const $html = $(document.documentElement);
let winWidth = window.innerWidth;
let helpers = {
    parser: UaParser(),
    $document: $(document),
    $window: $(window),
    isIE: () => helpers.parser?.browser?.name,
    isDevices: () => helpers.parser?.device?.type,
};

/**
* Очистить текст от спецсимволов
* @param {string} text Обязательное, строка для очистки
* @returns {string} Очищенная строка
*/
export const clearText = (text) => {
    return text.trim().replace(/\s+/g, ' ');
};

let dataScrollLocks;
/**
* Блокирует скролл страницы
* Необходим для использования модальных окон
* @param {boolean} state Обязательное
* @param {string} element Обязательное, элемент которому нужно разрешить скролл
* @param {string} name Необязательное, ключ,
* чтобы была возможность открывать окно поверх другого окна
*/
helpers.lockScroll = (state, $element, name) => {
    const element = $element.get(0) ? $element.get(0) : $element;

    if (typeof dataScrollLocks === 'undefined') {
        dataScrollLocks = new Set();
    }

    let scrollLocks = dataScrollLocks;

    if (state) {
        if (typeof name === 'string') {
            scrollLocks.add(name);
        }

        bodyScrollLock.disableBodyScroll(element, {
            reserveScrollBarGap: true,
        });

        setImmediate(() => {
            $html.addClass('is-lock-scroll');
        });
    } else {
        if (typeof name === 'string') {
            scrollLocks.delete(name);
        }

        bodyScrollLock.enableBodyScroll(element);

        if (!scrollLocks.size) {
            bodyScrollLock.clearAllBodyScrollLocks();

            $html.removeClass('is-lock-scroll');
        }
    }
};

/**
* Скролл до элемента
* @param {string} $container Обязательное, элемент к которому нужно скроллить
* @param {string|number} time Необязательное, время скролла
* @param {string|number} offset Необязательное, смещение скролла может быть + или -
*/
helpers.scrollTo = ($container, time = 500, offset = 0) => {
    $html.css('scroll-behavior', 'initial');

    $('html, body').stop().animate({
        scrollTop: `${$container.offset().top + parseInt(offset, 10)}`,
    }, parseInt(time, 10));

    setTimeout(() => {
        $html.css('scroll-behavior', '');
    }, parseInt(time, 10) + 100);
};

let scrollDiv;
/**
* Получить размер скроллбара если он есть
* @returns {number} размер скроллбара
*/
helpers.getScrollbarWidth = () => {
    const width = window.innerWidth - $html.get(0).clientWidth;

    if (width || document.documentElement.clientHeight >= document.documentElement.offsetHeight) {
        return width;
    }

    // Document doesn't have a scrollbar, possibly because there is not enough content so browser doesn't show it
    if (!scrollDiv) {
        scrollDiv = document.createElement('div');
        scrollDiv.style.cssText = 'width:100px;height:100px;overflow:scroll !important;position:absolute;top:-9999px';
        document.body.appendChild(scrollDiv);
    }

    return scrollDiv.offsetWidth - scrollDiv.clientWidth;
};

/**
* Узнать есть доступен ли ховер
* @returns {boolean}
*/
function hasHoverSupport() {
    let hoverSupport;

    if (helpers.isIE && helpers.getScrollbarWidth()) {
        // On touch devices scrollbar width is usually 0
        hoverSupport = true;
    } else if (helpers.isDevices()) {
        hoverSupport = false;
    } else if (window.matchMedia('(any-hover: hover)').matches || window.matchMedia('(hover: hover)').matches) {
        hoverSupport = true;
    } else if (window.matchMedia('(hover: none)').matches) {
        hoverSupport = false;
    } else {
        hoverSupport = typeof $html.ontouchstart === 'undefined';
    }

    return hoverSupport;
}

function detectBrowserHover() {
    if (!hasHoverSupport()) {
        $html.removeClass('has-hover').addClass('no-hover');
    } else {
        $html.removeClass('no-hover').addClass('has-hover');
    }
}

detectBrowserHover();

/**
* Переопределение доступности ховера после ресайза окна
* при условии что реально изменилась ширина окна или ориентация на девайсах
*/
helpers.$window.on('resize.helpers', () => {
    setTimeout(() => {
        if (winWidth !== window.innerWidth) {
            // Переопределяем если браузер перестроился под другую платформу
            // актуально в моменты тестирования
            helpers.parser = UaParser();
            helpers.isDevices = () => helpers.parser?.device?.type;

            detectBrowserHover();

            winWidth = window.innerWidth;
        }
    }, 300);
});

export default helpers;
