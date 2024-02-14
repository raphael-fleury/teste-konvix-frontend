import { useEffect, useState } from "react"
import { VendaDetalhada } from "@/types/venda"
import Venda from "@/components/venda"
import axios from "axios"

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
            {relatorio.length > 0 ? <></> : "Nenhuma venda a mostrar"}
            {relatorio.map(props => <Venda {...props} key={props.codigo}/>)}
        </ul>
    </>
}