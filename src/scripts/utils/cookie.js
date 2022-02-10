/**
* Создать куки запись
* @param {string} name Обязательное, название записи
* @param {string} value Обязательное, значение записи
* @param {string} days Обязательное, время для жизни
*/
export const setCookie = (name, value, days) => {
    let expires = '';

    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = `; expires=${date.toUTCString()}`;
    }

    document.cookie = `${name}=${value || ''}${expires}; path=/`;
};

/**
* Получить куки запись
* @param {string} name Обязательное, название записи
*/
export const getCookie = (name) => {
    let nameEQ = `${name}=`;
    let ca = document.cookie.split(';');

    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];

        while (c.charAt(0) === ' ') {
            c = c.substring(1, c.length);
        }

        if (c.indexOf(nameEQ) === 0) {
            return c.substring(nameEQ.length, c.length);
        }
    }

    return null;
};

/**
* Удалить куки запись
* @param {string} name Обязательное, название записи
*/
export const eraseCookie = (name) => {
    document.cookie = `${name}=; Max-Age=-99999999;`;
};
