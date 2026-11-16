import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, MapPin } from "lucide-react";
import { LeadModalProvider } from "@/components/lead-modal";
import { LeadForm } from "@/components/lead-form";
import { CallLink, LeadButton, Reveal, WaLink, WhatsAppIcon } from "@/components/actions";
import { CookieConsent, Footer, Header, StickyActions } from "@/components/chrome";
import { CtaBand, Heading, Hero } from "@/components/ui";
import { UnitsCatalog } from "@/components/units-catalog";
import { Nums } from "@/components/nums";
import { SITE } from "@/lib/config";
import { DEVELOPER, MIN_PRICE, PROJECTS, REGIONS, fmtM, minPriceOf, type Project } from "@/lib/data";

const minM = fmtM(MIN_PRICE);
const names = PROJECTS.map((p) => p.name).join("، ");

const title = `مشاريع أورا للتطوير العقاري | زد إيست، زد ويست، سولانا وسيلڤر ساندس — من ${minM} مليون`;
const description = `كل مشاريع أورا (ORA Developers) في مصر في صفحة واحدة: ${names}. أسعار تبدأ من ${minM} مليون جنيه، طروحات بدون مقدم وتقسيط حتى 10 سنوات. قارن بين المشاريع واعرف الوحدات المتاحة.`;

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "مشاريع أورا",
    "أورا للتطوير العقاري",
    "ORA Developers",
    "زد إيست",
    "زد ويست",
    "سولانا إيست",
    "سولانا ويست",
    "سيلفر ساندس",
    "ليفورا تاور",
    "مشاريع نجيب ساويرس",
  ],
  alternates: { canonical: "/" },
  openGraph: { title, description, type: "website", locale: "ar_EG", images: [{ url: "/images/og.jpg", width: 1200, height: 630 }] },
};

const FAQ = [
  {
    q: "ما هي مشاريع أورا للتطوير العقاري في مصر؟",
    a: `${names}. زد إيست وسولانا إيست في التجمع الخامس، زد ويست في الشيخ زايد، سولانا ويست في نيو زايد، وسيلڤر ساندس في سيدي حنيش بالساحل الشمالي.`,
  },
  {
    q: "من كم تبدأ أسعار مشاريع أورا؟",
    a: PROJECTS.map((p) => {
      const m = minPriceOf(p);
      return m ? `${p.name} من ${fmtM(m)} مليون جنيه` : `${p.name} السعر عند الطلب`;
    }).join("، ") + ". الأسعار أسعار بداية وقابلة للتغيير.",
  },
  {
    q: "ما أنظمة السداد المتاحة في مشاريع أورا؟",
    a: "بدون مقدم وتقسيط 10 سنوات في كلوب سايد ريزيدنس بزد إيست، وبارك سايد ريزيدنس بزد ويست، وسولانا ويست. مقدم 5% ثم 5% بعد 3 أشهر والباقي على 10 سنوات في ليفورا تاور وذا إميرالد وزد ستريب، وعلى 8 سنوات متساوية في سولانا إيست.",
  },
  {
    q: "ما أحدث طروحات أورا؟",
    a: "ليفورا تاور في زد إيست: برج G+30 شقق فندقية مخدومة تبدأ من 13.5 مليون جنيه، وسولانا إيست لين على التسعين الجنوبي: شقق فندقية من 8.9 مليون وعيادات ميديكا من 14 مليون.",
  },
  {
    q: "من هو مطوّر هذه المشاريع؟",
    a: "أورا للتطوير العقاري (ORA Developers)، التي أسسها المهندس نجيب ساويرس.",
  },
  {
    q: "هل هذا الموقع الرسمي لأورا؟",
    a: `لا. هذا موقع تسويقي تديره ${SITE.agentName} كوسيط عقاري مستقل، والأسعار استرشادية. التعاقد يتم مباشرة مع المطوّر.`,
  },
];

function ProjectCard({ p }: { p: Project }) {
  const m = minPriceOf(p);
  const tag = p.phases.find((ph) => ph.tag === "طرح جديد");
  return (
    <article className="grid overflow-hidden rounded-3xl border border-line bg-white sm:grid-cols-[0.85fr_1.15fr]">
      <Link href={`/${p.slug}`} className="relative block aspect-[16/10] sm:aspect-auto sm:min-h-[260px]" aria-label={`صفحة ${p.name}`}>
        <Image src={p.card} alt={`${p.name} ${p.city} — أورا`} fill sizes="(min-width:1024px) 22vw, (min-width:640px) 40vw, 100vw" className="object-cover" />
        {tag && (
          <span className="absolute right-3 top-3 rounded-full bg-gold px-3 py-1 text-xs font-bold text-ink">
            طرح جديد · {tag.name}
          </span>
        )}
      </Link>
      <div className="flex flex-col gap-2.5 p-5 sm:p-6">
        <h3 className="leading-none">
          <span dir="ltr" className="block text-right font-latin text-[2rem] font-semibold text-deep">
            {p.en}
          </span>
          <span className="mt-1 block font-sans text-base font-bold text-ink">
            {p.name} {p.city}
          </span>
        </h3>
        <p className="flex items-center gap-1.5 text-sm text-mut">
          <MapPin className="size-4 shrink-0" aria-hidden />
          {p.place}
        </p>
        <ul className="flex flex-wrap gap-1.5">
          {p.types.map((t) => (
            <li key={t} className="rounded-full bg-tint px-3 py-1 text-xs font-semibold text-deep">
              {t}
            </li>
          ))}
        </ul>
        <p className="text-sm text-mut">
          {m ? (
            <>
              يبدأ من <strong className="font-display text-lg text-cta"><span dir="ltr">{fmtM(m)}</span> مليون</strong> · مقدم{" "}
              <Nums text={p.downLabel} /> · {p.yearsLabel}
            </>
          ) : (
            <strong className="text-cta">الأسعار عند الطلب</strong>
          )}
        </p>
        <div className="mt-auto grid grid-cols-2 gap-2 pt-2">
          <Link
            href={`/${p.slug}`}
            className="flex min-h-[46px] items-center justify-center rounded-full bg-ink px-3 py-2.5 text-sm font-bold text-white transition hover:bg-deep"
          >
            تفاصيل المشروع
          </Link>
          <a
            href={`#units-${p.slug}`}
            className="flex min-h-[46px] items-center justify-center rounded-full border border-ink/25 px-3 py-2.5 text-sm font-bold text-ink transition hover:border-ink"
          >
            أسعار {p.name}
          </a>
        </div>
      </div>
    </article>
  );
}

export default function Page() {
  return (
    <LeadModalProvider
      popup={{
        source: "popup-hub",
        title: "قبل أن تغادر — استلم أسعار مشاريع أورا",
        sub: `أسعار تبدأ من ${minM} مليون جنيه وطروحات بدون مقدم على 10 سنوات. اترك رقمك ونرسل لك المتاح على واتساب.`,
      }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
          }),
        }}
      />
      <Header />
      <main id="top" className="pb-[58px] md:pb-0">
        <Hero
          image="/images/ze-hero.webp"
          alt="مشاريع أورا للتطوير العقاري في مصر"
          pill="القاهرة الجديدة · الشيخ زايد · نيو زايد · الساحل الشمالي"
          formTitle="اعرف الأسعار والمتاح"
          formSub="سجّل في 20 ثانية ونرسل لك أسعار المشروع الذي يهمك على واتساب."
          form={{ source: "hero-hub", idPrefix: "h" }}
        >
          <h1 className="text-[2.4rem] font-extrabold leading-[1.2] sm:text-6xl lg:text-[4rem]">
            مشاريع أورا
            <br />
            <span className="text-gold">للتطوير العقاري</span>
          </h1>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-white/90 sm:text-xl">
            كل مشاريع أورا في صفحة واحدة: الأسعار، أنظمة السداد والوحدات المتاحة.
          </p>
          <dl className="mt-6 grid max-w-xl grid-cols-3 rounded-2xl border border-white/25 bg-white/10 text-center backdrop-blur [&>div+div]:border-s [&>div+div]:border-white/25">
            <div className="px-2 py-4">
              <dt className="text-xs text-white/75">مشاريع</dt>
              <dd className="mt-1 font-display text-xl font-bold sm:text-3xl">{PROJECTS.length}</dd>
            </div>
            <div className="px-2 py-4">
              <dt className="text-xs text-white/75">تبدأ من</dt>
              <dd className="mt-1 font-display text-xl font-bold sm:text-3xl">
                <span dir="ltr">{minM}</span> مليون
              </dd>
            </div>
            <div className="px-2 py-4">
              <dt className="text-xs text-white/75">تقسيط حتى</dt>
              <dd className="mt-1 font-display text-xl font-bold sm:text-3xl">10 سنوات</dd>
            </div>
          </dl>
          <ul className="mt-5 flex flex-wrap gap-2">
            {PROJECTS.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/${p.slug}`}
                  dir="ltr"
                  className="block rounded-full border border-white/45 px-4 py-2 font-latin text-lg font-semibold transition hover:bg-white hover:text-ink"
                >
                  {p.en}
                </Link>
              </li>
            ))}
          </ul>
        </Hero>

        {/* ============ PROJECTS BY REGION ============ */}
        <section id="projects" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
          <Reveal>
            <Heading
              en="Projects"
              title="مشاريع أورا في مصر"
              sub="خمسة مشاريع مقسّمة حسب المنطقة. لكل مشروع صفحة كاملة بتفاصيله ووحداته."
            />
          </Reveal>
          <div className="mt-10 space-y-10">
            {REGIONS.map((r) => {
              const list = PROJECTS.filter((p) => p.region === r.id);
              return (
                <Reveal key={r.id}>
                  <div className="mb-4 flex items-center gap-4">
                    <h3 className="text-xl font-bold text-deep sm:text-2xl">{r.name}</h3>
                    <span className="h-px flex-1 bg-line" />
                    <span className="text-sm text-mut">{list.length === 1 ? "مشروع واحد" : `${list.length} مشاريع`}</span>
                  </div>
                  <div className="grid gap-5 lg:grid-cols-2">
                    {list.map((p) => (
                      <ProjectCard key={p.slug} p={p} />
                    ))}
                    {list.length % 2 === 1 && (
                      <div className="flex flex-col justify-center gap-3 rounded-3xl bg-deep p-6 text-white sm:p-8">
                        <h3 className="text-2xl font-bold">لا تعرف أي مشروع يناسبك؟</h3>
                        <p className="leading-loose text-tint">أخبرنا بالميزانية والمنطقة، ومستشار المبيعات يرشّح لك الأنسب.</p>
                        <div className="grid grid-cols-2 gap-2 sm:flex">
                          <LeadButton
                            source="hub-help-box"
                            title="رشّح لي مشروعًا"
                            sub="اختر المشروع الأقرب لك أو «لم أحدد بعد»، وسنتواصل معك بالترشيح المناسب."
                            cta="رشّح لي مشروعًا"
                            className="min-h-[48px] rounded-full bg-gold px-6 py-3 font-bold text-ink transition hover:bg-white"
                          >
                            رشّح لي مشروعًا
                          </LeadButton>
                          <WaLink className="flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-wa px-6 py-3 font-bold text-white">
                            <WhatsAppIcon /> واتساب
                          </WaLink>
                        </div>
                      </div>
                    )}
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* ============ COMPARE ============ */}
        <section id="compare" className="bg-white py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <Reveal>
              <Heading en="Compare" title="قارن بين مشاريع أورا" sub="أسعار البداية وأنظمة السداد لكل مشروع جنبًا إلى جنب." />
            </Reveal>
            <Reveal>
              {/* ديسكتوب: جدول */}
              <div className="mt-8 hidden overflow-hidden rounded-3xl border border-line md:block">
                <table className="w-full border-collapse text-right">
                  <thead className="bg-paper">
                    <tr>
                      {["المشروع", "المنطقة", "الوحدات", "يبدأ من", "المقدم", "التقسيط", ""].map((h, i) => (
                        <th key={i} scope="col" className="px-5 py-4 text-sm font-semibold text-mut">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {PROJECTS.map((p) => {
                      const m = minPriceOf(p);
                      return (
                        <tr key={p.slug} className="border-t border-line">
                          <th scope="row" className="px-5 py-4">
                            <span dir="ltr" className="block text-right font-latin text-2xl font-semibold text-deep">
                              {p.en}
                            </span>
                          </th>
                          <td className="px-5 py-4 text-[15px]">{p.city}</td>
                          <td className="px-5 py-4 text-sm text-mut">{p.types.join(" · ")}</td>
                          <td className="px-5 py-4 font-display font-bold text-cta">
                            {m ? (
                              <>
                                <span dir="ltr">{fmtM(m)}</span> مليون
                              </>
                            ) : (
                              "عند الطلب"
                            )}
                          </td>
                          <td className="px-5 py-4 text-[15px]">
                            <Nums text={p.downLabel} />
                          </td>
                          <td className="px-5 py-4 text-[15px]">{p.yearsLabel}</td>
                          <td className="px-5 py-3">
                            <Link href={`/${p.slug}`} className="inline-flex min-h-[44px] items-center rounded-full bg-ink px-5 text-sm font-bold text-white hover:bg-deep">
                              التفاصيل
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              {/* موبايل: كروت */}
              <ul className="mt-8 grid gap-3 md:hidden">
                {PROJECTS.map((p) => {
                  const m = minPriceOf(p);
                  return (
                    <li key={p.slug} className="rounded-2xl border border-line p-4">
                      <div className="flex items-baseline justify-between gap-3">
                        <span dir="ltr" className="font-latin text-2xl font-semibold text-deep">
                          {p.en}
                        </span>
                        <span className="text-sm text-mut">{p.city}</span>
                      </div>
                      <dl className="mt-3 grid grid-cols-3 gap-2 text-center">
                        {[
                          ["يبدأ من", m ? `${fmtM(m)} مليون` : "عند الطلب"],
                          ["المقدم", p.downLabel],
                          ["التقسيط", p.yearsLabel],
                        ].map(([k, v]) => (
                          <div key={k} className="rounded-xl bg-paper px-1 py-2.5">
                            <dt className="text-[11px] text-mut">{k}</dt>
                            <dd className="mt-0.5 text-sm font-bold text-deep">
                              <Nums text={v} />
                            </dd>
                          </div>
                        ))}
                      </dl>
                      <Link href={`/${p.slug}`} className="mt-3 flex min-h-[44px] items-center justify-center rounded-full bg-ink text-sm font-bold text-white">
                        تفاصيل {p.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </Reveal>
          </div>
        </section>

        {/* ============ UNITS ============ */}
        <section id="units" className="bg-ink py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <Reveal>
              <Heading
                light
                en="Units & Prices"
                title="الوحدات والأسعار — المتاح من أورا"
                sub="أسعار بداية كل نوع حسب آخر متاح. اختر المشروع أو رتّب بالسعر، واطلب المتاح من أي وحدة."
              />
            </Reveal>
            <div className="mt-8">
              <UnitsCatalog dark />
            </div>
            <p className="mt-8 text-center text-xs text-tint/80">
              * الأسعار استرشادية وأسعار بداية، وتختلف حسب الدور والإطلالة، وقابلة للتغيير من المطوّر دون إشعار مسبق. الصور تعبيرية.
            </p>
          </div>
        </section>

        <CtaBand title="تريد معرفة المتاح حاليًا في مشاريع أورا؟" sub="الوحدات والأسعار تتحدث باستمرار — اطلب آخر تحديث." source="hub-cta-band" />

        {/* ============ DEVELOPER ============ */}
        <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:py-24">
          <Reveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
              <Image src="/images/zw-hero.webp" alt="ZED Park في زد ويست الشيخ زايد — أورا" fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <Heading en="Developer" title="أورا للتطوير العقاري" />
            {DEVELOPER.map((t) => (
              <p key={t} className="mt-4 text-lg leading-loose text-ink/80">
                {t}
              </p>
            ))}
          </Reveal>
        </section>

        {/* ============ FAQ ============ */}
        <section id="faq" className="bg-white py-16 lg:py-24">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <Reveal>
              <Heading en="FAQ" title="أسئلة شائعة عن مشاريع أورا" />
            </Reveal>
            <div className="mt-8 divide-y divide-line border-y border-line">
              {FAQ.map((f) => (
                <details key={f.q} className="group py-1">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 [&::-webkit-details-marker]:hidden">
                    <h3 className="font-sans text-base font-bold text-deep sm:text-lg">{f.q}</h3>
                    <ChevronDown className="size-5 shrink-0 transition group-open:rotate-180" aria-hidden />
                  </summary>
                  <p className="pb-5 leading-loose text-ink/80">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ============ CONTACT ============ */}
        <section id="contact" className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-24">
          <div>
            <Heading en="Contact" title="سجّل ونتواصل معك" sub="مستشار المبيعات يرسل لك أسعار المشروع الذي يهمك والوحدات المتاحة على واتساب." />
            <div className="mt-6 flex flex-wrap gap-3">
              <WaLink className="flex min-h-[50px] items-center gap-2 rounded-full bg-wa px-6 py-3 font-bold text-white">
                <WhatsAppIcon /> واتساب
              </WaLink>
              <CallLink className="flex min-h-[50px] items-center gap-2 rounded-full border border-ink/25 px-6 py-3 font-bold text-ink" />
            </div>
          </div>
          <div className="rounded-3xl border border-line bg-white p-5 sm:p-7">
            <h3 className="mb-4 text-2xl font-bold text-deep">سجّل اهتمامك</h3>
            <LeadForm source="footer-hub" idPrefix="b" cta="سجّل الآن" />
          </div>
        </section>
      </main>
      <Footer />
      <StickyActions />
      <CookieConsent />
    </LeadModalProvider>
  );
}
