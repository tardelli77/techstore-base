import { get } from './api'
import { normalizarPreco } from '../utils/carrinho'

export function normalizarProduto(produto) {
  const precoNumerico = normalizarPreco(produto?.price)

  return {
    ...produto,
    price: precoNumerico > 0 ? precoNumerico : null,
    estoque: Number(produto?.estoque ?? 0),
  }
}

// Formato dos produtos documentado em docs/api.md
export function buscarProdutos() {
  return get('/products.json').then((produtos) => produtos.map(normalizarProduto))
}
