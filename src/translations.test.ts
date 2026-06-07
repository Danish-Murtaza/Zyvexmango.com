import { describe, it, expect } from 'vitest';
import { translations } from './translations';
import { Language } from './types';

const LANGUAGES: Language[] = ['en', 'ur', 'ar'];

describe('translations', () => {
  it('should have entries for all supported languages (en, ur, ar)', () => {
    for (const lang of LANGUAGES) {
      expect(translations[lang]).toBeDefined();
      expect(typeof translations[lang]).toBe('object');
    }
  });

  it('should have the same set of keys across all languages', () => {
    const enKeys = Object.keys(translations.en).sort();
    const urKeys = Object.keys(translations.ur).sort();
    const arKeys = Object.keys(translations.ar).sort();

    expect(urKeys).toEqual(enKeys);
    expect(arKeys).toEqual(enKeys);
  });

  it('should not have any empty string values', () => {
    for (const lang of LANGUAGES) {
      const entries = Object.entries(translations[lang]);
      for (const [key, value] of entries) {
        expect(value, `translations.${lang}.${key} is empty`).toBeTruthy();
      }
    }
  });

  it('should contain essential navigation keys', () => {
    const requiredKeys = [
      'home',
      'about',
      'products',
      'exportReach',
      'certifications',
      'contact',
    ];

    for (const lang of LANGUAGES) {
      for (const key of requiredKeys) {
        expect(
          translations[lang][key],
          `Missing "${key}" in ${lang} translations`
        ).toBeDefined();
      }
    }
  });

  it('should contain branding keys', () => {
    const brandKeys = ['brandName', 'brandPvt', 'mangoExportCo', 'slogan'];

    for (const lang of LANGUAGES) {
      for (const key of brandKeys) {
        expect(
          translations[lang][key],
          `Missing "${key}" in ${lang} translations`
        ).toBeDefined();
      }
    }
  });

  it('should contain form-related keys', () => {
    const formKeys = [
      'formName',
      'formCompany',
      'formEmail',
      'formPhone',
      'formCountry',
      'formVariety',
      'formQuantity',
      'formMessage',
      'submitForm',
      'successMsg',
    ];

    for (const lang of LANGUAGES) {
      for (const key of formKeys) {
        expect(
          translations[lang][key],
          `Missing "${key}" in ${lang} translations`
        ).toBeDefined();
      }
    }
  });

  it('should have non-trivial translations (not just copying English)', () => {
    // Urdu and Arabic should differ from English for key fields
    expect(translations.ur.brandName).not.toBe(translations.en.brandName);
    expect(translations.ar.brandName).not.toBe(translations.en.brandName);
    expect(translations.ur.slogan).not.toBe(translations.en.slogan);
    expect(translations.ar.slogan).not.toBe(translations.en.slogan);
  });

  it('should have at least 20 translation keys per language', () => {
    for (const lang of LANGUAGES) {
      const keyCount = Object.keys(translations[lang]).length;
      expect(keyCount).toBeGreaterThanOrEqual(20);
    }
  });
});
