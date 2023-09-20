// const { path } = require("@vuepress/shared-utils");
const path = require('path');

module.exports = (options = {}) => ({
  name: 'juejin-copy',
  define() {
    const {
      selector = 'div[class*="language-"] pre',
      copySuccessText = 'Code Copied',
      change,
      visibleTip = true,
    } = options;
    return {
      selector,
      copySuccessText,
      change,
      visibleTip,
    };
  },

  clientRootMixin: path.resolve(__dirname, 'clientRootMixin.js'),
});
