/**
 * ============================================
 * ARQUIVO CENTRAL DE TOKENS VISUAIS (IDV)
 * ============================================
 *
 * Para aplicar a identidade visual do cliente,
 * basta editar os valores neste arquivo.
 *
 * Todas as cores, fontes e espaçamentos estão
 * centralizados aqui para facilitar mudanças.
 */

export const theme = {
  // ==========================================
  // CORES PRINCIPAIS
  // ==========================================

  colors: {
    // Fundo da página
    background: '#FFF7ED',           // champagne claro

    // Textos
    textPrimary: '#2A140C',          // marrom profundo
    textSecondary: '#6B4A3A',        // marrom queimado

    // Acentos
    accentPrimary: '#780026',       // vinho profundo
    accentSecondary: '#F1C99A',     // champagne/dourado

    // Cards
    cardBackground: '#FFFDF8',       // branco quente
    cardBorder: 'rgba(120, 0, 38, 0.16)',

    // Botões primários
    buttonPrimary: '#050505',       // preto premium
    buttonPrimaryHover: '#1A1112',  // preto com calor
    buttonText: '#FFF7ED',          // creme claro

    // Botões secundários
    buttonSecondary: 'transparent',
    buttonSecondaryBorder: '#780026',
    buttonSecondaryText: '#2A140C',

    // Estados
    success: '#7E9B57',             // verde oliva
    error: '#A00034',               // vinho

    // Progresso
    progressBar: '#780026',
    progressBarBackground: 'rgba(120, 0, 38, 0.12)',

    // Alternativas do quiz
    optionDefault: '#FFFDF8',
    optionHover: '#FFF3E7',
    optionSelected: '#780026',
    optionSelectedText: '#FFF7ED',
    optionCorrect: '#7E9B57',
    optionIncorrect: '#A00034',
  },

  // ==========================================
  // TIPOGRAFIA
  // ==========================================

  fonts: {
    serif: "'Cormorant Garamond', Georgia, 'Times New Roman', serif",
    sans: "'Manrope', 'Segoe UI', sans-serif",
  },

  fontSizes: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',      // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem',  // 36px
    '5xl': '3rem',     // 48px
  },

  fontWeights: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  // ==========================================
  // ESPAÇAMENTOS
  // ==========================================

  spacing: {
    section: '4rem',      // espaçamento entre seções
    card: '1.5rem',       // padding interno dos cards
    element: '1rem',      // espaçamento entre elementos
    tight: '0.5rem',      // espaçamento pequeno
  },

  // ==========================================
  // BORDAS
  // ==========================================

  borderRadius: {
    DEFAULT: '0.5rem',    // 8px - bordas gerais
    card: '1rem',         // 16px - cards
    button: '9999px',     // 9999px - botões arredondados
    full: '9999px',       // círculo perfeito
  },

  // ==========================================
  // SOMBRAS
  // ==========================================

  shadows: {
    card: '0 18px 50px rgba(42, 20, 12, 0.10)',
    cardHover: '0 24px 64px rgba(42, 20, 12, 0.14)',
    button: '0 10px 22px rgba(42, 20, 12, 0.18)',
    buttonHover: '0 14px 28px rgba(42, 20, 12, 0.22)',
  },

  // ==========================================
  // TRANSIÇÕES
  // ==========================================

  transitions: {
    fast: '150ms ease',
    default: '200ms ease',
    slow: '300ms ease',
  },

  // ==========================================
  // BREAKPOINTS
  // ==========================================

  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },

  // ==========================================
  // Z-INDEX
  // ==========================================

  zIndex: {
    base: 0,
    dropdown: 100,
    modal: 1000,
    toast: 2000,
  },
} as const

// ==========================================
// CSS VARIABLES (para uso em runtime)
// ==========================================

export const cssVariables = `
  :root {
    /* Cores */
    --color-background: ${theme.colors.background};
    --color-foreground: ${theme.colors.textPrimary};
    --color-text-primary: ${theme.colors.textPrimary};
    --color-text-secondary: ${theme.colors.textSecondary};
    --color-accent-primary: ${theme.colors.accentPrimary};
    --color-accent-secondary: ${theme.colors.accentSecondary};
    --color-card-background: ${theme.colors.cardBackground};
    --color-card-border: ${theme.colors.cardBorder};
    --color-button-primary: ${theme.colors.buttonPrimary};
    --color-button-primary-hover: ${theme.colors.buttonPrimaryHover};
    --color-button-text: ${theme.colors.buttonText};
    --color-button-secondary: ${theme.colors.buttonSecondary};
    --color-button-secondary-border: ${theme.colors.buttonSecondaryBorder};
    --color-button-secondary-text: ${theme.colors.buttonSecondaryText};
    --color-success: ${theme.colors.success};
    --color-error: ${theme.colors.error};
    --color-progress-bar: ${theme.colors.progressBar};
    --color-progress-bar-bg: ${theme.colors.progressBarBackground};
    --color-option-default: ${theme.colors.optionDefault};
    --color-option-hover: ${theme.colors.optionHover};
    --color-option-selected: ${theme.colors.optionSelected};
    --color-option-selected-text: ${theme.colors.optionSelectedText};
    --color-option-correct: ${theme.colors.optionCorrect};
    --color-option-incorrect: ${theme.colors.optionIncorrect};

    /* Fontes */
    --font-serif: ${theme.fonts.serif};
    --font-sans: ${theme.fonts.sans};

    /* Bordas */
    --radius-default: ${theme.borderRadius.DEFAULT};
    --radius-card: ${theme.borderRadius.card};
    --radius-button: ${theme.borderRadius.button};

    /* Sombras */
    --shadow-card: ${theme.shadows.card};
    --shadow-card-hover: ${theme.shadows.cardHover};
    --shadow-button: ${theme.shadows.button};
    --shadow-button-hover: ${theme.shadows.buttonHover};

    /* Espaçamentos */
    --spacing-section: ${theme.spacing.section};
    --spacing-card: ${theme.spacing.card};
    --spacing-element: ${theme.spacing.element};
  }
`

export type Theme = typeof theme
export default theme
