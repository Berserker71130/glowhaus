import Portal from "./Portal";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useDebounce } from "@/hooks/useDebounce";
import { ArrowRight, Clock, Search, TrendingUp, X } from "lucide-react";

export default function SearchOverlay() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [recent, setRecent] = useState<string[]>([]);
  const debouncedQuery = useDebounce(query, 300);
  const router = useRouter();

  useEffect(() => {
    const saved = localStorage.getItem("recentSearches");
    if (saved) setRecent(JSON.parse(saved));

    const handleKeys = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
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
    setRecent(updated); // Update state
    localStorage.setItem("recentSearches", JSON.stringify(updated));
    setIsOpen(false);
    router.push(`/search?q=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <>
      {/* TRIGGER BUTTON - Stayed clean and simple */}
      <button onClick={() => setIsOpen(true)} className="p-2 outline-none">
        <Search size={20} />
      </button>

      {/* OVERLAY - Now moved OUTSIDE the button to prevent errors */}
      <Portal>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              // Added z-[999] to beat the Hero images
              className="fixed inset-0 z-[999] bg-black/60 backdrop-blur-md flex justify-center items-start pt-20 px-4"
            >
              <motion.div
                initial={{ y: -50 }}
                animate={{ y: 0 }}
                className="w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden"
              >
                <div className="p-4 flex items-center border-b border-gray-100">
                  <Search className="text-gray-400 mr-3" size={20} />
                  <input
                    autoFocus
                    onBlur={(e) => isOpen && e.target.focus()}
                    className="w-full outline-none text-lg py-2 bg-transparent text-black"
                    placeholder="Search products..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    // Fixed the "Enter" typo here
                    onKeyDown={(e) => e.key === "Enter" && handleSearch(query)}
                  />
                  <button type="button" onClick={() => setIsOpen(false)}>
                    <X size={20} className="text-gray-400" />
                  </button>
                </div>

                <div className="p-6 max-h-[70vh] overflow-y-auto bg-white text-black">
                  {!query ? (
                    <div className="space-y-8 text-left">
                      {recent.length > 0 && (
                        <div>
                          <h3 className="text-xs font-bold text-gray-400 uppercase mb-4 flex items-center gap-2">
                            <Clock size={14} /> Recent
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {recent.map((s) => (
                              <button
                                key={s}
                                onClick={() => handleSearch(s)}
                                className="bg-gray-100 px-3 py-1 rounded-md text-sm hover:bg-gray-200"
                              >
                                {s}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                      <div>
                        <h3 className="text-xs font-bold text-gray-400 uppercase mb-4 flex items-center gap-2">
                          <TrendingUp size={14} /> Popular
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {["Brazilian Hair", "Press-On Nails", "Gel Kit"].map(
                            (p) => (
                              <button
                                key={p}
                                onClick={() => handleSearch(p)}
                                className="border border-gray-200 px-3 py-1 rounded-md text-sm hover:border-black"
                              >
                                {p}
                              </button>
                            ),
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6 text-left">
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-tighter">
                        Products
                      </p>
                      <div className="space-y-4">
                        <div className="flex items-center gap-4 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                          <div className="w-12 h-12 bg-gray-100 rounded" />
                          <p className="font-medium text-sm">
                            Searching for "{query}"...
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleSearch(query)}
                        className="w-full p-4 bg-gray-50 text-sm font-bold flex justify-between items-center hover:bg-black hover:text-white rounded-xl transition-all"
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
