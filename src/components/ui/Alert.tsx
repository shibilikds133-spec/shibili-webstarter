import { clsx } from 'clsx';

type AlertVariant = 'info' | 'success' | 'warning' | 'danger';

type Props = {
  variant?: AlertVariant;
  title?: string;
  children: React.ReactNode;
  className?: string;
};

const styles: Record<AlertVariant, string> = {
  info: 'bg-blue-50 border-blue-400 text-blue-900 dark:bg-blue-950 dark:border-blue-600 dark:text-blue-200',
  success: 'bg-green-50 border-green-400 text-green-900 dark:bg-green-950 dark:border-green-600 dark:text-green-200',
  warning: 'bg-yellow-50 border-yellow-400 text-yellow-900 dark:bg-yellow-950 dark:border-yellow-600 dark:text-yellow-200',
  danger: 'bg-red-50 border-red-400 text-red-900 dark:bg-red-950 dark:border-red-600 dark:text-red-200'
};

export default function Alert({ variant = 'info', title, children, className }: Props) {
  return (
    <div
      role="alert"
      className={clsx(
        'rounded-lg border-l-4 p-4 text-sm',
        styles[variant],
        className
      )}
    >
      {title && <p className="font-semibold mb-1">{title}</p>}
      <p>{children}</p>
    </div>
  );
}
