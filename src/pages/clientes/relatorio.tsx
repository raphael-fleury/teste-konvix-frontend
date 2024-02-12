import axios from "axios"
import moment from "moment"
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

    return <>
        <h1>Relatório de Vendas por Cliente</h1>
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
                        <button className="btn btn-danger">X</button>
                    </td>
                </tr>
            )}</tbody>
            
        </table>
    </>
}