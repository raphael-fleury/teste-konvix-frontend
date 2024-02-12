import { Produto } from "@/pages/vendas/inserir";

export default function ProdutoForm({produto, index, onChange, onRemove}: {
        produto: Produto, index: number,
        onChange: (produto: Produto) => void,
        onRemove: (index: number) => void
    }) {
    return (
        <fieldset className="d-flex form-row flex-wrap justify-content-between mb-2 gap-2">
            <div className="form-group col-4">
                <label htmlFor="nome">Nome do produto</label>
                <input id="nome" className="form-control" required
                    value={produto.nome}
                    onChange={(event) => onChange({
                        nome: event.target.value,
                        valorUnitario: produto.valorUnitario,
                        quantidade: produto.quantidade
                    })}
                />
            </div>
            <div className="form-group col-4">
                <label htmlFor="valor">Valor unitário</label>
                <input id="valor" className="form-control"
                    type="number" required min={1}
                    value={produto.valorUnitario}
                    onChange={(event) => onChange({
                        nome: produto.nome,
                        valorUnitario: Number(event.target.value),
                        quantidade: produto.quantidade
                    })}
                />
            </div>
            <div className="form-group col">
                <label htmlFor="quantidade">Quantidade</label>
                <input id="quantidade" className="form-control"
                    type="number" required min={0}
                    value={produto.quantidade}
                    onChange={(event) => onChange({
                        nome: produto.nome,
                        valorUnitario: produto.valorUnitario,
                        quantidade: Number(event.target.value)
                    })}
                />
            </div>
            <div className="form-group d-flex flex-column">
                <label style={{opacity: 0}}>____</label>
                <button type="button" className="btn btn-danger"
                    onClick={() => onRemove(index)}
                >X</button>
            </div>
        </fieldset>
    )
}