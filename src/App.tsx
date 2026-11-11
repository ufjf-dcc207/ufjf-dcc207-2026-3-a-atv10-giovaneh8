// src/App.tsx
import React, { useContext } from 'react';
import { ProvedorJogo, ContextoJogo } from './ContextoJogo';

function TelaJogo() {
  const { estado, dispatch } = useContext(ContextoJogo);

  return (
    <div style={{ textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h2>Magic Sort 🧪</h2>
      {estado.venceu && <h3 style={{ color: 'green' }}>🎉 Você Ganhou! 🎉</h3>}

      <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', margin: '20px' }}>
        {estado.tubos.map((tubo: any, i: number) => {
          const clicado = estado.tuboSelecionado === i;

          return (
            <div
              key={i}
              onClick={() => !estado.venceu && dispatch({ tipo: 'CLIQUE_TUBO', payload: i })}
              style={{
                border: clicado ? '3px solid gold' : '2px solid white',
                borderRadius: '0 0 10px 10px',
                width: '50px',
                height: '120px',
                display: 'flex',
                flexDirection: 'column-reverse',
                cursor: 'pointer'
              }}
            >
              {tubo.map((cor: string, idx: number) => (
                <div key={idx} style={{ fontSize: '24px' }}>{cor}</div>
              ))}
            </div>
          );
        })}
      </div>

      <button onClick={() => dispatch({ tipo: 'REINICIAR' })}>Reiniciar</button>
    </div>
  );
}

export default function App() {
  return (
    <ProvedorJogo>
      <TelaJogo />
    </ProvedorJogo>
  );
}
