export type Theme = {
  colors: {
    bg: string;
    card: string;
    text: string;
    sub: string;
    primary: string;
    primaryText: string;
    muted: string;
  };
  radius: { xl: number; full: number };
  spacing: (n: number) => number;
};

export const lightTheme: Theme = {
  colors: {
    bg: "#F7F7F7",
    card: "#FFFFFF",
    text: "#0E0F12",
    sub: "#61636B",
    primary: "#0E0F12",
    primaryText: "#FFFFFF",
    muted: "#D1D3DA",
  },
  radius: { xl: 24, full: 999 },
  spacing: (n) => n * 8,
};

// later: export const darkTheme: Theme = { ...lightTheme, colors: { ... } }
