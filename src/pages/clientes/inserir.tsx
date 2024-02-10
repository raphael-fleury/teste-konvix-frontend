import { FormEvent } from "react"

const estadosBr = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 
    'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
]

export default function NovoCliente() {
    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
     
        const cliente: any = {}
        const formData = new FormData(event.currentTarget)
        formData.forEach((value, key) => (cliente[key] = value))
        cliente.numeroEndereco = Number(cliente.numeroEndereco)

        console.log(cliente)
    }

    return <>
        <h1>Novo Cliente</h1>
        <form onSubmit={onSubmit}>
            <div className="form-group mb-2">
                <label htmlFor="nome">Nome</label>
                <input className="form-control" id="nome"/>
            </div>
            <div className="d-flex flex-wrap justify-content-between gap-2">
                <div className="d-flex form-row col-12 col-sm-6 justify-content-between mb-2 gap-2">
                    <div className="form-group col-8 col-sm-9">
                        <label htmlFor="endereco">Endereço</label>
                        <input id="endereco" name="endereco" placeholder="Av. Konvix"
                            className="form-control"
                        />
                    </div>
                    <div className="form-group col">
                        <label htmlFor="numeroEndereco">Número</label>
                        <input type="number" name="numeroEndereco" min={1} placeholder="132"
                            className="form-control" id="numeroEndereco" 
                        />
                    </div>
                </div>
                <div className="d-flex form-row col justify-content-between mb-2 gap-2">
                    <div className="form-group col-8 col-sm-9">
                        <label htmlFor="cidade">Cidade</label>
                        <input id="cidade" name="cidade" placeholder="São Paulo"
                            className="form-control"
                        />
                    </div>
                    <div className="form-group col">
                        <label htmlFor="estado">Estado</label>
                        <select className="form-control" id="estado" name="estado">
                            {estadosBr.map(estado =>
                                <option key={estado} value={estado}>{estado}</option>
                            )}
                        </select>
                    </div>
                </div>
            </div>
            <div className="d-flex form-row justify-content-between mb-2 gap-2">
                <div className="form-group col-6">
                    <label htmlFor="telefone">Telefone</label>
                    <input type="tel" name="telefone" placeholder="(11) 99876-5432" 
                        className="form-control" id="telefone"
                    />
                </div>
                <div className="form-group col">
                    <label htmlFor="contato">Contato</label>
                    <input className="form-control" id="contato" name="contato"/>
                </div>
            </div>
            <button type="submit" className="btn btn-primary mt-2">Cadastrar</button>
        </form>
    </>
}