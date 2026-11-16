/**
 * ============================================================
 *  إعدادات الموقع — كل ما تحتاج تغييره هنا
 * ============================================================
 */
export const SITE = {
  /** رقم الاتصال والواتساب (نفس رقم orazed.org — غيّره لو مختلف) */
  phoneDisplay: "01030083122",
  phoneIntl: "+201030083122",
  whatsapp: "201030083122",

  /** Web3Forms — ضع الـ Access Key هنا أو في NEXT_PUBLIC_WEB3FORMS_KEY.
   *  بدون مفتاح: الفورم يحوّل العميل على واتساب ببياناته حتى لا يضيع أي ليد. */
  web3formsKey: process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "YOUR_WEB3FORMS_ACCESS_KEY",

  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://example.com",

  /** الجهة المسوّقة — وسيط مستقل وليس وكيلًا معتمدًا */
  agentName: "Grandeur Spaces",

  gtagId: "AW-XXXXXXXXXX",
  conversions: { form: "", whatsapp: "", call: "" },

  agency: { name: "One Click", url: "" },
};

export const WA_DEFAULT_MSG = "مرحبًا، أرغب في معرفة أسعار وتفاصيل مشاريع أورا";

export function waLink(msg: string = WA_DEFAULT_MSG) {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(msg)}`;
}

export const isWeb3Ready = () => !!SITE.web3formsKey && !SITE.web3formsKey.startsWith("YOUR_");
