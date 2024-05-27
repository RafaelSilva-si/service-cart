# Cart Use Cases

## Adicionar Item no Carrinho
- Deve adicionar um item no carrinho com os dados eventID, cartID, qtd.
- Deve retornar erro se o item não existir.
- Deve retornar erro se a qtd for menor que 1.

## Remover Item do Carrinho
- Deve remover um item existente do carrinho.
- Retorna erro se tentar remover item inexistente do carrinho.

## Atualizar Qtd de Item do Carrinho
- Deve atualizar um item existente do carrinho.
- Deve retornar erro se atualizar item inexistente do carrinho.

## Limpar carrinho
- Deve remover todos items do carrinho.
- Deve retornar erro se o carrinho não existe.