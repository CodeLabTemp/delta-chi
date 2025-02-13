import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

const LoginButton = React.forwardRef(({ className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(
        "w-full py-4 text-black bg-[#F1BD19] rounded-lg focus:ring-2 focus:ring-[#F1BD19] font-bold font-montserrat",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

LoginButton.displayName = "LoginButton";

export { LoginButton };
