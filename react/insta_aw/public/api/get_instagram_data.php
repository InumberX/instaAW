<?php

$referer = $_SERVER['HTTP_REFERER'];
$url = parse_url($referer);
$host = $url['host'];

// 画像情報を取得するURL
$url = 'XXXXXXXXXXXXXXXXXXXXXXXX';

// 結果
$result = '';

// リファラが自サイトの場合
if($host === 'afterworks.jp') {

 // cURLセッションを初期化
 $ch = curl_init();

 // オプションを設定
 curl_setopt($ch, CURLOPT_URL, $url); // 取得するURLを指定
 curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); // 実行結果を文字列で返す
 curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); // サーバー証明書の検証を行わない

 // URLの情報を取得
 $response =  curl_exec($ch);

 $result = $response;

 // セッションを終了
 curl_close($conn);

}

// 結果を出力
echo $result;

?>