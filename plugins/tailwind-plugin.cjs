module.exports = function tailwindPlugin() {
  return {
    name: 'tailwind-plugin',
    configurePostCss(postcssOptions) {
      postcssOptions.plugins = [
        require('tailwindcss'),
        require('autoprefixer'),
        ...postcssOptions.plugins,
      ];
      return postcssOptions;
    },
  };
};
