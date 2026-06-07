/**
 * SPDX-License-Identifier: Apache-2.0
 */

import { MangoVariety } from './types';

// Let's use the actual file paths where the generated images were saved.
export const mangoVarieties: MangoVariety[] = [
  {
    id: 'sindhri',
    name: {
      en: 'Sindhri Mango',
      ur: 'سندھڑی آم',
      ar: 'مانجو سندهري'
    },
    flavorProfile: {
      en: 'Extremely sweet, absolute premium thickness, completely fibreless pulp with a stunning golden color.',
      ur: 'شدید میٹھا، ریشہ کے بغیر ملائم گودا جو سنہرے چمکدار رنگ کے ساتھ لاجواب ذائقہ دیتا ہے۔',
      ar: 'حلو المذاق تماماً، لب ناعم خالٍ من الألياف بلون ذهبي أخّاذ ونسيج فاخر.'
    },
    season: {
      en: 'Mid May to late June',
      ur: 'وسط مئی سے آخر جون',
      ar: 'من منتصف مايو إلى أواخر يونيو'
    },
    packaging: {
      en: '5 KG sturdy carton box, customized partitions, anti-bruise sheets',
      ur: '5 کلو گرام کا مضبوط کارٹن ڈبہ، مخصوص فارم اور حفاظتی شیٹس',
      ar: 'كرتون قوي بوزن 5 كجم، مع فواصل مخصصة وحواجز لمنع الارتطام'
    },
    image: 'https://www.mangonation.pk/wp-content/uploads/2020/05/export-quality-premium-sindhri-mangoes-shop-online-pakistan-ws-2.jpg',
    grade: {
      en: 'Primary Export Quality Grade A+',
      ur: 'پرائمری ایکسپورٹ کوالٹی گریڈ A+',
      ar: 'جودة تصدير نخب أول درجة ممتاز A+'
    }
  },
  {
    id: 'anwar_ratol',
    name: {
      en: 'Anwar Ratol',
      ur: 'انور رٹول آم',
      ar: 'مانجو أنوار راتول'
    },
    flavorProfile: {
      en: 'Small-sized powerhouse of fragrance, unmatched rich honeyed sweetness and thin elegant seed.',
      ur: 'چھوٹا سائز لیکن خوشبو اور مٹھاس کا بے مثال خزانہ، انتہائی لذیذ اور پتلی گٹھلی۔',
      ar: 'حجم صغير ممتلئ، رائحة نفاذة وحلاوة عسلية غنية لا تقارن مع نواة رقيقة.'
    },
    season: {
      en: 'Mid June to mid July',
      ur: 'وسط جون سے وسط جولائی',
      ar: 'من منتصف يونيو إلى منتصف يوليو'
    },
    packaging: {
      en: '5 KG customized export box, double cushioned',
      ur: '5 کلو گرام کا مخصوص برآمدی ڈبہ، اضافی کشن پیکنگ',
      ar: 'كرتون وزن 5 كجم مخصص للتصدير، مع تبطين مزدوج'
    },
    image: '/src/assets/images/anwar_ratol_1780756824237.png',
    grade: {
      en: 'Luxury Selected Export Variant',
      ur: 'لگژری سلیکٹڈ ایکسپورٹ ویرینٹ',
      ar: 'درجة تصدير فاخرة ومختارة بعناية'
    }
  },
  {
    id: 'chaunsa',
    name: {
      en: 'Honey Chaunsa',
      ur: 'چونسہ آم (شہد کی مٹھاس)',
      ar: 'المانجو الشونسي العسلي'
    },
    flavorProfile: {
      en: 'The world-famous honey-nectar variety. Exceptionally sweet, succulent, highly coveted in Middle East markets.',
      ur: 'دنیا کا مشہور ترین آم، شہد جیسی مٹھاس اور رس، مڈل ایسٹ مارکیٹس کا پسندیدہ ترین پھل۔',
      ar: 'النوع العسلي الأكثر شهرة عالمياً. حلو للغاية ومليء بالعصارة اللذيذة ولطالما حظي بطلب هائل بالخليج.'
    },
    season: {
      en: 'Late June to late August',
      ur: 'آخر جون سے آخر اگست',
      ar: 'من أواخر يونيو إلى أواخر أغسطس'
    },
    packaging: {
      en: '5 KG export grade carton, customized sizing alignment',
      ur: '5 کلو برآمدی گریڈ کارٹن، سائز کے مطابق پینل پیکنگ',
      ar: 'كرتون تصدير متين وزن 5 كجم، مع تصنيف دقيق للأحجام'
    },
    image: '/src/assets/images/chaunsa_mango_1780756841933.png',
    grade: {
      en: 'Double Selected Premium Export Grade',
      ur: 'ڈبل سلیکٹڈ پریمیم ایکسپورٹ گریڈ',
      ar: 'درجة تصدير ممتازة من الفرز والانتخاب المزدوج'
    }
  }
];

export const targetDestinations = [
  { name: { en: 'United Arab Emirates', ur: 'متحدہ عرب امارات', ar: 'الإمارات العربية المتحدة' }, flag: '🇦🇪', ports: { en: 'Dubai Al Aweer, Abu Dhabi Ports', ur: 'العویر مارکیٹ دبئی، ابوظہبی', ar: 'سوق العوير بدبي، موانئ أبوظبي' } },
  { name: { en: 'Saudi Arabia', ur: 'سعودی عرب', ar: 'المملكة العربية السعودية' }, flag: '🇸🇦', ports: { en: 'Riyadh, Jeddah, Dammam', ur: 'ریاض، جدہ، دمام', ar: 'مطار الرياض، مطار جدة، الدمام' } },
  { name: { en: 'Qatar', ur: 'قطر', ar: 'دولة قطر' }, flag: '🇶🇦', ports: { en: 'Doha Hamad Cargo Terminal', ur: 'دوحہ حمد کارگو ٹرمینل', ar: 'مطار حمد الدولي بالدوحة' } },
  { name: { en: 'Kuwait', ur: 'کویت', ar: 'دولة الكويت' }, flag: '🇰🇼', ports: { en: 'Kuwait City Air Terminal', ur: 'کویت ایئر ٹرمینل', ar: 'مطار الكويت الدولي' } },
  { name: { en: 'Oman', ur: 'عمان', ar: 'سلطنة عمان' }, flag: '🇴🇲', ports: { en: 'Muscat Cargo Gateway', ur: 'مسقط کارگو گیٹ وے', ar: 'مطار مسقط الدولي' } },
  { name: { en: 'Bahrain', ur: 'بحرین', ar: 'مملكة البحرين' }, flag: '🇧🇭', ports: { en: 'Manama Logistics Zone', ur: 'منامہ لاجسٹکس زون', ar: 'منطقة المنامة اللوجستية' } }
];
