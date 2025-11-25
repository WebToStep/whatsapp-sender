// ...existing code...
/* eslint-disable no-console */
/* eslint-disable linebreak-style */
window.addEventListener('DOMContentLoaded', () => {
  const main = document.getElementsByTagName('main')[0];
  const input = document.getElementsByTagName('input')[0];
  const selector = document.querySelector('.iti__selected-dial-code');
  const favorite = document.querySelector('#favorite');
  const menu = document.querySelector('.menu-main');
  const BurgerIcon = document.querySelector('#header__icon');
  const siteCache = document.querySelector('#site-cache');
  const a = menu ? menu.querySelectorAll('a') : [];

  /**
   * sanitizeNumber
   * Убирает пробелы, скобки, тире и знак плюс из строки.
   * Возвращает пустую строку для falsy-значений.
   * @param {string} s
   * @returns {string}
   */
  function sanitizeNumber(s) {
    if (!s) return '';
    return s.replace(/[()\s\-\+]/g, '');
  }

  /**
   * isAN
   * Проверяет, состоит ли значение (после очистки) только из цифр.
   * @param {string} value
   * @returns {boolean}
   */
  function isAN(value) {
    const cleaned = sanitizeNumber(value);
    return /^\d+$/.test(cleaned);
  }

  /**
   * getDigitsFromSelectorAndInput
   * Формирует полную строку (код из селектора + значение input) и возвращает только цифры.
   * @returns {string} только цифры
   */
  function getDigitsFromSelectorAndInput() {
    const code = selector && selector.innerText ? selector.innerText : '';
    const val = input && input.value ? input.value : '';
    const raw = `${code}${val}`;
    return raw.replace(/\D/g, '');
  }

  /**
   * handleDocumentClick
   * Обработчик кликов по документу:
   * - бургер-меню (открыть/закрыть)
   * - закрытие сайдбара по затемнению
   * - добавление в избранное
   * - эффект фокуса поля
   * - отправка в WhatsApp по кнопке
   * @param {MouseEvent} e
   */
  function handleDocumentClick(e) {
    if (e.target === BurgerIcon) {
      e.preventDefault();
      document.body.classList.toggle('with--sidebar');
    }
    if (e.target === siteCache) {
      e.preventDefault();
      document.body.classList.remove('with--sidebar');
    }

    if (e.target === favorite) {
      // Сохранена оригинальная сигнатура вызова (в прошлом коде использовалось add_favorite(this))
      add_favorite(this);
    }

    if (e.target && e.target.className === 'field') {
      main.classList.add('is-focus');
    } else {
      main.classList.remove('is-focus');
    }

    if (e.target && e.target.className === 'btn-submit') {
      e.preventDefault();
      const digits = getDigitsFromSelectorAndInput();
      if (digits) {
        window.open(`https://wa.me/${digits}`);
      }
    }
  }

  /**
   * handleDocumentKeydown
   * Обработчик нажатий клавиш:
   * - Enter / NumpadEnter — отправка, если валидно
   * @param {KeyboardEvent} e
   */
  function handleDocumentKeydown(e) {
    if (e.code === 'Enter' || e.code === 'NumpadEnter') {
      const digits = getDigitsFromSelectorAndInput();
      if (digits) {
        window.open(`https://wa.me/${digits}`);
      } else {
        console.log('empty or invalid number');
      }
    }
  }

  /**
   * handleInputChange
   * Обработчик ввода в поле номера:
   * - убирает пробелы, скобки, тире и плюс
   * - если после очистки остаются нецифровые символы — очищает поле
   * - если длина очищённой части больше 10 цифр — оставляет только последние 10 (удаляет начальные)
   * @param {InputEvent} evt
   */
  function handleInputChange(evt) {
    if (!evt || !evt.target) return;
    const raw = evt.target.value || '';
    // очищаем от пробелов/скобок/тире/плюса
    let cleaned = sanitizeNumber(raw);
    // если после очистки есть символы, не являющиеся цифрами => очищаем (поведение оригинала)
    if (!/^\d*$/.test(cleaned)) {
      input.value = '';
      console.log('invalid characters removed');
      return;
    }
    // если введено более 10 цифр — оставляем последние 10 (удаляем начальные)
    if (cleaned.length > 10) {
      cleaned = cleaned.slice(-10);
    }
    input.value = cleaned;
  }

  /**
   * add_favorite
   * Попытка добавить страницу в закладки (поддерживает старые браузеры).
   * Оставлена совместимость с оригинальным поведением.
   * @param {any} a
   * @returns {boolean}
   */
  function add_favorite(a) {
    const title = document.title;
    const url = document.location;
    try {
      // Internet Explorer
      if (window.external && typeof window.external.AddFavorite === 'function') {
        window.external.AddFavorite(url, title);
        return true;
      }
    } catch (e) {
      // fallthrough
    }
    try {
      // Firefox <23
      if (window.sidebar && typeof window.sidebar.addPanel === 'function') {
        window.sidebar.addPanel(title, url, '');
        return true;
      }
    } catch (e) {
      // fallthrough
    }
    // Opera legacy
    try {
      if (typeof opera === 'object') {
        a.rel = 'sidebar';
        a.title = title;
        a.url = url;
        return true;
      }
    } catch (e) {
      // fallthrough
    }
    // Современные браузеры: подсказка пользователю
    alert('Браузеры Safari и Chrome не поддерживают добавление в избранное через скрипт. Нажмите Ctrl-D чтобы добавить страницу в закладки');
    return false;
  }

  // Регистрация обработчиков
  document.addEventListener('click', handleDocumentClick);
  document.addEventListener('keydown', handleDocumentKeydown);
  if (input) input.addEventListener('input', handleInputChange);

});