import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { CallLink, WaLink, WhatsAppIcon } from "@/components/actions";

export const metadata: Metadata = {
  title: "تم استلام طلبك | مشاريع أورا",
  robots: { index: false, follow: false },
};

export default function ThankYou() {
  return (
    <main className="flex min-h-dvh items-center justify-center bg-ink px-4 py-16 text-center text-white">
      <div className="max-w-md">
        <CheckCircle2 className="mx-auto size-16 text-gold" aria-hidden />
        <h1 className="mt-5 text-3xl font-bold">تم استلام طلبك</h1>
        <p className="mt-3 leading-relaxed text-white/80">
          سيتواصل معك مستشار المبيعات بالأسعار والوحدات المتاحة. للرد الأسرع تواصل معنا الآن:
        </p>
        <div className="mt-7 grid gap-3">
          <WaLink
            msg="مرحبًا، سجّلت الآن على صفحة مشاريع أورا وأرغب في التفاصيل"
            className="flex items-center justify-center gap-2 rounded-full bg-wa px-5 py-4 font-bold text-white"
          >
            <WhatsAppIcon /> أكمل على واتساب
          </WaLink>
          <CallLink className="flex items-center justify-center gap-2 rounded-full border border-white/40 px-5 py-4 font-bold" />
        </div>
        <Link href="/" className="mt-8 inline-block text-sm text-white/60 underline">
          الرجوع لكل المشاريع
        </Link>
      </div>
    </main>
  );
}
