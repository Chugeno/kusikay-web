export function getInitialLanguage(): 'es' | 'en' {
  if (typeof window !== 'undefined' && window.localStorage) {
    // Verificar si hay un idioma guardado en el almacenamiento local
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage === 'es' || savedLanguage === 'en') {
      return savedLanguage;
    }
    
    // Detectar el idioma del navegador
    if (window.navigator) {
      const nav = window.navigator as NavigatorWithUserLanguage;
      const browserLanguages = nav.languages || [nav.language || nav.userLanguage || ''];
      for (let lang of browserLanguages) {
        if (lang.toLowerCase().indexOf('es') === 0) return 'es';
        if (lang.toLowerCase().indexOf('en') === 0) return 'en';
      }
    }
  }
  
  // Por defecto, usar inglés
  return 'en';
}

export function setLanguage(lang: 'es' | 'en') {
  if (typeof window !== 'undefined' && window.localStorage) {
    localStorage.setItem('language', lang);
  }
}

// Declarar un tipo que incluya userLanguage
interface NavigatorWithUserLanguage extends Navigator {
  userLanguage?: string;
}
