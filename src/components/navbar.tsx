export default function Navbar() {
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
                    <a className="nav-link" href="">Sair</a>
                </li>
            </ul>
        </header>
    )
}