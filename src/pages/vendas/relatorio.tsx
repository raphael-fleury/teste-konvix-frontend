import Venda from "@/components/venda"
import { VendaDetalhada } from "@/types/venda"
import axios from "axios"
import { useEffect, useState } from "react"

export default function RelatorioDeVendas() {
    const [relatorio, setRelatorio] = useState<VendaDetalhada[]>([])

    useEffect(() => {
        axios.get('http://localhost:4000/api/vendas/relatorio')
            .then(({data}) => setRelatorio(data))
            .catch(() => alert("Erro ao buscar o relatório."))
    }, [])

    return <>
        <h1>Relatório de Vendas</h1>
        <ul className="p-0">
            {relatorio.map(props => <Venda {...props} key={props.codigo}/>)}
        </ul>
    </>
}