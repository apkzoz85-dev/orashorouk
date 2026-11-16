"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { ArrowDownUp, Phone } from "lucide-react";
import { ALL_UNITS, PROJECTS, fmt, type FlatUnit } from "@/lib/data";
import { CallLink, LeadButton, WaLink, WhatsAppIcon } from "./actions";
import { Nums } from "./nums";

type Tab = { id: string; label: string };

/**
 * كتالوج الوحدات (تقسيمة سوديك): تابات + ترتيب بالسعر + كروت وحدات.
 * - في الهَب: التابات = المشاريع، ورابط #units-zed-east يفتح الفلتر على المشروع.
 * - في صفحة المشروع: التابات = الطروحات (ليفورا، كلوب سايد…).
 */
export function UnitsCatalog({ project, dark = false }: { project?: string; dark?: boolean }) {
  const base: FlatUnit[] = useMemo(
    () => (project ? ALL_UNITS.filter((u) => u.project === project) : ALL_UNITS),
    [project],
  );
  const tabs: Tab[] = useMemo(() => {
    if (!project) return [{ id: "all", label: "كل المشاريع" }, ...PROJECTS.map((p) => ({ id: p.slug, label: p.name }))];
    const phases = PROJECTS.find((p) => p.slug === project)!.phases;
    return phases.length > 1
      ? [{ id: "all", label: "كل الوحدات" }, ...phases.map((ph) => ({ id: ph.id, label: ph.name }))]
      : [];
  }, [project]);

  const [tab, setTab] = useState("all");
  const [sort, setSort] = useState<"asc" | "desc">("asc");
  const [all, setAll] = useState(false);

  useEffect(() => {
    if (project) return;
    const sync = () => {
      const m = window.location.hash.match(/^#units-(.+)$/);
      if (m && PROJECTS.some((p) => p.slug === m[1])) {
        setTab(m[1]);
        document.getElementById("units")?.scrollIntoView({ behavior: "smooth" });
      }
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, [project]);

  const list = useMemo(() => {
    const f = tab === "all" ? base : base.filter((u) => (project ? u.phaseId : u.project) === tab);
    const big = sort === "asc" ? Infinity : -Infinity;
    return [...f].sort((a, b) => {
      const x = a.price ?? big;
      const y = b.price ?? big;
      return sort === "asc" ? x - y : y - x;
    });
  }, [base, tab, sort, project]);

  const LIMIT = 8;
  const shown = all ? list : list.slice(0, LIMIT);

  const chip = (on: boolean) =>
    `min-h-[44px] shrink-0 whitespace-nowrap rounded-full border px-5 py-2 text-sm font-bold transition ${
      on
        ? dark
          ? "border-gold bg-gold text-ink"
          : "border-ink bg-ink text-white"
        : dark
          ? "border-white/35 text-white hover:border-white"
          : "border-ink/20 text-ink hover:border-ink"
    }`;

  return (
    <div>
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        {tabs.length > 0 ? (
          <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 md:mx-0 md:flex-wrap md:px-0" role="tablist" aria-label="فلتر الوحدات">
            {tabs.map((t) => (
              <button
                key={t.id}
                role="tab"
                aria-selected={tab === t.id}
                onClick={() => {
                  setTab(t.id);
                  setAll(false);
                }}
                className={chip(tab === t.id)}
              >
                {t.label}
              </button>
            ))}
          </div>
        ) : (
          <span />
        )}
        <button
          type="button"
          onClick={() => setSort(sort === "asc" ? "desc" : "asc")}
          className={`flex min-h-[44px] items-center gap-2 self-start rounded-full border px-5 py-2 text-sm font-bold md:self-auto ${
            dark ? "border-white/35 text-white" : "border-ink/20 text-ink"
          }`}
        >
          <ArrowDownUp className="size-4" aria-hidden />
          {sort === "asc" ? "الأرخص أولًا" : "الأغلى أولًا"}
        </button>
      </div>

      <p className={`mt-4 text-sm ${dark ? "text-tint" : "text-mut"}`} aria-live="polite">
        {list.length} وحدة
      </p>

      <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {shown.map((u) => (
          <article
            key={u.key}
            className={`flex flex-col overflow-hidden rounded-3xl border ${
              dark ? "border-white/15 bg-[#0b3a45] text-white" : "border-line bg-white text-ink"
            }`}
          >
            <div className="relative aspect-[16/10]">
              <Image
                src={u.image}
                alt={`${u.type} في ${u.projectName} — ${u.phase}`}
                fill
                sizes="(min-width:1280px) 25vw, (min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                className="object-cover"
              />
              <span dir="ltr" className="absolute bottom-2.5 right-2.5 rounded-md bg-ink/85 px-2.5 py-0.5 font-latin text-base font-semibold text-white">
                {project ? u.phaseEn : u.projectEn}
              </span>
            </div>
            <div className="flex flex-1 flex-col p-5">
              <p className={`text-xs font-semibold ${dark ? "text-gold" : "text-brass"}`}>
                {project ? u.phase : `${u.projectName} · ${u.phase}`}
              </p>
              <h3 className="mt-1 text-xl font-bold">{u.type}</h3>
              <p className={`mt-1 text-sm ${dark ? "text-tint" : "text-mut"}`}>
                {u.spec}
                {u.finish && !u.spec.includes("تشطيب") && !u.spec.includes("كامل") ? ` · ${u.finish}` : ""}
              </p>
              <div className={`mt-4 flex items-baseline justify-between border-t pt-3 ${dark ? "border-white/15" : "border-line"}`}>
                <span className={`text-xs ${dark ? "text-tint" : "text-mut"}`}>{u.price ? "تبدأ من" : "السعر"}</span>
                {u.price ? (
                  <span className={`font-display text-xl font-bold ${dark ? "text-gold" : "text-cta"}`}>
                    <span dir="ltr">{fmt(u.price)}</span> <span className="text-sm">ج.م</span>
                  </span>
                ) : (
                  <span className={`font-display text-lg font-bold ${dark ? "text-gold" : "text-cta"}`}>عند الطلب</span>
                )}
              </div>
              <p className={`mt-1.5 text-xs leading-relaxed ${dark ? "text-tint" : "text-mut"}`}>
                <Nums text={u.plan} />
              </p>
              <div className="mt-auto grid grid-cols-[1fr_auto_auto] gap-2 pt-4">
                <LeadButton
                  source={`unit-${u.key}`}
                  project={u.projectName}
                  unit={`${u.phase} — ${u.type}`}
                  options={[`${u.phase} — ${u.type}`, "وحدة أخرى"]}
                  title={`${u.type} — ${u.projectName}`}
                  sub={`${u.phase}. نرسل لك المساحات المتاحة والسعر الحالي وخطة السداد على واتساب.`}
                  className={`min-h-[46px] rounded-full px-3 py-2.5 text-sm font-bold transition ${
                    dark ? "bg-gold text-ink hover:bg-white" : "bg-ink text-white hover:bg-deep"
                  }`}
                >
                  اعرف المتاح
                </LeadButton>
                <WaLink
                  msg={`مرحبًا، أرغب في معرفة المتاح من ${u.type} (${u.spec}) في ${u.projectName} — ${u.phase}`}
                  label={`واتساب — ${u.type} في ${u.projectName}`}
                  className="flex size-[46px] items-center justify-center rounded-full bg-wa text-white"
                >
                  <WhatsAppIcon className="size-5" />
                </WaLink>
                <CallLink
                  label={`اتصال — ${u.type} في ${u.projectName}`}
                  className={`flex size-[46px] items-center justify-center rounded-full border ${
                    dark ? "border-white/40 text-white" : "border-ink/25 text-ink"
                  }`}
                >
                  <Phone className="size-4" aria-hidden />
                </CallLink>
              </div>
            </div>
          </article>
        ))}
      </div>

      {list.length > LIMIT && (
        <div className="mt-8 text-center">
          <button
            type="button"
            onClick={() => setAll(!all)}
            className={`min-h-[48px] rounded-full border px-8 py-3 font-bold ${
              dark ? "border-white/40 text-white hover:bg-white hover:text-ink" : "border-ink/25 text-ink hover:bg-ink hover:text-white"
            }`}
          >
            {all ? "عرض أقل" : `عرض كل الوحدات (${list.length})`}
          </button>
        </div>
      )}
    </div>
  );
}
