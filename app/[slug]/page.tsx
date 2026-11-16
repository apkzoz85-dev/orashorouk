import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { LeadModalProvider } from "@/components/lead-modal";
import { LeadForm } from "@/components/lead-form";
import { CallLink, LeadButton, Reveal, WaLink, WhatsAppIcon } from "@/components/actions";
import { CookieConsent, Footer, Header, StickyActions } from "@/components/chrome";
import { CtaBand, Heading, Hero } from "@/components/ui";
import { UnitsCatalog } from "@/components/units-catalog";
import { Nums } from "@/components/nums";
import { SITE } from "@/lib/config";
import { DEVELOPER, PROJECTS, fmt, fmtM, minPriceOf, type Project } from "@/lib/data";

export const dynamicParams = false;
export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

const find = (slug: string) => PROJECTS.find((p) => p.slug === slug);

function meta(p: Project) {
  const m = minPriceOf(p);
  const price = m ? `من ${fmtM(m)} مليون` : "الأسعار والوحدات المتاحة";
  return {
    title: `${p.name} ${p.city} من أورا | ${p.en} — ${price}`,
    description: `${p.name} (${p.en}) من أورا للتطوير العقاري في ${p.place}. ${p.tagline} ${
      m ? `أسعار تبدأ من ${fmt(m)} جنيه، مقدم ${p.downLabel} وتقسيط ${p.yearsLabel}.` : "اطلب الأسعار والوحدات المتاحة."
    }`,
  };
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = find((await params).slug);
  if (!p) return {};
  const { title, description } = meta(p);
  return {
    title,
    description,
    keywords: [p.name, p.en, `${p.name} ${p.city}`, `أسعار ${p.name}`, `${p.en} ORA`, ...p.phases.map((ph) => ph.name), "أورا للتطوير العقاري"],
    alternates: { canonical: `/${p.slug}` },
    openGraph: { title, description, type: "website", locale: "ar_EG", images: [{ url: p.hero }] },
  };
}

function faq(p: Project) {
  const m = minPriceOf(p);
  const priced = p.phases.filter((ph) => ph.units.some((u) => u.price));
  return [
    {
      q: `من كم تبدأ أسعار ${p.name}؟`,
      a: m
        ? `تبدأ أسعار ${p.name} من ${fmt(m)} جنيه. ${priced
            .map((ph) => `${ph.name} من ${fmt(Math.min(...ph.units.map((u) => u.price ?? Infinity)))} جنيه`)
            .join("، ")}. الأسعار أسعار بداية وقابلة للتغيير.`
        : `${p.priceNote} سجّل بياناتك ونرسل لك آخر متاح.`,
    },
    {
      q: `ما أنظمة السداد في ${p.name}؟`,
      a: p.phases.map((ph) => `${ph.name}: ${ph.plan}`).join(". ") + ".",
    },
    { q: `أين يقع مشروع ${p.name}؟`, a: `${p.name} (${p.en}) يقع في ${p.place}. ${p.distances.map(([t, d]) => `${d}: ${t}`).join("، ")}.` },
    {
      q: `ما الوحدات المتاحة في ${p.name}؟`,
      a: p.phases.map((ph) => `${ph.name}: ${[...new Set(ph.units.map((u) => u.type))].join("، ")}`).join(". ") + ".",
    },
    { q: `من هو مطوّر ${p.name}؟`, a: "أورا للتطوير العقاري (ORA Developers)، التي أسسها المهندس نجيب ساويرس." },
    {
      q: "هل هذا الموقع الرسمي لأورا؟",
      a: `لا. هذا موقع تسويقي تديره ${SITE.agentName} كوسيط عقاري مستقل، والأسعار استرشادية. التعاقد يتم مباشرة مع المطوّر.`,
    },
  ];
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const p = find((await params).slug);
  if (!p) notFound();
  const m = minPriceOf(p);
  const FAQ = faq(p);
  const waMsg = `مرحبًا، أرغب في معرفة أسعار وتفاصيل ${p.name} (${p.en}) من أورا`;
  const unitOptions = [...new Set(p.phases.length > 1 ? p.phases.map((ph) => ph.name) : p.phases[0].units.map((u) => u.type))].slice(0, 5);
  const options = [...unitOptions, "لم أحدد بعد"];
  const others = PROJECTS.filter((x) => x.slug !== p.slug);

  return (
    <LeadModalProvider
      popup={{
        source: `popup-${p.slug}`,
        project: p.name,
        options,
        title: `قبل أن تغادر — استلم أسعار ${p.name}`,
        sub: m
          ? `أسعار تبدأ من ${fmtM(m)} مليون جنيه • مقدم ${p.downLabel} • تقسيط ${p.yearsLabel}. اترك رقمك ونرسل لك المتاح على واتساب.`
          : "اترك رقمك ونرسل لك الأسعار والوحدات المتاحة على واتساب.",
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
      <Header project={p.slug} />
      <main id="top" className="pb-[58px] md:pb-0">
        <Hero
          image={p.hero}
          alt={`${p.name} ${p.city} — ${p.en} من أورا`}
          pill={`أورا · ${p.place}`}
          formTitle={`أسعار ${p.name} والمتاح`}
          formSub={`سجّل في 20 ثانية ونرسل لك أسعار ${p.name} والوحدات المتاحة على واتساب.`}
          form={{ source: `hero-${p.slug}`, project: p.name, options, label: p.phases.length > 1 ? "مهتم بأي طرح؟" : "مهتم بأي وحدة؟", idPrefix: "h" }}
        >
          <h1 className="leading-none">
            <span dir="ltr" className="block text-right font-latin text-[3.4rem] font-semibold sm:text-7xl lg:text-[5.5rem]">
              {p.en}
            </span>
            <span className="mt-2 block text-2xl font-bold text-gold sm:text-3xl">
              {p.name} {p.city} من أورا
            </span>
          </h1>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-white/90 sm:text-xl">{p.tagline}</p>
          <dl className="mt-6 grid max-w-xl grid-cols-3 rounded-2xl border border-white/25 bg-white/10 text-center backdrop-blur [&>div+div]:border-s [&>div+div]:border-white/25">
            <div className="px-2 py-4">
              <dt className="text-xs text-white/75">{m ? "تبدأ من" : "الأسعار"}</dt>
              <dd className="mt-1 font-display text-lg font-bold sm:text-2xl">
                {m ? (
                  <>
                    <span dir="ltr">{fmtM(m)}</span> مليون
                  </>
                ) : (
                  "عند الطلب"
                )}
              </dd>
            </div>
            <div className="px-2 py-4">
              <dt className="text-xs text-white/75">المقدم</dt>
              <dd className="mt-1 font-display text-lg font-bold sm:text-2xl">
                <Nums text={p.downLabel} />
              </dd>
            </div>
            <div className="px-2 py-4">
              <dt className="text-xs text-white/75">التقسيط</dt>
              <dd className="mt-1 font-display text-lg font-bold sm:text-2xl">{p.yearsLabel}</dd>
            </div>
          </dl>
          <div className="mt-6 hidden items-center gap-3 lg:flex">
            <WaLink msg={waMsg} className="flex items-center gap-2 rounded-full bg-wa px-6 py-3.5 font-bold text-white transition hover:brightness-110">
              <WhatsAppIcon /> اسأل على واتساب
            </WaLink>
            <CallLink className="flex items-center gap-2 rounded-full border border-white/50 px-6 py-3.5 font-bold" />
          </div>
        </Hero>

        {/* ============ FACTS STRIP ============ */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6">
          <ul
            className={`relative z-10 -mt-6 grid grid-cols-2 overflow-hidden rounded-3xl border border-line bg-white shadow-lg sm:grid-cols-3 ${
              p.facts.length >= 6 ? "lg:grid-cols-6" : "lg:grid-cols-4"
            }`}
          >
            {p.facts.map((f) => (
              <li key={f.label} className="border-b border-s border-line px-3 py-5 text-center">
                <span className="block font-display text-xl font-bold text-deep sm:text-2xl">{f.value}</span>
                <span className="mt-1 block text-xs text-mut sm:text-sm">{f.label}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* ============ ABOUT ============ */}
        <section id="about" className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-24">
          <Reveal>
            <Heading en="About" title={`عن مشروع ${p.name} ${p.city}`} />
            {p.about.map((t) => (
              <p key={t} className="mt-4 text-[17px] leading-loose text-ink/80">
                {t}
              </p>
            ))}
          </Reveal>
          <Reveal delay={120}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
              <Image src={p.aboutImage} alt={`${p.name} — ${p.en}`} fill sizes="(min-width:1024px) 45vw, 100vw" className="object-cover" />
            </div>
          </Reveal>
        </section>

        {/* ============ PHASES ============ */}
        <section id="phases" className="bg-white py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <Reveal>
              <Heading en="Phases" title={`الطروحات المتاحة في ${p.name}`} />
            </Reveal>
            <div className={`mt-8 grid gap-5 sm:grid-cols-2 ${p.phases.length >= 4 ? "xl:grid-cols-4" : "lg:grid-cols-3"}`}>
              {p.phases.map((ph, i) => {
                const pm = Math.min(...ph.units.map((u) => u.price ?? Infinity));
                return (
                  <Reveal key={ph.id} delay={(i % 4) * 80} className="h-full">
                    <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-paper">
                      <div className="relative aspect-[16/9]">
                        <Image src={ph.image} alt={`${ph.name} — ${p.name}`} fill sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw" className="object-cover" />
                        {ph.tag && <span className="absolute right-3 top-3 rounded-full bg-gold px-3 py-1 text-xs font-bold text-ink">{ph.tag}</span>}
                      </div>
                      <div className="flex flex-1 flex-col p-5">
                        <p dir="ltr" className="text-right font-latin text-2xl font-semibold leading-tight text-deep">
                          {ph.en}
                        </p>
                        <h3 className="mt-0.5 font-sans text-base font-bold text-ink">{ph.name}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-mut">{ph.intro}</p>
                        <p className="mt-3 rounded-xl bg-tint px-3 py-2 text-[13px] font-semibold leading-relaxed text-deep">
                          <Nums text={ph.plan} />
                        </p>
                        <div className="mt-auto flex items-center justify-between gap-2 pt-4">
                          <span className="font-display text-lg font-bold text-cta">
                            {Number.isFinite(pm) ? (
                              <>
                                من <span dir="ltr">{fmtM(pm)}</span> مليون
                              </>
                            ) : (
                              "السعر عند الطلب"
                            )}
                          </span>
                          <LeadButton
                            source={`phase-${p.slug}-${ph.id}`}
                            project={p.name}
                            options={options}
                            unit={p.phases.length > 1 ? ph.name : undefined}
                            title={`${ph.name} — ${p.name}`}
                            sub="نرسل لك الوحدات المتاحة والأسعار وخطة السداد على واتساب."
                            className="min-h-[44px] rounded-full bg-ink px-4 py-2 text-sm font-bold text-white hover:bg-deep"
                          >
                            اطلب المتاح
                          </LeadButton>
                        </div>
                      </div>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ============ UNITS ============ */}
        <section id="units" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
          <Reveal>
            <Heading
              en="Units & Prices"
              title={`وحدات وأسعار ${p.name}`}
              sub={p.priceNote || "أسعار البداية لكل نوع وحدة حسب آخر متاح من أورا. اختر الوحدة واطلب المتاح منها."}
            />
          </Reveal>
          <div className="mt-8">
            <UnitsCatalog project={p.slug} />
          </div>
          <p className="mt-8 text-center text-xs text-mut">
            * الأسعار استرشادية وأسعار بداية، وتختلف حسب الدور والإطلالة، وقابلة للتغيير من المطوّر دون إشعار مسبق. الصور تعبيرية.
          </p>
        </section>

        <CtaBand
          title={`تريد معرفة المتاح حاليًا في ${p.name}؟`}
          sub="الوحدات والأسعار تتحدث باستمرار — اطلب آخر تحديث."
          source={`cta-band-${p.slug}`}
          project={p.name}
          msg={waMsg}
        />

        {/* ============ GALLERY ============ */}
        <section className="bg-white py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <Reveal>
              <Heading en="Gallery" title={`صور ${p.name}`} />
            </Reveal>
            <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3">
              {p.gallery.map((src, i) => (
                <div key={src} className={`relative overflow-hidden rounded-2xl ${i === 0 ? "col-span-2 aspect-[16/9] md:row-span-2 md:aspect-auto" : "aspect-[4/3]"}`}>
                  <Image src={src} alt={`${p.name} ${p.city} — صورة ${i + 1}`} fill sizes="(min-width:768px) 50vw, 100vw" className="object-cover transition duration-700 hover:scale-105" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ LOCATION ============ */}
        <section id="location" className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:py-24">
          <Reveal>
            <Heading en="Location" title={`موقع ${p.name}`} sub={p.place} />
            <ul className="mt-6 grid grid-cols-2 gap-3">
              {p.distances.map(([t, d]) => (
                <li key={d} className="rounded-2xl bg-white p-4 ring-1 ring-line">
                  <span className="block font-display text-lg font-bold text-cta">{t}</span>
                  <span className="text-sm text-mut">{d}</span>
                </li>
              ))}
            </ul>
            <ul className="mt-5 flex flex-wrap gap-2">
              {p.nearby.map((n) => (
                <li key={n} className="rounded-full border border-ink/15 px-3 py-1.5 text-sm text-ink/80">
                  {n}
                </li>
              ))}
            </ul>
            <LeadButton
              source={`location-${p.slug}`}
              project={p.name}
              options={options}
              title="الموقع وموعد المعاينة"
              sub="اترك رقمك ونرسل لك الموقع على واتساب وننسّق موعد زيارة."
              cta="أرسل لي الموقع"
              className="mt-7 min-h-[52px] rounded-full bg-cta px-7 py-3.5 font-bold text-white transition hover:bg-cta2"
            >
              احجز معاينة للموقع
            </LeadButton>
          </Reveal>
          <Reveal delay={120}>
            <div className="overflow-hidden rounded-3xl bg-tint">
              <iframe
                title={`موقع ${p.name} على الخريطة`}
                src={`https://www.google.com/maps?q=${encodeURIComponent(p.mapQuery)}&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="aspect-[4/3] w-full border-0"
              />
            </div>
          </Reveal>
        </section>

        {/* ============ DEVELOPER + OTHER PROJECTS ============ */}
        <section className="bg-deep py-16 text-white lg:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <Heading light en="Developer" title="عن المطوّر — أورا" />
            <div className="mt-4 max-w-3xl space-y-3">
              {DEVELOPER.map((t) => (
                <p key={t} className="text-[17px] leading-loose text-tint">
                  {t}
                </p>
              ))}
            </div>
            <h3 className="mt-10 text-xl font-bold">باقي مشاريع أورا</h3>
            <ul className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
              {others.map((o) => {
                const om = minPriceOf(o);
                return (
                  <li key={o.slug}>
                    <Link href={`/${o.slug}`} className="group block overflow-hidden rounded-2xl bg-white/10 transition hover:bg-white/15">
                      <div className="relative aspect-[16/10]">
                        <Image src={o.card} alt={`${o.name} ${o.city}`} fill sizes="(min-width:1024px) 25vw, 50vw" className="object-cover" />
                      </div>
                      <div className="p-3.5">
                        <span dir="ltr" className="block text-right font-latin text-xl font-semibold">
                          {o.en}
                        </span>
                        <span className="block text-xs text-tint">{o.city}</span>
                        <span className="mt-1 block text-sm font-bold text-gold">{om ? `من ${fmtM(om)} مليون` : "عند الطلب"}</span>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        {/* ============ FAQ ============ */}
        <section id="faq" className="bg-white py-16 lg:py-24">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <Heading en="FAQ" title={`أسئلة شائعة عن ${p.name}`} />
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

        {/* ============ FINAL FORM ============ */}
        <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-24">
          <div>
            <Heading
              en="Contact"
              title={`احجز وحدتك في ${p.name}`}
              sub={m ? `من ${fmtM(m)} مليون جنيه • مقدم ${p.downLabel} • تقسيط ${p.yearsLabel}` : "اطلب الأسعار والوحدات المتاحة الآن."}
            />
            <div className="mt-6 flex flex-wrap gap-3">
              <WaLink msg={waMsg} className="flex min-h-[50px] items-center gap-2 rounded-full bg-wa px-6 py-3 font-bold text-white">
                <WhatsAppIcon /> واتساب
              </WaLink>
              <CallLink className="flex min-h-[50px] items-center gap-2 rounded-full border border-ink/25 px-6 py-3 font-bold text-ink" />
            </div>
          </div>
          <div className="rounded-3xl border border-line bg-white p-5 sm:p-7">
            <h3 className="mb-4 text-2xl font-bold text-deep">سجّل اهتمامك</h3>
            <LeadForm source={`footer-${p.slug}`} project={p.name} options={options} idPrefix="b" cta="سجّل الآن" />
          </div>
        </section>
      </main>
      <Footer />
      <StickyActions project={p.name} msg={waMsg} />
      <CookieConsent />
    </LeadModalProvider>
  );
}
