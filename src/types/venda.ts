import { Cliente } from "./cliente"
import { NovoProduto, Produto } from "./produto"

export type VendaDetalhada = {
    codigo: number,
    data: string,
    valorTotal: number,
    cliente: Cliente,
    itens: Produto[]
}

export type NovaVenda = {
    data: string,
    codigoCliente: number,
    produtos: NovoProduto[]
}