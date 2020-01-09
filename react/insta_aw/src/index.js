import React from 'react'
import ReactDOM from 'react-dom'
import './css/index.css'
import './css/index_pc.css'
import App from './App'
import ScrollTop from './ScrollTop'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(<App />, document.getElementById('APP'))

ReactDOM.render(<ScrollTop />, document.getElementById('ScrollTop'))

// フッター年号を更新
let copyrightYear = document.querySelectorAll('.footer-wrap .c-year')

if (copyrightYear.length > 0) {
 copyrightYear[0].textContent = new Date().getFullYear()
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
