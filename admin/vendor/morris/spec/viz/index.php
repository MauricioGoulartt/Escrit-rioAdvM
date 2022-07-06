<?php

	$localSite = $_SERVER['REQUEST_URI'];
	$qtdSubpasta = substr_count($localSite, '/') - 1;
	$pastaLink = "";
	$i=1;
	  while ($i < $qtdSubpasta) {
	  $pastaLink .= "../";
	  $i++;
	}

require $pastaLink.'_model/redirect.php';

?>