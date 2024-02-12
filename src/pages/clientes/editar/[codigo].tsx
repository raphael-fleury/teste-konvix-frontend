import { FormEvent, useEffect, useState } from "react"
import PhoneInput from "@/components/phone-input"
import axios from "axios"

const estadosBr = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 
    'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
] as const

type Cliente = {
    codigo: number, nome: string, endereco: string, numeroEndereco: number,
    cidade: string, estado: string, telefone: string, contato: string
}

export default function EditarCliente() {
    const [cliente, setCliente] = useState<Cliente>()
    const [telefone, setTelefone] = useState<string>("")

    function convertTelefone(telefone: string) {
        console.log(telefone)
        const ddd = telefone.substring(0,2)
        const start = telefone.substring(2, telefone.length - 4)
        const end = telefone.substring(telefone.length - 4, telefone.length)
        return `(${ddd}) ${start}-${end}`
    }

    useEffect(() => {
        const codigo = window.location.href.split('/').pop()
        axios.get(`http://localhost:4000/api/clientes/${codigo}`)
            .then(({data}) => {
                setCliente(data)
                setTelefone(convertTelefone(data.telefone))
            })
            .catch(({response}) => {
                alert(response?.data?.message || "Erro ao buscar cliente.")
                window.location.href = '/clientes/relatorio'
            })
    }, [])

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const cliente: any = {}
        const formData = new FormData(event.currentTarget)
        formData.forEach((value, key) => (cliente[key] = value))

        cliente.numeroEndereco = Number(cliente.numeroEndereco)
        cliente.telefone = telefone.replaceAll(/[{()}-\s]/g, '')

        const codigo = window.location.href.split('/').pop()
        axios.put(`http://localhost:4000/api/clientes/${codigo}`, cliente)
            .then(() => window.location.pathname = '/clientes/relatorio')
            .catch(() => alert("Erro ao salvar as alterações."))
    }

    return <>
        <h1>Editar Cliente</h1>
        <form onSubmit={onSubmit}>
            <div className="form-group mb-2 col-lg-6">
                <label htmlFor="nome">Nome</label>
                <input id="nome" className="form-control"
                    defaultValue={cliente?.nome}
                    name="nome" required
                />
            </div>
            <div className="d-flex flex-wrap justify-content-between gap-2">
                <div className="d-flex form-row col-12 col-sm-6 justify-content-between mb-2 gap-2">
                    <div className="form-group col-8 col-sm-9">
                        <label htmlFor="endereco">Endereço</label>
                        <input id="endereco" className="form-control"
                            defaultValue={cliente?.endereco}
                            name="endereco" placeholder="Av. Konvix" required
                        />
                    </div>
                    <div className="form-group col">
                        <label htmlFor="numeroEndereco">Número</label>
                        <input id="numeroEndereco" className="form-control"
                            defaultValue={cliente?.numeroEndereco}
                            type="number" name="numeroEndereco"
                            min={0} step={1} placeholder="s/nº"
                        />
                    </div>
                </div>
                <div className="d-flex form-row col justify-content-between mb-2 gap-2">
                    <div className="form-group col-8 col-sm-9">
                        <label htmlFor="cidade">Cidade</label>
                        <input id="cidade" className="form-control"
                            defaultValue={cliente?.cidade}
                            name="cidade" placeholder="São Paulo" required
                        />
                    </div>
                    <div className="form-group col">
                        <label htmlFor="estado">Estado</label>
                        <select className="form-control" id="estado" name="estado"
                            defaultValue={cliente?.estado}
                        >
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
                        onChange={event => setTelefone(event.target.value)}
                        value={telefone} required placeholder="(11) 99876-5432"
                    />
                </div>
                <div className="form-group col">
                    <label htmlFor="contato">Contato</label>
                    <input id="contato" className="form-control"
                        defaultValue={cliente?.contato}
                        name="contato" required
                    />
                </div>
            </div>
            <button type="submit" className="btn btn-primary mt-2">Salvar</button>
        </form>
    </>
}