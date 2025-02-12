import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

const PortalButton = React.forwardRef(({ className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(
        "w-full py-4 bg-[#CA3D31] focus:ring-2 focus:ring-[#CA3D31] font-bold font-montserrat",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

PortalButton.displayName = "PortalButton";

export { PortalButton };
