/**
 * ============================================================
 *  إعدادات الموقع — كل ما تحتاج تغييره هنا
 * ============================================================
 */
export const SITE = {
  /** رقم الاتصال والواتساب (نفس رقم orazed.org — غيّره لو مختلف) */
  phoneDisplay: "01020068999",
  phoneIntl: "+201020068999",
  whatsapp: "201020068999",

  /** Web3Forms — ضع الـ Access Key هنا أو في NEXT_PUBLIC_WEB3FORMS_KEY.
   *  بدون مفتاح: الفورم يحوّل العميل على واتساب ببياناته حتى لا يضيع أي ليد. */
  web3formsKey: process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "5f3b022f-38b7-4347-82f2-02b4892d66f0",

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
