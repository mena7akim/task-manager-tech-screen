import * as React from "react";
import { Pressable, PressableProps, Text } from "react-native";

type ButtonVariants =
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost";

interface ButtonProps extends PressableProps {
  variant?: ButtonVariants;
  size?: "sm" | "md" | "lg";
  className?: string;
  children?: React.ReactNode;
  textStyle?: string;
  icon?: boolean;
}

const getVariantStyles = (variant: ButtonVariants) => {
  switch (variant) {
    case "destructive":
      return "bg-red-600 active:bg-red-700";
    case "outline":
      return "border border-neutral-600 bg-transparent active:bg-neutral-900";
    case "secondary":
      return "bg-neutral-800 active:bg-neutral-700";
    case "ghost":
      return "active:bg-neutral-900";
    default:
      return "bg-orange-500 active:bg-orange-600";
  }
};

const getTextStyles = (variant: ButtonVariants) => {
  switch (variant) {
    case "outline":
      return "text-neutral-400";
    case "secondary":
    case "ghost":
      return "text-neutral-300";
    default:
      return "text-white";
  }
};

const getSizeStyles = (size: "sm" | "md" | "lg", icon?: boolean) => {
  if (icon) {
    switch (size) {
      case "sm":
        return "h-8 w-8";
      case "lg":
        return "h-12 w-12";
      default:
        return "h-10 w-10";
    }
  } else {
    switch (size) {
      case "sm":
        return "h-8 px-3 py-1.5";
      case "lg":
        return "h-12 px-6 py-3";
      default:
        return "h-10 px-4 py-2";
    }
  }
};

const getTextSizeStyles = (size: "sm" | "md" | "lg") => {
  switch (size) {
    case "sm":
      return "text-sm";
    case "lg":
      return "text-lg";
    default:
      return "text-md";
  }
};

function Button({
  variant = "default",
  className,
  children,
  size = "md",
  icon = false,
  textStyle,
  ...props
}: ButtonProps) {
  return (
    <Pressable
      className={`flex flex-row items-center justify-center rounded-md ${getSizeStyles(size, icon)} ${getVariantStyles(variant)} ${className || ""}`}
      {...props}
    >
      <Text
        className={`font-medium ${textStyle ? textStyle : getTextStyles(variant)} ${getTextSizeStyles(size)}`}
      >
        {children}
      </Text>
    </Pressable>
  );
}

export { Button };
export type { ButtonProps };
