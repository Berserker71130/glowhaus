"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useDebounce } from "@/hooks/useDebounce";
import {
  ArrowRight,
  Clock,
  Search,
  TrendingUp,
  X,
  Loader2,
  Tag,
  Layers,
} from "lucide-react";
import Portal from "./Portal";

export default function SearchOverlay() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [recent, setRecent] = useState<string[]>([]);
  const debouncedQuery = useDebounce(query, 300);
  const router = useRouter();

  // Handle Loading Spinner logic
  useEffect(() => {
    if (query.length >= 2) {
      setLoading(true);
      const timer = setTimeout(() => setLoading(false), 500); // Simulate search delay
      return () => clearTimeout(timer);
    } else {
      setLoading(false);
    }
  }, [query]);

  useEffect(() => {
    const saved = localStorage.getItem("recentSearches");
    if (saved) setRecent(JSON.parse(saved));
    const handleKeys = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeys);
    return () => window.removeEventListener("keydown", handleKeys);
  }, []);

  const handleSearch = (searchTerm: string) => {
    if (!searchTerm.trim()) return;
    const updated = [
      searchTerm,
      ...recent.filter((i) => i !== searchTerm),
    ].slice(0, 6);
    setRecent(updated);
    localStorage.setItem("recentSearches", JSON.stringify(updated));
    setIsOpen(false);
    router.push(`/search?q=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="p-2 outline-none">
        <Search size={20} />
      </button>

      <Portal>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[999] bg-black/60 backdrop-blur-md flex justify-center items-start pt-20 px-4"
            >
              <motion.div
                initial={{ y: -50 }}
                animate={{ y: 0 }}
                className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden"
              >
                {/* Search Input Area */}
                <div className="p-5 flex items-center border-b border-gray-100">
                  <Search className="text-gray-400 mr-3" size={22} />
                  <input
                    autoFocus
                    className="w-full outline-none text-xl py-2 bg-transparent text-black placeholder:text-gray-300"
                    placeholder="Search GlowHaus..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch(query)}
                  />
                  {loading && (
                    <Loader2
                      className="animate-spin text-gold mr-3"
                      size={20}
                    />
                  )}
                  <button
                    onClick={() => setIsOpen(false)}
                    className="hover:bg-gray-100 p-2 rounded-full transition-colors"
                  >
                    <X size={20} className="text-gray-400" />
                  </button>
                </div>

                <div className="p-6 max-h-[60vh] overflow-y-auto bg-white text-black no-scrollbar">
                  {query.length < 2 ? (
                    /* Default State: Recent & Trending */
                    <div className="space-y-8 text-left">
                      {recent.length > 0 && (
                        <div>
                          <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                            <Clock size={12} /> Recent Searches
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {recent.map((s) => (
                              <button
                                key={s}
                                onClick={() => handleSearch(s)}
                                className="bg-gray-50 border border-gray-100 px-4 py-2 rounded-lg text-sm hover:border-gold transition-all"
                              >
                                {s}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                      <div>
                        <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                          <TrendingUp size={12} /> Trending Now
                        </h3>
                        <div className="grid grid-cols-2 gap-3">
                          {[
                            "HD Lace Frontal",
                            "Nail Extension Kit",
                            "Brazilian Deep Wave",
                            "Luxe Glow Oil",
                          ].map((p) => (
                            <button
                              key={p}
                              onClick={() => handleSearch(p)}
                              className="flex items-center gap-3 p-3 bg-ivory/30 rounded-xl hover:bg-ivory transition-colors text-left text-sm"
                            >
                              <Search size={14} className="text-gold" /> {p}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Search Results State */
                    <div className="space-y-8 text-left">
                      {/* Section 1: Suggestions */}
                      <div>
                        <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                          <Tag size={12} /> Suggestions
                        </h3>
                        <div className="space-y-1">
                          {[
                            `${query} bundles`,
                            `${query} wholesale`,
                            `best ${query} deals`,
                          ].map((s) => (
                            <div
                              key={s}
                              onClick={() => handleSearch(s)}
                              className="p-2 hover:bg-gray-50 rounded-md cursor-pointer text-sm flex items-center gap-2"
                            >
                              <Search size={14} className="text-gray-300" /> {s}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Section 2: Products Group (Top 5) */}
                      <div>
                        <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                          <Layers size={12} /> Products
                        </h3>
                        <div className="space-y-4">
                          {[1, 2, 3].map((i) => (
                            <div
                              key={i}
                              className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-xl cursor-pointer group transition-all"
                            >
                              <div className="flex items-center gap-4">
                                <div className="w-14 h-14 bg-gray-100 rounded-lg overflow-hidden border border-gray-100 group-hover:border-gold/30 transition-colors" />
                                <div>
                                  <p className="font-medium text-sm text-noir">
                                    Premium {query} Item {i}
                                  </p>
                                  <p className="text-xs text-gray-500 font-serif italic">
                                    ₦{(25000 * i).toLocaleString()}
                                  </p>
                                </div>
                              </div>
                              <ArrowRight
                                size={16}
                                className="text-gray-300 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0"
                              />
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Section 3: Categories Link */}
                      <button
                        onClick={() => handleSearch(query)}
                        className="w-full p-4 bg-noir text-white text-[10px] font-bold uppercase tracking-[0.2em] flex justify-between items-center rounded-xl hover:bg-gold transition-colors"
                      >
                        See all results for "{query}" <ArrowRight size={16} />
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </Portal>
    </>
  );
}
