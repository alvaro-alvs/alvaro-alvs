
export function formatCpf(cpf: string | undefined): string {
    if (!cpf) return '';

    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

export const formatBrl = (valorEmCentavos: number | undefined) => {
    if (!valorEmCentavos) return 'R$ 0,00';
    // Converte de centavos para reais
    const valorEmReais = valorEmCentavos / 100;
    // Formata com ponto de milhar e duas casas decimais
    return valorEmReais.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}