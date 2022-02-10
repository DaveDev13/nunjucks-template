/**
* Модуль "Актуальный год"
*/
export const actualYear = () => {
    const year = new Date().getFullYear();

    if (document.querySelector('[data-actual-year]')) {
        document.querySelectorAll('[data-actual-year]').forEach((item) => {
            item.textContent = year;
        });
    }
};
