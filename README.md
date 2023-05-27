### :zap: `Webpack 5 Boilerplate for JS apps.`
## Version 1.0.3
- node-sass was removed
- added sass
- all dependencies were updated
- added @babel/preset-env
- automatic copying of the favicon to the destination folder was added
- a sample of a simple plugin (MyPlugin) has been added (adds to the HTML comment before of the tag 'body')
- added correct handling of img tag in base html template file
- 'templateParameters' were removed from the HtmlWebpackPlugin

## Version 1.0.2
- small fix for eslint
- fix package.json (browserslist)
- added generator for images filename
- added favicon

## Version 1.0.1

In development mode asset/inline style
In production mode asset/resource style
- added mini-css-extract-plugin
- added webpack.ProgressPlugin
- added loading fonts
- added eslint-webpack-plugin for development mode
- added folding resources to folders in the production mode
  - images
  - style
  - fonts
  - svg

## Version 1.0.0
## Includes

- 2 config for development and production mode
  - npm run start - for development
  - npm run build - for production

- sass, css, postcss
- import img and svg files
- import fonts

## To add 'tree shaking' option:
read [documentation](https://webpack.js.org/guides/tree-shaking/#root)
