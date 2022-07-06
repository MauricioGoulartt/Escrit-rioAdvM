$(document).ready(function(){
      
    $("#data").mask("99/99/9999");
    $("#hora").mask("99:99");
    $("#cnpj").mask("99.999.999/9999-99");

    $('#litros').mask("#.###0,0000", {reverse: true});

    // $('#km').mask("#.##0", {reverse: true});

    $('#valor').mask("#.##0,000", {reverse: true});
    $('#valor_total').mask("#.##0,00", {reverse: true});

     //Validar Dados Principais
      $('#formRota').validate({

        rules : {
          data:       { minlength: 10, required : true },
          hora:       { minlength: 5, required : true },
          litros:      { minlength: 5, required : true },
          valor:       { minlength: 5, required : true },
          valor_total: { minlength: 5, required : true },
          cnpj: { minlength: 5 },  

          km: { minlength: 1, required : true },

        },

        messages : {
          cnpj:
          { minlength: "<b>- CNPJ</b> inválido!" },


          data:
            { minlength: "<b>- Data</b> inválida!", required : "<b>- Data</b> é obrigatório!" },
          hora:
            { minlength: "<b>- Hora</b> inválida!", required : "<b>- Hora</b> é obrigatório!" },

            litros:
            { minlength: "<b>- Litros</b> inválido!", required : "<b>- Litros</b> é obrigatório!" },

            valor:
            { minlength: "<b>- Valor</b> inválido!", required : "<b>- Valor</b> é obrigatório!" },

            valor_total:
            { minlength: "<b>- Valor</b> inválido!", required : "<b>- Valor</b> é obrigatório!" },

             km:
            { min: "<b>- KM</b> menor que anterior!", required : "<b>- KM</b> é obrigatório!" },

        },

        submitHandler: function( form ){
            var dados = $('#formRota').serialize();
            $('#loading').removeClass('d-none');

            $.ajax({
              type: "POST",
          url: "../_controler/financeiroSalvaAbastecimento.php",
              data: dados,
              success: function( data )
              {
                $("html, body").animate({ scrollTop: 0 }, "slow");

                $('#loading').addClass('d-none');

                // $(".form-control").prop( "disabled", true );
                // $("#btnSalva").prop( "disabled", true );

                $('#aviso-msg').html('<b>Abastecimento</b> salvo com sucesso.');
                
                $('#aviso-msg').removeClass('d-none');

                $('#id_abastecimento').val(data);
                
     
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


function abrePesquisaCliente(){
  $('#pesquisa-cliente').modal('show');
      setTimeout(function() { 
               $('#PesquisaCliente').focus();

            }, 500);
}

function clienteSelecao(idLinha, IdVeiculo){

  var selVeiculo     = $('#veiculo-'+idLinha).html();


  $('#id_veiculo').val(IdVeiculo);
  $('#dadosVeiculo').html(selVeiculo);


  $('#pesquisa-cliente').modal('hide');

        setTimeout(function() { 
          if($('#validate').val() == 1){
            validaForm(); 
          }
         }, 500);

}

 //Validar Foto Perfil
      $('#formFoto').validate({

        rules : {
        
          fotoAbastecimento:  { extension: "jpg", required: true },

        },

        messages : {
          
          fotoAbastecimento: 
            { extension: "<b>- Arquivo </b> inválido! Use somente arquivo '.jpg'.", required: "Selecione uma foto." },

        },

        submitHandler: function( form ){
          $('#loading').removeClass('d-none');
          var data = new FormData();
          var id_abas = $("#id_abastecimento").val();

          data.append('fotoAbastecimento', $('#fotoAbastecimento')[0].files[0]);

        $.ajax({
        
          url: '../_controler/financeiroSalvaFotoAbastecimento.php?id='+id_abas,
          data: data,
          processData: false,
          contentType: false,
          type: 'POST',
          success: function(data){
            
            // $('#modalFoto').modal('hide');
            $('#loading').addClass('d-none');

$('#imgComprovante').html("<img class='img-fluid mt-3' src='https://www.agenciawoohoo.com.br/_leadership/_uploads/financeiro/abastecimento/"+id_abas+".jpg?'"+Math.random()+"' />");

            // alert(1);


          }
        
        });
           
            return false;
        },

        //errorLabelContainer: '#error',
          errorClass: "invalid text-danger",

      }); // fim Validar foto Perfil