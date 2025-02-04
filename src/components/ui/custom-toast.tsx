import { Toast, ToastProps } from "@/components/ui/toast"
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"
import { AlertCircle, CheckCircle2, XCircle } from "lucide-react"

const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-lg border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full",
  {
    variants: {
      variant: {
        default: "border bg-background text-foreground",
        success: "border-0 bg-gradient-to-r from-emerald-500/20 to-emerald-500/10 text-emerald-50",
        destructive: "border-0 bg-gradient-to-r from-red-500/20 to-red-500/10 text-red-50",
        warning: "border-0 bg-gradient-to-r from-yellow-500/20 to-yellow-500/10 text-yellow-50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const icons = {
  default: null,
  success: <CheckCircle2 className="h-5 w-5 text-emerald-400" />,
  destructive: <XCircle className="h-5 w-5 text-red-400" />,
  warning: <AlertCircle className="h-5 w-5 text-yellow-400" />,
}

export interface CustomToastProps extends Omit<ToastProps, "variant">, VariantProps<typeof toastVariants> {
  description?: string
}

export function CustomToast({ className, variant = "default", ...props }: CustomToastProps) {
  const icon = icons[variant || "default"]

  return ( 
    <Toast
      className={cn(
        toastVariants({ variant }),
        "items-start backdrop-blur-sm border-white/10",
        className
      )}
      {...props}
    >
      <div className="flex gap-3">
        {icon && <div className="mt-0.5">{icon}</div>}
        <div className="grid gap-1">
          {props.title && (
            <div className="text-sm font-semibold [&+div]:text-xs">
              {props.title}
            </div>
          )}
          {props.description && (
            <div className="text-sm opacity-90">
              {props.description}
            </div>
          )}
        </div>
      </div>
    </Toast>
  )
}
