import * as React from "react"

import { cn } from "@/lib/utils"

const LoginInput = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    (<input
      type={type}
      className={cn(
        "w-full px-6 py-4 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F1BD19]",
        className
      )}
      ref={ref}
      {...props} />)
  );
})
LoginInput.displayName = "Login Input"

export { LoginInput }
