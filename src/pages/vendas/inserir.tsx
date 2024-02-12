import ProdutoForm from "@/components/produto-form"
import axios from "axios"
import moment from "moment"
import { FormEvent, useEffect, useState } from "react"

export type Cliente = { codigo: number, nome: string }
export type Produto = { nome: string, valorUnitario: number, quantidade: number }

export default function NovaVenda() {
    const today = moment().format("YYYY-MM-DD")

    const [dataSelecionada, setDataSelecionada] = useState(false)
    const [clienteSelecionado, setClienteSelecionado] = useState(false)
    const [clientes, setClientes] = useState<Cliente[]>([])
    const [produtos, setProdutos] = useState<Produto[]>([])

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

    function clienteModificado() {
        setClienteSelecionado(true)
        if (produtos.length < 1) {
            addProduto()
        }
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
            <fieldset className="d-flex form-row flex-wrap justify-content-between mb-2 gap-2">
                <div className="form-group mb-2 col-sm-4">
                    <label htmlFor="data">Data da venda</label>
                    <input id="data" className="form-control"
                        type="date" name="data" required
                        max={today}
                        onChange={() => setDataSelecionada(true)}
                    />
                </div>
                <div className="form-group mb-2 col" style={{
                    display: dataSelecionada ? 'block': 'none'
                }}>
                    <label htmlFor="cliente">Cliente</label>
                    <select id="cliente" className="form-control"
                        name="codigoCliente" required
                        onChange={() => clienteModificado()}
                        defaultValue=""
                    >
                        <option value="" disabled>
                            Selecione um cliente
                        </option>
                        {clientes.map((cliente: any) =>
                            <option key={cliente.codigo} value={cliente.codigo}>
                                {cliente.nome}
                            </option>
                        )}
                    </select>
                </div>
            </fieldset>
            <div id="produtos" className="my-4" style={{
                display: clienteSelecionado ? 'block': 'none'
            }}>
                <h2>Produtos</h2>
                {produtos.map((produto, index) => (
                    <ProdutoForm produto={produto}
                        index={index} key={index}
                        onChange={p => updateProduto(index, p)}
                        onRemove={i => removeProduto(i)}
                    />
                ))}
                <button className="btn btn-success mt-2" 
                    type="button" onClick={addProduto}
                >Adicionar produto</button>
            </div>
            <button type="submit" className="btn btn-primary mt-2" disabled={produtos.length < 1}>
                Cadastrar
            </button>
        </form>
    </>
}