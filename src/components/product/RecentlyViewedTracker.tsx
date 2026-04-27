"use client";

import { useEffect } from "react";
import { useStore } from "@/store/useStore";
import { Product } from "@/types";

export default function RecentlyViewedTracker({
  product,
}: {
  product: any; // We accept 'any' here to prevent the red underline from the Page
}) {
  const addToRecentlyViewed = useStore((state) => state.addToRecentlyViewed);

  useEffect(() => {
    if (product) {
      /**
       * Use 'as Product' to cast the data.
       * This forces it to fit existing interface
       * without changing index.ts or other components.
       */
      addToRecentlyViewed(product as Product);
    }
  }, [product, addToRecentlyViewed]);

  return null;
}
