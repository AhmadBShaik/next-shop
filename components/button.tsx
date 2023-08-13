import { MouseEventHandler } from "react"

export const Button = (
  {
    children,
    onClick,
    outline,
    disabled,
    type = "button",
    loading = false }:
    {
      children: React.ReactNode,
      onClick?: MouseEventHandler<HTMLButtonElement>,
      outline?: boolean
      type?: "submit" | "reset" | "button"
      loading?: boolean
      disabled?: boolean
    }) => {
  return (<button
    type={type}
    disabled={disabled}
    className={`${outline ?
      "text-amber-500 border-2 border-amber-500 hover:bg-amber-200 hover:text-amber-600" :
      "bg-amber-500 hover:bg-amber-400 hover:border-amber-600 hover:text-amber-600 text-white"
      } ${loading ? "opacity-50 cursor-progress" : ""} ${disabled ? "opacity-50 cursor-not-allowed" : ""} font-medium px-2 py-1 rounded cursor-pointer flex items-center justify-center hover:shadow-md w-full select-none`} onClick={onClick} >
    {children}
  </button >)
}