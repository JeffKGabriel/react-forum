import webpack from 'webpack'
import path from 'path'


const PATHS = {
  app: path.join(__dirname, 'src'),
  build: path.join(__dirname, 'build'),
}

module.exports = {
  entry: PATHS.app,
  output: {
    path: PATHS.build,
    filename: "index.js",
    libraryTarget: 'commonjs2' // THIS IS THE MOST IMPORTANT LINE! :mindblow: I wasted more than 2 days until realize this was the line most important in all this guide.
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"},
      { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' },
      { test: /\.css$/, loader: "style-loader!css-loader" }
    ]
  },
  externals: {
    'react': 'commonjs react' // this line is just to use the React dependency of our parent-testing-project instead of using our own React.
  }
};
