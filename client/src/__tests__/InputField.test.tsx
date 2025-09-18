import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { InputField } from '@/components/InputField';

describe('InputField Component', () => {
  test('renders basic input field', () => {
    render(<InputField placeholder="Test input" />);
    expect(screen.getByTestId('input-field')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Test input')).toBeInTheDocument();
  });

  test('displays label when provided', () => {
    render(<InputField label="Email Address" />);
    expect(screen.getByTestId('input-label')).toHaveTextContent('Email Address');
  });

  test('displays helper text', () => {
    render(<InputField helperText="This is helpful information" />);
    expect(screen.getByTestId('text-helper')).toHaveTextContent('This is helpful information');
  });

  test('displays error message when invalid', () => {
    render(<InputField invalid errorMessage="This field is required" />);
    expect(screen.getByTestId('text-error')).toHaveTextContent('This field is required');
  });

  test('calls onChange when value changes', () => {
    const handleChange = vi.fn();
    render(<InputField onChange={handleChange} />);
    
    const input = screen.getByTestId('input-field');
    fireEvent.change(input, { target: { value: 'test value' } });
    
    expect(handleChange).toHaveBeenCalledWith(expect.objectContaining({
      target: expect.objectContaining({ value: 'test value' })
    }));
  });

  test('shows loading state', () => {
    render(<InputField loading />);
    expect(screen.getByTestId('input-loading')).toBeInTheDocument();
  });

  test('shows clear button when enabled and has value', () => {
    render(<InputField value="test" showClearButton />);
    expect(screen.getByTestId('button-clear')).toBeInTheDocument();
  });

  test('clear button clears the input', () => {
    const handleChange = vi.fn();
    render(<InputField value="test" onChange={handleChange} showClearButton />);
    
    fireEvent.click(screen.getByTestId('button-clear'));
    
    expect(handleChange).toHaveBeenCalledWith(expect.objectContaining({
      target: expect.objectContaining({ value: '' })
    }));
  });

  test('shows password toggle for password type', () => {
    render(<InputField type="password" showPasswordToggle />);
    expect(screen.getByTestId('button-password-toggle')).toBeInTheDocument();
  });

  test('toggles password visibility', () => {
    render(<InputField type="password" showPasswordToggle />);
    
    const input = screen.getByTestId('input-field');
    const toggleButton = screen.getByTestId('button-password-toggle');
    
    expect(input).toHaveAttribute('type', 'password');
    
    fireEvent.click(toggleButton);
    expect(input).toHaveAttribute('type', 'text');
    
    fireEvent.click(toggleButton);
    expect(input).toHaveAttribute('type', 'password');
  });

  test('disabled state prevents interaction', () => {
    const handleChange = vi.fn();
    render(<InputField disabled onChange={handleChange} />);
    
    const input = screen.getByTestId('input-field');
    expect(input).toBeDisabled();
    
    fireEvent.change(input, { target: { value: 'test' } });
    expect(handleChange).not.toHaveBeenCalled();
  });

  test('applies correct variant classes', () => {
    const { rerender } = render(<InputField variant="filled" />);
    let input = screen.getByTestId('input-field');
    expect(input).toHaveClass('bg-input');

    rerender(<InputField variant="outlined" />);
    input = screen.getByTestId('input-field');
    expect(input).toHaveClass('bg-transparent', 'border-2');

    rerender(<InputField variant="ghost" />);
    input = screen.getByTestId('input-field');
    expect(input).toHaveClass('bg-transparent', 'border-0', 'border-b-2');
  });

  test('applies correct size classes', () => {
    const { rerender } = render(<InputField size="sm" />);
    let input = screen.getByTestId('input-field');
    expect(input).toHaveClass('px-3', 'py-2', 'text-sm');

    rerender(<InputField size="md" />);
    input = screen.getByTestId('input-field');
    expect(input).toHaveClass('px-4', 'py-3', 'text-sm');

    rerender(<InputField size="lg" />);
    input = screen.getByTestId('input-field');
    expect(input).toHaveClass('px-4', 'py-4', 'text-base');
  });

  test('has correct accessibility attributes', () => {
    render(
      <InputField 
        label="Email"
        invalid
        errorMessage="Invalid email"
        helperText="Enter your email"
      />
    );
    
    const input = screen.getByTestId('input-field');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAttribute('aria-describedby', 'error-message');
  });
});
