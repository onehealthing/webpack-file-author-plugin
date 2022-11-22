const ModuleFilenameHelpers = require("webpack/lib/ModuleFilenameHelpers");

class FileAuthorPlugin {
  static defaultOptions = {
    author: "username",
    test: /\.js$/,
    template: 
`/*
 * Author: <#author#>
 */
`,
  };

  constructor(options = {}) {
    this.options = { ...FileAuthorPlugin.defaultOptions, ...options };
  }

  apply(compiler) {
    const pluginName = FileAuthorPlugin.name;

    const { webpack } = compiler;

    const { sources, Compilation } = webpack;

    const { ConcatSource } = sources;

    compiler.hooks.compilation.tap(pluginName, (compilation) => {
      compilation.hooks.processAssets.tap(
        {
          name: pluginName,
          stage: Compilation.PROCESS_ASSETS_STAGE_ADDITIONS,
        },
        (assets) => {
          Object.entries(assets).forEach(([pathname]) => {
            const { template, author, test } = this.options;

            if (ModuleFilenameHelpers.matchObject({ test }, pathname)) {
              compilation.assets[pathname] = new ConcatSource(
                template.replace("<#author#>", String(author)),
                compilation.assets[pathname]
              );
            }
          });
        }
      );
    });
  }
}

module.exports = {
  FileAuthorPlugin,
};
