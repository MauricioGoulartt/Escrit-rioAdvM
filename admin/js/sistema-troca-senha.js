$(document).ready(function(){
      
    // $("#data").mask("99/99/9999");
    // $("#hora").mask("99:99");

    //Validar Dados Principais
      $('#formTrocaSenha').validate({

        rules : {
          senha_atual:      { required : true },
          nova_senha:     { minlength: 5,  required : true },
        },

        messages : {

          senha_atual:    { required : "<b>- Senha </b> é obrigatório!" },
          nova_senha:   { required : "<b>- Nova Senha</b> é obrigatório!", minlength: "<b>- Nova Senha</b> mínimo de 5 caracteres" },            
        },

        submitHandler: function( form ){
            var dados = $('#formTrocaSenha').serialize();
            $('#loading').removeClass('d-none');

            $.ajax({
              type: "POST",
              url: "../_controler/sistemaTrocaSenha.php",
              data: dados,
              success: function( data )
              {

                if(data == 1 ){
                $("html, body").animate({ scrollTop: 0 }, "slow");

                $('#loading').addClass('d-none');

                $('#id_user').val(data);

                $('#aviso-msg').html('<b>Senha</b> alterada com sucesso.');

                $("#aviso-msg").addClass('alert-success');
                 $('#aviso-msg').removeClass('alert-danger');

                
                $('#aviso-msg').removeClass('d-none');
                }else{

                 $('#aviso-msg').removeClass('alert-success');

                
                $("html, body").animate({ scrollTop: 0 }, "slow");
                $("#aviso-msg").addClass('alert-danger');

                $('#loading').addClass('d-none');

                $('#id_user').val(data);

                $('#aviso-msg').html('<b>Erro</b> verifique se digitou a senha corregamente.');
                
                $('#aviso-msg').removeClass('d-none');

                }
     
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
