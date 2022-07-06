//Cadastro de 

//Ready
$(document).ready(function(){

      //Mask
       $("#placa").mask("SSS-9999");
       $("#ano_modelo").mask("9999/9999");
       $("#renavam").mask("99999999999");

       $("#val_RNTC").mask("99/99/9999");
       $("#val_Gris").mask("99/99/9999");

       $("#licenciamento").mask("99/99/9999");

       $("#vencimento_seguro").mask("99/99/9999");
     
       $("#placa").keyup(function(){
	  $(this).val($(this).val().toUpperCase());
		});

       $("#chassi").keyup(function(){
    $(this).val($(this).val().toUpperCase());
    });

      //Validar Dados Principais
      $('#formVeiculos').validate({

        rules : {
          placa:       { minlength : 8, required : true },
          marca:       { required : true },
          modelo:      { required : true },
          ano_modelo:  { minlength : 9, required : true },
          tipo:        { required : true },
          combustivel: { required : true },
          renavam:      { minlength : 11, },
           chassi:      { minlength : 17, },

           val_RNTC:      { minlength : 10, },
           val_Gris:      { minlength : 10, },

          status:      { required : true},
        },

        messages : {
          placa:
            { minlength: "<b>- Placa</b> inválida!", required : "<b>- Placa</b> é obrigatório!" },
          renavam:
            { minlength: "<b>- Renavam</b> inválida!"},

            val_RNTC:
            { minlength: "<b>- Validade</b> inválida!"},

            val_Gris:
            { minlength: "<b>- Validade</b> inválida!"},

             chassi:
            { minlength: "<b>- Chassi</b> inválida!"},

          marca: 
            { required : "<b>- Marca</b> é obrigatório!" },

          modelo:
            {  required : "<b>- Modelo</b> é obrigatório!" },

          ano_modelo:
            {  minlength: "<b>- Ano/Modelo</b> inválida!", required : "<b>- Ano/Modelo</b> é obrigatório!" },

          tipo:
            {  required : "<b>- Unidade</b> é obrigatório!" },

          combustivel:
            {  required : "<b>- Combustível</b> é obrigatório!" },

          status: 
            { required : "<b>- Status</b> é obrigatório!" },

        },

        submitHandler: function( form ){
            var dados = $('#formVeiculos').serialize();
            $('#loading').removeClass('d-none');

            $.ajax({
              type: "POST",
              url: "../_controler/veiculosSalvaCadastro.php",
              data: dados,
              success: function( data )
              {
                $('#id_veiculos').val(data);
                $('#loading').addClass('d-none');

                $('#aviso-msg').html('<b>Cliente</b> salvo com sucesso.');
                $('#aviso-msg').addClass('alert-success');
                $('#aviso').removeClass('d-none');

            setTimeout(function() { 
                $('#aviso').addClass('d-none');
            }, 900);

     
              }
            });

            return false;
        },

        //errorLabelContainer: '#error',
          errorClass: "invalid text-danger",

      }); // fim Validar Dados Principais

});//FIM document

// Consulta Placa
  function consultaPlaca(){

    var idVeiculo = $("#id_veiculos").val();
    var placaVeiculo = $("#placa").val();

    var ajax = new XMLHttpRequest();


    // Seta tipo de requisição e URL com os parâmetros
    ajax.open("GET", "../_controler/veiculosChecarPlaca.php?W="+idVeiculo+"&P="+placaVeiculo, true);

    // Envia a requisição
    ajax.send(); 

    // Cria um evento para receber o retorno.
    ajax.onreadystatechange = function() {

      if (ajax.readyState == 4 && ajax.status == 200) {
        var data = ajax.responseText;
        // Retorno do Ajax
        console.log(data);

          if(data == 1){

            $('#aviso-msg').html('<b>Placa</b> já cadastrada.');
            $('#aviso-msg').addClass('alert-danger');

            setTimeout(function() { 
                $('#loading').addClass('d-none');
                $('#aviso').removeClass('d-none');
            }, 200);

            setTimeout(function() { 
                $('#aviso').addClass('d-none');
                $('#aviso-msg').removeClass('alert-danger');
            }, 2500);

            $("#btn_salvar").addClass(  "disabled" );
            
            $( "#placa" ).addClass( "invalid" );
          }else{
              $( "#placa" ).removeClass( "invalid" );
              $("#btn_salvar").removeClass( "disabled" );
          }


        }
      }
      // FIM AJAX

    }

    // Consulta Placa

function fechaCarregamento(){
  $('#loading').addClass('d-none');
}