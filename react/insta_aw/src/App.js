import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

// 画像情報取得用URL
const INSTAGRAM_URL = 'https://afterworks.jp/instaaw/api/get_instagram_data.php'

function App() {
 const [data, setData] = useState([])

 useEffect(() => {
  // 情報を取得する処理
  const fetchData = async () => {
   const result = await axios(INSTAGRAM_URL)

   setData(result.data.media.data)
  }

  // 処理を実行
  fetchData()
 }, [])

 return (
  <div className='insta-image-box'>
   <div className='inner'>
    <ul className='insta-image-list'>
     {data.map(item => (
      <li className='insta-image-list__item' key={item.id}>
       <div className='insta-contents'>
        <div className='insta-contents__info'>
         <span className='insta-info -date'>{formatDate(item.timestamp)}</span>
        </div>
        <div className='insta-contents__image'>
         <img src={item.media_url} alt='' className='insta-image' />
        </div>
       </div>
      </li>
     ))}
    </ul>
   </div>
  </div>
 )
}

export default App

// 日付のフォーマットを変換する関数
function formatDate(date) {
 let result = ''

 // 年月日を取得する
 result = date.slice(0, 10).replace(/-/g, '/')

 return result
}
