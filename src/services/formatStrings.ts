

export const formatBrl = (valorEmCentavos: number | undefined) => {
    if (!valorEmCentavos) return 'R$ 0,00';
    // Converte de centavos para reais
    const valorEmReais = valorEmCentavos / 100;
    // Formata com ponto de milhar e duas casas decimais
    return valorEmReais.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}