/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

const Button = ({
    children,
    type = 'button',
    bgColor = "bg-blue-500",
    textColor = "text-white",
    className = '',
    ...props
}) => {
  return (
    <div
    className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className}`}
    {...props}
    >{children}</div>
  )
}

export default Button