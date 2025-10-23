export type ThemeMode = "light" | "dark";
export type ThemePreference = ThemeMode | "system";

export type SemanticColors = {
  bg: string;
  card: string;
  surface: string;
  text: string;
  textSecondary: string;
  border: string;

  primary: string;
  onPrimary: string;
  primaryMuted: string;

  success: string;   onSuccess: string;
  warning: string;   onWarning: string;
  danger: string;    onDanger: string;

  inputBg: string;
  inputText: string;
  placeholder: string;

  overlay: string;
  shadow: string;
};

export type FontWeights = {
  regular: string | number;
  medium: string | number;
  semibold: string | number;
  bold: string | number;
};

export type TypeScaleItem = {
  size: number;
  lineHeight: number;
  weight: keyof FontWeights;
  letterSpacing?: number;
};

export type Typography = {
  family: {
    regular: string;
    medium: string;
    semibold: string;
    bold: string;
  };
  weights: FontWeights;
  size: {
    xs: TypeScaleItem;
    sm: TypeScaleItem;
    md: TypeScaleItem;
    lg: TypeScaleItem;
    xl: TypeScaleItem;
    "2xl": TypeScaleItem;
    "3xl": TypeScaleItem;
  };
};

export type Theme = {
  mode: ThemeMode;
  dark: boolean;
  colors: SemanticColors;
  typography: Typography;
  icon: { size: number; strokeWidth: number };
  radius: { sm: number; md: number; lg: number; xl: number; full: number };
};
