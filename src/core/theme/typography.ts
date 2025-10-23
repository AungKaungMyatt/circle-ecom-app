import { Typography } from "./types";

// Change to your installed families (Inter used as example)
export const typography: Typography = {
  family: {
    regular: "Inter-Regular",
    medium: "Inter-Medium",
    semibold: "Inter-SemiBold",
    bold: "Inter-Bold",
  },
  weights: {
    regular: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
  },
  size: {
    xs:  { size: 12, lineHeight: 16, weight: "regular", letterSpacing: 0.2 },
    sm:  { size: 14, lineHeight: 18, weight: "regular", letterSpacing: 0.1 },
    md:  { size: 16, lineHeight: 22, weight: "regular" },
    lg:  { size: 18, lineHeight: 24, weight: "medium" },
    xl:  { size: 20, lineHeight: 26, weight: "semibold" },
    "2xl": { size: 24, lineHeight: 30, weight: "bold" },
    "3xl": { size: 28, lineHeight: 34, weight: "bold" },
  },
};
