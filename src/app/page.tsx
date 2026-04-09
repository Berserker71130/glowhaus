export default function Home() {
  return (
    <main className="min-h-screen bg-ivory flex flex-col items-center justify-center p-6 selection:bg-gold-light">
      {/* Container with Fade-Up Animation */}
      <div className="max-w-3xl w-full text-center space-y-8 animate-fade-up">
        {/* Testing Display Font & Primary Gold */}
        <h1 className="font-display text-7xl md:text-9xl text-gold drop-shadow-gold">
          GlowHaus
        </h1>

        {/* Testing Heading Font & Noir Color */}
        <h2 className="font-heading text-2xl md:text-3xl text-noir tracking-widest uppercase">
          The Luxe Standard
        </h2>

        {/* Testing Body Font & Taupe Text */}
        <p className="font-body text-taupe text-lg max-w-lg mx-auto leading-relaxed">
          Crafting sophisticated spaces where elegance meets health. Experience
          the pinnacle of Abuja's premium real estate.
        </p>

        {/* Testing Gold Gradient, Hover States, and Shimmer Animation */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
          <button className="group relative bg-gold-gradient text-noir font-heading px-10 py-4 rounded-sm tracking-[0.2em] uppercase text-xs shadow-gold hover:shadow-gold-lg transition-all duration-500 overflow-hidden">
            <span className="relative z-10">Explore Estates</span>
            {/* Shimmer Effect */}
            <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:animate-shimmer" />
          </button>

          <button className="border border-taupe text-taupe hover:text-noir hover:border-noir px-10 py-4 rounded-sm font-heading tracking-[0.2em] uppercase text-xs transition-colors duration-500">
            Contact Us
          </button>
        </div>

        {/* Testing the Soft Blush and Plum accents */}
        <div className="pt-12">
          <span className="bg-blush text-plum px-4 py-1 rounded-full text-xs font-body tracking-tighter italic">
            Certified Excellence • 2026
          </span>
        </div>
      </div>

      {/* Decorative Floating Element to test 'float' animation */}
      <div className="fixed bottom-10 right-10 w-12 h-12 border-2 border-gold rounded-full flex items-center justify-center animate-float">
        <span className="text-gold text-xl">✨</span>
      </div>
    </main>
  );
}
