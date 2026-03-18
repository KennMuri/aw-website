// W3OS theme system - mirrors AW architecture

export interface ColorPalette {
  primary: {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
  };
  semantic: {
    background: {
      gradient1: { color: string; opacity: number };
      gradient2: { color: string; opacity: number };
      gradient3: { color: string; opacity: number };
    };
    border: {
      base: { color: string; opacity: number };
      hover: { color: string; opacity: number };
    };
    glow: {
      base: { color: string; opacity: number };
      strong: { color: string; opacity: number };
    };
  };
}

export interface PageTheme {
  id: string;
  name: string;
  palette: ColorPalette;
}

// W3OS default theme - teal/cyan accent (distinct from AW purple)
export const w3osTheme: PageTheme = {
  id: 'w3os',
  name: 'W3OS',
  palette: {
    primary: {
      50: '240, 253, 250',
      100: '204, 251, 241',
      200: '153, 246, 228',
      300: '94, 234, 212',
      400: '45, 212, 191',
      500: '20, 184, 166',
      600: '13, 148, 136',
      700: '15, 118, 110',
      800: '17, 94, 89',
      900: '19, 78, 74',
    },
    semantic: {
      background: {
        gradient1: { color: '20, 184, 166', opacity: 0.15 },
        gradient2: { color: '13, 148, 136', opacity: 0.12 },
        gradient3: { color: '15, 118, 110', opacity: 0.1 },
      },
      border: {
        base: { color: '20, 184, 166', opacity: 0.3 },
        hover: { color: '45, 212, 191', opacity: 0.5 },
      },
      glow: {
        base: { color: '20, 184, 166', opacity: 0.3 },
        strong: { color: '13, 148, 136', opacity: 0.5 },
      },
    },
  },
};

export const themes = { w3os: w3osTheme };

// ColorScheme type for ModernHero / CTASection (matches AW)
export interface ColorScheme {
  gradientText: {
    stop1: string;
    stop2: string;
    stop3: string;
    stop4: string;
    stop5: string;
  };
  button: {
    primary: { start: string; end: string };
    primaryHover: { start: string; end: string };
    border: { color: string; opacity: number };
  };
  text: { title: string; description: string };
  accent: {
    imageBorder: { color: string; opacity: number };
    imageGlow: { start: string; startOpacity: number; end: string; endOpacity: number };
    dotPattern: { color: string; opacity: number };
    gridPattern: { color: string; opacity: number };
    badge: { color: string; opacity: number };
  };
}

export function themeToColorScheme(theme: PageTheme): ColorScheme {
  const { palette } = theme;
  return {
    gradientText: {
      stop1: '255, 255, 255',
      stop2: '255, 255, 255',
      stop3: palette.primary[50],
      stop4: palette.primary[100],
      stop5: palette.primary[200],
    },
    button: {
      primary: { start: palette.primary[600], end: palette.primary[500] },
      primaryHover: { start: palette.primary[500], end: palette.primary[400] },
      border: { color: palette.primary[500], opacity: palette.semantic.border.base.opacity },
    },
    text: { title: palette.primary[100], description: '160, 160, 160' },
    accent: {
      imageBorder: { color: palette.primary[500], opacity: palette.semantic.border.base.opacity },
      imageGlow: { start: palette.primary[600], startOpacity: 0.8, end: palette.primary[500], endOpacity: 0.6 },
      dotPattern: { color: palette.primary[300], opacity: 0.4 },
      gridPattern: { color: palette.primary[500], opacity: 0.08 },
      badge: { color: palette.primary[600], opacity: 0.2 },
    },
  };
}
