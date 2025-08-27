import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import * as React from "react";
import { Pressable, PressableProps, View } from "react-native";

interface CheckboxProps extends Omit<PressableProps, "onPress"> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "success" | "warning" | "error";
  className?: string;
  disabled?: boolean;
}

const getSizeStyles = (size: "sm" | "md" | "lg") => {
  switch (size) {
    case "sm":
      return {
        container: "w-4 h-4",
        icon: 8,
      };
    case "lg":
      return {
        container: "w-8 h-8",
        icon: 16,
      };
    default: // md
      return {
        container: "w-6 h-6",
        icon: 12,
      };
  }
};

const getVariantStyles = (
  variant: "default" | "success" | "warning" | "error",
  checked: boolean
) => {
  if (!checked) {
    return "border-neutral-600 bg-transparent";
  }

  switch (variant) {
    case "success":
      return "bg-green-500 border-green-500";
    case "warning":
      return "bg-yellow-500 border-yellow-500";
    case "error":
      return "bg-red-500 border-red-500";
    default:
      return "bg-orange-500 border-orange-500";
  }
};

export const Checkbox = React.forwardRef<View, CheckboxProps>(
  (
    {
      checked = false,
      onCheckedChange,
      size = "md",
      variant = "default",
      className = "",
      disabled = false,
      ...props
    },
    ref
  ) => {
    const sizeStyles = getSizeStyles(size);
    const variantStyles = getVariantStyles(variant, checked);

    return (
      <Pressable
        ref={ref}
        onPress={() => !disabled && onCheckedChange?.(!checked)}
        disabled={disabled}
        className={`${sizeStyles.container} rounded-lg border-2 items-center justify-center transition-all duration-200 ${variantStyles} ${
          disabled ? "opacity-50" : "active:scale-95"
        } ${className}`}
        {...props}
      >
        {checked && (
          <FontAwesome6 name="check" size={sizeStyles.icon} color="white" />
        )}
      </Pressable>
    );
  }
);

Checkbox.displayName = "Checkbox";
