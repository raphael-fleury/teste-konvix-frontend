import { FormEvent } from "react"
import { NovoCliente } from "@/types/cliente"
import api from "@/utils/request"
import PhoneInput from "@/components/phone-input"

const estadosBr = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 
    'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
] as const

export default function InserirCliente() {
    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const cliente = Object.fromEntries(new FormData(event.currentTarget)) as unknown as NovoCliente
        cliente.numeroEndereco = Number(cliente.numeroEndereco)
        cliente.telefone = cliente.telefone?.replaceAll(/[{()}-\s]/g, '')

        api.post('/api/clientes', cliente, {headers: {Authorization: localStorage.getItem("token")}})
            .then(() => window.location.href = '/clientes/relatorio')
            .catch(() => alert("Erro ao cadastrar o cliente."))
    }

    return <>
        <h1>Novo Cliente</h1>
        <form onSubmit={onSubmit}>
            <div className="form-group mb-2 col-lg-6">
                <label htmlFor="nome">Nome</label>
                <input id="nome" className="form-control"
                    name="nome" required
                />
            </div>
            <div className="d-flex flex-wrap justify-content-between gap-2">
                <div className="d-flex form-row col-12 col-sm-6 justify-content-between mb-2 gap-2">
                    <div className="form-group col-8 col-sm-9">
                        <label htmlFor="endereco">Endereço</label>
                        <input id="endereco" className="form-control"
                            name="endereco" placeholder="Av. Konvix" required
                        />
                    </div>
                    <div className="form-group col">
                        <label htmlFor="numeroEndereco">Número</label>
                        <input id="numeroEndereco" className="form-control"
                            type="number" name="numeroEndereco"
                            min={0} step={1} placeholder="s/nº"
                        />
                    </div>
                </div>
                <div className="d-flex form-row col justify-content-between mb-2 gap-2">
                    <div className="form-group col-8 col-sm-9">
                        <label htmlFor="cidade">Cidade</label>
                        <input id="cidade" className="form-control"
                            name="cidade" placeholder="São Paulo" required
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
                    <PhoneInput id="telefone" className="form-control"
                        name="telefone" required
                        placeholder="(11) 99876-5432"
                    />
                </div>
                <div className="form-group col">
                    <label htmlFor="contato">Contato</label>
                    <input id="contato" className="form-control"
                        name="contato" required
                    />
                </div>
            </div>
            <button type="submit" className="btn btn-primary mt-2">Cadastrar</button>
        </form>
    </>
}