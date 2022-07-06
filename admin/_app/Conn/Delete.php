<?php

class ClasseDelete{

	public $Tabela;
    public $Where;

  // $Tabela = nome da tabela | $Dados = array com chave nome do campo e valor ingual o valor inserido
  public function getDelete($Tabela, $Where){

	require('Conn.php');

	$sql = "DELETE FROM $Tabela WHERE $Where";

 	$query = $mysqli->query($sql);
 	// $this->idInsert =  mysqli_insert_id($mysqli);

  }

  // public function getResult(){
  // 	echo $this->idInsert;
  // }

 }