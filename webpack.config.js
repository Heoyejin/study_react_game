const path = require('path');

module.exports = {
  name: 'wordrelay-setting',
  mode: 'development', // 실 서비스: production
  devtool: 'eval',
  // 굳이 파일 확장자를 입력해 주지 않기 위해 사용
  resolve: {
    extenstions: ['js', 'jsx']
  },
  // 이 두개가 가장 중요
  entry: {
    // 웹팩에서는 한 파일에서 불러온 다른 파일을 알아서 인식하므로 굳이 다 적어주지 않아도 됨. 
    // import app: ['./client.jsx', './word_relay/wordRelay.jsx']
    app: ['./client']
  }, // 입력  
  output: {
    path: path.json(__dirname, 'dist'), // __dirname - 현재 위치의 폴더
    filename: 'app.js'
  } // 출력
};