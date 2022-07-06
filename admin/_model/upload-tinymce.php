<?php
// Allowed origins to upload images
$accepted_origins = array("https://www.agenciawoohoo.com.br", "http://www.agenciawoohoo.com.br", "http://app.lfgex.com", "https://app.lfgex.com");

// Images upload path
//$imageFolder = "../../blog/images/uploads/";
$imageFolder = "../_uploads/informativos/";


//$_FILES['image_path']['tmp_name']

reset($_FILES);
$temp = current($_FILES);

if(is_uploaded_file($temp['tmp_name'])){
    if(isset($_SERVER['HTTP_ORIGIN'])){
        // Same-origin requests won't set an origin. If the origin is set, it must be valid.
        if(in_array($_SERVER['HTTP_ORIGIN'], $accepted_origins)){
            header('Access-Control-Allow-Origin: ' . $_SERVER['HTTP_ORIGIN']);
        }else{
            header("HTTP/1.1 403 Origin Denied");
            return;
        }
    }
  
    // Sanitize input
    if(preg_match("/([^\w\s\d\-_~,;:\[\]\(\).])|([\.]{2,})/", $temp['name'])){
        header("HTTP/1.1 400 Invalid file name.");
        return;
    }
  
    // Verify extension
    if(!in_array(strtolower(pathinfo($temp['name'], PATHINFO_EXTENSION)), array("gif", "jpg", "png"))){
        header("HTTP/1.1 400 Invalid extension.");
        return;
    }
  
    $arquivo = explode('.', $temp['name']);


    $novoNome = $arquivo[0].rand(100,99)."-".date("Ymdhm").".".$arquivo[1];

    // Accept upload if there was no origin, or if it is an accepted origin
    $filetowrite = $imageFolder . $novoNome;
    move_uploaded_file($temp['tmp_name'], $filetowrite);

      //$filetowrite = "http://localhost/phsbrasil/blog/images/uploads/" . $novoNome;
      $filetowrite = "../_uploads/informativos/" . $novoNome;

    // Respond to the successful upload with JSON.
    echo json_encode(array('location' => $filetowrite));
} else {
    // Notify editor that the upload failed
    header("HTTP/1.1 500 Server Error");
}
?>