import { Link } from 'react-router'
import { formatarPreco } from '../utils/formatarPreco'
import { produtoDisponivel, produtoTemPreco } from '../utils/carrinho'

export default function ProdutoCard({ produto, onAdicionar }) {
  const esgotado = Number(produto.estoque ?? 0) === 0
  const precoDisponivel = produtoTemPreco(produto)
  const podeAdicionar = produtoDisponivel(produto)
  const valorProduto = Number(produto.price ?? 0)
  const faltamParaFreteGratis = Math.max(0, 200 - valorProduto)

  return (
    <article className="card">
      <Link to={`/produto/${produto.id}`} className="card-link">
        <div className="card-imagem-moldura">
          <img src={produto.image} alt={produto.title} className="card-imagem" />
        </div>
        <h3 className="card-titulo">{produto.title}</h3>
      </Link>

      <p className="card-avaliacao">
        ★ {produto.rating.rate} <span>({produto.rating.count} avaliações)</span>
      </p>

      <div className="card-precos">
        {produto.precoOriginal && (
          <span className="preco-original">{formatarPreco(produto.precoOriginal)}</span>
        )}
        <span className="preco">{precoDisponivel ? formatarPreco(produto.price) : 'Preço indisponível'}</span>
      </div>

      <div className="card-selos">
        {valorProduto >= 200 ? (
          <span className="selo selo-frete">Frete grátis</span>
        ) : (
          <span className="selo">Faltam {formatarPreco(faltamParaFreteGratis)} para frete grátis</span>
        )}
        {esgotado && <span className="selo selo-esgotado">Esgotado</span>}
      </div>

      <button className="botao" onClick={() => onAdicionar(produto)} disabled={!podeAdicionar}>
        Adicionar ao carrinho
      </button>
    </article>
  )
}
