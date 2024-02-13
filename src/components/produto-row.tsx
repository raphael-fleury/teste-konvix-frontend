import { NovoProduto } from "@/types/produto"

export default function ProdutoRow({produto, index, onChange, onRemove}: {
        produto: NovoProduto, index: number,
        onChange: (produto: NovoProduto) => void,
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
                    type="number" required min={0} step={0.01}
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
                    type="number" required min={1}
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