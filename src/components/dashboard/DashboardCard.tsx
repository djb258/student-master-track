import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface DashboardCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
    label: string;
  };
  className?: string;
  onClick?: () => void;
}

export function DashboardCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  className,
  onClick
}: DashboardCardProps) {
  return (
    <Card 
      className={cn(
        "bg-white/10 border-white/20 backdrop-blur-sm hover:bg-white/15 transition-all duration-300 cursor-pointer",
        onClick && "hover:scale-105",
        className
      )}
      onClick={onClick}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-sm font-medium text-white/70">
            {title}
          </CardTitle>
          {description && (
            <CardDescription className="text-xs text-white/50">
              {description}
            </CardDescription>
          )}
        </div>
        {Icon && (
          <Icon className="h-4 w-4 text-wrestling-gold" />
        )}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-wrestling-gold">
          {value}
        </div>
        {trend && (
          <div className="flex items-center space-x-1 text-xs">
            <span className={cn(
              "font-medium",
              trend.isPositive ? "text-green-400" : "text-red-400"
            )}>
              {trend.isPositive ? "↗" : "↘"} {trend.value}%
            </span>
            <span className="text-white/50">
              {trend.label}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 