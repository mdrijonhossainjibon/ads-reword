interface LoadingCardProps {
  className?: string;
}

export function LoadingCard({ className = '' }: LoadingCardProps) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className="animate-pulse">
        <div className="h-4 bg-slate-700/50 rounded w-24 mb-2"></div>
        <div className="h-8 bg-slate-700/50 rounded w-32"></div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-800/10 to-transparent animate-shimmer"></div>
    </div>
  );
}
