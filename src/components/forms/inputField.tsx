import { cn } from "@/lib/utils";

interface InputFieldProps extends React.ComponentProps<"input"> {
  label: string;
  error?: string;
  id: string;
  isRequired?: boolean;
  className?: string;
}

export default function InputField({
  label,
  error,
  id,
  isRequired,
  className,
  ...props
}: InputFieldProps) {
  return (
    <div className="w-full flex flex-col gap-1">
      <label className="text-base font-medium text-emerald-800" htmlFor={id}>
        {label} {isRequired && <span className="text-error">*</span>}
      </label>
      <input
        type="text"
        className={cn(
          "w-full px-4  py-2 border border-gray-300 rounded outline-none focus:ring-1 focus:ring-emerald-800 transition-colors",
          error && "border-error",
          className
        )}
        {...props}
      />
      {error && <p className="text-xs text-error">{error}</p>}
    </div>
  );
}
