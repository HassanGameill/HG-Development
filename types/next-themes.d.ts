// declare module "next-themes" {
//   import { ComponentType, ReactNode } from "react";

//   export type Theme = "light" | "dark" | "system";

//   export interface ThemeProviderProps {
//     children: ReactNode;
//     attribute?: string;
//     defaultTheme?: Theme;
//     enableSystem?: boolean;
//   }

//   const ThemeProvider: ComponentType<ThemeProviderProps>;
//   export default ThemeProvider;

//   export function useTheme(): {
//     theme: Theme | undefined;
//     setTheme: (theme: Theme) => void;
//     resolvedTheme: Theme;
//   };
// }
