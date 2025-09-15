interface CircularProgressProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  showValue?: boolean;
  className?: string;
}

const CircularProgress = ({ 
  value, 
  size = 80, 
  strokeWidth = 6, 
  color = "primary",
  showValue = true,
  className = ""
}: CircularProgressProps) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (Math.min(value, 100) / 100) * circumference;

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'primary': return 'stroke-primary drop-shadow-[0_0_8px_hsl(180_100%_50%_/_0.6)]';
      case 'accent': return 'stroke-accent drop-shadow-[0_0_8px_hsl(270_100%_70%_/_0.6)]';
      case 'success': return 'stroke-success drop-shadow-[0_0_8px_hsl(120_100%_50%_/_0.6)]';
      case 'warning': return 'stroke-warning drop-shadow-[0_0_8px_hsl(45_100%_50%_/_0.6)]';
      default: return 'stroke-primary drop-shadow-[0_0_8px_hsl(180_100%_50%_/_0.6)]';
    }
  };

  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        className="transform -rotate-90 animate-slide-up"
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          className="text-muted opacity-20"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className={`transition-all duration-500 ease-out ${getColorClasses(color)}`}
        />
      </svg>
      {showValue && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-bold font-mono">
            {Math.round(value)}%
          </span>
        </div>
      )}
    </div>
  );
};

export default CircularProgress;