# Meu Controle de Gastos

Sistema de Controle de Gastos desenvolvido com **HTML, CSS e JavaScript**, conforme a atividade prática de primeiro projeto no GitHub.

## Funcionalidades

- Cadastro de descrição, valor e categoria;
- Lista de gastos em cards organizados;
- Cálculo automático do total;
- Contador de lançamentos;
- Filtro por categoria;
- Exclusão de gastos;
- Persistência dos dados no `localStorage` do navegador;
- Layout responsivo para celular, tablet e computador;
- Formatação de valores em reais (BRL).

## Como executar

1. Baixe ou clone este repositório.
2. Abra o arquivo `index.html` no navegador.
3. Para uma experiência mais próxima de um site publicado, execute um servidor local, por exemplo:

```bash
python3 -m http.server 8000
```

Depois, acesse `http://localhost:8000`.

## Estrutura

```text
controle-de-gastos/
├── index.html   # Estrutura da página
├── style.css    # Estilos, cores e layout responsivo
├── script.js    # Interações e regras do sistema
└── README.md    # Documentação do projeto
```

## Publicar no GitHub Pages

No GitHub, crie um repositório público chamado `controle-de-gastos` e envie os arquivos deste projeto. Depois, em **Settings → Pages**, escolha **Deploy from a branch**, selecione a branch `main` e salve.

O site ficará disponível em:

```text
https://SEU_USUARIO.github.io/controle-de-gastos/
```
