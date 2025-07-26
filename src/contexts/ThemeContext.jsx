import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Theme types
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  MATRIX: 'matrix'
};

// Theme configurations
export const themeConfigs = {
  [THEMES.LIGHT]: {
    name: 'Light',
    primary: {
      bg: 'from-gray-50 via-blue-50 to-purple-50',
      text: 'text-gray-900',
      accent: 'from-blue-600 to-purple-600',
      secondary: 'from-indigo-500 to-blue-500',
      muted: 'text-gray-600',
      border: 'border-gray-200',
      card: 'bg-white/80',
      cardBorder: 'border-gray-200/50',
      overlay: 'bg-white/90',
      glass: 'bg-white/10',
      hover: 'hover:bg-gray-100'
    },
    particles: {
      color: 'bg-blue-400',
      glow: 'shadow-blue-400/20',
      connection: 'stroke-blue-400/30'
    },
    navigation: {
      bg: 'bg-white/90',
      text: 'text-gray-900',
      hover: 'hover:text-blue-600',
      active: 'text-blue-600'
    },
    sections: {
      hero: {
        bg: 'from-gray-50 via-blue-50 to-indigo-100',
        text: 'text-gray-900',
        accent: 'from-blue-600 to-indigo-600'
      },
      about: {
        bg: 'from-indigo-50 via-purple-50 to-pink-50',
        text: 'text-gray-900',
        accent: 'from-purple-600 to-pink-600'
      },
      services: {
        bg: 'from-pink-50 via-rose-50 to-orange-50',
        text: 'text-gray-900',
        accent: 'from-rose-600 to-orange-600'
      },
      projects: {
        bg: 'from-orange-50 via-amber-50 to-yellow-50',
        text: 'text-gray-900',
        accent: 'from-amber-600 to-yellow-600'
      },
      contact: {
        bg: 'from-yellow-50 via-green-50 to-emerald-50',
        text: 'text-gray-900',
        accent: 'from-green-600 to-emerald-600'
      },
      footer: {
        bg: 'from-emerald-50 via-teal-50 to-cyan-50',
        text: 'text-gray-900',
        accent: 'from-teal-600 to-cyan-600'
      }
    }
  },
  [THEMES.DARK]: {
    name: 'Dark',
    primary: {
      bg: 'from-slate-900 via-blue-900 to-purple-900',
      text: 'text-white',
      accent: 'from-blue-400 to-purple-400',
      secondary: 'from-indigo-400 to-blue-400',
      muted: 'text-gray-300',
      border: 'border-gray-700',
      card: 'bg-gray-800/80',
      cardBorder: 'border-gray-700/50',
      overlay: 'bg-gray-900/90',
      glass: 'bg-gray-800/10',
      hover: 'hover:bg-gray-800'
    },
    particles: {
      color: 'bg-blue-400',
      glow: 'shadow-blue-400/20',
      connection: 'stroke-blue-400/30'
    },
    navigation: {
      bg: 'bg-gray-900/90',
      text: 'text-white',
      hover: 'hover:text-blue-400',
      active: 'text-blue-400'
    },
    sections: {
      hero: {
        bg: 'from-slate-900 via-blue-900 to-indigo-900',
        text: 'text-white',
        accent: 'from-blue-400 to-indigo-400'
      },
      about: {
        bg: 'from-indigo-900 via-purple-900 to-pink-900',
        text: 'text-white',
        accent: 'from-purple-400 to-pink-400'
      },
      services: {
        bg: 'from-pink-900 via-rose-900 to-orange-900',
        text: 'text-white',
        accent: 'from-rose-400 to-orange-400'
      },
      projects: {
        bg: 'from-orange-900 via-amber-900 to-yellow-900',
        text: 'text-white',
        accent: 'from-amber-400 to-yellow-400'
      },
      contact: {
        bg: 'from-yellow-900 via-green-900 to-emerald-900',
        text: 'text-white',
        accent: 'from-green-400 to-emerald-400'
      },
      footer: {
        bg: 'from-emerald-900 via-teal-900 to-cyan-900',
        text: 'text-white',
        accent: 'from-teal-400 to-cyan-400'
      }
    }
  },
  [THEMES.MATRIX]: {
    name: 'Matrix',
    primary: {
      bg: 'from-black via-green-950 to-black',
      text: 'text-green-400',
      accent: 'from-green-400 to-emerald-400',
      secondary: 'from-green-500 to-emerald-500',
      muted: 'text-green-300',
      border: 'border-green-400/30',
      card: 'bg-green-950/50',
      cardBorder: 'border-green-400/30',
      overlay: 'bg-black/90',
      glass: 'bg-green-950/10',
      hover: 'hover:bg-green-950/50'
    },
    particles: {
      color: 'bg-green-400',
      glow: 'shadow-green-400/20',
      connection: 'stroke-green-400/30'
    },
    navigation: {
      bg: 'bg-black/90',
      text: 'text-green-400',
      hover: 'hover:text-green-300',
      active: 'text-green-300'
    },
    sections: {
      hero: {
        bg: 'from-black via-green-950 to-black',
        text: 'text-green-400',
        accent: 'from-green-400 to-emerald-400'
      },
      about: {
        bg: 'from-black via-green-950 to-emerald-950',
        text: 'text-green-400',
        accent: 'from-green-400 to-emerald-400'
      },
      services: {
        bg: 'from-emerald-950 via-green-950 to-black',
        text: 'text-green-400',
        accent: 'from-emerald-400 to-green-400'
      },
      projects: {
        bg: 'from-black via-green-900 to-emerald-900',
        text: 'text-green-400',
        accent: 'from-green-400 to-emerald-400'
      },
      contact: {
        bg: 'from-emerald-900 via-green-900 to-black',
        text: 'text-green-400',
        accent: 'from-green-400 to-emerald-400'
      },
      footer: {
        bg: 'from-black via-green-950 to-black',
        text: 'text-green-400',
        accent: 'from-green-400 to-emerald-400'
      }
    }
  }
};

// Theme actions
const THEME_ACTIONS = {
  SET_THEME: 'SET_THEME',
  TOGGLE_THEME: 'TOGGLE_THEME'
};

// Theme reducer
const themeReducer = (state, action) => {
  switch (action.type) {
    case THEME_ACTIONS.SET_THEME:
      return {
        ...state,
        currentTheme: action.payload,
        config: themeConfigs[action.payload]
      };
    case THEME_ACTIONS.TOGGLE_THEME:
      const themes = [THEMES.LIGHT, THEMES.DARK, THEMES.MATRIX];
      const currentIndex = themes.indexOf(state.currentTheme);
      const nextIndex = (currentIndex + 1) % themes.length;
      const nextTheme = themes[nextIndex];
      return {
        ...state,
        currentTheme: nextTheme,
        config: themeConfigs[nextTheme]
      };
    default:
      return state;
  }
};

// Theme context
const ThemeContext = createContext();

// Theme provider
export const ThemeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(themeReducer, {
    currentTheme: THEMES.DARK,
    config: themeConfigs[THEMES.DARK]
  });

  // Load theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('shriram-theme');
    if (savedTheme && themeConfigs[savedTheme]) {
      dispatch({ type: THEME_ACTIONS.SET_THEME, payload: savedTheme });
    }
  }, []);

  // Save theme to localStorage
  useEffect(() => {
    localStorage.setItem('shriram-theme', state.currentTheme);
  }, [state.currentTheme]);

  // Theme actions
  const setTheme = (theme) => {
    dispatch({ type: THEME_ACTIONS.SET_THEME, payload: theme });
  };

  const toggleTheme = () => {
    dispatch({ type: THEME_ACTIONS.TOGGLE_THEME });
  };

  const value = {
    ...state,
    setTheme,
    toggleTheme,
    isMatrix: state.currentTheme === THEMES.MATRIX,
    isDark: state.currentTheme === THEMES.DARK,
    isLight: state.currentTheme === THEMES.LIGHT
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

// Theme hook
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

// Theme utilities
export const getThemeClasses = (theme, section = null) => {
  const config = themeConfigs[theme];
  if (section && config.sections[section]) {
    return config.sections[section];
  }
  return config.primary;
};

export const getSectionTheme = (theme, sectionName) => {
  const config = themeConfigs[theme];
  return config.sections[sectionName] || config.primary;
};
