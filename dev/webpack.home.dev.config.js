const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractCSS = new ExtractTextPlugin('[name].css');
let moduleWorks = 'catalogos';

module.exports = {
  entry: {
   "Acciones":['babel-polyfill', path.resolve(__dirname, 'src/Entries/Acciones/Home.js')],
    "Textos":['babel-polyfill', path.resolve(__dirname, 'src/Entries/Textos/Home.js')],
    "SubDocumentos":['babel-polyfill', path.resolve(__dirname, 'src/Entries/SubDocumentos/Home.js')],
    "Caracteres":['babel-polyfill', path.resolve(__dirname, 'src/Entries/Caracteres/Home.js')],
    "Volantes":['babel-polyfill', path.resolve(__dirname, 'src/Entries/Volantes/Home.js')],
    "VolantesDiversos":['babel-polyfill', path.resolve(__dirname, 'src/Entries/VolantesGenericos/Home.js')],
    "DocumentosGral":['babel-polyfill', path.resolve(__dirname, 'src/Entries/DocumentosGral/Home.js')],
    "Ifa":['babel-polyfill', path.resolve(__dirname, 'src/Entries/Ifa/Home.js')],
    "Irac":['babel-polyfill', path.resolve(__dirname, 'src/Entries/Irac/Home.js')],
    "Confronta":['babel-polyfill', path.resolve(__dirname, 'src/Entries/Confronta/Home.js')],
    "DocumentosDiversos":['babel-polyfill', path.resolve(__dirname, 'src/Entries/Diversos/Home.js')],
    "DocumentosDirectores":['babel-polyfill', path.resolve(__dirname, 'src/Entries/DocumentosDirectores/Home.js')],
    "Respuestas":['babel-polyfill', path.resolve(__dirname, 'src/Entries/Respuestas/Home.js')],
    "Observaciones":['babel-polyfill', path.resolve(__dirname, 'src/Entries/Observaciones/Home.js')],
    "Irac-Internos":['babel-polyfill', path.resolve(__dirname, 'src/Entries/Irac-internos/Home.js')],



  },
  output: {
    path: path.resolve(__dirname, '../public/js/Home/'),
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
