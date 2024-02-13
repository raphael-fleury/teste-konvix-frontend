import { VendaDetalhada } from "@/types/venda";
import { useState } from "react";
import moment from "moment";
import "./venda.css"

export default function Venda({data, valorTotal, cliente, itens}: VendaDetalhada) {
    const dataBr = moment(data).format("DD/MM/YYYY")
    const [isOpen, setOpen] = useState(false)

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
                <h6 className="mt-2">Cliente:</h6>
                <div className="row justify-content-around">
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
                            <span>{cliente.telefone}</span>
                        </div>
                    </div>
                </div>
                <h6 className="mt-2">Itens:</h6>
                {itens.map((item, index) =>
                    <div className="row" key={index}>
                        <div className="col-4">
                            <div className="row">
                                <b>Nome:</b>
                                <span>{item.nome}</span>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="row">
                                <b>Quantidade:</b>
                                <span>{item.quantidade}</span>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="row">
                                <b>Valor unitário:</b>
                                <span>{item.valorUnitario}</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}