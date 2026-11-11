export const CONFIG_INICIAL = {
  tubos: [
    ['🔴', '🔵', '🟢'],
    ['🔵', '🟢', '🔴'],
    ['🟢', '🔴', '🔵'],
    []
  ] as any,
  tuboSelecionado: null as any,
  venceu: false
};

export function reducerJogo(estado: any, acao: any) {
  if (acao.tipo === 'REINICIAR') {
    return CONFIG_INICIAL;
  }

  if (acao.tipo === 'CLIQUE_TUBO') {
    const alvo = acao.payload;

    if (estado.tuboSelecionado === null) {
      if (estado.tubos[alvo].length === 0) {
        return estado;
      }
      return { ...estado, tuboSelecionado: alvo };
    }

    const origem = estado.tuboSelecionado;

    if (origem === alvo) {
      return { ...estado, tuboSelecionado: null };
    }

    const tuboOrigem = estado.tubos[origem];
    const tuboAlvo = estado.tubos[alvo];
    const corMovida = tuboOrigem[tuboOrigem.length - 1];

    const temEspaco = tuboAlvo.length < 3;
    const estaVazioOuCorIgual = tuboAlvo.length === 0 || tuboAlvo[tuboAlvo.length - 1] === corMovida;

    if (temEspaco && estaVazioOuCorIgual) {
      const novosTubos = estado.tubos.map((tubo: any, i: number) => {
        if (i === origem) return tubo.slice(0, -1);
        if (i === alvo) return [...tubo, corMovida];
        return tubo;
      });

      const venceu = novosTubos.every((t: any) => {
        return t.length === 0 || (t.length === 3 && t[0] === t[1] && t[1] === t[2]);
      });

      return { tubos: novosTubos, tuboSelecionado: null, venceu };
    } else {
      return { ...estado, tuboSelecionado: alvo };
    }
  }

  return estado;
}
