import { VendaDetalhada } from "@/types/venda";
import { useState } from "react";
import moment from "moment";
import "./venda.css"

export default function Venda({codigo, data, valorTotal, cliente, itens}: VendaDetalhada) {
    const dataBr = moment(data).format("DD/MM/YYYY")
    const [isOpen, setOpen] = useState(false)

    function formatTelefone(telefone: string) {
        const ddd = telefone.substring(0,2)
        const start = telefone.substring(2, telefone.length - 4)
        const end = telefone.substring(telefone.length - 4, telefone.length)
        return `(${ddd}) ${start}-${end}`
    }

    return (
        <div className="venda m-0 p-3 mb-2">
            <div id="venda-header" className="row"
                onClick={() => setOpen(!isOpen)}
                style={{fontWeight: 500}}
            >
                <div className="col-9">
                    <div className="row">
                        <span>{dataBr}</span>
                        <span>{cliente.nome}</span>
                    </div>
                </div>
                <div className="col-2">
                    <div className="row text-end">
                        <span>
                            {itens.length + ' '}
                            {itens.length === 1 ? 'item': 'itens'}
                        </span>
                        <span>R$ {valorTotal.toFixed(2)}</span>
                    </div>
                </div>
                <div className={"arrow col d-flex justify-content-center align-items-center" + 
                    (isOpen ? " upside-down" : "")
                }>
                    ˅
                </div>
            </div>
            <div id="venda-body" style={{
                fontSize: 14,
                display: isOpen ? 'block' : 'none'
            }}>
                <hr/>
                <b className="px-1">Código da venda: {codigo}</b>
                <h6 className="mt-2 p-1" style={{backgroundColor: "#e4e4e4"}}>Cliente</h6>
                <div className="row justify-content-around mt-2 px-1">
                    <div className="col">
                        <div className="row">
                            <b>Código:</b>
                            <span>{cliente.codigo}</span>
                        </div>
                    </div>
                    <div className="col">
                        <div className="row">
                            <b>Nome:</b>
                            <span>{cliente.nome}</span>
                        </div>
                    </div>
                    <div className="col">
                        <div className="row">
                            <b>Cidade:</b>
                            <span>{cliente.cidade} - {cliente.estado}</span>
                        </div>
                    </div>
                    <div className="col">
                        <div className="row">
                            <b>Telefone:</b>
                            <span>{formatTelefone(cliente.telefone)}</span>
                        </div>
                    </div>
                </div>
                <h6 className="mt-2 p-1" style={{backgroundColor: "#e4e4e4"}}>Itens</h6>
                {itens.map((item, index) =>
                    <div className="row mt-2 px-1" key={index}>
                        <div className="col">
                            <div className="row">
                                <b>Código:</b>
                                <span>{item.codigo}</span>
                            </div>
                        </div>
                        <div className="col">
                            <div className="row">
                                <b>Nome:</b>
                                <span>{item.nome}</span>
                            </div>
                        </div>
                        <div className="col">
                            <div className="row">
                                <b>Quantidade:</b>
                                <span>{item.quantidade}</span>
                            </div>
                        </div>
                        <div className="col">
                            <div className="row">
                                <b>Valor unitário:</b>
                                <span>R$ {item.valorUnitario.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}