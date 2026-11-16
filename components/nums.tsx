/** يعرض النِّسب (5%، 0%) من اليسار لليمين حتى تبقى علامة % في مكانها داخل النص العربي */
export function Nums({ text }: { text: string }) {
  const parts = text.split(/(\d+(?:\.\d+)?%)/g);
  return (
    <>
      {parts.map((p, i) =>
        i % 2 ? (
          <span key={i} dir="ltr">
            {p}
          </span>
        ) : (
          p
        ),
      )}
    </>
  );
}
