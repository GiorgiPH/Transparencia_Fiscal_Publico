import {
    FileText,
    DollarSign,
    TrendingUp,
    Calculator,
    BarChart,
    Shield,
    BookOpen,
    File,
  } from "lucide-react";
  
  export const ICON_MAP = {
    FileText,
    DollarSign,
    TrendingUp,
    Calculator,
    BarChart,
    Shield,
    BookOpen,
    default: File,
  } as const;
  
  export type IconName = keyof typeof ICON_MAP;
  