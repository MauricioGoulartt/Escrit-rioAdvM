<?php

foreach($_COOKIE as $key=>$ck){
   setcookie($key, $ck, time()-3600); 
}

 $DOMINIO = $_SERVER['HTTP_HOST'];

 if($DOMINIO == "www.lfgex.com" OR $DOMINIO == "app.lfgex.com" OR $DOMINIO == "lfgex.com"){

 	$redirect = "http://". $DOMINIO . "/login.php";

 }else{
 	$redirect = "https://". $DOMINIO . "/_leadership/login.php";
 }

	 header("location:$redirect");

	exit();