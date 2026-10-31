# Site institucional — Eleventy + Decap CMS

Esta versão reorganiza o conteúdo sem substituir as ferramentas já utilizadas no projeto:

- **VS Code:** edição do código-fonte.
- **Eleventy 3.1.7:** geração estática do site.
- **Decap CMS:** painel administrativo em `/admin/`.
- **GitHub:** armazenamento do código, conteúdo e mídia.
- **Netlify:** hospedagem e publicação automática.

## Estrutura principal

```text
src/
├── _data/
│   ├── site.json              # Identidade, navegação e rodapé
│   └── home.json              # Conteúdo editável da página inicial
├── _includes/
│   ├── layout.njk             # Estrutura comum do site
│   ├── pagina.njk             # Modelo das páginas internas
│   └── noticia.njk            # Modelo das notícias
├── admin/
│   ├── index.html             # Entrada do Decap CMS
│   ├── config.yml             # Coleções e campos administrativos
│   ├── preview.js             # Prévia personalizada
│   └── preview.css            # Estilos da prévia
├── assets/
│   ├── site.css               # Estilos do site
│   └── site.js                # Menu responsivo
├── noticias/                  # Publicações administráveis
├── paginas/                   # Páginas institucionais
├── index.njk                  # Página inicial editável
└── noticias.njk               # Arquivo público de notícias
```

## Ajuste da apresentação inicial (16:9)

A folha `src/assets/site.css` foi atualizada para deixar o bloco de apresentação mais compacto e dar mais largura à imagem de destaque. Em telas maiores, o texto ocupa aproximadamente 36% da composição e a imagem 64%, com proporção 16:9. Em telas menores, os blocos ficam empilhados e a imagem mantém a mesma proporção.

Se o projeto já estiver instalado, basta substituir `src/assets/site.css` pelo arquivo desta versão. Não é necessário alterar `home.json` nem executar `npm install` novamente para essa mudança de estilo.

## Preparar no VS Code

Abra a pasta do projeto no VS Code e execute no terminal:

```bash
npm install
```

Para executar o site localmente:

```bash
npm run dev
```

Acesse `http://localhost:8080/`.

## Testar o Decap CMS localmente

Em um segundo terminal, execute:

```bash
npm run cms:proxy
```

Mantenha o comando em execução e acesse `http://localhost:8080/admin/`.

O `local_backend: true` faz com que a interface local utilize o proxy do Decap para editar os arquivos no computador, sem enviar essas alterações diretamente ao GitHub. O CMS está fixado na versão 3.16.1 para evitar que uma atualização automática do CDN altere o comportamento durante os testes. O proxy local não possui autenticação: mantenha-o acessível apenas no próprio computador e encerre-o ao terminar os testes.

O proxy requer Node.js 20 ou superior.

## Gerar a versão de publicação

```bash
npm run build
```

Os arquivos prontos para hospedagem serão gerados na pasta `_site`.

## Publicação no Netlify

Configuração esperada do projeto no Netlify:

- **Build command:** `npm run build`
- **Publish directory:** `_site`

O painel publicado utiliza o backend `git-gateway` na branch `main`. A autenticação em produção depende da configuração existente de Netlify Identity e Git Gateway no site Netlify; esta alteração não cria usuários nem altera permissões da conta.

## Conteúdo e imagens

- A página inicial é editada em **Página inicial**. Os campos ficam em `src/_data/home.json`, e não em `index.njk`: o Decap CMS não possui formatador nativo para a extensão `.njk`, o que provocava o erro `toFile` ao salvar. O template Nunjucks apenas lê esses dados.
- Nome do site, logotipo, menu e rodapé são editados em **Identidade e configurações**.
- Notícias e comunicados são criados na coleção **Notícias e comunicados**.
- Páginas institucionais são criadas na coleção **Páginas e subpáginas**.
- Imagens enviadas pelo CMS são armazenadas em `src/uploads/` e publicadas em `/uploads/`.

As URLs de páginas usam o nome do arquivo, por exemplo `apresentacao.md` gera `/apresentacao/`. Notícias ficam organizadas sob `/noticias/`.

## Observações importantes

1. A prévia personalizada do Decap CMS apresenta uma representação da página e dos campos durante a edição. Não é edição diretamente sobre o site publicado como no WordPress.
2. A coleção de páginas desta primeira etapa cria páginas com URL própria a partir do nome do arquivo. A organização visual por níveis e menus pode ser ampliada depois, sem mudar a base atual.
3. Os arquivos `backup-conteudo/` preservam dois arquivos originais que continham conteúdo de teste ou comandos Git. Eles foram retirados de `src/` para não serem publicados acidentalmente.
4. Antes de publicar em produção, confira no Netlify se o Identity e o Git Gateway continuam habilitados e se o domínio do site está autorizado.


## Paleta de cores da escola

A cor do site é escolhida no painel em **Identidade e configurações → Combinação de cores do site**. Estão disponíveis quatro combinações predefinidas, formadas com as cores informadas da identidade visual:

- Azul institucional + dourado (padrão): `#3d6386`, `#4d4b4c`, `#e0a328` e tons complementares da logo.
- Azul institucional + turquesa: `#3d6386`, `#5ec4d2` e `#70b6ce`.
- Verde institucional + dourado: `#2f5a29` e `#e0a328`.
- Grafite + azul claro: `#5e5d5c`, `#4d4b4c` e `#70b6ce`.

A seleção é salva em `src/_data/site.json`, na propriedade `theme`. O template aplica essa opção no atributo `data-theme` do `body`; as variáveis de cor ficam centralizadas em `src/assets/site.css`. Para adicionar uma nova combinação, inclua uma opção no `src/admin/config.yml` e a regra correspondente em `src/assets/site.css`.

A paleta-base utiliza também `#dfe0e0`, `#b0b0b0`, `#80848a` (reserva neutra), `#5e5d5c` e `#2f5a29` como tons de apoio. Cores de texto e elementos de contraste foram escolhidas para manter legibilidade.
