<?php
if(isset($_POST['url'])){
    $url=filter_var($_POST['url'],FILTER_SANITIZE_URL);
    if(filter_var($url,FILTER_VALIDATE_URL)){
        $content=@file_get_contents($url);
        if($content!==FALSE){
            echo $content;
        }else{
            echo "エラー: 指定されたURLからコンテンツを取得できませんでした。";
        }
    }else{
        echo "エラー: 無効なURL形式です。";
    }
}else{
    echo "URLが指定されていません。";
}
?>
