<?php
session_start();


  if(isset($_GET['PG'])){$PG = $_GET['PG'];}else{ $PG = 1;}
  
  $wherePag = "SELECT id FROM contatos_site";

  $regPG  = 25;
  require_once '../_model/class.Paginacao.php';
  $pagina = new ClassPaginacao();
  $pagina->getPaginacao($wherePag, $regPG, $PG);
  $navPaginacao = $pagina->getNavPag();
  $inicioPG = $pagina->getInicioPag();

  require_once('../_app/Conn/Select.php');

    $termos .= "ORDER BY id DESC LIMIT $regPG OFFSET $inicioPG";

  $consulta = new ClasseSelect();
  $consulta->getSelect('*', 'contatos_site', $termos);

  $resultado = $consulta->getResult();
  $qtd = $consulta->getRowCount();

  // echo "<pre>";
  // print_r($resultado);

  $i=0;
  while ($qtd > $i) {
    
    $tableContent .= '<tr>
      <th scope="row">'.$resultado[$i]['id'].'</th>
      <td>'.date("d/m/Y", strtotime($resultado[$i]['criado'])).'</td>
      <td>'.$resultado[$i]['nome'].'</td>
      <td>'.$resultado[$i]['telefone'].'</td>
      <td>'.$resultado[$i]['email'].'</td>
      <td>'.$resultado[$i]['mensagem'].'</td>
    </tr>';


    $i++;
  }

 
?>

<!DOCTYPE html>
<html lang="pt-br">

<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <meta name="description" content="">
  <meta name="author" content="">
  <title>Agencia Woohoo!</title>
  <!-- Bootstrap core CSS-->
  <link href="../vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet"> 
  <!-- Custom fonts for this template-->
  <link href="../vendor/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
  <!-- Page level plugin CSS-->
  <link href="../vendor/morris/morris.css" rel="stylesheet">
  <!-- Custom styles for this template-->
  <link href="../css/sb-admin.css" rel="stylesheet">
  <link href="../css/custom.css" rel="stylesheet">

</head>

<body>

  <section>
    <div class="container">
      <div class="row">
        <div class="col-lg-12">

<table class="table table-striped table-hover">
  <thead>
    <tr>
      <th scope="col">#</th>
       <th scope="col">Data</th>
      <th scope="col">Nome Completo</th>
      <th scope="col">Telefone</th>
      <th scope="col">Email</th>
      <th scope="col">Mensagem</th>
    </tr>
  </thead>
  <tbody>
    <?php echo $tableContent; ?>
  </tbody>
</table>

<?php echo $navPaginacao; ?>

        </div>

      </div>

    </div>
  </section>  

    <!-- Bootstrap core JavaScript-->
    <script src="../vendor/jquery/jquery.min.js"></script>
    <script src="../vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
    
    
    <!-- Custom scripts for all pages-->
    <script src="../js/sb-admin.min.js"></script>
    <!-- Custom scripts for this page-->
    <script src="../vendor/morris/raphael-min.js"></script>
    <script src="../vendor/morris/morris.min.js"></script>

    <script src="../js/comercial-lista-cotacao.js"></script>
    <script type="text/javascript">

        

       //Graficos
        new Morris.Bar({
          
          element: 'myfirstchart',
          // Chart data records -- each entry in this array corresponds to a point on
          // the chart.
          data: [
            // { year: '2008', value: 20 },
            { year: 'Cancelado', value: <?php echo $cancelado ;?> },
            { year: 'Perdido', value: <?php echo $perdido ;?>  },
            { year: 'Stand By', value: <?php echo $standby ;?>  },
            { year: 'Estudo', value: <?php echo $estudo ;?>  },
            { year: 'Fechado', value: <?php echo $fechado ;?>  }
          ],

  //    barColors: ["#6c757d", "#dc3545", "#28a745", "#17a2b8"],

  //         colors: [
  //   '#0BA462',
  //   '#39B580',
  //   '#67C69D',
  //   '#95D7BB'
  // ],


          barColors: function (row, series, type) {
            console.log("--> "+row.label, series, type);
            if(row.label == "Cancelado") return "#343a40";
            else if(row.label == "Perdido") return "#dc3545";
            else if(row.label == "Stand By") return "#6c757d";
            else if(row.label == "Estudo") return "#17a2b8";
            else if(row.label == "Fechado") return "#28a745";
          },

          // The name of the data record attribute that contains x-values.
          xkey: 'year',
          // A list of names of data record attributes that contain y-values.
          ykeys: ['value'],
          // Labels for the ykeys -- will be displayed when you hover over the
          // chart.
          labels: ['Value']
        });

    </script>

</body>

</html>
