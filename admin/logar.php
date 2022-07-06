<?php
session_start();

 $DOMINIO = $_SERVER['HTTP_HOST'];

 if($DOMINIO == "www.lfgex.com" OR $DOMINIO == "app.lfgex.com" OR $DOMINIO == "lfgex.com"){

 	$redirect = "http://". $DOMINIO . "/login.php";
 	$redirectTrue = "http://". $DOMINIO . "/principal/";

 }else{
 	$redirect = "https://". $DOMINIO . "/_leadership/login.php";
 	$redirectTrue = "https://". $DOMINIO . "/_leadership/principal/";

 }


if(empty($_POST['login'])){
  $_SESSION['lLogin'] = "" ;
}else{ 
  $_SESSION['lLogin'] = $_POST['login'] ;
}


if(!empty($_POST['senha']) AND !empty($_POST['login'])){

	$login = $_POST['login'];
	$senha = md5($_POST['senha']);

 	require('_app/Conn/Select.php');

 	$consulta = new ClasseSelect();
	$consulta->FullSelect("SELECT u.id, u.funcionario_id, u.login, u.group_id, f.nome, f.sobrenome FROM users AS u JOIN funcionarios AS f ON u.funcionario_id = f.id WHERE u.login LIKE '$login' AND u.senha LIKE '$senha'");

	$dados 	= $consulta->getResult();
	$qtd 	= $consulta->getRowCount();


if(!empty($qtd)){

$grupoPermissao = $dados[0]['group_id'];

$consultaGroup = new ClasseSelect();
$consultaGroup->FullSelect("SELECT mLinks FROM `permission_group` WHERE id=$grupoPermissao");

$dadosGroup  = $consultaGroup->getResult();
// $qtdPermissao    = $consultaGroup->getRowCount();

$mLinks = $dadosGroup[0]['mLinks'];

$consultaSubMenu = new ClasseSelect();
$consultaSubMenu->FullSelect("SELECT DISTINCT submenu_id FROM menus_links WHERE id IN ($mLinks)");

$dadosSubMenu  = $consultaSubMenu->getResult();
$qtdSubMenu    = $consultaSubMenu->getRowCount();

$iSm=0;$smVirgula="";
while($iSm < $qtdSubMenu){

  $mSubMenu .= $smVirgula.$dadosSubMenu[$iSm]['submenu_id'];
  $smVirgula = ",";
  $iSm++;
}



setcookie("teste", "ok", time()+36000);

$consultaMenu = new ClasseSelect();
$consultaMenu->FullSelect("SELECT DISTINCT principal_id FROM menus_submenus WHERE id IN ($mSubMenu)");

$dadosMenu  = $consultaMenu->getResult();
$qtdMenu    = $consultaMenu->getRowCount();

$iM=0;$mVirgula="";
while($iM < $qtdMenu){

  $mMenu .= $mVirgula.$dadosMenu[$iM]['principal_id'];
  $mVirgula = ",";
  $iM++;
}


$consultaAcesso = new ClasseSelect();
$consultaAcesso->FullSelect("SELECT id, link FROM menus_links WHERE id IN ($mLinks)");

$dadosAcesso  = $consultaAcesso->getResult();
$qtdAcesso    = $consultaAcesso->getRowCount();

$iA=0;$aVirgula="";
while($iA < $qtdAcesso){
  
  $acessoCript = md5($dadosAcesso[$iA]['link']);
  $acesso .= $aVirgula.$acessoCript;
  $aVirgula = ",";
  $iA++;
}

setcookie("mPrincipal", $mMenu, time()+36000);
setcookie("mSubmenu", $mSubMenu, time()+36000);

setcookie("mLinks", $mLinks, time()+36000);
setcookie("acesso", $acesso, time()+36000);


setcookie("logado", 'logado', time()+36000);
setcookie("id_user", $dados[0]['id'], time()+36000);
setcookie("id_funcionario", $dados[0]['funcionario_id'], time()+36000);
setcookie("login", $dados[0]['login'], time()+36000);
setcookie("nome", $dados[0]['nome'], time()+36000);
setcookie("sobrenome", $dados[0]['sobrenome'], time()+36000);




}else{

$_SESSION['erroLogin']  = '<div class="alert alert-danger" role="alert">
<p><b>Falha no Login</b><br>
Verifique sua senha e login.</p>
</div>';

	// unset($_COOKIE["logado"]);
 // 	setcookie("logado","",time()-1);

 // 	unset($_COOKIE["id_user"]);
 // 	setcookie("id_user","",time()-1);

 // 	unset($_COOKIE["id_funcionario"]);
 // 	setcookie("id_funcionario","",time()-1);

 // 	unset($_COOKIE["login"]);
 // 	setcookie("login","",time()-1);

 // 	unset($_COOKIE["nome"]);
 // 	setcookie("nome","",time()-1);

 // 	unset($_COOKIE["sobrenome"]);
 // 	setcookie("sobrenome","",time()-1);


foreach($_COOKIE as $key=>$ck){
   setcookie($key, $ck, time()-3600); //seta o cookie com vencimento no passado, invalidando-o
}
	
	// echo $_SESSION['erroLogin'];

	 header("location:$redirect");

	
	exit();
}
	
	header("location:$redirectTrue");


 } //fecha existe login e senha

 else{

 	$_SESSION['erroLogin']  = '<div class="alert alert-danger" role="alert">
<p><b>Falha no Login</b><br>
Verifique sua senha e login.</p>
</div>';

 	// unset($_COOKIE["logado"]);
 	// setcookie("logado","",time()-1);

 	// unset($_COOKIE["id_user"]);
 	// setcookie("id_user","",time()-1);

 	// unset($_COOKIE["id_funcionario"]);
 	// setcookie("id_funcionario","",time()-1);

 	// unset($_COOKIE["login"]);
 	// setcookie("login","",time()-1);

 	// unset($_COOKIE["nome"]);
 	// setcookie("nome","",time()-1);

 	// unset($_COOKIE["sobrenome"]);
 	// setcookie("sobrenome","",time()-1);

foreach($_COOKIE as $key=>$ck){
   setcookie($key, $ck, time()-3600); //seta o cookie com vencimento no passado, invalidando-o
}

	header("location:$redirect");

	exit();
 }



?>