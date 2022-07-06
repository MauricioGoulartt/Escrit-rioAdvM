<?php


class ClasseInsert{

	public $Tabela;
    public $Dados;
    public $idInsert;

  // $Tabela = nome da tabela | $Dados = array com chave nome do campo e valor ingual o valor inserido
  public function getInsert($Tabela, $Dados){

  	$campos = ''; $valores = '';

	foreach($Dados as $key => $value){
		if(empty($campos)){
			$campos .=  $key ;
		}else{
			$campos .= ", ". $key ;
		}

		if(empty($valores)){
			$valores .=  "'".$value."'";
		}else{
			$valores .= ", ". "'".$value."'" ;
		}	
	}

	require('Conn.php');

	$sql = "INSERT INTO $Tabela ($campos) VALUES ($valores)";

 	$query = $mysqli->query($sql);
 	$this->idInsert =  mysqli_insert_id($mysqli);

  }

  public function getResult(){
  	echo $this->idInsert;
  }

  public function idResult(){
  	return $this->idInsert;
  }

 }
