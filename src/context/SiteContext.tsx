import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { content, type Dict, type Lang } from '../data/content';

type Theme = 'dark' | 'light';

type SiteValue = {
  theme: Theme;
  lang: Lang;
  toggleTheme: () => void;
  toggleLang: () => void;
  t: Dict;
};

const SiteContext = createContext<SiteValue | null>(null);

function readStored<T extends string>(key: string, allowed: readonly T[], fallback: T): T {
  try {
    const stored = localStorage.getItem(key) as T | null;
    if (stored && allowed.includes(stored)) return stored;
  } catch {
    /* localStorage pode falhar em modo privado — segue com o padrão */
  }
  return fallback;
}

export function SiteProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    const fromDom = document.documentElement.dataset.theme;
    if (fromDom === 'light' || fromDom === 'dark') return fromDom;
    return readStored('theme', ['dark', 'light'] as const, 'dark');
  });

  const [lang, setLang] = useState<Lang>(() => {
    const fromDom = document.documentElement.lang;
    if (fromDom.startsWith('pt')) return 'pt';
    if (fromDom.startsWith('en')) return 'en';
    return readStored('lang', ['pt', 'en'] as const, 'pt');
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', theme === 'dark' ? '#0A0A0A' : '#FAF9F7');
    try {
      localStorage.setItem('theme', theme);
    } catch {
      /* sem persistência, mas o tema da sessão continua valendo */
    }
  }, [theme]);

  useEffect(() => {
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
    try {
      localStorage.setItem('lang', lang);
    } catch {
      /* idem */
    }
  }, [lang]);

  const toggleTheme = useCallback(() => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'));
  }, []);

  const toggleLang = useCallback(() => {
    setLang((current) => (current === 'pt' ? 'en' : 'pt'));
  }, []);

  const value = useMemo<SiteValue>(
    () => ({ theme, lang, toggleTheme, toggleLang, t: content[lang] }),
    [theme, lang, toggleTheme, toggleLang],
  );

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

export function useSite() {
  const value = useContext(SiteContext);
  if (!value) throw new Error('useSite precisa estar dentro de <SiteProvider>');
  return value;
}
