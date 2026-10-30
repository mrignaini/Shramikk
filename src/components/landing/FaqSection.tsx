import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, Sparkles, MessageCircleQuestion } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { Link } from 'react-router-dom';

export const FaqSection: React.FC = () => {
  const { language } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      qHi: 'क्या SHRAMIKK पर कामगारों के लिए रजिस्ट्रेशन बिल्कुल निशुल्क है?',
      qEn: 'Is registration completely free for construction workers?',
      aHi: 'हाँ, कामगारों के लिए SHRAMIKK पर रजिस्ट्रेशन 100% निशुल्क है। हम श्रमिकों की दैनिक मजदूरी में से कोई कमीशन या चार्ज नहीं काटते। आपकी पूरी कमाई सीधे आपके हाथ या बैंक खाते में आती है।',
      aEn: 'Yes! Worker onboarding and profile creation on SHRAMIKK is 100% free. We take 0% commission from daily wage earnings.',
    },
    {
      qHi: 'मजदूरी की गारंटी कैसे मिलती है? एस्क्रो (Escrow) क्या होता है?',
      qEn: 'How are wages guaranteed? What is the Escrow payment system?',
      aHi: 'काम शुरू होने से पहले ही ठेकेदार / नियोक्ता को दिन की पूरी मजदूरी SHRAMIKK के सुरक्षित एस्क्रो खाते में जमा करनी होती है। काम पूरा होने पर सुपरवाइजर के सत्यापन के साथ ही पैसा तुरंत कामगार को जारी हो जाता है। इससे मजदूरी रुकने का कोई जोखिम नहीं रहता।',
      aEn: 'Before a shift begins, the hirer deposits the entire shift wage into SHRAMIKK\'s secure Escrow holding. Once daily work is verified on site, the funds are instantly released to the worker with zero delays.',
    },
    {
      qHi: 'BOCW कार्ड और ई-श्रम कार्ड का क्या फायदा है?',
      qEn: 'What are the advantages of BOCW and e-Shram integration?',
      aHi: 'BOCW (भवन निर्माण कल्याण बोर्ड) और ई-श्रम के तहत पंजीकृत श्रमिकों को ₹2 लाख तक का मुफ्त दुर्घटना बीमा, बच्चों की स्कूल-कॉलेज छात्रवृत्ति, 60 वर्ष बाद ₹3000 मासिक पेंशन, औजार किट सहायता और चिकित्सा लाभ मिलते हैं। हमारा AI साथी आपको इन सभी के आवेदन में मदद करता है।',
      aEn: 'BOCW and e-Shram registration entitles workers to ₹2 Lakh accidental insurance, tool kit allowances up to ₹50,000, pension after age 60, and children education scholarships.',
    },
    {
      qHi: 'दैनिक हाजिरी और वेतन पर्ची कैसे काम करती है?',
      qEn: 'How does digital attendance and the daily wage slip work?',
      aHi: 'साइट पर पहुँचने पर कामगार साइट सुपरवाइजर का क्यूआर कोड स्कैन करते हैं या सुपरवाइजर उनकी हाजिरी दर्ज करता है। दिन के अंत में एक डिजिटल वेतन पर्ची बनती है, जो कामगार के प्रोफाइल में हमेशा के लिए सुरक्षित रहती है और बैंक लोन के लिए मान्य होती है।',
      aEn: 'Workers punch in via site QR code or supervisor verification. At shift end, an authentic digital wage slip is minted and saved to their permanent digital work ledger.',
    },
    {
      qHi: 'ठेकेदार या साइट सुपरवाइजर कुशल कारीगर कैसे ढूंढ सकते हैं?',
      qEn: 'How can contractors and hirers find verified skilled tradesmen?',
      aHi: 'ठेकेदार "कामगार ढूंढें" (Hire Workers) पेज पर जाकर शहर, कौशल (राजमिस्त्री, पेंटर, प्लंबर आदि) और अनुभव के आधार पर सत्यापित कारीगरों की सूची देख सकते हैं और सीधे हायर कर सकते हैं।',
      aEn: 'Contractors can browse the marketplace filtered by city, trade (mason, painter, carpenter, plumber), and verified skill grades to book workers directly.',
    },
  ];

  return (
    <section className="py-12 sm:py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-extrabold uppercase tracking-wider">
          {language === 'hi' ? 'अक्सर पूछे जाने वाले सवाल • FAQ' : 'Frequently Asked Questions • FAQ'}
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-[#0B132B] tracking-tight mt-3 mb-4">
          {language === 'hi' ? 'आपके मन में कोई सवाल है?' : 'Got Questions? We Have Answers.'}
        </h2>
        <p className="text-sm sm:text-base text-slate-600">
          {language === 'hi'
            ? 'SHRAMIKK के काम करने के तरीके, भुगतान सुरक्षा और सरकारी लाभों से जुड़ी मुख्य जानकारियां।'
            : 'Clear answers on safety, escrow protection, daily slips, and government welfare benefits.'}
        </p>
      </div>

      {/* Accordion List */}
      <div className="space-y-3.5">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                isOpen
                  ? 'bg-white border-amber-400 shadow-md ring-2 ring-amber-400/10'
                  : 'bg-white/90 border-slate-200 hover:border-slate-300'
              }`}
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 focus:outline-none"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 font-bold text-xs ${
                      isOpen
                        ? 'bg-amber-500 text-slate-950'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {idx + 1}
                  </div>
                  <span className="text-sm sm:text-base font-bold text-[#0B132B]">
                    {language === 'hi' ? faq.qHi : faq.qEn}
                  </span>
                </div>
                <div className="shrink-0 text-slate-400">
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-amber-600" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </div>
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pl-14">
                  {language === 'hi' ? faq.aHi : faq.aEn}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Still Have Questions Box */}
      <div className="mt-10 text-center p-6 rounded-2xl bg-slate-100/80 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-left flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center shrink-0 shadow-xs">
            <MessageCircleQuestion className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#0B132B]">
              {language === 'hi' ? 'कोई अन्य सवाल या सहायता चाहिए?' : 'Have other questions or need support?'}
            </h4>
            <p className="text-xs text-slate-500">
              {language === 'hi'
                ? 'हमारे एआई साथी से तुरंत पूछें या हेल्पलाइन 14567 पर संपर्क करें।'
                : 'Ask our AI Saathi anytime or call the national labour helpline.'}
            </p>
          </div>
        </div>
        <Link
          to="/ai-saathi"
          className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0B132B] text-amber-400 hover:text-white hover:bg-slate-800 text-xs sm:text-sm font-bold shadow-xs transition-all"
        >
          <Sparkles className="w-4 h-4" />
          <span>{language === 'hi' ? 'एआई साथी से पूछें' : 'Ask AI Saathi'}</span>
        </Link>
      </div>
    </section>
  );
};
