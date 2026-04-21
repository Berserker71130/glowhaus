"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import FilterSidebar from "./FilterSidebar";

interface MobileFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileFilterDrawer({
  isOpen,
  onClose,
}: MobileFilterDrawerProps) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50" />
        <Dialog.Content className="fixed bottom-0 left-0 right-0 bg-[#FAF9F6] rounded-t-[32px] p-8 z-[51] max-h-[90vh] overflow-y-auto outline-none">
          <div className="flex justify-between items-center mb-8 border-b border-[#D4AF37]/20 pb-4">
            <Dialog.Title className="text-xl font-serif">
              Filter & Sort
            </Dialog.Title>
            <Dialog.Close asChild>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X size={20} />
              </button>
            </Dialog.Close>
          </div>

          <FilterSidebar />

          <button
            onClick={onClose}
            className="w-full bg-black text-white py-5 text-[11px] font-bold uppercase tracking-[0.4em] mt-10 hover:bg-[#D4AF37] transition-colors"
          >
            Apply Filters
          </button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
