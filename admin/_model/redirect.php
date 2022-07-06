<?php


$DOMINIO = $_SERVER['HTTP_HOST'];

 if($DOMINIO == "www.lfgex.com" OR $DOMINIO == "app.lfgex.com" OR $DOMINIO == "lfgex.com"){

 	$redirect = "http://". $DOMINIO . "/principal/";

 }else{
 	$redirect = "https://". $DOMINIO . "/_leadership/principal/";
 }

	 header("location:$redirect");

?>