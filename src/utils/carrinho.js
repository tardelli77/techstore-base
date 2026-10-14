// O carrinho guarda uma entrada por unidade adicionada.
// Ex.: duas camisetas iguais = o mesmo produto duas vezes no array.

export function normalizarPreco(valor) {
  if (valor === null || valor === undefined || valor === '') {
    return 0
  }

  const valorString = String(valor).trim()

  if (valorString.includes(',') && valorString.includes('.')) {
    const numero = valorString.replace(/\./g, '').replace(',', '.')
    return Number(numero)
  }

  if (valorString.includes(',')) {
    return Number(valorString.replace(',', '.'))
  }

  const numero = Number(valorString)
  return Number.isFinite(numero) ? numero : 0
}

export function produtoTemPreco(produto) {
  return Number.isFinite(normalizarPreco(produto?.price)) && normalizarPreco(produto?.price) > 0
}

export function produtoDisponivel(produto) {
  return produtoTemPreco(produto) && Number(produto?.estoque ?? 0) > 0
}

export function filtrarProdutosDisponiveis(produtos = []) {
  return produtos.filter(produtoDisponivel)
}

export function calcularTotal(carrinho) {
  return carrinho.reduce((total, produto) => {
    if (!produtoTemPreco(produto)) {
      return total
    }

    return total + normalizarPreco(produto.price)
  }, 0)
}

export function agruparItens(carrinho) {
  const itens = []
  carrinho.forEach((produto) => {
    const existente = itens.find((item) => item.produto.id === produto.id)
    if (existente) {
      existente.quantidade += 1
    } else {
      itens.push({ produto, quantidade: 1 })
    }
  })
  return itens
}
