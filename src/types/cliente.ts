export type Cliente = {
    codigo: number, nome: string, endereco: string, numeroEndereco: number,
    cidade: string, estado: string, telefone: string, contato: string
}

export type NovoCliente = Omit<Cliente, 'codigo'>