import React from "react"

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: "sm" | "md" | "lg"
  variant?: "default" | "outline"
}

export function Button({
  size = "md",
  variant = "default",
  className = "",
  ...props
}: Props) {

  const sizeStyles = {
    sm: "px-2 py-1 text-sm",
    md: "px-3 py-2 text-sm",
    lg: "px-4 py-2 text-base"
  }

  const variantStyles = {
    default: "bg-purple-600 text-white hover:bg-purple-700",
    outline: "border border-gray-300 hover:bg-gray-100"
  }

  return (
    <button
      className={`rounded-md transition ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    />
  )
}