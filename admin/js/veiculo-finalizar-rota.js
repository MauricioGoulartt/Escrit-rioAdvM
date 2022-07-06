$(document).ready(function(){
       
    $("#data").mask("99/99/9999");
    $("#hora").mask("99:99");

    // liberarBtnSalva();

    //Validar Dados Principais
      $('#formRota').validate({

        rules : {
          data:       { minlength: 10, required : true },
          hora:       { minlength: 5, required : true },
          km_final:   { required : true },
        },

        messages : {
          data:
            { minlength: "<b>- Data</b> inválida!", required : "<b>- Data</b> é obrigatório!" },
          hora:
            { minlength: "<b>- Hora</b> inválida!", required : "<b>- Hora</b> é obrigatório!" },
            km_final:
            { required : "<b>- KM</b> é obrigatório!", min: "KM menor que o de saída."},

        },

        submitHandler: function( form ){
            var dados = $('#formRota').serialize();
            $('#loading').removeClass('d-none');

            $.ajax({
              type: "POST",
              url: "../_controler/veiculosSalvaFinalizaRota.php",
              data: dados,
              success: function( data )
              {
                $("html, body").animate({ scrollTop: 0 }, "slow");

                $('#loading').addClass('d-none');

                $("#btnFinalizar").prop( "disabled", true );
        $("#btnCancelar").prop( "disabled", true );
        $("#btnFinConfirma").prop( "disabled", true );
        $("#btnConConfirma").prop( "disabled", true );

                $(".form-control").prop( "disabled", true );

                $('#aviso-msg').addClass('alert-success');
                $('#modalFinalizar').modal('hide');

                $('#aviso-msg').html('<b>Rota</b> finalizada com sucesso.');
                
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

// function liberarBtnSalva(){

//   var var_destino = $("#destino").val();
//   var var_origem = $("#origem").val();

//   if((var_origem !== "") && (var_destino !== "")){
//     $("#btnSalva").prop( "disabled", false );
//   }
// }


//Exclui Contato
function cancelaRotaModal(){

    $('#loading').removeClass('d-none');
    var id_rota = $("#id_rota").val();
    
    var ajax = new XMLHttpRequest();
    ajax.open("GET", "../_controler/veiculosSalvaCancelaRota.php?id_rota="+id_rota, true);
    ajax.send();

    // Cria um evento para receber o retorno.
    ajax.onreadystatechange = function() {
      if (ajax.readyState == 4 && ajax.status == 200) {
        var data = ajax.responseText;
          console.log(data);
        //alert(data);
        $("html, body").animate({ scrollTop: 0 }, "slow");
        $('#cancelarRota').modal('hide');
             
  

        $('#aviso-msg').html('<b>Rota</b> cancela com sucesso.');
        $('#aviso-msg').addClass('alert-warning');

        $("#btnFinalizar").prop( "disabled", true );
        $("#btnCancelar").prop( "disabled", true );
        $("#btnFinConfirma").prop( "disabled", true );
        $("#btnConConfirma").prop( "disabled", true );

        setTimeout(function() { 
            $('#loading').addClass('d-none');
            $('#aviso-msg').removeClass('d-none');
        }, 200);

        setTimeout(function() { 
            $('#aviso-msg').addClass('d-none');
            $('#aviso-msg').removeClass('alert-warning');
        }, 1800);


      }
    }

}