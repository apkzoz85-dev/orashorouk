import Image from "next/image";
import { CallLink, LeadButton, WaLink, WhatsAppIcon } from "./actions";
import { LeadForm } from "./lead-form";
import { Phone } from "lucide-react";

export function Heading({
  en,
  title,
  sub,
  light,
  as: Tag = "h2",
}: {
  en: string;
  title: string;
  sub?: string;
  light?: boolean;
  as?: "h2" | "h1";
}) {
  return (
    <div className="max-w-3xl">
      <p dir="ltr" className={`text-right font-latin text-lg uppercase tracking-[0.2em] ${light ? "text-gold" : "text-brass"}`}>
        {en}
      </p>
      <Tag className={`mt-1.5 text-[1.7rem] font-bold leading-snug sm:text-4xl ${light ? "text-white" : "text-deep"}`}>
        {title}
      </Tag>
      {sub && <p className={`mt-3 text-base leading-loose sm:text-lg ${light ? "text-tint" : "text-mut"}`}>{sub}</p>}
    </div>
  );
}

/** هيرو مشترك: صورة كاملة + نص + كارت الفورم */
export function Hero({
  image,
  alt,
  pill,
  children,
  formTitle,
  formSub,
  form,
}: {
  image: string;
  alt: string;
  pill: string;
  children: React.ReactNode;
  formTitle: string;
  formSub: string;
  form: React.ComponentProps<typeof LeadForm>;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-ink text-white">
      <Image src={image} alt={alt} fill priority sizes="100vw" className="-z-10 object-cover" />
      <div className="absolute inset-0 -z-10 bg-ink/70" />
      <div className="mx-auto grid max-w-7xl gap-8 px-4 pb-10 pt-24 sm:px-6 sm:pt-28 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:gap-14 lg:pb-20 lg:pt-36">
        <div>
          <p className="mb-4 inline-block rounded-full border border-white/35 bg-white/10 px-4 py-1.5 text-sm backdrop-blur">
            {pill}
          </p>
          {children}
        </div>
        <div id="register" className="rounded-3xl bg-paper p-5 text-ink shadow-2xl sm:p-7">
          <h2 className="text-2xl font-bold text-deep">{formTitle}</h2>
          <p className="mb-5 mt-1.5 text-sm text-ink/65">{formSub}</p>
          <LeadForm {...form} />
        </div>
      </div>
    </section>
  );
}

export function CtaBand({
  title,
  sub,
  source,
  project,
  msg,
}: {
  title: string;
  sub: string;
  source: string;
  project?: string;
  msg?: string;
}) {
  return (
    <section className="bg-deep text-white">
      <div className="mx-auto flex max-w-7xl flex-col items-start gap-6 px-4 py-12 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold sm:text-3xl">{title}</h2>
          <p className="mt-2 text-tint">{sub}</p>
        </div>
        <div className="grid w-full grid-cols-2 gap-3 sm:flex sm:w-auto">
          <LeadButton
            source={source}
            project={project}
            className="col-span-2 min-h-[52px] rounded-full bg-gold px-7 py-3.5 font-bold text-ink transition hover:bg-white"
          >
            اطلب آخر الأسعار
          </LeadButton>
          <WaLink msg={msg} className="flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-wa px-6 py-3.5 font-bold text-white">
            <WhatsAppIcon /> واتساب
          </WaLink>
          <CallLink className="flex min-h-[52px] items-center justify-center gap-2 rounded-full border border-white/50 px-6 py-3.5 font-bold">
            <Phone className="size-4" aria-hidden /> اتصال
          </CallLink>
        </div>
      </div>
    </section>
  );
}
