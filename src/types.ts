/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Language = 'en' | 'ur' | 'ar';

export interface MangoVariety {
  id: string;
  name: {
    en: string;
    ur: string;
    ar: string;
  };
  flavorProfile: {
    en: string;
    ur: string;
    ar: string;
  };
  season: {
    en: string;
    ur: string;
    ar: string;
  };
  packaging: {
    en: string;
    ur: string;
    ar: string;
  };
  image: string;
  grade: {
    en: string;
    ur: string;
    ar: string;
  };
}

export interface InquiryFormData {
  name: string;
  company: string;
  country: string;
  email: string;
  phone: string;
  variety: string;
  quantity: string;
  message: string;
}
