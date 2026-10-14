import { Link } from 'react-router'
import { formatarPreco } from '../utils/formatarPreco'
import { produtoDisponivel, produtoTemPreco } from '../utils/carrinho'

export default function SugestaoItem({ produto, onAdicionar }) {
  const valorProduto = Number(produto.price ?? 0)
  const faltamParaFreteGratis = Math.max(0, 200 - valorProduto)
  const podeAdicionar = produtoDisponivel(produto)

  return (
    <article className="card">
      <Link to={`/produto/${produto.id}`} className="card-link">
        <div className="card-imagem-moldura">
          <img src={produto.image} alt={produto.title} className="card-imagem" />
        </div>
        <h3 className="card-titulo">{produto.title}</h3>
      </Link>

      <div className="card-precos">
        {produto.precoOriginal && (
          <span className="preco-original">{formatarPreco(produto.precoOriginal)}</span>
        )}
        <span className="preco">
          {produtoTemPreco(produto) ? formatarPreco(produto.price) : 'Preço indisponível'}
        </span>
      </div>

      <div className="card-selos">
        {valorProduto >= 200 ? (
          <span className="selo selo-frete">Frete grátis</span>
        ) : (
          <span className="selo">Faltam {formatarPreco(faltamParaFreteGratis)} para frete grátis</span>
        )}
      </div>

      <button className="botao" onClick={() => onAdicionar(produto)} disabled={!podeAdicionar}>
        Comprar
      </button>
    </article>
  )
}
