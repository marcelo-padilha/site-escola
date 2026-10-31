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
