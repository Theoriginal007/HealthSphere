
declare module 'lucide-react-native' {
  import { FC, SVGProps } from 'react';
  
  interface LucideIconProps extends SVGProps<SVGSVGElement> {
    size?: number;
    color?: string;
    strokeWidth?: number;
  }
  
  export const Home: FC<LucideIconProps>;
  export const Stethoscope: FC<LucideIconProps>;
  export const Calendar: FC<LucideIconProps>;
  export const FileText: FC<LucideIconProps>;
  export const User: FC<LucideIconProps>;
  export const Activity: FC<LucideIconProps>;
  export const Heart: FC<LucideIconProps>;
  export const Bell: FC<LucideIconProps>;
  export const Thermometer: FC<LucideIconProps>;
  export const Brain: FC<LucideIconProps>;
  export const Scale: FC<LucideIconProps>;
  export const TrendingUp: FC<LucideIconProps>;
  export const BarChart3: FC<LucideIconProps>;
}
