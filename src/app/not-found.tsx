import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-ivory text-center px-6">
      <span className="text-2xl tracking-[0.4em] font-light uppercase mb-6">
        GlowHaus
      </span>
      <div className="w-16 h-[1px] bg-gold mb-12" />

      {/* Large 404 */}
      <h1 className="text-gold font-serif italic text-[12rem] md:text-[18rem] leading-none mb-6 select-none">
        404
      </h1>
      <p className="text-noir text-xl font-medium mb-10">
        Oops! This page seems to have had a bad hair day. 😂
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/"
          className="bg-noir text-white px-10 py-4 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-gold transition-all"
        >
          Back to Home
        </Link>
        <Link
          href="/shop"
          className="border border-noir text-noir px-10 py-4 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-noir hover:text-white transition-all"
        >
          Browse Collections
        </Link>
      </div>
    </div>
  );
}
