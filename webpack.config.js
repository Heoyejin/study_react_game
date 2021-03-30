const path = require('path');

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
        presets: ['@babel/preset-env', '@babel/preset-react'],
        plugins: ['@babel/plugin-proposal-class-properties'],

      }
    }]

  },
  
  output: {
    path: path.join(__dirname, 'dist'), // __dirname - 현재 위치의 폴더
    filename: 'app.js'
  } // 출력
};