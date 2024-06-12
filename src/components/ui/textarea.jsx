import * as React from "react";

import { cn } from "@/lib/utils";

const Textarea = React.forwardRef(({ className, label, ...props }, ref) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs text-gray-500 font-semibold ">{label}</label>
      <textarea
        className={cn(
          "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    </div>
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
