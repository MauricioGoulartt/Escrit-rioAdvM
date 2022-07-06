<?php

class ClasseUpdate{

	public $Tabela;
    public $Dados;
    public $Where;

  // $Tabela = nome da tabela | $Dados = array com chave nome do campo e valor ingual o valor alterado | $Where = condições da alteração
  public function getUpdate($Tabela, $Dados, $Where){

  	$valores = '';

	foreach($Dados as $key => $value){
		
		if(empty($valores)){
			$valores .=  $key."='".$value."'";
		}else{
			$valores .= ", ".$key."='".$value."'" ;
		}	
	}

	require('Conn.php');

	$sql = "UPDATE  $Tabela SET $valores WHERE $Where";

 	$query = $mysqli->query($sql);
 	

  }

  // public function getResult(){
  // 	echo $this->idInsert;
  // }

 }

