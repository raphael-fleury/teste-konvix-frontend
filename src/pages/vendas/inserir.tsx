import ProdutoForm from "@/components/produto-form"
import axios from "axios"
import moment from "moment"
import { FormEvent, useEffect, useState } from "react"

export type Cliente = { codigo: number, nome: string }
export type Produto = { nome: string, valorUnitario: number, quantidade: number }

export default function NovaVenda() {
    const now = moment().format()
    const [clientes, setClientes] = useState<Cliente[]>([])
    const [produtos, setProdutos] = useState<Produto[]>([
        {nome: "", valorUnitario: 0, quantidade: 1}
    ])

    useEffect(() => {
        axios.get('http://localhost:4000/api/clientes')
            .then(({data}) => setClientes(data))
            .catch(() => alert("Erro ao buscar os clientes."))
    }, [])

    function addProduto() {
        setProdutos([...produtos, {
            nome: "", valorUnitario: 0, quantidade: 1
        }])
    }

    function updateProduto(index: number, produto: Produto) {
        const aux = [...produtos]
        aux[index] = produto
        setProdutos(aux)
    }

    function removeProduto(index: number) {
        const aux = [...produtos]
        aux.splice(index, 1)
        setProdutos(aux)
    }

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        if (produtos.length < 1) {
            alert("Adicione ao menos um produto.")
            return
        }

        const venda: any = {}
        const formData = new FormData(event.currentTarget)
        formData.forEach((value, key) => (venda[key] = value))

        venda.codigoCliente = Number(venda.codigoCliente)
        venda.produtos = produtos

        axios.post('http://localhost:4000/api/vendas', venda)
            .then(() => window.location.pathname = '/vendas/relatorio')
            .catch(() => alert("Erro ao cadastrar a venda."))
    }

    return <>
        <h1>Nova Venda</h1>
        <form onSubmit={onSubmit}>
            <div className="form-group mb-2 col-sm-4">
                <label htmlFor="data">Data da venda</label>
                <input id="data" className="form-control"
                    type="date" name="data" required
                />
            </div>
            <div className="form-group mb-2 col-lg-6">
                <label htmlFor="cliente">Cliente</label>
                <select className="form-control" id="cliente" name="codigoCliente">
                    {clientes.map((cliente: any) =>
                        <option key={cliente.codigo} value={cliente.codigo}>
                            {cliente.nome}
                        </option>
                    )}
                </select>
            </div>
            <div id="produtos" className="my-4">
                <h2>Produtos</h2>
                {produtos.map((produto, index) => (
                    <ProdutoForm produto={produto}
                        index={index} key={index}
                        onChange={p => updateProduto(index, p)}
                        onRemove={i => removeProduto(i)}
                    />
                ))}
                <button className="btn btn-success" 
                    type="button" onClick={addProduto}
                >+</button>
            </div>
            <button type="submit" className="btn btn-primary mt-2">Cadastrar</button>
        </form>
    </>
}