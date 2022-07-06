<?php
// Paginação
class ClassPaginacao {
	
	public $Consulta;
	public $RegPag;
	public $PagAtual;
	public $NavPaginacao;
	public $Inicioag;

	public function getPaginacao($Consulta, $RegPag, $PagAtual){

		// if(isset($_GET['PG'])){$PG = $_GET['PG'];}else{ $PG = 1;}
			
			// $regPG	= 25; // quantida de registros por pagina
			
		if($PagAtual == 1 ){$this->InicioPag = 0; }else{ $this->InicioPag = $RegPag * ($PagAtual - 1); }


			
			// $sqlPaginacao = "SELECT id FROM clientes".$wherePag;
			require '../_app/Conn/Conn.php';
			$query = $mysqli->query($Consulta);	

			$totalRows = $this->qtdRow =  $query->num_rows;

		    $totalPag = ceil($totalRows/$RegPag);
		    $ii=1; $loopPag = $totalPag; $PG = $PagAtual;
		   	if($totalPag > 10){
		   		if($PG + 5 > $totalPag){
		   			$ii = $PG - 9;
					$loopPag = $totalPag;
		   		}else{

				   	if($PG > 5){
				   		$ii = $PG - 4;
						if($PG + 5 > $totalPag){
							$loopPag = $totalPag;
						}else{
							$loopPag = $PG + 5;
						}
					}else{
				   		$ii = 1;
				   		$loopPag = 10;
				   	}

		   		}

		   	}

		   	if($totalPag > 1){
		   			if($PG == 1){$pgDisable1 ='disabled';}	
		   			$this->NavPaginacao .= 
		   			'<nav aria-label="Page navigation example">
  						<ul class="pagination justify-content-center">
      					<li class="page-item '.$pgDisable1.'">
        				<a class="page-link" href="?PG=1" aria-label="Previous" 
          				<span aria-hidden="true">&laquo;</span>
          				<span class="sr-only">Previous</span>
        				</a>
      					</li>';
		   

				    while ($ii <= $loopPag) {
				        if($PG == $ii){$disabled = 'disabled';}else{$disabled = '';}
						$this->NavPaginacao .='<li class="page-item '.$disabled.'"><a class="page-link" href="?PG='.$ii.'">'.$ii.'</a></li>';
				        $ii++;
					}

					if($PG == $totalPag){$pgDisable2 ='disabled';}	
		   			$this->NavPaginacao .= 
		   			'<li class="page-item '.$pgDisable2.'">
        			<a class="page-link" href="?PG=<?php echo $totalPag; ?>" aria-label="Next">
          			<span aria-hidden="true">&raquo;</span>
          			<span class="sr-only">Next</span>
        			</a>
      				</li>
    				</ul>
  					</nav>
  					</div>';

				}
	} // fecha função

	public function getNavPag(){
		return $this->NavPaginacao;
	}

	public function getInicioPag(){
		return $this->InicioPag;
	}

}




      
      
      
      
