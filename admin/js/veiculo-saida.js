$(document).ready(function(){
      
    $("#data").mask("99/99/9999");
    $("#hora").mask("99:99");

    liberarBtnSalva();

    //Validar Dados Principais
      $('#formRota').validate({

        rules : {
          data:       { minlength: 10, required : true },
          hora:       { minlength: 5, required : true },
          km_inicial:  { required : true },
        },

        messages : {
          data:
            { minlength: "<b>- Data</b> inválida!", required : "<b>- Data</b> é obrigatório!" },
          hora:
            { minlength: "<b>- Hora</b> inválida!", required : "<b>- Hora</b> é obrigatório!" },

          km_inicial:
            { minlength: "<b>- Hora</b> inválida!", required : "<b>- KM</b> é obrigatório!", min: "KM menor que anterior." },
        },

        submitHandler: function( form ){
            var dados = $('#formRota').serialize();
            $('#loading').removeClass('d-none');

            $.ajax({
              type: "POST",
              url: "../_controler/veiculosSalvaRota.php",
              data: dados,
              success: function( data )
              {
                $("html, body").animate({ scrollTop: 0 }, "slow");

                $('#loading').addClass('d-none');

                $(".form-control").prop( "disabled", true );
                $("#btnSalva").prop( "disabled", true );

                $('#aviso-msg').html('<b>Rota</b> criada com sucesso.');
                
                $('#aviso-msg').removeClass('d-none');


     
              }
            });

            return false;
        },

        //errorLabelContainer: '#error',
          errorClass: "invalid text-danger",

      }); // fim Validar Dados Principais

});

function fechaCarregamento(){
  $('#loading').addClass('d-none');
}

function abreModalOrigem(){
    $('#modalOrigem').modal('show');
    
    setTimeout(function() { 
                $('#buscaOrigem').focus();

            }, 500);
}

function abreModalDestino(){
    $('#modalDestino').modal('show');
    
    setTimeout(function() { 
                $('#buscaDestino').focus();

            }, 500);
}

function linhaOrigem(id_linha){
  
  var selecaoOrigem = $('#linha-'+id_linha).html();

  $('#origemView').html(selecaoOrigem);
   $('#origem').val(selecaoOrigem);

   liberarBtnSalva();

  $('#modalOrigem').modal('hide');
  // alert(selecaoOrigem);
  // origemView
}

function linhaDestino(id_linha){
  
  var selecaoDestino = $('#linhaD-'+id_linha).html();

  $('#destinoView').html(selecaoDestino);
  $('#destino').val(selecaoDestino);

  liberarBtnSalva();

  $('#modalDestino').modal('hide');
  // alert(selecaoOrigem);
  // origemView
}

function buscarOrigem(){

    var var_origem = $("#buscaOrigem").val();

    var ajax = new XMLHttpRequest();

  ajax.open("GET", "../_controler/veiculosSaidasOrigem.php?W="+var_origem, true);

  ajax.send();
  ajax.onreadystatechange = function() {

    if (ajax.readyState == 4 && ajax.status == 200) {
      var data = ajax.responseText;
      
      console.log(data);

      $( "#tableOrigem" ).html(data);
      
    }
  }
} // FIM AJAX


function buscarDestino(){

    var var_origem = $("#buscaDestino").val();

    var ajax = new XMLHttpRequest();

  ajax.open("GET", "../_controler/veiculosSaidasDestino.php?W="+var_origem, true);

  ajax.send();
  ajax.onreadystatechange = function() {

    if (ajax.readyState == 4 && ajax.status == 200) {
      var data = ajax.responseText;
      
      console.log(data);

      $( "#tableDestino" ).html(data);
      
    }
  }
} // FIM AJAX

    $("#buscaOrigem").keyup(function(){
      buscarOrigem();
    });

    $("#buscaDestino").keyup(function(){
      buscarDestino();
    });


function liberarBtnSalva(){

  var var_destino = $("#destino").val();
  var var_origem = $("#origem").val();

  if((var_origem !== "") && (var_destino !== "")){
    $("#btnSalva").prop( "disabled", false );
  }
}
