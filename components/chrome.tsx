"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { CallLink, LeadButton, WaLink, WhatsAppIcon } from "./actions";
import { SITE } from "@/lib/config";
import { PROJECTS } from "@/lib/data";

export function Wordmark({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="flex flex-col leading-none" aria-label="مشاريع أورا — الرئيسية">
      <span className={`whitespace-nowrap font-display text-lg font-bold sm:text-xl ${light ? "text-white" : "text-deep"}`}>
        مشاريع أورا
      </span>
      <span
        dir="ltr"
        className={`mt-1 whitespace-nowrap font-latin text-[0.6rem] tracking-[0.28em] sm:text-[0.66rem] ${light ? "text-white/75" : "text-brass"}`}
      >
        ORA PROJECTS · EGYPT
      </span>
    </Link>
  );
}

export function Header({ project }: { project?: string }) {
  const [solid, setSolid] = useState(false);
  const [menu, setMenu] = useState(false);
  useEffect(() => {
    const f = () => setSolid(window.scrollY > 40);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  const on = solid || menu;
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        on ? "bg-paper/95 shadow-md backdrop-blur" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[64px] max-w-7xl items-center justify-between gap-3 px-4 sm:h-[72px] sm:px-6">
        <Wordmark light={!on} />
        <nav className="hidden items-center gap-5 xl:flex" aria-label="المشاريع">
          {PROJECTS.map((p) => (
            <Link
              key={p.slug}
              href={`/${p.slug}`}
              dir="ltr"
              aria-current={project === p.slug ? "page" : undefined}
              className={`font-latin text-[1.05rem] font-semibold transition hover:opacity-70 ${
                on ? "text-ink" : "text-white"
              } ${project === p.slug ? "underline decoration-gold decoration-2 underline-offset-8" : ""}`}
            >
              {p.en}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <CallLink
            label="اتصل بنا"
            className={`hidden items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-bold md:flex ${
              on ? "border-ink/25 text-ink" : "border-white/50 text-white"
            }`}
          />
          <LeadButton
            source={`header-${project || "hub"}`}
            project={project ? PROJECTS.find((p) => p.slug === project)?.name : undefined}
            className={`shrink-0 whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-bold transition ${
              on ? "bg-ink text-white hover:bg-deep" : "bg-gold text-ink hover:bg-white"
            }`}
          >
            سجّل اهتمامك
          </LeadButton>
          <button
            type="button"
            aria-label={menu ? "إغلاق القائمة" : "قائمة المشاريع"}
            aria-expanded={menu}
            onClick={() => setMenu(!menu)}
            className={`flex size-11 items-center justify-center rounded-full xl:hidden ${on ? "text-ink" : "text-white"}`}
          >
            {menu ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>
      {menu && (
        <nav className="border-t border-line bg-paper px-4 pb-4 xl:hidden" aria-label="المشاريع">
          <ul className="mx-auto grid max-w-7xl gap-1 pt-2">
            <li>
              <Link href="/" onClick={() => setMenu(false)} className="block rounded-xl px-3 py-3 font-bold text-deep hover:bg-tint">
                كل مشاريع أورا
              </Link>
            </li>
            {PROJECTS.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/${p.slug}`}
                  onClick={() => setMenu(false)}
                  className="flex items-center justify-between rounded-xl px-3 py-3 hover:bg-tint"
                >
                  <span className="font-semibold text-ink">
                    {p.name} <span className="text-sm font-normal text-mut">— {p.city}</span>
                  </span>
                  <span dir="ltr" className="font-latin text-lg font-semibold text-brass">
                    {p.en}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}

export function StickyActions({ project, msg }: { project?: string; msg?: string }) {
  return (
    <>
      <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-[1fr_1fr_1.4fr] gap-px border-t border-ink/10 bg-ink/10 pb-[env(safe-area-inset-bottom)] shadow-[0_-6px_24px_rgb(0_0_0/0.12)] md:hidden">
        <CallLink label="اتصال" className="flex items-center justify-center gap-2 bg-white py-3.5 text-sm font-bold text-deep">
          <Phone className="size-4" aria-hidden />
          اتصال
        </CallLink>
        <WaLink msg={msg} className="flex items-center justify-center gap-2 bg-white py-3.5 text-sm font-bold text-wa">
          <WhatsAppIcon className="size-5" />
          واتساب
        </WaLink>
        <LeadButton source={`mobile-bar-${project || "hub"}`} project={project} className="bg-cta py-3.5 text-sm font-bold text-white">
          اطلب الأسعار
        </LeadButton>
      </div>
      <CallLink
        label="اتصل بنا"
        className="call-pulse fixed bottom-[92px] left-6 z-40 hidden size-14 items-center justify-center rounded-full bg-deep text-white shadow-xl transition hover:bg-ink md:flex"
      >
        <Phone className="size-6" aria-hidden />
      </CallLink>
      <WaLink
        msg={msg}
        label="تواصل واتساب"
        className="wa-pulse fixed bottom-6 left-6 z-40 hidden size-14 items-center justify-center rounded-full bg-wa text-white shadow-xl md:flex"
      >
        <WhatsAppIcon className="size-7" />
      </WaLink>
    </>
  );
}

export function CookieConsent() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    try {
      if (!localStorage.getItem("cookie_ok")) setShow(true);
    } catch {}
  }, []);
  if (!show) return null;
  const ok = () => {
    try {
      localStorage.setItem("cookie_ok", "1");
    } catch {}
    setShow(false);
  };
  return (
    <div className="fixed inset-x-3 bottom-[68px] z-30 mx-auto flex max-w-xl items-center gap-3 rounded-2xl bg-ink/95 px-4 py-3 text-xs text-white shadow-xl md:bottom-5 md:left-auto md:right-5 md:mx-0">
      <p className="flex-1 leading-relaxed">نستخدم ملفات الارتباط (Cookies) لتحسين تجربتك وقياس أداء الإعلانات.</p>
      <button onClick={ok} className="rounded-full bg-white px-4 py-1.5 font-bold text-ink">
        موافق
      </button>
    </div>
  );
}

function PrivacyButton({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" className={className} onClick={() => setOpen(true)}>
        سياسة الخصوصية
      </button>
      {open && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/70 p-4" onClick={() => setOpen(false)}>
          <div
            role="dialog"
            aria-modal="true"
            aria-label="سياسة الخصوصية"
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[85dvh] w-full max-w-lg overflow-y-auto rounded-3xl bg-white p-6 text-right text-sm leading-loose text-ink/80"
          >
            <button onClick={() => setOpen(false)} aria-label="إغلاق" className="absolute left-3 top-3 rounded-full p-2 hover:bg-ink/10">
              <X className="size-5" />
            </button>
            <h2 className="mb-3 text-xl font-bold text-deep">سياسة الخصوصية</h2>
            <p>
              هذا الموقع تديره {SITE.agentName} كوسيط عقاري مستقل، وهو موقع تسويقي وليس الموقع الرسمي لشركة أورا
              للتطوير العقاري.
            </p>
            <p className="mt-3">
              <strong>البيانات التي نجمعها:</strong> الاسم ورقم الهاتف والمشروع الذي تهتم به عند التسجيل، وبيانات
              تصفح عامة عبر ملفات الارتباط.
            </p>
            <p className="mt-3">
              <strong>استخدام البيانات:</strong> للتواصل معك بخصوص طلبك فقط. لا نبيع بياناتك ولا نشاركها خارج عملية
              البيع.
            </p>
            <p className="mt-3">
              <strong>حقوقك:</strong> يمكنك طلب حذف بياناتك في أي وقت بالتواصل على{" "}
              <span dir="ltr">{SITE.phoneDisplay}</span>.
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export function Footer() {
  return (
    <footer className="bg-ink pb-24 pt-12 text-white/70 md:pb-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <Wordmark light />
          <nav className="flex flex-wrap gap-x-5 gap-y-2" aria-label="روابط المشاريع">
            {PROJECTS.map((p) => (
              <Link key={p.slug} href={`/${p.slug}`} className="text-sm text-white/80 hover:text-white">
                {p.name}
              </Link>
            ))}
          </nav>
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <CallLink className="flex items-center gap-2 font-bold text-white" />
            <WaLink className="flex items-center gap-2 font-bold text-white">
              <WhatsAppIcon className="size-4" /> واتساب
            </WaLink>
            <PrivacyButton className="underline underline-offset-4 hover:text-white" />
          </div>
        </div>
        <div className="mt-8 space-y-3 border-t border-white/10 pt-6 text-xs leading-relaxed text-white/60">
          <p>
            <strong className="text-white/85">إفصاح:</strong> هذا الموقع تديره {SITE.agentName} كوسيط عقاري مستقل،
            وهو موقع تسويقي وليس الموقع الرسمي لشركة أورا للتطوير العقاري. جميع العلامات التجارية وأسماء المشروعات
            ملك لأصحابها، والتعاقد يتم مباشرة مع المطوّر.
          </p>
          <p>
            <strong className="text-white/85">الأسعار استرشادية:</strong> الأسعار والمساحات وأنظمة السداد أسعار بداية
            حسب آخر متاح، وتختلف حسب الدور والإطلالة، وقابلة للتغيير دون إشعار مسبق. الصور تعبيرية.
          </p>
        </div>
        <div className="mt-6 flex flex-col gap-2 text-xs text-white/45 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} مشاريع أورا — صفحة تسويقية.</p>
          <p dir="ltr">
            Designed &amp; Managed by{" "}
            {SITE.agency.url ? (
              <a href={SITE.agency.url} target="_blank" rel="nofollow noopener" className="hover:text-white">
                {SITE.agency.name}
              </a>
            ) : (
              SITE.agency.name
            )}
          </p>
        </div>
      </div>
    </footer>
  );
}
