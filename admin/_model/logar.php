<?php
/* Logar */
session_start();

 if(!isset($_COOKIE['logado2'])){

 	require('../_app/Conn/Select.php');

 	$consulta = new ClasseSelect();
	$consulta->FullSelect("SELECT u.id, u.funcionario_id, u.login, f.nome, f.sobrenome FROM users AS u JOIN funcionarios AS f ON u.funcionario_id = f.id WHERE u.login LIKE 'eduardo.dilauro' AND u.senha LIKE 'fe7f2fef96f7a162fd19f5516adc55cd'");

	$dados 			= $consulta->getResult();
	$qtd 			= $consulta->getRowCount();

echo '<pre>';
print_r($_COOKIE);

// echo $_COOKIE['logado'];

setcookie("logado", 'logado', time()+36000);
setcookie("id_user", $dados[0]['id'], time()+36000);
setcookie("id_funcionario", $dados[0]['funcionario_id'], time()+36000);
setcookie("login", $dados[0]['login'], time()+36000);
setcookie("nome", $dados[0]['nome'], time()+36000);
setcookie("sobrenome", $dados[0]['sobrenome'], time()+36000);



 }else{

 	unset($_COOKIE["logado"]);
 	setcookie("logado","",time()-1);

 	unset($_COOKIE["id_user"]);
 	setcookie("id_user","",time()-1);

 	unset($_COOKIE["id_funcionario"]);
 	setcookie("id_funcionario","",time()-1);

 	unset($_COOKIE["login"]);
 	setcookie("login","",time()-1);

 	unset($_COOKIE["nome"]);
 	setcookie("nome","",time()-1);

 	unset($_COOKIE["sobrenome"]);
 	setcookie("sobrenome","",time()-1);

	// header('Location: '.$validaOrigem);

 }

?>