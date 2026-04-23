export function WatermarkBg() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-[0.035] text-slate-400"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Ctext x='10' y='70' font-size='64' fill='currentColor' font-family='system-ui'%3E%25%3C/text%3E%3C/svg%3E\")",
          backgroundSize: "120px 120px",
        }}
      />
    </div>
  );
}
