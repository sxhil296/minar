import { cn } from "@/lib/utils";

interface ContainerProps extends React.ComponentProps<"div"> {
  children?: React.ReactNode;
  className?: string;
}

export default function Container({
  children,
  className,
  ...props
}: ContainerProps) {
  return (
    <div className={cn("max-w-[1380px] mx-auto px-5", className)} {...props}>
      {children}
    </div>
  );
}
