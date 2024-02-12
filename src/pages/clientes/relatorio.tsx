import axios from "axios"
import moment from "moment"
import ReactModal from "react-modal"
import { useEffect, useState } from "react"

type Relatorio = Array<{
    codigo: number,
    nome: string,
    valorDeVendaAcumulado: number,
    dataUltimoPedido: string
}>

type OrderProps = keyof Relatorio[number]
type Order = {
    prop: OrderProps,
    asc: boolean
}

function OrdinationIcon({ordination, prop}: 
    {ordination: Order, prop: OrderProps}
) {
    if (prop !== ordination.prop) { return <></> }
    return ordination.asc ? <> &uarr;</> : <> &darr;</>
}

export default function RelatorioDeVendasPorCliente() {
    const [clientes, setClientes] = useState<Relatorio>([])
    const [clienteToRemove, setClienteToRemove] = useState<Relatorio[number]>()
    const [ordination, setOrdination] = useState<Order>({
        prop: "dataUltimoPedido", asc: false
    })

    useEffect(() => {
        axios.get('http://localhost:4000/api/clientes/relatorio')
            .then(({data}) => setClientes(data))
            .catch(() => alert("Erro ao buscar os clientes."))
    }, [])

    useEffect(() => {
        const {prop, asc} = ordination
        const aux = [...clientes]
        aux.sort((a, b) => {
            return (a[prop] === b[prop]) ? 0 :
                (a[prop] > b[prop] ? 1 : -1)
                * (asc ? 1 : -1)
        })
        setClientes(aux)
    }, [ordination])

    function removeCliente() {
        if (!clienteToRemove) { return }
        const { codigo, nome} = clienteToRemove

        axios.delete(`http://localhost:4000/api/clientes/${codigo}`)
            .then(() => window.location.reload())
            .catch(() => alert("Erro ao deletar " + nome))
    }

    return <>
        <h1>Relatório de Vendas por Cliente</h1>
        <ReactModal isOpen={!!clienteToRemove} style={{
            content: {
                top: '50%', bottom: 'auto',
                left: '50%', right: 'auto',
                marginRight: '-25%',
                transform: 'translate(-50%, -50%)',
            }
        }}>
            <h2>Deseja remover {clienteToRemove?.nome}?</h2>
            <div className="d-flex justify-content-center gap-2 mt-4">
                <button className="btn btn-light"
                    onClick={() => setClienteToRemove(undefined)}
                >Cancelar</button>
                <button className="btn btn-danger"
                    onClick={() => removeCliente()}
                >Remover</button>
            </div>
        </ReactModal>
        <table className="table">
            <thead>
                <tr>
                    <th scope="col" onClick={() => setOrdination({
                        prop: "nome", asc: !ordination.asc
                    })}>
                        Nome
                        <OrdinationIcon ordination={ordination} prop="nome"/>
                    </th>
                    <th scope="col" onClick={() => setOrdination({
                        prop: "valorDeVendaAcumulado",
                        asc: !ordination.asc
                    })}>
                        Valor acumulado
                        <OrdinationIcon
                            ordination={ordination}
                            prop="valorDeVendaAcumulado"
                        />
                    </th>
                    <th scope="col" onClick={() => setOrdination({
                        prop: "dataUltimoPedido",
                        asc: !ordination.asc
                    })}>
                        Último pedido
                        <OrdinationIcon
                            ordination={ordination}
                            prop="dataUltimoPedido"
                        />
                    </th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>{clientes.map(cliente => 
                <tr key={cliente.codigo}>
                    <td>{cliente.nome}</td>
                    <td>R$ {cliente.valorDeVendaAcumulado.toFixed(2)}</td>
                    <td>{moment(cliente.dataUltimoPedido).format("DD/MM/YYYY")}</td>
                    <td>
                        <button className="btn btn-success"
                            onClick={() => window.location.href = 
                                `/clientes/editar/${cliente.codigo}`
                            }
                        >Editar</button>
                    </td>
                    <td>
                        <button className="btn btn-danger"
                            onClick={() => setClienteToRemove(cliente)}
                        >X</button>
                    </td>
                </tr>
            )}</tbody>
            
        </table>
    </>
}