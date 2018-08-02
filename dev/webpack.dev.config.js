const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractCSS = new ExtractTextPlugin('[name].css');
let moduleWorks = 'catalogos';

module.exports = {
  entry: {
    //"Acciones":['babel-polyfill', path.resolve(__dirname, 'src/Entries/Acciones/Main.js')],
    //"Textos":['babel-polyfill', path.resolve(__dirname, 'src/Entries/Textos/Main.js')],
    //"SubDocumentos":['babel-polyfill', path.resolve(__dirname, 'src/Entries/SubDocumentos/Main.js')],
    //"Caracteres":['babel-polyfill', path.resolve(__dirname, 'src/Entries/Caracteres/Main.js')],
    //"Volantes":['babel-polyfill', path.resolve(__dirname, 'src/Entries/Volantes/Main.js')],
    //"VolantesDiversos":['babel-polyfill', path.resolve(__dirname, 'src/Entries/VolantesGenericos/Main.js')],
    "DocumentosGral":['babel-polyfill', path.resolve(__dirname, 'src/Entries/DocumentosGral/Main.js')],
    /*--------------------- Insert -------------------------*/
    //"Acciones":['babel-polyfill', path.resolve(__dirname, 'src/Entries/Acciones/Insert.js')],
    //"SubDocumentos":['babel-polyfill', path.resolve(__dirname, 'src/Entries/SubDocumentos/Insert.js')],
    //"Textos":['babel-polyfill', path.resolve(__dirname, 'src/Entries/Textos/Insert.js')],
    //"Caracteres":['babel-polyfill', path.resolve(__dirname, 'src/Entries/Caracteres/Insert.js')],
    //"Volantes":['babel-polyfill', path.resolve(__dirname, 'src/Entries/Volantes/Insert.js')],
    //"VolantesDiversos":['babel-polyfill', path.resolve(__dirname, 'src/Entries/VolantesGenericos/Insert.js')],
    /*------------------------------ UPDATE --------------------------------------------*/
    //"Acciones":['babel-polyfill', path.resolve(__dirname, 'src/Entries/Acciones/Update.js')],
    //"Textos":['babel-polyfill', path.resolve(__dirname, 'src/Entries/Textos/Update.js')],
    //"SubDocumentos":['babel-polyfill', path.resolve(__dirname, 'src/Entries/SubDocumentos/Update.js')],
    //"Caracteres":['babel-polyfill', path.resolve(__dirname, 'src/Entries/Caracteres/Update.js')],
    //"Volantes":['babel-polyfill', path.resolve(__dirname, 'src/Entries/Volantes/Update.js')],
    //"VolantesDiversos":['babel-polyfill', path.resolve(__dirname, 'src/Entries/VolantesGenericos/Update.js')],
    "DocumentosGral":['babel-polyfill', path.resolve(__dirname, 'src/Entries/DocumentosGral/Update.js')],
  },
  output: {
    path: path.resolve(__dirname, '../public/js/Update/'),
    filename: `[name].js`
  },
  devServer: {
    port: 9000,
  },
  module: {
    rules: [
      {
        // test: que tipo de archivo quiero reconocer,
        // use: que loader se va a encargar del archivo
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'react', 'stage-2'],
            plugins:['transform-async-to-generator']
          }
        },
      },
      {
        test: /\.styl$/,
        loader:'style-loader!css-loader!stylus-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(jpg|png|gif|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 1000000,
            fallback: 'file-loader',
            name: 'images/[name].[hash].[ext]',
          }
        }
      },
    ]
  },
  plugins: [extractCSS],
}
