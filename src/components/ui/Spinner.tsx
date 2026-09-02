import { clsx } from 'clsx';

type Props = {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};

const sizeStyles = {
  sm: 'h-4 w-4 border-2',
  md: 'h-6 w-6 border-2',
  lg: 'h-10 w-10 border-4'
};

export default function Spinner({ size = 'md', className }: Props) {
  return (
    <span
      role="status"
      aria-label="Loading"
      className={clsx(
        'inline-block rounded-full border-current border-r-transparent animate-spin text-brand-light',
        sizeStyles[size],
        className
      )}
    />
  );
}
