import React, { createContext, useReducer } from 'react';
import { reducerJogo, CONFIG_INICIAL } from './logicaJogo';

export const ContextoJogo = createContext<any>(null);

export function ProvedorJogo({ children }: any) {
  const [estado, dispatch] = useReducer(reducerJogo, CONFIG_INICIAL);

  return (
    <ContextoJogo.Provider value={{ estado, dispatch }}>
      {children}
    </ContextoJogo.Provider>
  );
}
