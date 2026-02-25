// Color Theme System for Auditware Website
// Each page has its own color palette based on navbar colors
// All colors are defined here for easy theme management and future dark/light mode support

export interface ColorPalette {
  // Primary brand color (from navbar)
  primary: {
    50: string;   // Lightest tint
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;  // Base color (from navbar)
    600: string;
    700: string;
    800: string;
    900: string;  // Darkest shade
  };
  // Secondary/accent colors
  accent?: {
    light: string;
    base: string;
    dark: string;
  };
  // Semantic colors for the page
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

// Home Page - Purple/Violet Theme (Default brand colors)
// Matches tokens.css values to ensure consistency with service toggle buttons
export const homeTheme: PageTheme = {
  id: 'home',
  name: 'Home',
  palette: {
    primary: {
      50: '245, 243, 255',   // #f5f3ff - matches tokens.css
      100: '237, 233, 254',  // #ede9fe - matches tokens.css
      200: '221, 214, 254',  // #ddd6fe - matches tokens.css
      300: '196, 181, 253',  // #c4b5fd - matches tokens.css
      400: '167, 139, 250',  // #a78bfa - matches tokens.css
      500: '139, 92, 246',   // #8b5cf6 - matches tokens.css (used in service toggle)
      600: '124, 58, 237',   // #7c3aed - matches tokens.css (used in service toggle)
      700: '109, 40, 217',   // #6d28d9 - matches tokens.css
      800: '91, 33, 182',    // #5b21b6 - matches tokens.css
      900: '76, 29, 149',    // #4c1d95 - matches tokens.css
    },
    semantic: {
      background: {
        gradient1: { color: '139, 92, 246', opacity: 0.2 },   // Purple
        gradient2: { color: '124, 58, 237', opacity: 0.15 },  // Deeper purple
        gradient3: { color: '109, 40, 217', opacity: 0.12 },  // Deep purple
      },
      border: {
        base: { color: '139, 92, 246', opacity: 0.3 },
        hover: { color: '167, 139, 250', opacity: 0.5 },
      },
      glow: {
        base: { color: '139, 92, 246', opacity: 0.3 },
        strong: { color: '124, 58, 237', opacity: 0.5 },
      },
    },
  },
};

// Audit Wizard - Blue/Indigo Theme
export const auditWizardTheme: PageTheme = {
  id: 'audit-wizard',
  name: 'Audit Wizard',
  palette: {
    primary: {
      50: '239, 246, 255',   // #eff6ff
      100: '219, 234, 254',  // #dbeafe
      200: '191, 219, 254',  // #bfdbfe
      300: '147, 197, 253',  // #93c5fd
      400: '96, 165, 250',   // #60a5fa
      500: '79, 99, 255',    // #4f63ff - Base blue from navbar
      600: '59, 79, 235',    // #3b4feb
      700: '49, 66, 206',    // #3142ce
      800: '39, 53, 168',    // #2735a8
      900: '30, 41, 130',    // #1e2982
    },
    accent: {
      light: '147, 197, 253',  // Light blue
      base: '96, 165, 250',    // Medium blue
      dark: '37, 99, 235',     // Deep blue
    },
    semantic: {
      background: {
        gradient1: { color: '79, 99, 255', opacity: 0.2 },
        gradient2: { color: '59, 79, 235', opacity: 0.15 },
        gradient3: { color: '49, 66, 206', opacity: 0.12 },
      },
      border: {
        base: { color: '79, 99, 255', opacity: 0.3 },
        hover: { color: '96, 165, 250', opacity: 0.5 },
      },
      glow: {
        base: { color: '79, 99, 255', opacity: 0.3 },
        strong: { color: '59, 79, 235', opacity: 0.5 },
      },
    },
  },
};

// Sentry - Green/Teal Theme
export const sentryTheme: PageTheme = {
  id: 'sentry',
  name: 'Sentry',
  palette: {
    primary: {
      50: '236, 253, 245',   // #ecfdf5
      100: '209, 250, 229',  // #d1fae5
      200: '167, 243, 208',  // #a7f3d0
      300: '110, 231, 183',  // #6ee7b7
      400: '52, 211, 153',   // #34d399
      500: '89, 184, 134',   // #59b886 - Base green from navbar
      600: '72, 167, 117',   // #48a775
      700: '56, 142, 96',    // #388e60
      800: '42, 108, 74',    // #2a6c4a
      900: '31, 79, 56',     // #1f4f38
    },
    accent: {
      light: '167, 243, 208',  // Bright mint
      base: '110, 231, 183',   // Mint green
      dark: '52, 211, 153',    // Emerald
    },
    semantic: {
      background: {
        gradient1: { color: '89, 184, 134', opacity: 0.2 },
        gradient2: { color: '72, 167, 117', opacity: 0.15 },
        gradient3: { color: '56, 142, 96', opacity: 0.12 },
      },
      border: {
        base: { color: '89, 184, 134', opacity: 0.3 },
        hover: { color: '110, 231, 183', opacity: 0.5 },
      },
      glow: {
        base: { color: '89, 184, 134', opacity: 0.3 },
        strong: { color: '72, 167, 117', opacity: 0.5 },
      },
    },
  },
};

// Radar - Subtle Yellow-Green Theme
export const radarTheme: PageTheme = {
  id: 'radar',
  name: 'Radar',
  palette: {
    primary: {
      50: '240, 253, 244',   // #f0fdf4 - Very light green with yellow tint
      100: '220, 252, 231',   // #dcfce7 - Light green-yellow
      200: '187, 247, 208',   // #bbf7d0 - Soft yellow-green
      300: '134, 239, 172',   // #86efac - Muted yellow-green
      400: '101, 217, 120',   // #65d978 - Medium yellow-green (more yellow)
      500: '84, 180, 100',    // #54b464 - Base yellow-green (warmer, more yellow than Sentry)
      600: '68, 146, 81',     // #449251 - Deeper yellow-green
      700: '56, 120, 67',     // #387843 - Dark yellow-green
      800: '45, 97, 54',       // #2d6136 - Deep yellow-green
      900: '37, 79, 44',       // #254f2c - Darkest yellow-green
    },
    accent: {
      light: '134, 239, 172',  // Muted yellow-green
      base: '101, 217, 120',    // Medium yellow-green (more yellow)
      dark: '68, 146, 81',      // Deeper yellow-green
    },
    semantic: {
      background: {
        gradient1: { color: '84, 180, 100', opacity: 0.25 },
        gradient2: { color: '68, 146, 81', opacity: 0.2 },
        gradient3: { color: '56, 120, 67', opacity: 0.15 },
      },
      border: {
        base: { color: '84, 180, 100', opacity: 0.3 },
        hover: { color: '101, 217, 120', opacity: 0.5 },
      },
      glow: {
        base: { color: '84, 180, 100', opacity: 0.3 },
        strong: { color: '68, 146, 81', opacity: 0.5 },
      },
    },
  },
};

// Multisig Monitor - Greenish-yellow / lime theme (from Multisigmonitor branding)
export const multisigMonitorTheme: PageTheme = {
  id: 'multisig-monitor',
  name: 'Multisig Monitor',
  palette: {
    primary: {
      50: '247, 254, 231',   // #f7fee7 - very light lime
      100: '236, 252, 203',   // #ecfccb
      200: '217, 249, 157',   // #d9f99d
      300: '190, 242, 100',   // #bef264
      400: '163, 230, 53',    // #a3e635 - lime
      500: '132, 204, 22',   // #84cc16 - greenish-yellow base
      600: '113, 163, 18',   // #71a312
      700: '92, 128, 15',    // #5c800f
      800: '73, 102, 12',    // #49660c
      900: '54, 77, 9',      // #354d09
    },
    accent: {
      light: '190, 242, 100',  // Light lime
      base: '163, 230, 53',    // Lime
      dark: '113, 163, 18',    // Deep lime
    },
    semantic: {
      background: {
        gradient1: { color: '132, 204, 22', opacity: 0.22 },
        gradient2: { color: '113, 163, 18', opacity: 0.18 },
        gradient3: { color: '92, 128, 15', opacity: 0.14 },
      },
      border: {
        base: { color: '132, 204, 22', opacity: 0.35 },
        hover: { color: '163, 230, 53', opacity: 0.5 },
      },
      glow: {
        base: { color: '132, 204, 22', opacity: 0.35 },
        strong: { color: '113, 163, 18', opacity: 0.5 },
      },
    },
  },
};

// Audits - Sky Blue Theme
export const auditsTheme: PageTheme = {
  id: 'audits',
  name: 'Audits',
  palette: {
    primary: {
      50: '240, 249, 255',   // #f0f9ff
      100: '224, 242, 254',  // #e0f2fe
      200: '186, 230, 253',  // #bae6fd
      300: '125, 211, 252',  // #7dd3fc
      400: '56, 189, 248',   // #38bdf8
      500: '59, 130, 246',   // #3b82f6 - Base sky blue from navbar
      600: '37, 99, 235',    // #2563eb
      700: '29, 78, 216',    // #1d4ed8
      800: '30, 64, 175',    // #1e40af
      900: '30, 58, 138',    // #1e3a8a
    },
    accent: {
      light: '125, 211, 252',  // Sky blue light
      base: '56, 189, 248',    // Sky blue
      dark: '37, 99, 235',     // Deep blue
    },
    semantic: {
      background: {
        gradient1: { color: '59, 130, 246', opacity: 0.2 },
        gradient2: { color: '37, 99, 235', opacity: 0.15 },
        gradient3: { color: '29, 78, 216', opacity: 0.12 },
      },
      border: {
        base: { color: '59, 130, 246', opacity: 0.3 },
        hover: { color: '125, 211, 252', opacity: 0.5 },
      },
      glow: {
        base: { color: '59, 130, 246', opacity: 0.3 },
        strong: { color: '37, 99, 235', opacity: 0.5 },
      },
    },
  },
};

// Theme registry - easy access to all themes
export const themes: Record<string, PageTheme> = {
  home: homeTheme,
  'audit-wizard': auditWizardTheme,
  sentry: sentryTheme,
  radar: radarTheme,
  'multisig-monitor': multisigMonitorTheme,
  audits: auditsTheme,
};

// Helper function to convert theme to ModernHero ColorScheme
export function themeToColorScheme(theme: PageTheme) {
  const { palette } = theme;
  
  // Create stronger gradient for better visibility
  // For audit wizard (blue), use more saturated blues in the gradient
  const isAuditWizard = theme.id === 'audit-wizard';
  
  return {
    gradientText: {
      stop1: '255, 255, 255',      // Pure white
      stop2: isAuditWizard ? palette.primary[100] : '255, 255, 255',  // Start blue earlier for audit wizard
      stop3: isAuditWizard ? palette.primary[200] : palette.primary[50],  // Light blue tint
      stop4: isAuditWizard ? palette.primary[300] : palette.primary[100], // Medium blue tint
      stop5: isAuditWizard ? palette.primary[400] : palette.primary[200], // Stronger blue accent
    },
    button: {
      primary: { 
        start: palette.primary[600], 
        end: palette.primary[500] 
      },
      primaryHover: { 
        start: palette.primary[500], 
        end: palette.primary[400] 
      },
      border: { 
        color: palette.primary[500], 
        opacity: palette.semantic.border.base.opacity 
      },
    },
    text: {
      title: palette.primary[100],
      description: '160, 160, 160',
    },
    accent: {
      imageBorder: { 
        color: palette.primary[500], 
        opacity: palette.semantic.border.base.opacity 
      },
      imageGlow: { 
        start: palette.primary[600], 
        startOpacity: 0.8, 
        end: palette.primary[500], 
        endOpacity: 0.6 
      },
      dotPattern: { 
        color: palette.primary[300], 
        opacity: 0.4 
      },
      gridPattern: { 
        color: palette.primary[500], 
        opacity: 0.08 
      },
      badge: { 
        color: palette.primary[600], 
        opacity: 0.2 
      },
    },
  };
}


// Helper to generate CSS variables for a theme
export function generateThemeCSSVariables(theme: PageTheme): string {
  const { palette } = theme;
  
  return `
    /* Primary Color Scale */
    --theme-primary-50: ${palette.primary[50]};
    --theme-primary-100: ${palette.primary[100]};
    --theme-primary-200: ${palette.primary[200]};
    --theme-primary-300: ${palette.primary[300]};
    --theme-primary-400: ${palette.primary[400]};
    --theme-primary-500: ${palette.primary[500]};
    --theme-primary-600: ${palette.primary[600]};
    --theme-primary-700: ${palette.primary[700]};
    --theme-primary-800: ${palette.primary[800]};
    --theme-primary-900: ${palette.primary[900]};
    
    /* Semantic Colors */
    --theme-bg-gradient-1: ${palette.semantic.background.gradient1.color};
    --theme-bg-gradient-1-opacity: ${palette.semantic.background.gradient1.opacity};
    --theme-bg-gradient-2: ${palette.semantic.background.gradient2.color};
    --theme-bg-gradient-2-opacity: ${palette.semantic.background.gradient2.opacity};
    --theme-bg-gradient-3: ${palette.semantic.background.gradient3.color};
    --theme-bg-gradient-3-opacity: ${palette.semantic.background.gradient3.opacity};
    
    --theme-border-base: ${palette.semantic.border.base.color};
    --theme-border-base-opacity: ${palette.semantic.border.base.opacity};
    --theme-border-hover: ${palette.semantic.border.hover.color};
    --theme-border-hover-opacity: ${palette.semantic.border.hover.opacity};
    
    --theme-glow-base: ${palette.semantic.glow.base.color};
    --theme-glow-base-opacity: ${palette.semantic.glow.base.opacity};
    --theme-glow-strong: ${palette.semantic.glow.strong.color};
    --theme-glow-strong-opacity: ${palette.semantic.glow.strong.opacity};
  `.trim();
}

// Helper to generate theme-specific gradient text class
export function generateGradientTextStyle(theme: PageTheme): string {
  const { palette } = theme;
  
  return `
    background: linear-gradient(
      135deg,
      rgb(255, 255, 255) 0%,
      rgb(255, 255, 255) 25%,
      rgb(${palette.primary[50]}) 50%,
      rgb(${palette.primary[100]}) 75%,
      rgb(${palette.primary[200]}) 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  `.trim();
}

