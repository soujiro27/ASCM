const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractCSS = new ExtractTextPlugin('[name].css');
let moduleWorks = 'catalogos';

module.exports = {
  entry: {
   /*"Acciones":['babel-polyfill', path.resolve(__dirname, 'src/Entries/Acciones/Home.js')],
    "Textos":['babel-polyfill', path.resolve(__dirname, 'src/Entries/Textos/Home.js')],
    "SubDocumentos":['babel-polyfill', path.resolve(__dirname, 'src/Entries/SubDocumentos/Home.js')],
    "Caracteres":['babel-polyfill', path.resolve(__dirname, 'src/Entries/Caracteres/Home.js')],
    "Volantes":['babel-polyfill', path.resolve(__dirname, 'src/Entries/Volantes/Home.js')],
    "VolantesDiversos":['babel-polyfill', path.resolve(__dirname, 'src/Entries/VolantesGenericos/Home.js')],
    "DocumentosGral":['babel-polyfill', path.resolve(__dirname, 'src/Entries/DocumentosGral/Home.js')],
    "Ifa":['babel-polyfill', path.resolve(__dirname, 'src/Entries/Ifa/Home.js')],
*/
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
    //"DocumentosGral":['babel-polyfill', path.resolve(__dirname, 'src/Entries/DocumentosGral/Update.js')],

    /*------------------------ Asignacion -----------------------------------------*/
    //"Ifa":['babel-polyfill', path.resolve(__dirname, 'src/Entries/Ifa/Asignacion.js')],


    /*--------------------- Respuestas -------------------------------------------*/
    //"Ifa":['babel-polyfill', path.resolve(__dirname, 'src/Entries/Ifa/Respuestas.js')],


    /*------------------- Observaciones ---------------------------------------*/
    "Ifa":['babel-polyfill', path.resolve(__dirname, 'src/Entries/Ifa/Observaciones.js')],



  },
  output: {
    path: path.resolve(__dirname, '../public/js/Observaciones/'),
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
