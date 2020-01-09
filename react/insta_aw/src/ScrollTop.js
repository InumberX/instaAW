import React from 'react'
import { animateScroll as scroll } from 'react-scroll'
import './ScrollTop.css'

function ScrollTop() {
 // ページトップにスクロールさせる処理
 function scrollTop() {
  scroll.scrollToTop()
 }

 return (
  <div className='page-top'>
   <div className='inner'>
    <button id='PAGE_TOP' className='page-top__btn' onClick={scrollTop}>
     PAGE TOP
    </button>
   </div>
  </div>
 )
}

export default ScrollTop
