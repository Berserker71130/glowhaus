import { cn } from "@/lib/utils";

export function GoldDivider({
  className,
  ornament = true,
}: {
  className?: string;
  ornament?: boolean;
}) {
  return (
    <div className={cn("relative flex py-5 items-center", className)}>
      <div className="flex-grow border-t border-gold/40"></div>
      {ornament && (
        <span className="flex-shrink mx-4 text-gold text-xl italic">★</span>
      )}

      <div className="flex-grow border-t border-gold/40"></div>
    </div>
  );
}
