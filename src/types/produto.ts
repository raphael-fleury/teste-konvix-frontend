export type Produto = {
    codigo: number,
    nome: string,
    valorUnitario: number,
    quantidade: number
}

export type NovoProduto = Omit<Produto, 'codigo'>