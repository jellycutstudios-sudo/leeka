import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'luxury';
  size?: 'md' | 'lg';
  fullWidth?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  disabled,
  children,
  ...props
}) => {
  const baseStyles =
    'relative inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B59A70] disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98] cursor-pointer';

  const sizeStyles = {
    md: 'min-h-[46px] px-5 py-2.5 text-sm rounded-xl',
    lg: 'min-h-[52px] px-7 py-3.5 text-base rounded-2xl tracking-wide font-semibold',
  };

  const variantStyles = {
    primary:
      'bg-[#242424] text-[#F8F6F2] hover:bg-[#1a1a1a] shadow-sm hover:shadow-md border border-[#242424]',
    secondary:
      'bg-white text-[#242424] border border-[#E8E4DC] hover:border-[#B59A70] hover:bg-[#FAF8F5] shadow-xs',
    ghost:
      'bg-transparent text-[#5A5A5A] hover:text-[#242424] hover:bg-black/5 border border-transparent',
    luxury:
      'bg-gradient-to-r from-[#B59A70] to-[#987E56] text-white hover:brightness-105 shadow-md hover:shadow-lg',
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${
        fullWidth ? 'w-full' : ''
      } ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
