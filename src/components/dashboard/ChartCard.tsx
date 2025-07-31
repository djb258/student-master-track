import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface ChartCardProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  className?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
}

export function ChartCard({
  title,
  description,
  icon: Icon,
  className,
  children,
  actions
}: ChartCardProps) {
  return (
    <Card className={cn(
      "bg-white/10 border-white/20 backdrop-blur-sm",
      className
    )}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center space-x-2">
          {Icon && (
            <Icon className="h-4 w-4 text-wrestling-gold" />
          )}
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
        </div>
        {actions && (
          <div className="flex items-center space-x-2">
            {actions}
          </div>
        )}
      </CardHeader>
      <CardContent className="pt-0">
        {children}
      </CardContent>
    </Card>
  );
} 