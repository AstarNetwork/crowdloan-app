import { createI18n } from 'vue-i18n';

const numberFormats = {
  'en-US': {
    decimal: {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }
  }
};

const i18n = createI18n({
  locale: 'en-US',
  numberFormats
});

export { i18n };
