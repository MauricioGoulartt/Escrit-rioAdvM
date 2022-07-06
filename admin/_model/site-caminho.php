<?php
// Breadcrumbs
$localSite = $_SERVER['REQUEST_URI'];
$localSite = explode("?", $localSite);
$localSite[0] = str_replace(".php","",$localSite[0]);
$caminhoSite = explode("/", $localSite[0]);

<small>
<ol class="breadcrumb mt-2">
	<li class="breadcrumb-item">
	  <?php echo strtolower($caminhoSite[2]); ?>
	</li>
	<li class="breadcrumb-item active"><?php echo strtolower($caminhoSite[3]); ?></li>
	</ol>
</small>