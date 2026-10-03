import { createContext, useContext, useState } from 'react';
import { darkTheme, lightTheme } from '../constants/theme';

const TemaContext = createContext(null);

export function TemaProvider({ children }) {
  const [oscuro, setOscuro] = useState(true);

  return (
    <TemaContext.Provider
      value={{
        oscuro,
        alternarTema: () => setOscuro((o) => !o),
        tema: oscuro ? darkTheme : lightTheme,
      }}
    >
      {children}
    </TemaContext.Provider>
  );
}

export function useTema() {
  const ctx = useContext(TemaContext);
  if (!ctx) throw new Error('useTema debe usarse dentro de un TemaProvider');
  return ctx;
}