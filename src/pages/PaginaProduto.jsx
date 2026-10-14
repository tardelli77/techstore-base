import { useState } from 'react'
import { Link, useParams } from 'react-router'
import ProdutoCard from '../components/ProdutoCard'
import { formatarPreco } from '../utils/formatarPreco'
import { produtoDisponivel, produtoTemPreco } from '../utils/carrinho'

export default function PaginaProduto({ produtos, onAdicionar, onRegistrarInteresse }) {
  const { id } = useParams()
  const produto = produtos.find((item) => item.id === id)
  const [formulario, setFormulario] = useState({ nome: '', email: '' })
  const [mensagem, setMensagem] = useState('')

  if (!produto) {
    return (
      <div className="estado-vazio">
        <p>Produto não encontrado.</p>
        <Link to="/" className="botao botao-secundario">
          Voltar para a loja
        </Link>
      </div>
    )
  }

  const esgotado = Number(produto.estoque ?? 0) === 0
  const temPreco = produtoTemPreco(produto)
  const podeAdicionar = produtoDisponivel(produto)
  const relacionados = produtos
    .filter((item) => item.category === produto.category && item.id !== produto.id && produtoDisponivel(item))
    .slice(0, 4)

  function handleSubmit(evento) {
    evento.preventDefault()

    if (!formulario.nome.trim() || !formulario.email.trim()) {
      return
    }

    onRegistrarInteresse?.(produto.id, formulario)
    setMensagem('Você entrou na lista de espera. Vamos avisá-lo quando o produto voltar.')
    setFormulario({ nome: '', email: '' })
  }

  return (
    <section>
      <nav className="trilha" aria-label="Você está em">
        <Link to="/">Loja</Link>
        <span aria-hidden="true">/</span>
        <span>{produto.title}</span>
      </nav>

      <div className="detalhe">
        <div className="detalhe-imagem-moldura">
          <img src={produto.image} alt={produto.title} className="detalhe-imagem" />
        </div>

        <div className="detalhe-info">
          <h1>{produto.title}</h1>
          <p className="card-avaliacao">
            ★ {produto.rating.rate} <span>({produto.rating.count} avaliações)</span>
          </p>
          <p className="detalhe-preco">{temPreco ? formatarPreco(produto.price) : 'Preço indisponível'}</p>
          <p className="detalhe-descricao">{produto.description}</p>
          <p className="detalhe-estoque">{produto.estoque} unidades disponíveis</p>

          {podeAdicionar ? (
            <button className="botao botao-grande" onClick={() => onAdicionar(produto)}>
              Adicionar ao carrinho
            </button>
          ) : (
            <p className="aviso">Produto indisponível no momento.</p>
          )}

          {esgotado && (
            <form className="lista-espera-form" onSubmit={handleSubmit}>
              <h2>Avise-me quando voltar</h2>
              <label>
                Nome
                <input
                  type="text"
                  value={formulario.nome}
                  onChange={(evento) => setFormulario({ ...formulario, nome: evento.target.value })}
                />
              </label>
              <label>
                E-mail
                <input
                  type="email"
                  value={formulario.email}
                  onChange={(evento) => setFormulario({ ...formulario, email: evento.target.value })}
                />
              </label>
              <button type="submit" className="botao botao-secundario">
                Quero ser avisado
              </button>
              {mensagem && <p className="mensagem-sucesso">{mensagem}</p>}
            </form>
          )}

          <ul className="detalhe-garantias">
            <li>Troca grátis em até 30 dias</li>
            <li>Parcele em até 10x sem juros</li>
          </ul>
        </div>
      </div>

      <h2>Produtos relacionados</h2>
      <div className="grade">
        {relacionados.map((item) => (
          <ProdutoCard key={item.id} produto={item} onAdicionar={onAdicionar} />
        ))}
      </div>
    </section>
  )
}
