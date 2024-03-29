import { FormEvent, useEffect, useState } from "react"
import { VendaDetalhada } from "@/types/venda"
import Venda from "@/components/venda"
import api from "@/utils/request"
import moment from "moment"

export default function RelatorioDeVendas() {
    const hoje = moment().format("YYYY-MM-DD")

    const [relatorio, setRelatorio] = useState<VendaDetalhada[]>([])

    useEffect(() => {
        api.get('/api/vendas/relatorio', {headers: {Authorization: localStorage.getItem("token")}})
            .then(({data}) => setRelatorio(data))
            .catch(() => alert("Erro ao buscar o relatório."))
    }, [])

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const formData = new FormData(event.currentTarget)
        const params: any = {}
        const inicio = formData.get('inicio')
        const fim = formData.get('fim')
        if (inicio) params.inicio = inicio
        if (fim) params.fim = fim

        api.get(`/api/vendas/relatorio`, {params, headers: {Authorization: localStorage.getItem("token")}})
            .then(({data}) => setRelatorio(data))
            .catch(() => alert("Erro ao buscar o relatório."))
    }

    return <>
        <h1>Relatório de Vendas</h1>
        <form onSubmit={onSubmit} className="mb-2">
            <div className="row">
                <div className="col-sm-auto">
                    <div className="form-group mb-2">
                        <label htmlFor="inicio">Início</label>
                        <input id="inicio" className="form-control"
                            type="date" name="inicio" max={hoje}
                        />
                    </div>
                </div>
                <div className="col-sm-auto">
                    <div className="form-group mb-2">
                        <label htmlFor="fim">Fim</label>
                        <input id="fim" className="form-control"
                            type="date" name="fim" max={hoje}
                        />
                    </div>
                </div>
                <div className="col-sm-auto">
                    <div className="form-group mb-2">
                        <label htmlFor="fim" className="d-none d-sm-block" style={{opacity: 0}}>_</label>
                        <button className="form-control btn btn-primary mt-2 mt-sm-0">Buscar</button>
                    </div>
                </div>
            </div>
        </form>
        <ul className="p-0">
            {relatorio.length > 0 ? <></> : "Nenhuma venda a mostrar"}
            {relatorio.map(props => <Venda {...props} key={props.codigo}/>)}
        </ul>
    </>
}