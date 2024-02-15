import { logout } from "@/utils/logout";

export default function Navbar() {
    function sair(event: any) {
        event.preventDefault()
        logout()
    }

    return (
        <header>
            <ul className="nav justify-content-center">
                <li className="nav-item">
                    <a className="nav-link active" href="/clientes/inserir">Cadastro de Cliente</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/vendas/inserir">Venda</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/vendas/relatorio">Relatório de Vendas</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/clientes/relatorio">Relatório de Vendas por Cliente</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="" style={{color: "mediumvioletred"}}
                        onClick={sair}
                    >Sair</a>
                </li>
            </ul>
        </header>
    )
}