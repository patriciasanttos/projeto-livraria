export function pesquisarItens(array, chave, valor) {
  return array.filter(
    (item) => item[chave].toLowerCase() === valor.toLowerCase()
  )
}
