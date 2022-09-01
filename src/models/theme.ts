export type Theme = {
  color: {
    background: {
      primary: string;
      secondary: string;
      emphasis: string;
      inverted: string;
    };
    text: {
      primary: string;
      inverted: string;
      secondary: string;
    };
    focused: string;
    unfocused: string;
    blue: {
      100: string;
      300: string;
      500: string;
      700: string;
    };
    red: {
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
    xsm: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
  };
};
