module.exports = function (eleventyConfig) {
  // Arquivos estáticos do painel, dos estilos/scripts e da biblioteca de mídia.
  eleventyConfig.addPassthroughCopy({ "src/admin": "admin" });
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "src/uploads": "uploads" });

  // Formata datas de maneira consistente em português brasileiro.
  eleventyConfig.addFilter("dataBR", (valor) => {
    if (!valor) return "";
    const data = valor instanceof Date ? valor : new Date(valor);
    if (Number.isNaN(data.getTime())) return "";
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      timeZone: "America/Sao_Paulo",
    }).format(data);
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    templateFormats: ["md", "njk", "html", "liquid"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
  };
};
