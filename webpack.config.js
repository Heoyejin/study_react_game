const path = require('path');
const refreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
  name: 'wordrelay-setting',
  mode: 'development', // 실 서비스: production
  devtool: 'eval',
  // 굳이 파일 확장자를 입력해 주지 않기 위해 사용
  resolve: {
    extensions: ['.js', '.jsx']
  },
  // 이 두개가 가장 중요
  entry: {
    // 웹팩에서는 한 파일에서 불러온 다른 파일을 알아서 인식하므로 굳이 다 적어주지 않아도 됨. 
    // app: ['./client.jsx', './word_relay/wordRelay.jsx']
    app: ['./client']
  }, // 입력
  
  // entry에 modules를 적용해서 output으로 넘긴다
  module: {
    // 여러개의 규칙을 지정할 수 있음
    rules: [{
      test: /\.jsx?/,
      loader: 'babel-loader',
      options: {
        // presets는 plugin 여러개를 모아 놓은 것 !
        // babel/preset-env plugin에 설정할 옵션을 따로 설정 할 수 있음
        // https://github.com/browserslist - 브라우저 리스트 참고
        presets: [
          ['@babel/preset-env', {
            targets: {
              // browsers: ['last 2 chrome versions']
            },
            debug: true
          }], 
          '@babel/preset-react'],
        plugins: [
          '@babel/plugin-proposal-class-properties',
          'react-refresh/babel'
        ],

      }
    }]

  },
  // 추가적인 확장 프로그램 !
  // https://webpack.js.org/concepts/ - 웹 팩 공식문서 참고
  plugins: [
    new refreshWebpackPlugin()
  ],
  output: {
    path: path.join(__dirname, 'dist'), // __dirname - 현재 위치의 폴더
    filename: 'app.js',
    publicPath: '/dist/'
  }, // 출력
  devServer: {
    historyApiFallback: true,
    publicPath: '/dist/',
    hot: true,
    host: "localhost",
    port: 8088
  } // 
};