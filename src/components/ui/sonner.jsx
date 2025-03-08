import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

const Toaster = ({
  ...props
}) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme}
      position="bottom-center"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
  "group toast group-[.toaster]:bg-green-600 group-[.toaster]:text-white group-[.toaster]:border-border group-[.toaster]:shadow-lg fixed mx-auto",
          description: "group-[.toast]:text-white",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-white",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-white",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
