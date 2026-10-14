// Página usada pelo time de estoque para acompanhar a quantidade de cada produto
export default function Estoque({ produtos, listaEspera = [] }) {
  const ordenados = produtos.slice().sort((a, b) => (Number(a.estoque) ?? 0) - (Number(b.estoque) ?? 0))
  const esperaPorProduto = listaEspera.reduce((acumulador, item) => {
    const chave = item.produtoId

    if (!acumulador[chave]) {
      acumulador[chave] = []
    }

    acumulador[chave].push({ nome: item.nome, email: item.email })
    return acumulador
  }, {})

  return (
    <section>
      <p className="sobretitulo">Área interna</p>
      <h1>Estoque</h1>
      <p className="aviso">Produtos com menos de 5 unidades precisam de reposição.</p>

      <div className="tabela-moldura">
        <table className="tabela">
          <thead>
            <tr>
              <th>Produto</th>
              <th>Categoria</th>
              <th>Unidades</th>
              <th>Situação</th>
            </tr>
          </thead>
          <tbody>
            {ordenados.map((produto) => (
              <tr key={produto.id}>
                <td>{produto.title}</td>
                <td>{produto.category}</td>
                <td>{produto.estoque}</td>
                <td>
                  {produto.estoque === 0 && <span className="selo selo-esgotado">Esgotado</span>}
                  {produto.estoque > 0 && produto.estoque < 5 && (
                    <span className="selo selo-alerta">Repor</span>
                  )}
                  {produto.estoque >= 5 && <span className="selo selo-ok">OK</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="lista-espera">
        <h2>Clientes esperando retorno</h2>

        {produtos.filter((produto) => produto.estoque === 0 || (esperaPorProduto[produto.id]?.length ?? 0) > 0).map((produto) => (
          <div key={produto.id} className="card card-lista-espera">
            <h3>{produto.title}</h3>
            {(esperaPorProduto[produto.id] ?? []).length > 0 ? (
              <ul>
                {(esperaPorProduto[produto.id] ?? []).map((cliente) => (
                  <li key={`${produto.id}-${cliente.email}`}>
                    {cliente.nome} — {cliente.email}
                  </li>
                ))}
              </ul>
            ) : (
              <p>Nenhum cliente aguardando este produto.</p>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
