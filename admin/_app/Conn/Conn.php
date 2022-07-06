<?php


 // $URL_ATUAL= "$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
 //    // echo $URL_ATUAL; 

 // $URL_EX = explode("/", $URL_ATUAL);
 // $DOMINIO = $URL_EX[0];

 	define('HOST', 'localhost:3306');
	define('USER', 'mgoulart_userlp');
	define('PASS', 'GOouN.^T{!?m');
	define('DBSA', 'mgoulart_contatolp');

	$mysqli = new mysqli(HOST, USER, PASS, DBSA);

	if (mysqli_connect_errno()) trigger_error(mysqli_connect_error());

	$mysqli->set_charset("utf8");

