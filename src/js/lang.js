document.addEventListener('DOMContentLoaded', function() {
  // Инициализация языкового переключателя
  const langSwitcher = {
    elements: {
      container: document.querySelector('.lang-switcher'),
      current: document.getElementById('language_switcher'),
      dropdown: document.querySelector('.lang-switcher__dropdown'),
      flag: document.querySelector('[data-lang-flag]'),
      currentText: document.querySelector('[data-translate="current_lang"]')
    },

    init() {
      this.loadLanguage();
      this.addEventListeners();
    },

    async loadLanguage() {
      const savedLang = localStorage.getItem('language') || 'en';
      await this.setLanguage(savedLang);
    },

    async setLanguage(lang) {
      try {
        // Загрузка переводов
        const response = await fetch(`public/lang/${lang}.json`);
        const translations = await response.json();
        
        // Обновление контента
        this.updateTranslations(translations);
        this.updateSwitcher(lang);
        localStorage.setItem('language', lang);

      } catch (error) {
        console.error('Error changing language:', error);
        if (lang !== 'en') this.setLanguage('en');
      }
    },

    updateTranslations(translations) {
      // Обновление всех элементов с data-translate
      Object.entries(translations).forEach(([key, value]) => {
        document.querySelectorAll(`[data-translate="${key}"]`).forEach(el => {
          el.textContent = value;
        });
      });
    },


    updateSwitcher(lang) {
      // Обновление текущего языка в переключателе
      const target = document.querySelector(`[data-lang="${lang}"]`);
      if (target) {
        const img = target.querySelector('img');
        this.elements.flag.src = img.src;
        this.elements.flag.alt = img.alt;
        this.elements.currentText.textContent = 
          target.querySelector('[data-translate]').textContent;
      }
    },

    addEventListeners() {
      // Клик по текущему языку
      this.elements.current.addEventListener('click', (e) => {
        e.stopPropagation();
        this.elements.dropdown.classList.toggle('a');
      });

      // Выбор языка из списка
      document.querySelectorAll('[data-lang]').forEach(item => {
        item.addEventListener('click', (e) => {
          e.preventDefault();
          const lang = e.currentTarget.dataset.lang;
          this.setLanguage(lang);
          this.elements.dropdown.classList.remove('a');
        });
      });

      // Закрытие при клике вне области
      document.addEventListener('click', (e) => {
        if (!this.elements.container.contains(e.target)) {
          this.elements.dropdown.classList.remove('a');
        }
      });
    }
  };

  langSwitcher.init();
});