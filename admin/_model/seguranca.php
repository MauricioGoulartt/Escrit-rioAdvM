<?php

 $DOMINIO = $_SERVER['HTTP_HOST'];

if(!isset($_COOKIE["logado"])){


 if($DOMINIO == "www.lfgex.com" OR $DOMINIO == "app.lfgex.com" OR $DOMINIO == "lfgex.com"){

 	$redirect = "http://". $DOMINIO . "/login.php";

 }else{
 	$redirect = "https://". $DOMINIO . "/_leadership/login.php";
 }

	 header("location:$redirect");

 exit();

}

 $PAG_LOCAL = $_SERVER['REQUEST_URI'];
 $pesquisa	= explode("?", $PAG_LOCAL);

 $PAG_LOCAL = $pesquisa[0];
 $PAG_LOCAL = str_replace("/_leadership", "",  $PAG_LOCAL);
 $PAG_LOCAL = substr($PAG_LOCAL,1);
 $arrayAcesso = explode(",", $_COOKIE["acesso"]);
 $arrayAcessoLink = explode(",", $_COOKIE['mLinks']);

 if(in_array(12, $arrayAcessoLink)){
 	$arrayAcesso[] = md5("veiculos/veiculos-lanca-abastecimento.php");
 }

 if(in_array(13, $arrayAcessoLink)){
 	$arrayAcesso[] = md5("veiculos/veiculos-trajeto.php");
 }

  if(in_array(14, $arrayAcessoLink)){
 	$arrayAcesso[] = md5("veiculos/veiculos-saida.php");
 }

  $arrayAcesso[] = md5("sistema/troca-senha.php");
 
 

if($PAG_LOCAL != "principal/"){

	$CriptPag = md5($PAG_LOCAL);

 if (!in_array($CriptPag, $arrayAcesso)) { 

    if($DOMINIO == "www.lfgex.com" OR $DOMINIO == "app.lfgex.com" OR $DOMINIO == "lfgex.com"){

 	$redirect = "http://". $DOMINIO . "/principal/";

	}else{
	 	$redirect = "https://". $DOMINIO . "/_leadership/principal/";
	}

	header("location:$redirect");
	exit();

 }

}

?>