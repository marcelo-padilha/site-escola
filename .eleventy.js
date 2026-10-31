module.exports = function(eleventyConfig) {
  // Copia o ficheiro config.yml do CMS para a pasta final
  eleventyConfig.addPassthroughCopy("src/admin/config.yml");

  return {
    dir: {
      input: "src",
      output: "_site"
    }
  };
};