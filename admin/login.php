<?php
session_start();

if(isset($_SESSION['lLogin'])){
  $login = $_SESSION['lLogin'] ;
}else{
  $login = "" ;
}

echo "<pre>";
print_r($_COOKIE);
echo "</pre>";

?>

<!DOCTYPE html>
<html lang="pt-br">

<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <meta name="description" content="">
  <meta name="author" content="">
  <title>Leadership - Sistema W!</title>
  <!-- Bootstrap core CSS-->
  <link href="vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
  <!-- Custom fonts for this template-->
  <link href="vendor/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
  <!-- Custom styles for this template-->
  <link href="css/sb-admin.css" rel="stylesheet">
  <link href="css/custom.css" rel="stylesheet">
</head>

<body class="bg-dark">
  <div class="container">
    <div class="card card-login mx-auto mt-5">
      <div class="card-header">Informe sua Login</div>
      <div class="card-body">
                
        <div class="w-100">
<?php
  if(isset($_SESSION['erroLogin'])){ echo $_SESSION['erroLogin'];
  unset($_SESSION['erroLogin']);
  } ?>
        </div>
        <form id="formLogin" method="POST" action="logar.php">
          <div class="form-group">
            <label>Login</label>
            <input class="form-control" id="login" type="text" name="login" value="<?php echo $login; ?>">
          </div>
          <div class="form-group">
            <label>Senha</label>
            <input class="form-control" id="senha" name="senha" type="password">
          </div>
          
          <input class="btn btn-woohoo btn-block" type="submit" name="woohoo" value="Logar">

        </form>
        <div class="text-center">
          <!-- <a class="d-block small mt-3" href="register.html">Register an Account</a> -->
         
          <img class="img-fluid mt-3" src="images/agencia-logo.png" width="120px">
        </div>
        
      </div>
    </div>
  </div>
  <!-- Bootstrap core JavaScript-->
  <script src="vendor/jquery/jquery.min.js"></script>
  <script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
  <!-- Core plugin JavaScript-->
  <script src="vendor/jquery-easing/jquery.easing.min.js"></script>
</body>

</html>
