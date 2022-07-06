<?php

class ClasseSelect{

	public $Tabela;
    public $Termos;
    public $Select;
    public $Campos;
    public $FullSql;
    public $result = array();
    public $qtdRow;

	public function getSelect($Campos, $Tabela, $Termos){

		require('Conn.php');
		$sql = "SELECT $Campos FROM $Tabela $Termos";
		
		$query = $mysqli->query($sql);
		$this->qtdRow =  $query->num_rows;
		$i=0;
		if($this->qtdRow > 0){
			while($row = $query->fetch_array()){
				array_push($this->result, $row);
			}
		}

	}

	public function FullSelect($FullSql){

		require('Conn.php');
		$query = $mysqli->query($FullSql);
		$this->qtdRow =  $query->num_rows;
		$i=0;
		if($this->qtdRow > 0){
			while($row = $query->fetch_array()){
				array_push($this->result, $row);
			}
		}		

	}

	public function getResult(){
	   	return $this->result;
	}

	public function getRowCount(){
		return $this->qtdRow;
	}

	

	


 }



