$(document).ready(function(){
      
    // $("#data").mask("99/99/9999");
    // $("#hora").mask("99:99");

    //Validar Dados Principais
      $('#formUsuario').validate({
 
        rules : {
          id_func:    { required : true },
          id_grupo:   { required : true },
          login:      { minlength: 3, required : true },
          status:     { required : true },
          senha:      { minlength: 5, required : true },
        },

        messages : {

          id_func:    { required : "<b>- Funcionário</b> é obrigatório!" },
          id_grupo:   { required : "<b>- Grupo de Acesso</b> é obrigatório!" },
          login:      { minlength: "<b>- Login</b> mínimo 5 caracteres!", required : "<b>- Login</b> é obrigatório!" },
          status:     { required : "<b>- Status</b> é obrigatório!" },
          senha:      { minlength: "<b>- Senha</b> mínimo 5 caracteres!", required : "<b>- Senha</b> é obrigatório!" },
            
        },

        submitHandler: function( form ){
            var dados = $('#formUsuario').serialize();
            $('#loading').removeClass('d-none');

            $.ajax({
              type: "POST",
              url: "../_controler/sistemaSalvaUser.php",
              data: dados,
              success: function( data )
              {
                $("html, body").animate({ scrollTop: 0 }, "slow");

                $('#loading').addClass('d-none');

                $('#id_user').val(data);

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


// Consulta Placa
  function consultaLogin(){

  
    var idUser = $("#id_user").val();
    var login = $("#login").val();

    var ajax = new XMLHttpRequest();


    // Seta tipo de requisição e URL com os parâmetros
    ajax.open("GET", "../_controler/sistemaChecarLogin.php?W="+idUser+"&P="+login, true);

    // Envia a requisição
    ajax.send(); 

    // Cria um evento para receber o retorno.
    ajax.onreadystatechange = function() {

      if (ajax.readyState == 4 && ajax.status == 200) {
        var data = ajax.responseText;
        // Retorno do Ajax
        console.log(data);

          if(data == 1){

            $('#aviso-msg').html('<b>Login</b> já cadastrado.');
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
            
            $( "#login" ).addClass( "invalid" );
          }else{
              $( "#login" ).removeClass( "invalid" );
              $("#btn_salvar").removeClass( "disabled" );
          }


        }
      }
      // FIM AJAX

    }

    // Consulta Placa