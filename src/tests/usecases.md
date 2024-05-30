# Cart Use Cases

## Criar Carrinho
- Deve criar carrinho com o userId e status.
- Deve retornar erro se userId não existe.

## Atualiza status do Carrinho
- Deve atualizar status do carrinho.
- Deve retornar erro se tentar atualizar carrinho inexistente.

## Busca carrinho com ID
- Deve buscar detalhes do carrinho de acordo ID e status open.

## Adicionar Item no Carrinho
- Deve adicionar um item no carrinho com os dados eventID, cartID, qtd.
- Deve retornar erro se o carrinho não existir.
- Deve retornar erro se carrinho for status closed.

## Remover Item do Carrinho
- Deve remover um item existente do carrinho.
- Retorna erro se tentar remover item inexistente do carrinho.

## Atualizar Qtd de Item do Carrinho
- Deve atualizar um item existente do carrinho.
- Deve retornar erro se atualizar item inexistente do carrinho.

## Limpar carrinho
- Deve remover todos items do carrinho.
- Deve retornar erro se o carrinho não existe.

## Listar carrinho
- Deve retornar detalhes do carrinho, items, valor total e status.