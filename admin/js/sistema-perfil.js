$(document).ready(function(){
      
    // $("#data").mask("99/99/9999");
    // $("#hora").mask("99:99");

    //Validar Dados Principais
      $('#formPermisao').validate({

        rules : {
          nome:       { minlength: 5, required : true },
          status:     { required : true },
        },

        messages : {
          nome:
            { minlength: "<b>- Nome do Perfil</b> mínimo 5 caracteres!", required : "<b>- Nome do Perfil</b> é obrigatório!" },
          status:
            { required : "<b>- Status</b> é obrigatório!" },
        },

        submitHandler: function( form ){
            var dados = $('#formPermisao').serialize();
            $('#loading').removeClass('d-none');

            $.ajax({
              type: "POST",
              url: "../_controler/sistemaSalvaPerfil.php",
              data: dados,
              success: function( data )
              {
                $("html, body").animate({ scrollTop: 0 }, "slow");

                $('#loading').addClass('d-none');

                $('#id_funcionario').val(data);

                $('#aviso-msg').html('<b>Perfil</b> salvo com sucesso.');
                
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
