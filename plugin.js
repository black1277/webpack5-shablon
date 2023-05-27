const HtmlWebpackPlugin = require('html-webpack-plugin');
// If your plugin is using html-webpack-plugin as an optional dependency
// you can use https://github.com/tallesl/node-safe-require instead:
// const HtmlWebpackPlugin = require('safe-require')('html-webpack-plugin');

class MyPlugin {
  apply(compiler) {
    compiler.hooks.compilation.tap('MyPlugin', (compilation) => {
      console.log('The compiler from MyPlugin is starting a new compilation...')
      // Static Plugin interface |compilation |HOOK NAME | register listener
      HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync(
          'MyPlugin', // <-- Set a meaningful name here for stacktraces
          (data, cb) => {
          // Manipulate the content
            const cnt = data.html.split('</body>')
            cnt[0] = cnt[0] + '<!-- From my plugin -->\n'
            data.html = cnt.join('</body>')
            // Tell webpack to move on
            cb(null, data)
          }
      )
    })
  }
}

module.exports = MyPlugin
