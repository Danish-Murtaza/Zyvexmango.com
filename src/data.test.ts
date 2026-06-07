import { describe, it, expect } from 'vitest';
import { mangoVarieties, targetDestinations } from './data';

describe('mangoVarieties', () => {
  it('should contain exactly 3 mango varieties', () => {
    expect(mangoVarieties).toHaveLength(3);
  });

  it('should have unique IDs for each variety', () => {
    const ids = mangoVarieties.map(v => v.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('should include sindhri, anwar_ratol, and chaunsa', () => {
    const ids = mangoVarieties.map(v => v.id);
    expect(ids).toContain('sindhri');
    expect(ids).toContain('anwar_ratol');
    expect(ids).toContain('chaunsa');
  });

  it('should have all required localized fields for each variety', () => {
    const languages = ['en', 'ur', 'ar'] as const;

    for (const variety of mangoVarieties) {
      expect(variety.id).toBeTruthy();
      expect(variety.image).toBeTruthy();

      for (const lang of languages) {
        expect(variety.name[lang]).toBeTruthy();
        expect(variety.flavorProfile[lang]).toBeTruthy();
        expect(variety.season[lang]).toBeTruthy();
        expect(variety.packaging[lang]).toBeTruthy();
        expect(variety.grade[lang]).toBeTruthy();
      }
    }
  });

  it('should have non-empty image URLs for each variety', () => {
    for (const variety of mangoVarieties) {
      expect(variety.image.length).toBeGreaterThan(0);
      expect(
        variety.image.startsWith('http') || variety.image.startsWith('/')
      ).toBe(true);
    }
  });

  it('should mention packaging weight of 5 KG in English packaging info', () => {
    for (const variety of mangoVarieties) {
      expect(variety.packaging.en.toLowerCase()).toContain('5 kg');
    }
  });
});

describe('targetDestinations', () => {
  it('should contain 6 destinations', () => {
    expect(targetDestinations).toHaveLength(6);
  });

  it('should include UAE, Saudi Arabia, Qatar, Kuwait, Oman, and Bahrain', () => {
    const names = targetDestinations.map(d => d.name.en);
    expect(names).toContain('United Arab Emirates');
    expect(names).toContain('Saudi Arabia');
    expect(names).toContain('Qatar');
    expect(names).toContain('Kuwait');
    expect(names).toContain('Oman');
    expect(names).toContain('Bahrain');
  });

  it('should have flag emoji for each destination', () => {
    for (const dest of targetDestinations) {
      expect(dest.flag).toBeTruthy();
      expect(dest.flag.length).toBeGreaterThan(0);
    }
  });

  it('should have localized name and ports for all 3 languages', () => {
    const languages = ['en', 'ur', 'ar'] as const;

    for (const dest of targetDestinations) {
      for (const lang of languages) {
        expect(dest.name[lang]).toBeTruthy();
        expect(dest.ports[lang]).toBeTruthy();
      }
    }
  });

  it('should have unique flags for each destination', () => {
    const flags = targetDestinations.map(d => d.flag);
    expect(new Set(flags).size).toBe(flags.length);
  });
});
