import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

export type Theme = {
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  cardBackground: string;
  textColor: string;
  borderColor: string;
};

const defaultTheme: Theme = {
  primaryColor: "#2575fc",
  secondaryColor: "#6a11cb",
  backgroundColor: "#f0f2f5",
  cardBackground: "#ffffff",
  textColor: "#000000",
  borderColor: "#a1a1a1",
};

type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(defaultTheme);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
};
