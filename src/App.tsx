/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Globe, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Truck, 
  Languages, 
  FileText, 
  ExternalLink,
  ChevronRight,
  Flame,
  Award,
  ThermometerSnowflake,
  Boxes,
  HelpCircle
} from 'lucide-react';
import { Language, InquiryFormData } from './types';
import { translations } from './translations';
import { mangoVarieties, targetDestinations } from './data';

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const [activeTab, setActiveTab] = useState<'all' | 'sindhri' | 'anwar_ratol' | 'chaunsa'>('all');
  const [inquiries, setInquiries] = useState<InquiryFormData[]>([]);
  const [showInquiryHist, setShowInquiryHist] = useState(false);
  const [boxDetailMode, setBoxDetailMode] = useState<'gold' | 'green'>('gold');
  
  // Importer Form State
  const [formData, setFormData] = useState<InquiryFormData>({
    name: '',
    company: '',
    country: 'United Arab Emirates',
    email: '',
    phone: '',
    variety: 'all',
    quantity: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Focus effect for RequestQuote CTA
  const formRef = useRef<HTMLDivElement>(null);

  // Sync saved inquiry logs from localStorage so buyers can actually track their requests!
  useEffect(() => {
    const saved = localStorage.getItem('zyvex_inquiries');
    if (saved) {
      try {
        setInquiries(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const t = (key: string): string => {
    return translations[lang][key] || key;
  };

  const handleLangChange = (newLang: Language) => {
    setLang(newLang);
    // Persist document direction for RTL support (Arabic / Urdu)
    if (newLang === 'ar' || newLang === 'ur') {
      document.documentElement.dir = 'rtl';
      document.documentElement.className = `lang-${newLang}`;
    } else {
      document.documentElement.dir = 'ltr';
      document.documentElement.className = '';
    }
  };

  const scrollToInquiry = (varietyId?: string) => {
    if (varietyId) {
      setFormData(prev => ({ ...prev, variety: varietyId }));
    }
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.company || !formData.email || !formData.phone) {
      return;
    }

    const updatedInquiries = [formData, ...inquiries];
    setInquiries(updatedInquiries);
    localStorage.setItem('zyvex_inquiries', JSON.stringify(updatedInquiries));
    setIsSubmitted(true);
  };

  // WhatsApp formatted linker
  const getWhatsAppLink = (directText?: string) => {
    const phoneNum = '923006872012';
    let text = '';
    
    if (directText) {
      text = encodeURIComponent(directText);
    } else {
      text = encodeURIComponent(
        `*ZYVEX MANGO EXPORT INQUIRY*\n` +
        `-----------------------------------\n` +
        `👤 *Name:* ${formData.name}\n` +
        `🏢 *Company:* ${formData.company}\n` +
        `🌍 *Country:* ${formData.country}\n` +
        `📧 *Email:* ${formData.email}\n` +
        `📱 *WhatsApp:* ${formData.phone}\n` +
        `🥭 *Variety Preferred:* ${formData.variety.toUpperCase()}\n` +
        `📦 *Target Qty Required:* ${formData.quantity || 'Not specified'}\n` +
        `💬 *Message:* ${formData.message || 'Interested in C&F Air Pricing list.'}`
      );
    }
    return `https://wa.me/${phoneNum}?text=${text}`;
  };

  const resetForm = () => {
    setFormData({
      name: '',
      company: '',
      country: 'United Arab Emirates',
      email: '',
      phone: '',
      variety: 'all',
      quantity: '',
      message: ''
    });
    setIsSubmitted(false);
  };

  // Switch RTL alignment rules easily
  const isRTL = lang === 'ar' || lang === 'ur';

  return (
    <div className={`min-h-screen bg-forest-950 text-gray-100 ${isRTL ? 'lang-' + lang : ''}`}>
      
      {/* 1. TOP UTILITY BAR (Pakistan 🇵🇰 to UAE/Gulf 🇦🇪 direct route visual indicator) */}
      <div id="top-bar" className="bg-[#051107] border-b border-gold-800/30 text-xs py-2 px-4 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
          
          <div className="flex items-center gap-4 text-gold-400 font-sans tracking-wide">
            <span className="flex items-center gap-1.5 direction-ltr">
              <Phone className="w-3 px-0 text-gold-300" />
              <span>+92 300 6872012</span>
            </span>
            <span className="h-3 w-px bg-gold-900 hidden sm:inline" />
            <span className="flex items-center gap-1.5">
              <Mail className="w-3.5 pl-0.5 text-gold-300" />
              <span>info@zyvexglobal.com</span>
            </span>
            <span className="h-3 w-px bg-gold-900 hidden sm:inline" />
            <span className="flex items-center gap-1">
              <MapPin className="w-3 text-gold-300" />
              <span>Multan, Pakistan</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden lg:flex items-center gap-1.5 text-gray-400 text-[11px]">
              <span className="inline-block relative">
                🇵🇰
                <span className="absolute -top-1 -right-1 text-[8px] animate-ping text-white">✈️</span>
              </span>
              <span className="text-gold-300">➔</span>
              <span>🇦🇪 🇸🇦 🇶🇦 🇰🇼 🇴🇲 🇧🇭</span>
              <span className="text-gray-500">| {t('airExportOnly')}</span>
            </span>

            {/* Language Switcher */}
            <div className="flex items-center gap-1 bg-forest-900/60 p-0.5 rounded-full border border-gold-800/40">
              <button 
                id="lang-toggle-en"
                onClick={() => handleLangChange('en')}
                className={`px-3 py-1 text-[11px] rounded-full font-medium transition-all ${
                  lang === 'en' 
                    ? 'bg-gold-500 text-forest-950 font-semibold shadow-inner' 
                    : 'text-gray-300 hover:text-gold-400'
                }`}
              >
                English
              </button>
              <button 
                id="lang-toggle-ur"
                onClick={() => handleLangChange('ur')}
                className={`px-3 py-1 text-[11px] rounded-full font-medium transition-all ${
                  lang === 'ur' 
                    ? 'bg-gold-400 text-forest-950 font-semibold shadow-inner' 
                    : 'text-gray-300 hover:text-gold-400'
                }`}
              >
                اردو
              </button>
              <button 
                id="lang-toggle-ar"
                onClick={() => handleLangChange('ar')}
                className={`px-3 py-1 text-[11px] rounded-full font-medium transition-all ${
                  lang === 'ar' 
                    ? 'bg-gold-400 text-forest-950 font-semibold shadow-inner' 
                    : 'text-gray-300 hover:text-gold-400'
                }`}
              >
                عربي
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* 2. MAIN NAV BAR */}
      <header id="main-header" className="sticky top-0 z-50 bg-forest-950/85 backdrop-blur-md border-b border-gold-800/20 py-3 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          
          {/* Elegant Gold Logo Design (Mirroring user's Zyvex labels) */}
          <a href="#hero" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-full border border-gold-400 bg-gradient-to-tr from-forest-950 to-forest-900 flex items-center justify-center shadow-lg group-hover:border-gold-300 transition-all duration-300">
              <span className="text-gold-400 text-lg font-bold font-serif">Z</span>
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="text-xl md:text-2xl font-serif font-semibold tracking-wider text-gold-300 group-hover:text-gold-100 transition-colors uppercase">
                  ZYVEX
                </span>
                <span className="text-[10px] bg-red-800/70 text-white rounded px-1 uppercase font-bold py-0.2 select-none">
                  Export
                </span>
              </div>
              <p className="text-[9px] text-gray-400 uppercase tracking-widest font-sans">
                {t('brandPvt')}
              </p>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 font-sans text-xs uppercase tracking-wider text-gray-300 font-semibold">
            <a href="#hero" className="hover:text-gold-400 transition-colors">{t('home')}</a>
            <a href="#about" className="hover:text-gold-400 transition-colors">{t('about')}</a>
            <a href="#varieties" className="hover:text-gold-400 transition-colors">{t('products')}</a>
            <a href="#shipping" className="hover:text-gold-400 transition-colors">{t('exportReach')}</a>
            <a href="#quality" className="hover:text-gold-400 transition-colors">{t('certifications')}</a>
            <a href="#inquiry-desk" className="hover:text-gold-400 transition-colors">{t('contact')}</a>
          </nav>

          {/* instant quote callout buttons */}
          <div className="flex items-center gap-3">
            <button 
              id="nav-quote-btn"
              onClick={() => scrollToInquiry()}
              className="px-4 py-1.5 md:px-5 md:py-2 text-xs uppercase tracking-wider font-semibold rounded-md border border-gold-400 bg-gradient-to-r from-gold-600 to-gold-500 text-forest-950 hover:from-gold-500 hover:to-gold-400 hover:shadow-lg hover:shadow-gold-500/10 transition-all font-sans"
            >
              {t('requestQuote')}
            </button>
          </div>

        </div>
      </header>

      {/* 3. HERO SECTION (Luxurious Black & Gold + Flying route SVG) */}
      <section id="hero" className="relative overflow-hidden pt-12 pb-20 md:py-24 px-4 md:px-8 border-b border-gold-800/20">
        
        {/* Subtle decorative elements for the "Luxe" background style */}
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-forest-900/40 via-forest-950 to-forest-950 -z-10" />
        <div className="absolute top-1/4 right-5 w-72 h-72 rounded-full bg-gold-500/5 blur-[120px] -z-10 pointer-events-none" />
        <div className="absolute bottom-1/4 left-10 w-96 h-96 rounded-full bg-forest-900/10 blur-[120px] -z-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold-800/50 bg-forest-900/80 w-fit text-xs text-gold-300 font-sans tracking-wide">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-gold-500"></span>
              </span>
              <span>{t('slogan')}</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-tight font-bold text-white tracking-tight">
              Premium Pakistani <br className="hidden md:inline" />
              <span className="luxury-gold-shimmer font-serif italic text-gold-300 block my-1">
                Mango Exports
              </span>
              to UAE & Gulf Markets
            </h1>

            <p className="text-gray-300 text-sm md:text-base leading-relaxed max-w-xl font-sans">
              {t('heroDesc')}
            </p>

            {/* Quick Export Capabilities Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-3">
              <div className="flex items-center gap-2 p-2 rounded border border-gold-800/10 bg-forest-900/30">
                <div id="badge-air-export" className="w-8 h-8 rounded-full bg-gold-500/15 flex items-center justify-center text-gold-300">
                  <Truck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-wide text-white">{t('airExportOnly')}</h4>
                  <p className="text-[9px] text-gray-400 font-sans">Next-Day Fresh</p>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2 rounded border border-gold-800/10 bg-forest-900/30">
                <div id="badge-cold-chain" className="w-8 h-8 rounded-full bg-gold-500/15 flex items-center justify-center text-gold-300">
                  <ThermometerSnowflake className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-wide text-white">Cold Chain</h4>
                  <p className="text-[9px] text-gray-400 font-sans">10°C - 13°C</p>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2 rounded border border-gold-800/10 bg-forest-900/30">
                <div id="badge-organic" className="w-8 h-8 rounded-full bg-gold-500/15 flex items-center justify-center text-gold-300">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-wide text-white">Genuine Grade</h4>
                  <p className="text-[9px] text-gray-400 font-sans">Double Selected</p>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2 rounded border border-gold-800/10 bg-forest-900/30">
                <div id="badge-heat-treated" className="w-8 h-8 rounded-full bg-gold-500/15 flex items-center justify-center text-gold-300">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-wide text-white">HWT Certified</h4>
                  <p className="text-[9px] text-gray-400 font-sans">Import Approved</p>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button 
                id="hero-order-btn"
                onClick={() => scrollToInquiry()}
                className="px-6 py-3 rounded-md bg-gradient-to-r from-gold-600 to-gold-400 hover:from-gold-500 hover:to-gold-300 text-forest-950 font-semibold text-sm transition-all flex items-center gap-2 group shadow-lg shadow-gold-500/10 uppercase tracking-wider font-sans cursor-pointer"
              >
                <span>{t('orderNow')}</span>
                <ArrowRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
              </button>

              <a 
                id="hero-whatsapp-btn"
                href={getWhatsAppLink('Hello Zyvex Trading! I am an importer. I saw your website and would like to request FOB/CNF air cargo pricing for your export mangoes.')}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-all flex items-center gap-2 shadow-lg shadow-emerald-500/10 uppercase tracking-wider font-sans"
              >
                <Phone className="w-4 h-4" />
                <span>{t('whatsAppUs')}</span>
              </a>
            </div>

          </div>

          {/* Hero Right Content (Luxury Banner Image + Animated SVG Route map overlay) */}
          <div className="lg:col-span-5 relative">
            <div className="relative group">
              {/* Outer Golden Border Framing (Mimicking Box design styling) */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-gold-600 to-gold-400 opacity-20 blur-sm group-hover:opacity-40 transition-opacity duration-500" />
              
              <div className="relative rounded-2xl border border-gold-500/30 overflow-hidden bg-forest-900 shadow-2xl">
                
                {/* The Generated Luxury Banner */}
                <img 
                  src="/src/assets/images/zyvex_hero_1780756788201.png" 
                  alt="Zyvex premium mangoes banner" 
                  className="w-full object-cover aspect-video md:aspect-[4/3] scale-100 group-hover:scale-102 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />

                {/* Overlaid Export Routing Animation Map inside Frame */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#051408]/90 via-[#051408]/20 to-transparent flex flex-col justify-end p-4">
                  <div className="bg-[#051107]/80 backdrop-blur-sm border border-gold-500/20 p-3 rounded-lg text-[11px]">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-white font-bold">{t('pakToUAE')}</span>
                      <span className="text-gold-400 animate-pulse font-mono tracking-wider font-bold">100% AIR PRIORITY</span>
                    </div>
                    
                    {/* Simplified Interactive Cargo Map SVG */}
                    <svg viewBox="0 0 400 120" className="w-full h-16 pointer-events-none mt-2">
                      {/* Grid Lines */}
                      <line x1="0" y1="90" x2="400" y2="90" stroke="#a17814" strokeWidth="1" strokeDasharray="3 3"/>
                      
                      {/* Location: Multan / Islamabad */}
                      <circle cx="50" cy="90" r="4" fill="#22c55e" />
                      <text x="35" y="110" fill="#22c55e" className="text-[9px] font-bold">Multan (🇵🇰)</text>
                      
                      {/* Gulf Destinations */}
                      <circle cx="340" cy="30" r="4" fill="#eab308" />
                      <text x="315" y="18" fill="#eab308" className="text-[9px] font-bold">Dubai (🇦🇪)</text>

                      <circle cx="280" cy="50" r="3.5" fill="#dfbf51" />
                      <text x="240" y="55" fill="#9ca3af" className="text-[8px]">Riyadh (🇸🇦)</text>

                      {/* Flight Path Arc */}
                      <path 
                        d="M 50,90 Q 195,-20 340,30" 
                        fill="none" 
                        stroke="#bfa12d" 
                        strokeWidth="2" 
                        strokeDasharray="4 4"
                        className="animate-[dash_6s_linear_infinite]"
                        style={{ strokeDasharray: '6', strokeDashoffset: '12' }}
                      />

                      {/* Flying Airplane icon on path */}
                      <g className="animate-[translatePlane_7s_infinite_linear]">
                        <text x="0" y="0" transform="translate(185, 30) rotate(15)" fill="#eab308" className="text-xs">✈️</text>
                      </g>
                    </svg>
                  </div>
                </div>

              </div>
            </div>
            
            {/* Tiny tag showing the direct exporter specs */}
            <div className="absolute -bottom-6 -left-4 bg-gradient-to-r from-gold-600 to-gold-700 text-forest-950 px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-wider shadow-lg border border-gold-400 font-sans">
              🇵🇰 🛫 🇦🇪 Daily Cargo Reach
            </div>
          </div>

        </div>
      </section>

      {/* 4. METRICS / HIGHLIGHTS SECTION */}
      <section id="highlights" className="bg-[#041107] py-10 px-4 md:px-8 border-b border-gold-800/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="flex gap-4 items-start p-4 hover:bg-forest-900/10 rounded transition-all">
              <div className="flex-shrink-0 w-10 h-10 rounded-full border border-gold-300 bg-gold-500/10 flex items-center justify-center text-gold-400">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <dt className="text-white font-bold text-sm uppercase tracking-wide">{t('natural100')}</dt>
                <dd className="text-gray-400 text-xs mt-1 leading-relaxed">{t('naturalDesc')}</dd>
              </div>
            </div>

            <div className="flex gap-4 items-start p-4 hover:bg-forest-900/10 rounded transition-all">
              <div className="flex-shrink-0 w-10 h-10 rounded-full border border-gold-300 bg-gold-500/10 flex items-center justify-center text-gold-400">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <dt className="text-white font-bold text-sm uppercase tracking-wide">{t('coldChain')}</dt>
                <dd className="text-gray-400 text-xs mt-1 leading-relaxed">{t('coldChainDesc')}</dd>
              </div>
            </div>

            <div className="flex gap-4 items-start p-4 hover:bg-forest-900/10 rounded transition-all">
              <div className="flex-shrink-0 w-10 h-10 rounded-full border border-gold-300 bg-gold-500/10 flex items-center justify-center text-gold-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <dt className="text-white font-bold text-sm uppercase tracking-wide">Hot Water Treated</dt>
                <dd className="text-gray-400 text-xs mt-1 leading-relaxed">HWT treatment for pest quarantine free delivery</dd>
              </div>
            </div>

            <div className="flex gap-4 items-start p-4 hover:bg-forest-900/10 rounded transition-all">
              <div className="flex-shrink-0 w-10 h-10 rounded-full border border-gold-300 bg-gold-500/10 flex items-center justify-center text-gold-400">
                <Boxes className="w-5 h-5" />
              </div>
              <div>
                <dt className="text-white font-bold text-sm uppercase tracking-wide">{t('premiumBox')}</dt>
                <dd className="text-gray-400 text-xs mt-1 leading-relaxed">{t('boxDesc')}</dd>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. ABOUT SECTION */}
      <section id="about" className="py-20 px-4 md:px-8 bg-forest-950/80">
        <div className="max-w-7xl mx-auto space-y-16">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="text-3xl md:text-5xl font-serif font-bold tracking-tight text-white">
              {t('aboutTitle')}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto" />
            <p className="text-gold-300 font-sans text-sm md:text-base italic">
              {t('aboutSubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Cultivation Graphic Story */}
            <div className="lg:col-span-5 relative space-y-4">
              <div className="relative rounded-2xl border border-gold-500/20 bg-forest-900 overflow-hidden shadow-2xl p-6">
                
                {/* Micro branding design in card mirroring Zyvex boxes */}
                <div className="border border-gold-500/30 p-4 rounded-lg bg-[#051107] text-center space-y-3">
                  <span className="text-[10px] text-gold-300 uppercase tracking-widest font-bold font-sans">
                    ORCHARD PROCESS FLOW
                  </span>
                  
                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-forest-950 p-2.5 rounded border border-gold-900/20 text-center">
                      <span className="text-xs uppercase font-bold text-gold-300">Phase 1</span>
                      <p className="text-[9px] text-gray-400 mt-1">Manual Selective Pick</p>
                    </div>
                    <div className="bg-forest-950 p-2.5 rounded border border-gold-900/20 text-center">
                      <span className="text-xs uppercase font-bold text-gold-500">Phase 2</span>
                      <p className="text-[9px] text-gray-400 mt-1">Phyto Cleaning & HWT</p>
                    </div>
                    <div className="bg-forest-950 p-2.5 rounded border border-gold-900/20 text-center">
                      <span className="text-xs uppercase font-bold text-emerald-500">Phase 3</span>
                      <p className="text-[9px] text-gray-400 mt-1">Next Day Airport Cargo</p>
                    </div>
                  </div>

                  <div className="p-3 bg-forest-950/40 rounded-md text-left text-[11px] space-y-1 text-gray-300 font-sans">
                    <div className="flex items-center gap-1.5 justify-center font-bold text-gold-400 mb-1">
                      <span>Pakistan</span> <span className="text-gold-300">➔</span> <span>Dubai Inbound Port</span>
                    </div>
                    <div className="flex justify-between border-b border-gold-950 pb-0.5 mt-2">
                      <span>Origin Crate:</span>
                      <span className="font-bold text-white">Multan, PK</span>
                    </div>
                    <div className="flex justify-between border-b border-gold-950 pb-0.5">
                      <span>Avg Weight/Fruit:</span>
                      <span className="font-bold text-white">340 Grams</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Transport Temp:</span>
                      <span className="font-bold text-[#38bdf8]">10 - 13°C Constant</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-gradient-to-r from-gold-900/40 to-transparent rounded border-l-2 border-gold-500 text-[11px] text-gold-200">
                  ⚠️ <strong>Gulf Wholesaler Notice:</strong> Air cargo schedules are synchronized daily. Orders submitted by 12:00 PM are harvested & hot-water processed same-day for departure flight connectivity.
                </div>

              </div>
              
              <div className="absolute -top-3 -right-3 w-16 h-16 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center p-2 shadow-xl backdrop-blur-md">
                <span className="text-[10px] text-center font-bold font-serif text-gold-300 uppercase">HWT Done</span>
              </div>
            </div>

            {/* Stories & Objectives */}
            <div className="lg:col-span-7 space-y-6">
              
              <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                {t('aboutText1')}
              </p>

              <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                {t('aboutText2')}
              </p>

              {/* Bento styled company values */}
              <div className="space-y-4 pt-4 border-t border-gold-800/10">
                
                <div className="flex gap-4">
                  <div className="w-6 h-6 rounded-full bg-gold-500/15 flex items-center justify-center text-gold-300 text-xs shrink-0 mt-0.5">1</div>
                  <div>
                    <h4 className="text-sm font-bold text-gold-200">{t('aboutValue1')}</h4>
                    <p className="text-xs text-gray-400 mt-1 leading-relaxed">{t('aboutValueDesc1')}</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-6 h-6 rounded-full bg-gold-500/15 flex items-center justify-center text-gold-300 text-xs shrink-0 mt-0.5">2</div>
                  <div>
                    <h4 className="text-sm font-bold text-gold-200">{t('aboutValue2')}</h4>
                    <p className="text-xs text-gray-400 mt-1 leading-relaxed">{t('aboutValueDesc2')}</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-6 h-6 rounded-full bg-gold-500/15 flex items-center justify-center text-gold-300 text-xs shrink-0 mt-0.5">3</div>
                  <div>
                    <h4 className="text-sm font-bold text-gold-200">{t('aboutValue3')}</h4>
                    <p className="text-xs text-gray-400 mt-1 leading-relaxed">{t('aboutValueDesc3')}</p>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 6. ZYVEX BOX PACKAGING INTERACTIVE EXHIBIT (Interactive Box Decal based on labels user uploaded) */}
      <section id="packaging-design" className="py-20 px-4 md:px-8 bg-[#041107] border-y border-gold-800/20">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs uppercase tracking-widest font-bold text-gold-400">{t('premiumBox')} Showcase</span>
            <h2 className="text-2xl md:text-4xl font-serif font-bold text-white">
              Exporter Crate Specification & Brand Seal
            </h2>
            <p className="text-xs text-gray-400 font-sans">
              Designed for luxury retailers and elite fruit wholesale markets of Dubai, Riyadh, and Jeddah. Select a view label to explore components.
            </p>
          </div>

          <div className="flex justify-center gap-4 mb-4">
            <button 
              id="box-decal-gold"
              onClick={() => setBoxDetailMode('gold')}
              className={`px-4 py-1.5 rounded text-xs uppercase tracking-widest font-bold transition-all border ${
                boxDetailMode === 'gold' 
                  ? 'bg-gold-500 text-forest-950 border-gold-400' 
                  : 'bg-forest-900/40 text-gray-300 border-gold-800/30 hover:border-gold-700'
              }`}
            >
              Gold Premium Decal (Circular Lid)
            </button>
            <button 
              id="box-decal-green"
              onClick={() => setBoxDetailMode('green')}
              className={`px-4 py-1.5 rounded text-xs uppercase tracking-widest font-bold transition-all border ${
                boxDetailMode === 'green' 
                  ? 'bg-emerald-600 text-white border-emerald-500' 
                  : 'bg-forest-900/40 text-gray-300 border-gold-800/30 hover:border-gold-700'
              }`}
            >
              Fresh-Green Carton Label (Side profile)
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
            
            {/* Interactive Box visual side */}
            <div className="lg:col-span-7 flex justify-center">
              <AnimatePresence mode="wait">
                {boxDetailMode === 'gold' ? (
                  // Circular Gold-Black Luxury Label
                  <motion.div 
                    key="gold-label"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className="relative w-full max-w-[420px] aspect-square rounded-full border-[8px] border-gold-500 bg-[#051408] p-4 flex flex-col items-center justify-between text-center shadow-2xl "
                    style={{ boxShadow: '0 0 50px rgba(191, 161, 45, 0.15)' }}
                  >
                    {/* Inner gold frame line */}
                    <div className="absolute inset-2 rounded-full border-2 border-gold-500/20" />
                    
                    {/* Global reach globe at the top */}
                    <div className="mt-6 z-10 flex flex-col items-center">
                      <Globe className="w-10 h-10 text-gold-400 animate-[spin_12s_linear_infinite]" />
                      <div className="w-20 h-px bg-gold-400/40 mt-1" />
                    </div>

                    {/* Zyvex Brand Title Block */}
                    <div className="z-10 px-4 space-y-1">
                      <h3 className="text-4xl md:text-5xl font-serif font-bold tracking-widest text-[#dfbf51] drop-shadow-md">
                        ZYVEX
                      </h3>
                      <p className="text-[10px] text-gray-300 uppercase tracking-widest border-y border-gold-400/40 py-1">
                        GLOBAL TRADING PVT LTD
                      </p>
                      <p className="text-[9px] text-[#ffdf6d] font-bold tracking-[0.15em] uppercase mt-1">
                        PREMIUM QUALITY MANGOES
                      </p>
                    </div>

                    {/* Fresh from Pakistan tagline */}
                    <div className="z-10 space-y-1 bg-gold-500/10 border border-gold-800/40 px-4 py-1.5 rounded">
                      <p className="text-[11px] font-bold uppercase text-white tracking-widest">
                        FRESH FROM PAKISTAN
                      </p>
                      <p className="text-[8px] text-gray-400 uppercase tracking-widest">
                        EXPORTED TO THE WORLD
                      </p>
                    </div>

                    {/* Bottom Specs and icons */}
                    <div className="mb-6 z-10 space-y-2">
                      <p className="text-[10px] uppercase font-bold text-[#ffdf6d] tracking-widest font-sans flex items-center justify-center gap-1.5">
                        <span>✈️ AIR EXPORT</span>
                        <span className="text-gray-400">|</span>
                        <span>🚢 SEA EXPORT</span>
                      </p>
                      <p className="text-[8px] italic text-[#fbf7e6] opacity-90 max-w-[260px] mx-auto uppercase tracking-wider">
                        "TASTE OF PAKISTAN, TRUSTED WORLDWIDE"
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  // Green & White Carton specs decal
                  <motion.div 
                    key="green-label"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className="relative w-full max-w-[500px] aspect-[16/10] bg-white text-forest-950 p-6 flex flex-col justify-between shadow-2xl rounded-xl border-t-[12px] border-emerald-600 border-b-[12px]"
                  >
                    
                    {/* Header */}
                    <div className="flex justify-between items-start border-b border-gray-300 pb-3">
                      <div>
                        <span className="text-[10px] font-bold text-white bg-emerald-600 px-2 py-0.5 rounded mr-1">
                          PAKISTANI MANGOES
                        </span>
                        <h3 className="text-2xl font-serif font-black tracking-tight text-emerald-800 uppercase mt-1">
                          ZYVEX
                        </h3>
                        <p className="text-[9px] text-gray-500 font-bold uppercase tracking-wider">
                          Global Trading Pvt Ltd
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-[11px] font-bold text-[#a17814] border border-[#a17814] px-2 py-0.5 rounded block">
                          PREMIUM EXPORT QUALITY
                        </span>
                        <span className="text-[9px] text-gray-500 block mt-1 font-sans">NET WEIGHT: 5 KG</span>
                      </div>
                    </div>

                    {/* Center details list */}
                    <div className="grid grid-cols-2 gap-4 py-3 text-xs">
                      <div>
                        <span className="text-[9px] text-gray-400 font-bold block uppercase tracking-wide">AVAILABLE VARIETIES</span>
                        <div className="flex gap-2 mt-1">
                          <span className="text-[10px] border border-emerald-500 text-emerald-700 px-1 rounded font-bold">Sindhri</span>
                          <span className="text-[10px] border border-emerald-500 text-emerald-700 px-1 rounded font-bold">Anwar Ratol</span>
                          <span className="text-[10px] border border-emerald-500 text-emerald-700 px-1 rounded font-bold">Chaunsa</span>
                        </div>
                        <p className="text-[9px] text-gray-500 mt-2">
                          🌱 Grown in sandy Multan silt, handpicked.
                        </p>
                      </div>

                      <div className="border-l border-gray-200 pl-4 space-y-1.5 text-[10px]">
                        <div className="flex justify-between">
                          <span className="text-gray-400">ORIGIN:</span>
                          <strong className="text-emerald-900">PAKISTAN 🇵🇰</strong>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">PACKING:</span>
                          <strong className="text-emerald-900">5KG CARTON</strong>
                        </div>
                        <div className="flex justify-between font-bold">
                          <span className="text-gray-400">KEEP AT:</span>
                          <strong className="text-blue-600">10-13°C (COOL)</strong>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">TREATMENT:</span>
                          <strong className="text-emerald-900">HOT WATER HWT OK</strong>
                        </div>
                      </div>
                    </div>

                    {/* Handle with care icons mimicking real carton box markers */}
                    <div className="border-t border-gray-300 pt-3 flex justify-between items-center bg-gray-50 p-2 rounded text-[9px] text-gray-500">
                      <div className="flex gap-3 text-center">
                        <div>
                          <span>⬆️⬆️</span>
                          <p className="text-[8px] uppercase">This Side Up</p>
                        </div>
                        <div>
                          <span>🍷</span>
                          <p className="text-[8px] uppercase">Fragile</p>
                        </div>
                        <div>
                          <span>☂️</span>
                          <p className="text-[8px] uppercase">Keep Dry</p>
                        </div>
                        <div>
                          <span>☀️</span>
                          <p className="text-[8px] uppercase">Keep Cool</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <strong className="text-emerald-800 uppercase block tracking-wider text-[8px]">
                          TASTE OF PAKISTAN, LOVED WORLDWIDE
                        </strong>
                        <span className="text-[8px] text-gray-400 block">Multan, Pakistan</span>
                      </div>
                    </div>

                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Explainer / Importer highlights points */}
            <div className="lg:col-span-5 space-y-6">
              <h3 className="text-xl font-serif font-bold text-white">
                C&F Trade Box Specifications
              </h3>
              
              <ul className="space-y-4 text-xs font-sans">
                <li className="flex gap-3 leading-relaxed">
                  <div className="w-5 h-5 rounded-full bg-gold-400/10 flex items-center justify-center shrink-0 text-gold-300">✓</div>
                  <div>
                    <strong className="text-white block">Standard Carton Payload:</strong>
                    <span>Perfect calibrated payload container of 5KG Net Weight packed neatly with anti-vibration separators.</span>
                  </div>
                </li>
                <li className="flex gap-3 leading-relaxed">
                  <div className="w-5 h-5 rounded-full bg-gold-400/10 flex items-center justify-center shrink-0 text-gold-300">✓</div>
                  <div>
                    <strong className="text-white block">Double Calibrating Selection:</strong>
                    <span>Each carton holds mango fruits sized from 280g - 425g ensuring uniform retail stacking and aesthetically premium consumer boxes.</span>
                  </div>
                </li>
                <li className="flex gap-3 leading-relaxed">
                  <div className="w-5 h-5 rounded-full bg-gold-400/10 flex items-center justify-center shrink-0 text-gold-300">✓</div>
                  <div>
                    <strong className="text-white block">Thermal Regulation Cradling:</strong>
                    <span>Pre-cooled to 11°C immediately after Hot Water Treatment. Loaded into thermal air freight cargo containers ensuring peak crispness on arrival.</span>
                  </div>
                </li>
                <li className="flex gap-3 leading-relaxed">
                  <div className="w-5 h-5 rounded-full bg-gold-400/10 flex items-center justify-center shrink-0 text-gold-300">✓</div>
                  <div>
                    <strong className="text-white block">Official Trade Mark:</strong>
                    <span>Box design is officially registered with Ministry of Commerce and Department of Plant Protection Pakistan for genuine biometric trace.</span>
                  </div>
                </li>
              </ul>

              <div className="pt-2">
                <button 
                  id="packaging-cta-btn"
                  onClick={() => scrollToInquiry()}
                  className="px-5 py-2.5 rounded-md border border-dashed border-gold-400/60 hover:bg-gold-500/10 text-gold-300 text-xs font-bold uppercase transition-all"
                >
                  Custom Brand Box Customization Inquiry
                </button>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 7. DETAILED PRODUCTS SHOWCASE (Features top Sindhri/Ratol/Chaunsa with HWT) */}
      <section id="varieties" className="py-20 px-4 md:px-8 bg-forest-950/80">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-white tracking-tight">
              {t('varietiesTitle')}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto" />
            <p className="text-gold-300 italic text-sm md:text-base font-sans">
              {t('varietiesSubtitle')}
            </p>
          </div>

          {/* Interactive filter tabs for variety focus */}
          <div className="flex flex-wrap justify-center gap-2 mb-8" id="product-filter-tabs">
            <button 
              id="filter-all"
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 text-xs rounded uppercase font-bold tracking-wide transition-all ${
                activeTab === 'all' 
                  ? 'bg-gold-500 text-forest-950 shadow-inner font-black' 
                  : 'bg-forest-900/60 text-gray-300 hover:text-gold-400 border border-gold-800/10'
              }`}
            >
              All Varieties
            </button>
            <button 
              id="filter-sindhri"
              onClick={() => setActiveTab('sindhri')}
              className={`px-4 py-2 text-xs rounded uppercase font-bold tracking-wide transition-all ${
                activeTab === 'sindhri' 
                  ? 'bg-gold-500 text-forest-950 shadow-inner font-black' 
                  : 'bg-forest-900/60 text-gray-300 hover:text-gold-400 border border-gold-800/10'
              }`}
            >
              Sindhri
            </button>
            <button 
              id="filter-anwar-ratol"
              onClick={() => setActiveTab('anwar_ratol')}
              className={`px-4 py-2 text-xs rounded uppercase font-bold tracking-wide transition-all ${
                activeTab === 'anwar_ratol' 
                  ? 'bg-gold-500 text-forest-950 shadow-inner font-black' 
                  : 'bg-forest-900/60 text-gray-300 hover:text-gold-400 border border-gold-800/10'
              }`}
            >
              Anwar Ratol
            </button>
            <button 
              id="filter-chaunsa"
              onClick={() => setActiveTab('chaunsa')}
              className={`px-4 py-2 text-xs rounded uppercase font-bold tracking-wide transition-all ${
                activeTab === 'chaunsa' 
                  ? 'bg-gold-500 text-forest-950 shadow-inner font-black' 
                  : 'bg-forest-900/60 text-gray-300 hover:text-gold-400 border border-gold-800/10'
              }`}
            >
              Honey Chaunsa
            </button>
          </div>

          {/* Grid Layout of products utilizing generated images */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {mangoVarieties
                .filter(v => activeTab === 'all' || v.id === activeTab)
                .map((variety) => (
                  <motion.div 
                    layout
                    id={`variety-card-${variety.id}`}
                    key={variety.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col rounded-xl overflow-hidden border border-gold-800/20 bg-[#061609] h-full shadow-2xl relative group"
                  >
                    {/* Top image section */}
                    <div className="relative overflow-hidden aspect-[4/3] bg-forest-950">
                      <img 
                        src={variety.image} 
                        alt={variety.name[lang]} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      
                      {/* Premium export quality badge on image */}
                      <span className="absolute top-3 left-3 bg-gold-500 text-forest-950 text-[10px] uppercase tracking-wider font-extrabold px-2.5 py-1 rounded shadow-lg border border-gold-400">
                        {variety.grade[lang]}
                      </span>
                    </div>

                    {/* Content Section */}
                    <div className="p-6 flex-grow flex flex-col justify-between">
                      <div className="space-y-4">
                        
                        <div className="flex justify-between items-start">
                          <h3 className="text-xl font-serif font-bold text-white group-hover:text-gold-300 transition-colors">
                            {variety.name[lang]}
                          </h3>
                        </div>

                        <p className="text-xs text-gray-300 leading-relaxed min-h-[50px]">
                          {variety.flavorProfile[lang]}
                        </p>

                        <div className="border-t border-gold-800/15 pt-3 space-y-2 text-xs">
                          <div className="flex justify-between text-gray-400">
                            <span>🗓️ {t('season')}:</span>
                            <strong className="text-gold-200">{variety.season[lang]}</strong>
                          </div>
                          <div className="flex justify-between text-gray-400 pb-1">
                            <span>📦 {t('packaging')}:</span>
                            <span className="text-right text-[11px] font-medium text-white max-w-[140px] truncate">{variety.packaging[lang]}</span>
                          </div>
                          
                          {/* Brix (Sweetness indicator) */}
                          <div className="space-y-1">
                            <div className="flex justify-between text-[11px]">
                              <span className="text-gray-400">🍯 Aroma & Sweetness Gauge:</span>
                              <span className="text-gold-400 font-bold">18° - 22° Brix</span>
                            </div>
                            <div className="w-full bg-forest-900 h-1.5 rounded-full overflow-hidden">
                              <div className="bg-gradient-to-r from-gold-600 to-amber-400 h-full rounded-full" style={{ width: variety.id === 'chaunsa' ? '100%' : variety.id === 'sindhri' ? '85%' : '92%' }} />
                            </div>
                          </div>
                        </div>

                      </div>

                      {/* Card Button triggers scrollToInquiry & preset selection */}
                      <div className="pt-6">
                        <button 
                          id={`quote-btn-${variety.id}`}
                          onClick={() => scrollToInquiry(variety.id)}
                          className="w-full py-2.5 rounded bg-forest-900 border border-gold-500/20 hover:border-gold-300 text-gold-300 hover:text-white text-xs font-bold uppercase transition-all flex items-center justify-center gap-1.5"
                        >
                          <span>{t('requestQuote')}</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>

                    </div>
                  </motion.div>
                ))
              }
            </AnimatePresence>
          </div>

          {/* C&F seasonal notice */}
          <div className="p-5 rounded-xl bg-forest-900/30 border border-gold-800/20 text-center max-w-3xl mx-auto">
            <p className="text-xs text-gray-300 font-medium">
              ⭐ {t('additionalVar')}
            </p>
          </div>

        </div>
      </section>

      {/* 8. COLD CHAIN & AIR CARGO TIMELINE SECTION (Target markets overview + flags pairings) */}
      <section id="shipping" className="py-20 px-4 md:px-8 bg-[#041107] border-y border-gold-800/10">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs uppercase tracking-widest font-bold text-gold-400">Priority Transit</span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-white tracking-tight">
              {t('shippingTitle')}
            </h2>
            <p className="text-gold-300 font-sans italic text-sm md:text-base">
              {t('shippingSubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Direct Shipping Route Timeline (Left Column) */}
            <div className="lg:col-span-6 space-y-6">
              
              <div className="space-y-6 relative before:absolute before:top-2 before:bottom-2 before:left-3 before:w-0.5 before:bg-gold-500/20">
                
                <div className="relative flex gap-4 pl-8">
                  <div className="absolute left-1.5 top-1 w-3.5 h-3.5 rounded-full border border-gold-400 bg-forest-950 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase text-gold-300 tracking-wider">Step 1: Morning Harvest (06:00 - 10:00)</h4>
                    <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                      Orchard workers delicately pick top-caliber mangoes manually. The stem is trimmed to prevent sap injury.
                    </p>
                  </div>
                </div>

                <div className="relative flex gap-4 pl-8">
                  <div className="absolute left-1.5 top-1 w-3.5 h-3.5 rounded-full border border-gold-400 bg-forest-950 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase text-gold-300 tracking-wider">Step 2: Processing & Hot Water Treatment (11:00 - 16:00)</h4>
                    <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                      Mangoes are brought into the packing station, washed in phytosanitary lines, treated at 48°C for 60 mins (HWT), graded, and cooled to 11°C.
                    </p>
                  </div>
                </div>

                <div className="relative flex gap-4 pl-8">
                  <div className="absolute left-1.5 top-1 w-3.5 h-3.5 rounded-full border border-emerald-400 bg-forest-950 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase text-emerald-400 tracking-wider">Step 3: Airport Transit & Air Express Cargo Departure (20:00 - Midnight)</h4>
                    <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                      Packed robustly in 5KG cartons, mangoes are loaded into pre-cooled trucks and transferred to Lahore or Karachi Air cargo decks bound directly for UAE/Gulf cities.
                    </p>
                  </div>
                </div>

                <div className="relative flex gap-4 pl-8">
                  <div className="absolute left-1.5 top-1 w-3.5 h-3.5 rounded-full border border-indigo-400 bg-forest-950 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase text-indigo-300 tracking-wider">Step 4: Landing & Inbound Shelling (Next day 08:00)</h4>
                    <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                      Clearance teams extract pallets under temperature-controlled cold terminals, delivering pristine premium mangoes directly to UAE and GCC stores.
                    </p>
                  </div>
                </div>

              </div>

            </div>

            {/* Target Wholesalers & Countries grid (Right Column) */}
            <div className="lg:col-span-6 space-y-6">
              
              <div className="p-6 rounded-xl border border-gold-800/20 bg-forest-900/40 space-y-4">
                
                <h3 className="text-lg font-serif font-bold text-white flex items-center gap-2">
                  <span>🌍</span>
                  <span>{t('shippingDest')}</span>
                </h3>

                <p className="text-xs text-gray-400 leading-relaxed font-sans">
                  Zyvex Global handles both freight types, although Air Export is our gold-standard offering. We supply directly to leading wholesalers, supermarket chains, and distributors at:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {targetDestinations.map((dest, i) => (
                    <div key={i} className="p-3 rounded border border-gold-500/10 bg-[#051107] flex items-start gap-2.5">
                      <span className="text-2xl mt-0.5 select-none">{dest.flag}</span>
                      <div className="space-y-0.5">
                        <h4 className="text-xs font-bold text-white uppercase tracking-wide">{dest.name[lang]}</h4>
                        <p className="text-[9px] text-gray-400 font-sans">Inbound: {dest.ports[lang]}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-2 flex justify-between items-center text-[10px] text-gray-400 font-mono border-t border-gold-800/10 mt-2">
                  <span>🇵🇰 Pakistan Exporter Mark</span>
                  <span className="text-gold-400 font-semibold">📍 Air Gateway Multan</span>
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 9. CERTIFICATIONS & TRUST SECTION */}
      <section id="quality" className="py-20 px-4 md:px-8 bg-forest-950/80">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-white tracking-tight">
              {t('trustTitle')}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto" />
            <p className="text-gold-300 font-sans italic text-sm md:text-base">
              {t('trustSubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            
            <div className="p-6 rounded-xl border border-gold-800/10 bg-[#061609] space-y-3">
              <div className="flex gap-3 items-center text-gold-400">
                <ShieldCheck className="w-6 h-6 shrink-0" />
                <h3 className="text-md font-serif font-bold text-white">{t('cert1')}</h3>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed pl-9">
                {t('certDesc1')}
              </p>
            </div>

            <div className="p-6 rounded-xl border border-gold-800/10 bg-[#061609] space-y-3">
              <div className="flex gap-3 items-center text-gold-400">
                <Award className="w-6 h-6 shrink-0" />
                <h3 className="text-md font-serif font-bold text-white">{t('cert2')}</h3>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed pl-9">
                {t('certDesc2')}
              </p>
            </div>

            <div className="p-6 rounded-xl border border-gold-800/10 bg-[#061609] space-y-3">
              <div className="flex gap-3 items-center text-gold-400">
                <Truck className="w-6 h-6 shrink-0" />
                <h3 className="text-md font-serif font-bold text-white">{t('cert3')}</h3>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed pl-9">
                {t('certDesc3')}
              </p>
            </div>

            <div className="p-6 rounded-xl border border-gold-800/10 bg-[#061609] space-y-3">
              <div className="flex gap-3 items-center text-gold-400">
                <Globe className="w-6 h-6 shrink-0" />
                <h3 className="text-md font-serif font-bold text-white">{t('cert4')}</h3>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed pl-9">
                {t('certDesc4')}
              </p>
            </div>

          </div>

          {/* Pakistan & UAE flag layout element illustrating export bridge */}
          <div className="max-w-xl mx-auto p-4 rounded-xl border border-gold-500/20 bg-forest-900/30 flex justify-around items-center text-center">
            <div className="space-y-1">
              <span className="text-4xl block select-none">🇵🇰</span>
              <p className="text-[10px] font-bold text-white tracking-wider uppercase">Orchard Origin</p>
              <p className="text-[8px] text-gray-400">Multan, Pakistan</p>
            </div>
            
            <div className="flex flex-col items-center gap-1">
              <span className="text-gold-400 font-mono text-[10px] uppercase font-bold animate-pulse">DIRECT HIGHWAY</span>
              <div className="flex items-center gap-1 text-gold-300">
                <span className="h-px w-10 bg-gold-500/30" />
                <span>✈️</span>
                <span className="h-px w-10 bg-gold-500/30" />
              </div>
              <p className="text-[8px] text-gray-400 font-sans">Next-Day Cargo Arrival</p>
            </div>

            <div className="space-y-1">
              <span className="text-4xl block select-none">🇦🇪</span>
              <p className="text-[10px] font-bold text-white tracking-wider uppercase">GCC Markets</p>
              <p className="text-[8px] text-gray-400">Dubai Hub Gateway</p>
            </div>
          </div>

        </div>
      </section>

      {/* 10. INQUIRY FORM & LIVE QUOTATIONS LOG */}
      <section id="inquiry-desk" className="py-20 px-4 md:px-8 bg-[#041107] border-t border-gold-800/20">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="text-xs uppercase tracking-widest font-bold text-gold-400">Trade Portal Inquiry Desk</span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-white tracking-tight">
              {t('contactTitle')}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto" />
            <p className="text-gold-300 italic text-sm md:text-base font-sans">
              {t('contactSubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-5xl mx-auto" ref={formRef}>
            
            {/* Submission Form Desk */}
            <div className="lg:col-span-7 bg-[#061609] border border-gold-500/20 rounded-xl p-6 md:p-8 shadow-2xl relative">
              <h3 className="text-lg font-serif font-semibold text-[#dfbf51] border-b border-gold-800/20 pb-3 mb-6">
                Submit Formal Inquiry
              </h3>

              {isSubmitted ? (
                <div id="inquiry-success-panel" className="space-y-6 py-6 text-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-400 flex items-center justify-center mx-auto text-emerald-400">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-white">Inquiry Received Successfully</h3>
                    <p className="text-xs text-gray-300 leading-relaxed px-4">
                      {t('successMsg')}
                    </p>
                  </div>

                  <div className="p-4 bg-forest-950 rounded-lg border border-gold-800/20 space-y-3">
                    <p className="text-[11px] text-gray-300 font-sans">
                      💡 {t('successMsgWhatsapp')}
                    </p>
                    <a 
                      id="success-whatsapp-link"
                      href={getWhatsAppLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 py-3 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase transition-all shadow"
                    >
                      <Phone className="w-4 h-4" />
                      <span>{t('whatsAppDirect')}</span>
                    </a>
                  </div>

                  <button 
                    id="reset-form-btn"
                    onClick={resetForm}
                    className="text-xs text-gold-400 hover:text-gold-300 underline font-semibold transition-all"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form id="export-inquiry-form" onSubmit={handleFormSubmit} className="space-y-4 text-xs">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label id="label-name" className="text-gray-300 font-semibold uppercase">{t('formName')} *</label>
                      <input 
                        required
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="e.g. Salim Al Mansoori"
                        className="w-full p-3 bg-forest-950 border border-gold-800/40 rounded text-white focus:border-gold-400 focus:outline-none transition-colors"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label id="label-company" className="text-gray-300 font-semibold uppercase">{t('formCompany')} *</label>
                      <input 
                        required
                        type="text" 
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        placeholder="e.g. Gulf Fresh Fruits LLC"
                        className="w-full p-3 bg-forest-950 border border-gold-800/40 rounded text-white focus:border-gold-400 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label id="label-email" className="text-gray-300 font-semibold uppercase">{t('formEmail')} *</label>
                      <input 
                        required
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="e.g. import@gulffresh.ae"
                        className="w-full p-3 bg-forest-950 border border-gold-800/40 rounded text-white focus:border-gold-400 focus:outline-none transition-colors"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label id="label-phone" className="text-gray-300 font-semibold uppercase">{t('formPhone')} *</label>
                      <input 
                        required
                        type="text" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="e.g. +971 50 1234567"
                        className="w-full p-3 bg-forest-950 border border-gold-800/40 rounded text-white focus:border-gold-400 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    
                    <div className="space-y-1.5">
                      <label id="label-country" className="text-gray-300 font-semibold uppercase">{t('formCountry')}</label>
                      <select 
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className="w-full p-3 bg-forest-950 border border-gold-800/40 rounded text-white focus:border-gold-400 focus:outline-none transition-colors"
                      >
                        <option value="United Arab Emirates">United Arab Emirates (🇦🇪)</option>
                        <option value="Saudi Arabia">Saudi Arabia (🇸🇦)</option>
                        <option value="Qatar">Qatar (🇶🇦)</option>
                        <option value="Kuwait">Kuwait (🇰🇼)</option>
                        <option value="Oman">Oman (🇴🇲)</option>
                        <option value="Bahrain">Bahrain (🇧🇭)</option>
                        <option value="Other">Other Global Market</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label id="label-variety" className="text-gray-300 font-semibold uppercase">{t('formVariety')}</label>
                      <select 
                        name="variety"
                        value={formData.variety}
                        onChange={handleInputChange}
                        className="w-full p-3 bg-forest-950 border border-gold-800/40 rounded text-white focus:border-gold-400 focus:outline-none transition-colors"
                      >
                        <option value="all">{t('otherVariety')}</option>
                        <option value="sindhri">Sindhri</option>
                        <option value="anwar_ratol">Anwar Ratol</option>
                        <option value="chaunsa">Honey Chaunsa</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label id="label-quantity" className="text-gray-300 font-semibold uppercase">{t('formQuantity')}</label>
                      <input 
                        type="text" 
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleInputChange}
                        placeholder="e.g. 500 Cartons / 2.5 Tons"
                        className="w-full p-3 bg-forest-950 border border-gold-800/40 rounded text-white focus:border-gold-400 focus:outline-none transition-colors"
                      />
                    </div>

                  </div>

                  <div className="space-y-1.5">
                    <label id="label-message" className="text-gray-300 font-semibold uppercase">{t('formMessage')}</label>
                    <textarea 
                      rows={4}
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Specify packaging adjustments, delivery port preferences or certificates timing request here..."
                      className="w-full p-3 bg-forest-950 border border-gold-800/40 rounded text-white focus:border-gold-400 focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row gap-3">
                    <button 
                      id="inquiry-submit-btn"
                      type="submit"
                      className="flex-1 py-3 px-6 rounded bg-gradient-to-r from-gold-600 to-gold-400 hover:from-gold-500 hover:to-gold-300 text-forest-950 font-bold uppercase tracking-wider transition-all shadow cursor-pointer text-center"
                    >
                      {t('submitForm')}
                    </button>
                    
                    {/* Secondary WhatsApp Direct quote trigger */}
                    <button
                      id="inquiry-direct-wa-btn"
                      type="button"
                      onClick={() => {
                        window.open(getWhatsAppLink(), '_blank');
                      }}
                      className="py-3 px-6 rounded border border-emerald-500 text-emerald-400 hover:bg-emerald-500/10 font-bold uppercase tracking-wider transition-all"
                    >
                      Direct WhatsApp Invoice
                    </button>
                  </div>

                </form>
              )}
            </div>

            {/* Live Quotes Log & Contacts Column */}
            <div className="lg:col-span-5 space-y-6">
              
              <div className="p-6 rounded-xl border border-gold-800/20 bg-forest-900/40 space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-gold-800/20">
                  <h3 className="text-md font-serif font-bold text-white flex items-center gap-2">
                    <FileText className="w-4 h-4 text-gold-400" />
                    <span>Your Inquiry History</span>
                  </h3>
                  <span className="text-[10px] bg-gold-500/10 text-gold-400 px-2 py-0.5 rounded font-bold">
                    {inquiries.length} Saved
                  </span>
                </div>

                {inquiries.length === 0 ? (
                  <p className="text-xs text-gray-400 leading-relaxed italic">
                    Submit your first inquiry. It is stored locally as a formal buyer quotation slip for you to review and refer to!
                  </p>
                ) : (
                  <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1">
                    {inquiries.map((inq, idx) => (
                      <div key={idx} className="p-3 rounded bg-forest-950 border border-gold-900/40 space-y-1.5 text-[11px]">
                        <div className="flex justify-between font-bold text-white">
                          <span>Ref: ZYX-00{inquiries.length - idx}</span>
                          <span className="text-gold-400">{inq.variety.toUpperCase()}</span>
                        </div>
                        <p className="text-gray-400 flex justify-between">
                          <span>Company: <strong>{inq.company}</strong></span>
                          <span>Qty: <strong>{inq.quantity || 'Requested Quote'}</strong></span>
                        </p>
                        <div className="flex items-center justify-between text-[10px] text-gray-500 border-t border-forest-900 pt-1 mt-1">
                          <span>Dest: 📍 {inq.country}</span>
                          <a 
                            id={`log-wa-direct-00${inquiries.length - idx}`}
                            href={`https://wa.me/923006872012?text=${encodeURIComponent(
                              `Hello Zyvex! Referring to inquiry ref ZYX-00${inquiries.length - idx} for ${inq.variety.toUpperCase()}`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-emerald-400 hover:underline flex items-center gap-0.5"
                          >
                            Send WA <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Multan contact details footer panel */}
              <div className="p-6 rounded-xl border border-gold-800/10 bg-[#061609] space-y-4 text-xs font-sans">
                <h3 className="text-sm font-serif font-bold text-white border-b border-forest-900 pb-2">
                  Head Office Contact Details
                </h3>

                <ul className="space-y-3">
                  <li className="flex gap-2.5 items-start">
                    <MapPin className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block">Multan Processing Plant:</strong>
                      <span className="text-gray-400">Pull Shala, Old Dunyapur Road, Multan, Pakistan</span>
                    </div>
                  </li>
                  <li className="flex gap-2.5 items-start">
                    <Phone className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block">Export Hotline / WhatsApp:</strong>
                      <span className="text-emerald-400 font-bold select-all">+92 300 6872012</span>
                    </div>
                  </li>
                  <li className="flex gap-2.5 items-start">
                    <Mail className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block">Official Trade Email:</strong>
                      <span className="text-gray-400 select-all">info@zyvexglobal.com</span>
                    </div>
                  </li>
                  <li className="flex gap-2.5 items-start">
                    <Globe className="w-4 h-4 text-gold-400 shrink-0" />
                    <div>
                      <strong className="text-white block">Trade Website:</strong>
                      <span className="text-gray-400 select-all">www.zyvexglobal.com</span>
                    </div>
                  </li>
                </ul>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 11. LUXURY FOOTER */}
      <footer id="main-footer" className="bg-[#030e05] py-12 px-4 md:px-8 text-center text-xs text-gray-500 border-t border-gold-800/20">
        <div className="max-w-7xl mx-auto space-y-6">
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 pb-6 border-b border-gold-800/10 max-w-5xl mx-auto text-left">
            <div>
              <h4 className="text-sm font-serif font-semibold text-gold-400 tracking-wider">
                {t('brandPvt')}
              </h4>
              <p className="text-[11px] text-gray-400 mt-1 max-w-md">
                Registered fruit exporter and international logistics trader. Proud partners of prime mango growers across South Punjab with double-selected hot water quarantine standard certifications.
              </p>
            </div>
            
            <div className="flex flex-col md:text-right gap-1 font-sans text-[11px]">
              <span className="text-gray-400 uppercase font-bold text-gold-400">{t('quickSupport')}:</span>
              <a 
                id="footer-phone-click"
                href="tel:+923006872012" 
                className="text-white font-mono hover:text-gold-300 font-semibold"
              >
                +92 300 6872012
              </a>
              <span className="text-gray-500">info@zyvexglobal.com | www.zyvexmango.com</span>
            </div>
          </div>

          <p className="max-w-4xl mx-auto text-[11px] text-gray-400 leading-normal">
            {t('location')}
          </p>

          <p className="text-[10px] text-gray-600 block mt-4">
            {t('footerText')}
          </p>

        </div>
      </footer>

      {/* 12. PERSISTENT FLOATING WHATSAPP BUTTON (Connected directly to phone as requested) */}
      <a 
        id="floating-whatsapp-trigger"
        href="https://wa.me/923006872012?text=Hello%20Zyvex%20Global!%20I%20am%20a%2520buyer%20from%20the%20Gulf.%20I%20visited%20your%20website%20and%20would%20like%20to%20receive%20the%20latest%20price%20quote%20sheet%20for%20Sindhri,%20Anwar%20Ratol,%20and%20Chaunsa%20mangoes."
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25d366] hover:bg-[#20ba5a] text-white p-3.5 rounded-full shadow-[0_4px_15px_rgba(37,211,102,0.4)] flex items-center justify-center hover:scale-110 active:scale-95 transition-all outline-none"
        style={{ right: isRTL ? 'auto' : '1.5rem', left: isRTL ? '1.5rem' : 'auto' }}
        title="WhatsApp Live Export Desk"
      >
        <span className="relative flex">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-40"></span>
          {/* Custom SVG WhatsApp Logo */}
          <svg className="w-7 h-7 fill-current text-white relative z-10" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.502 5.286 3.5 8.494-.009 6.66-5.347 11.997-11.96 11.997-2.005-.001-3.973-.501-5.719-1.457L0 24zm6.59-4.846c1.6.95 3.1 1.45 4.7 1.45 5.5 0 9.9-4.5 9.9-9.9 0-2.6-1-5.1-2.9-6.9-1.9-1.9-4.4-2.9-7-2.9-5.5 0-10 4.5-10 9.9 0 2 .5 3.9 1.5 5.6l-.1 1-.4 1.4 1.6-.4 1.3-.3zM17.5 14.3c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.2-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.2-1.2-.4-2.3-1.4-.8-.7-1.4-1.6-1.6-1.9-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.1.2-.3.3-.4.1-.2 0-.4 0-.5l-.8-1.9c-.3-.7-.5-.6-.7-.6-.2 0-.4 0-.6 0-.2.1-.5.2-.7.5-.3.4-.9 1-.9 2.5 0 1.5 1.1 2.9 1.3 3.1.2.2 2.2 3.3 5.3 4.6.7.3 1.3.5 1.7.7.7.2 1.3.2 1.8.1.6-.1 1.7-.7 1.9-1.4.3-.7.3-1.3.2-1.4-.1-.2-.2-.3-.5-.4z"/>
          </svg>
        </span>
      </a>

    </div>
  );
}
