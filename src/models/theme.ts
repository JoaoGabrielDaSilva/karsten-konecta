export type Theme = {
  color: {
    background: {
      primary: string;
      secondary: string;
    };
    text: {
      primary: string;
      secondary: string;
    };
    blue: {
      100: string;
      300: string;
      500: string;
      700: string;
    };
    white: string;
  };
  spacing: {
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
  };
  radii: {
    sm: number;
    md: number;
    lg: number;
  };
  fontSize: {
    xsm: 10;
    sm: 12;
    md: 14;
    lg: 18;
    xl: 25;
  };
};
