"use client";

import * as React from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingProps {
  value: number;
  max?: number;
  interactive?: boolean;
  onChange?: (value: number) => void;
  className?: string;
}

export function Rating({
  value,
  max = 5,
  interactive = false,
  onChange,
  className,
}: RatingProps) {
  const [hover, setHover] = React.useState(0);

  return (
    <div className={cn("flex items-center gap-1", className)}>
      {[...Array(max)].map((_, i) => {
        const starValue = i + 1;
        const isFilled = interactive
          ? (hover || value) >= starValue
          : value >= starValue;
        const isHalf = !interactive && value > i && value < starValue;

        return (
          <button
            key={i}
            type="button"
            disabled={!interactive}
            className={cn(
              "transition-transform",
              interactive ? "cursor-pointer hover:scale-110" : "cursor-default",
            )}
            onMouseEnter={() => interactive && setHover(starValue)}
            onMouseLeave={() => interactive && setHover(0)}
            onClick={() => interactive && onChange?.(starValue)}
          >
            <Star
              className={cn(
                "h-5 w-5",
                isFilled ? "fill-gold text-gold" : "text-blush",
                isHalf && "fill-gold/50 text-gold",
              )}
            />
          </button>
        );
      })}
    </div>
  );
}
