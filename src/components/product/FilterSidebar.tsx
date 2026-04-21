"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import * as Accordion from "@radix-ui/react-accordion";
import * as Slider from "@radix-ui/react-slider";
import * as Switch from "@radix-ui/react-switch";
import { ChevronDown } from "lucide-react";

export default function FilterSidebar() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // Helper to update URL params
  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex flex-col gap-2">
      <Accordion.Root
        type="multiple"
        defaultValue={["sort", "price", "tags"]}
        className="w-full"
      >
        {/* SORT BY */}
        <Accordion.Item
          value="sort"
          className="border-b border-[#D4AF37]/10 py-2"
        >
          <Accordion.Trigger className="flex w-full items-center justify-between text-[11px] font-bold uppercase tracking-[0.2em] py-4">
            Sort By <ChevronDown size={14} className="text-[#D4AF37]" />
          </Accordion.Trigger>
          <Accordion.Content className="pb-6 space-y-4">
            {[
              "Newest",
              "Price Low–High",
              "Price High–Low",
              "Most Popular",
              "Top Rated",
            ].map((opt) => (
              <label
                key={opt}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <input
                  type="radio"
                  name="sort"
                  checked={searchParams.get("sort") === opt}
                  onChange={() => handleFilterChange("sort", opt)}
                  className="w-3 h-3 accent-[#D4AF37]"
                />
                <span className="text-[10px] uppercase tracking-widest text-gray-600 group-hover:text-black">
                  {opt}
                </span>
              </label>
            ))}
          </Accordion.Content>
        </Accordion.Item>

        {/* PRICE RANGE */}
        <Accordion.Item
          value="price"
          className="border-b border-[#D4AF37]/10 py-2"
        >
          <Accordion.Trigger className="flex w-full items-center justify-between text-[11px] font-bold uppercase tracking-[0.2em] py-4">
            Price Range <ChevronDown size={14} className="text-[#D4AF37]" />
          </Accordion.Trigger>
          <Accordion.Content className="pb-8 px-2 pt-4">
            <Slider.Root
              className="relative flex items-center w-full h-5"
              defaultValue={[
                Number(searchParams.get("minPrice")) || 0,
                Number(searchParams.get("maxPrice")) || 100000,
              ]}
              max={100000}
              step={1000}
              onValueCommit={(values) => {
                handleFilterChange("minPrice", values[0].toString());
                handleFilterChange("maxPrice", values[1].toString());
              }}
            >
              <Slider.Track className="bg-gray-200 relative grow h-[1px]">
                <Slider.Range className="absolute bg-[#D4AF37] h-full" />
              </Slider.Track>
              <Slider.Thumb className="block w-4 h-4 bg-white border-2 border-[#D4AF37] rounded-full shadow-sm focus:outline-none cursor-pointer" />
              <Slider.Thumb className="block w-4 h-4 bg-white border-2 border-[#D4AF37] rounded-full shadow-sm focus:outline-none cursor-pointer" />
            </Slider.Root>
            <div className="flex justify-between mt-4 text-[10px] font-bold text-gray-900">
              <span>₦{searchParams.get("minPrice") || "0"}</span>{" "}
              <span>₦{searchParams.get("maxPrice") || "100,000"}</span>
            </div>
          </Accordion.Content>
        </Accordion.Item>

        {/* CATEGORY TAGS */}
        <Accordion.Item
          value="tags"
          className="border-b border-[#D4AF37]/10 py-2"
        >
          <Accordion.Trigger className="flex w-full items-center justify-between text-[11px] font-bold uppercase tracking-[0.2em] py-4">
            Category Tags <ChevronDown size={14} className="text-[#D4AF37]" />
          </Accordion.Trigger>
          <Accordion.Content className="pb-6 space-y-4">
            {["Wigs", "Weaves", "Extensions", "Lace Frontals"].map((tag) => (
              <label
                key={tag}
                className="flex items-center gap-3 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={searchParams.get("category") === tag}
                  onChange={(e) =>
                    handleFilterChange("category", e.target.checked ? tag : "")
                  }
                  className="w-4 h-4 accent-black rounded-none"
                />
                <span className="text-[10px] uppercase tracking-widest text-gray-600">
                  {tag}
                </span>
              </label>
            ))}
          </Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>

      {/* AVAILABILITY SWITCH */}
      <div className="py-6 flex items-center justify-between border-b border-[#D4AF37]/10">
        <span className="text-[11px] font-bold uppercase tracking-[0.2em]">
          In Stock Only
        </span>
        <Switch.Root
          checked={searchParams.get("stock") === "true"}
          onCheckedChange={(checked) =>
            handleFilterChange("stock", checked ? "true" : "")
          }
          className="w-9 h-5 bg-gray-200 rounded-full data-[state=checked]:bg-[#D4AF37] transition-colors relative outline-none cursor-pointer"
        >
          <Switch.Thumb className="block w-4 h-4 bg-white rounded-full transition-transform duration-100 translate-x-0.5 data-[state=checked]:translate-x-[18px]" />
        </Switch.Root>
      </div>
    </div>
  );
}
