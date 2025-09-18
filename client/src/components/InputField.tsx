import React, { useState, forwardRef } from 'react';
import { Eye, EyeOff, X, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface InputFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  variant?: 'filled' | 'outlined' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  showClearButton?: boolean;
  showPasswordToggle?: boolean;
  type?: string;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({
    value,
    onChange,
    label,
    placeholder,
    helperText,
    errorMessage,
    disabled = false,
    invalid = false,
    variant = 'filled',
    size = 'md',
    loading = false,
    showClearButton = false,
    showPasswordToggle = false,
    type = 'text',
    className,
    ...props
  }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const [internalType, setInternalType] = useState(type);

    const handleClear = () => {
      if (onChange) {
        onChange({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>);
      }
    };

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
      setInternalType(showPassword ? 'password' : 'text');
    };

    React.useEffect(() => {
      if (showPasswordToggle && type === 'password') {
        setInternalType(showPassword ? 'text' : 'password');
      }
    }, [showPassword, type, showPasswordToggle]);

    const sizeClasses = {
      sm: 'px-3 py-2 text-sm',
      md: 'px-4 py-3 text-sm',
      lg: 'px-4 py-4 text-base'
    };

    const variantClasses = {
      filled: cn(
        'bg-input border border-border',
        invalid ? 'border-destructive border-2' : 'border-border',
        'focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent'
      ),
      outlined: cn(
        'bg-transparent border-2',
        invalid ? 'border-destructive' : 'border-border',
        'focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring'
      ),
      ghost: cn(
        'bg-transparent border-0 border-b-2',
        invalid ? 'border-destructive' : 'border-border',
        'focus:outline-none focus:border-ring'
      )
    };

    const inputClasses = cn(
      'w-full rounded-md transition-colors',
      sizeClasses[size],
      variantClasses[variant],
      disabled && 'bg-muted text-muted-foreground cursor-not-allowed opacity-60',
      'placeholder:text-muted-foreground',
      className
    );

    const showRightIcons = loading || showClearButton || showPasswordToggle;
    const rightPadding = showRightIcons ? 'pr-12' : '';

    return (
      <div className="space-y-2">
        {label && (
          <label 
            className={cn(
              "text-sm font-medium",
              disabled ? "text-muted-foreground" : "text-foreground"
            )}
            data-testid="input-label"
          >
            {label}
          </label>
        )}
        
        <div className="relative">
          <input
            ref={ref}
            type={internalType}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled || loading}
            className={cn(inputClasses, rightPadding)}
            data-testid="input-field"
            aria-invalid={invalid}
            aria-describedby={
              errorMessage ? "error-message" : helperText ? "helper-text" : undefined
            }
            {...props}
          />
          
          {showRightIcons && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
              {loading && (
                <Loader2 
                  className="h-4 w-4 animate-spin text-muted-foreground" 
                  data-testid="input-loading"
                />
              )}
              
              {showClearButton && value && !loading && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="p-1 hover:bg-muted rounded-sm transition-colors"
                  data-testid="button-clear"
                  aria-label="Clear input"
                >
                  <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                </button>
              )}
              
              {showPasswordToggle && type === 'password' && !loading && (
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="p-1 hover:bg-muted rounded-sm transition-colors"
                  data-testid="button-password-toggle"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                  )}
                </button>
              )}
            </div>
          )}
        </div>
        
        {errorMessage && (
          <p 
            className="text-xs text-destructive flex items-center"
            id="error-message"
            data-testid="text-error"
          >
            <span className="mr-1">⚠</span>
            {errorMessage}
          </p>
        )}
        
        {helperText && !errorMessage && (
          <p 
            className="text-xs text-muted-foreground"
            id="helper-text"
            data-testid="text-helper"
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

InputField.displayName = 'InputField';

export { InputField };
