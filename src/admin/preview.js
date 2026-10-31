(function () {
  if (!window.CMS || !window.createClass || !window.h) return;

  var createClass = window.createClass;
  var h = window.h;

  function read(entry, path, fallback) {
    var value = entry.getIn(["data"].concat(path.split(".")));
    return value === undefined || value === null || value === "" ? (fallback || "") : value;
  }

  function plainList(value) {
    if (!value) return [];
    return typeof value.toJS === "function" ? value.toJS() : value;
  }

  function assetUrl(props, value) {
    if (!value) return "";
    try {
      if (props && typeof props.getAsset === "function") {
        var asset = props.getAsset(value);
        if (asset && typeof asset === "object" && typeof asset.url === "string") return asset.url;
        if (typeof asset === "string") return asset;
      }
    } catch (error) {
      console.warn("Não foi possível resolver a imagem da prévia:", error);
    }
    // Permite mostrar um URL absoluto ou caminho público já gravado no conteúdo.
    if (typeof value === "string" && (/^https?:\/\//i.test(value) || value.charAt(0) === "/")) return value;
    return "";
  }

  var HomePreview = createClass({
    render: function () {
      var entry = this.props.entry;
      var hero = read(entry, "hero", {});
      if (hero && typeof hero.toJS === "function") hero = hero.toJS();
      var cards = plainList(read(entry, "quick_cards", []));
      var sidebar = read(entry, "sidebar", {});
      if (sidebar && typeof sidebar.toJS === "function") sidebar = sidebar.toJS();
      var news = read(entry, "news_section", {});
      if (news && typeof news.toJS === "function") news = news.toJS();
      var image = assetUrl(this.props, hero && hero.banner_image);

      return h("div", { className: "preview-site" },
        h("header", { className: "preview-header" },
          h("span", { className: "preview-brand" }, "Prévia do portal"),
          h("span", { className: "preview-tag" }, "Página inicial")
        ),
        h("main", { className: "preview-main" },
          h("section", { className: "preview-hero" },
            h("div", { className: "preview-hero-copy" },
              hero && hero.eyebrow ? h("small", { className: "preview-eyebrow" }, hero.eyebrow) : null,
              h("h1", {}, hero && hero.heading || "Título principal da página"),
              h("p", {}, hero && hero.text || "O texto de apresentação aparecerá aqui."),
              hero && hero.button_text ? h("span", { className: "preview-button" }, hero.button_text) : null
            ),
            image ? h("img", { className: "preview-hero-image", src: image, alt: hero.banner_alt || "Imagem de destaque" }) : h("div", { className: "preview-image-placeholder" }, "Selecione uma imagem de destaque")
          ),
          h("section", { className: "preview-cards" },
            cards.map(function (card, index) {
              return h("div", { className: "preview-card", key: index }, card.title || "Acesso rápido");
            })
          ),
          h("section", { className: "preview-lower" },
            h("div", { className: "preview-news" },
              h("h2", {}, (news && news.title) || "Destaques e notícias"),
              h("p", {}, (news && news.description) || "As publicações recentes aparecerão nesta área."),
              h("div", { className: "preview-news-placeholder" }, "As notícias cadastradas serão exibidas aqui")
            ),
            h("aside", { className: "preview-sidebar" },
              h("h3", {}, (sidebar && sidebar.title) || "Acesso rápido"),
              h("p", {}, (sidebar && sidebar.text) || "Links e informações complementares"),
              h("ul", {}, plainList(sidebar && sidebar.links).map(function (item, index) {
                return h("li", { key: index }, item.title || "Link de acesso");
              }))
            )
          )
        )
      );
    }
  });

  var PagePreview = createClass({
    render: function () {
      var entry = this.props.entry;
      return h("article", { className: "preview-document" },
        h("div", { className: "preview-document-kicker" }, "Página institucional"),
        h("h1", {}, read(entry, "title", "Título da página")),
        read(entry, "description", "") ? h("p", { className: "preview-document-description" }, read(entry, "description", "")) : null,
        h("div", { className: "preview-document-body" }, this.props.widgetFor("body"))
      );
    }
  });

  var NewsPreview = createClass({
    render: function () {
      var entry = this.props.entry;
      var cover = read(entry, "image", "");
      var coverUrl = assetUrl(this.props, cover);
      return h("article", { className: "preview-document" },
        h("div", { className: "preview-document-kicker" }, "Notícia ou comunicado"),
        h("h1", {}, read(entry, "title", "Título da publicação")),
        h("p", { className: "preview-document-date" }, read(entry, "date", "Data de publicação")),
        read(entry, "description", "") ? h("p", { className: "preview-document-description" }, read(entry, "description", "")) : null,
        coverUrl ? h("img", { className: "preview-document-cover", src: coverUrl, alt: read(entry, "image_alt", "") }) : null,
        h("div", { className: "preview-document-body" }, this.props.widgetFor("body"))
      );
    }
  });

  var ThemePreview = createClass({
    render: function () {
      var entry = this.props.entry;
      var theme = read(entry, "theme", "azul-dourado");
      var labels = {
        "azul-dourado": "Azul institucional + dourado",
        "azul-turquesa": "Azul institucional + turquesa",
        "verde-dourado": "Verde institucional + dourado",
        "grafite-azul": "Grafite + azul claro"
      };
      var safeTheme = Object.prototype.hasOwnProperty.call(labels, theme) ? theme : "azul-dourado";

      return h("div", { className: "preview-theme preview-theme--" + safeTheme },
        h("div", { className: "preview-theme-heading" },
          h("strong", {}, "Prévia da combinação de cores"),
          h("span", {}, labels[safeTheme])
        ),
        h("div", { className: "preview-theme-topbar" }, "Portal institucional"),
        h("div", { className: "preview-theme-nav" }, "INÍCIO　　APRESENTAÇÃO　　NOTÍCIAS"),
        h("div", { className: "preview-theme-content" },
          h("div", { className: "preview-theme-copy" },
            h("small", {}, "EDUCAÇÃO • ESCOLA • COMUNIDADE"),
            h("h2", {}, "Bem-vindo ao portal da nossa escola"),
            h("p", {}, "Esta é uma amostra de como a combinação escolhida será aplicada aos elementos do site."),
            h("span", { className: "preview-theme-button" }, "Conheça a escola")
          ),
          h("div", { className: "preview-theme-image" }, "Imagem de destaque")
        ),
        h("div", { className: "preview-theme-swatches" },
          ["#e0a328", "#5ec4d2", "#70b6ce", "#3d6386", "#dfe0e0", "#2f5a29", "#b0b0b0", "#80848a", "#5e5d5c", "#4d4b4c"].map(function (color) {
            return h("span", { key: color, title: color, style: { backgroundColor: color } });
          })
        )
      );
    }
  });

  CMS.registerPreviewStyle("/admin/preview.css");
  CMS.registerPreviewTemplate("index", HomePreview);
  CMS.registerPreviewTemplate("site", ThemePreview);
  CMS.registerPreviewTemplate("configuracoes", ThemePreview);
  CMS.registerPreviewTemplate("paginas", PagePreview);
  CMS.registerPreviewTemplate("noticias", NewsPreview);
})();
