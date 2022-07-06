//Ready
$(document).ready(function(){
 

      //Mask
       $("#cep").mask("00000-000");

      //Validar Cadastro Endereço
      $('#formEnderecoCliente').validate({

        rules : {
          nome:     { minlength : 3, required : true },
          cep:      { minlength : 9, required : true },
          endereco: { required : true },
          numero:   { required : true },
          bairro:   { required : true },
          cidade:   { required : true },
          uf:       { required : true },
        },

        messages : {
          nome:      { minlength: "<b>- Nome</b> mínimo 3 caracteres!", required : "<b>- Nome</b> é obrigatório!" },
          cep:      { minlength: "<b>- CEP</b> inválido!", required : "<b>- CEP</b> é obrigatório!" },
          endereco: { required : "<b>- Endereço</b> é obrigatório!" },
          numero:   { required : "<b>- Número</b> é obrigatório!" },
          bairro:   { required : "<b>- Bairro</b> é obrigatório!" },
          cidade:   { required : "<b>- Cidade</b> é obrigatório!" },
          uf:       { required : "<b>- UF</b> é obrigatório!" },
        },

        submitHandler: function( form ){
          //alert('teste');
          $('#loading').removeClass('d-none');
            var dados = $('#formEnderecoCliente').serialize();
            
            $.ajax({
              type: "POST",
              url: "../_controler/locaisSalvaCadastro.php",
              data: dados,
              success: function( data ){

                $('#id_endereco').val(data);
                     
              }
            });

            $('#aviso-msg').html('<b>Endereço</b> cadastrado com sucesso.');
            $('#aviso-msg').addClass('alert-success');

            setTimeout(function() { 
                $('#loading').addClass('d-none');
                $('#aviso').removeClass('d-none');
            }, 200);

            setTimeout(function() { 
                $('#aviso').addClass('d-none');
                $('#aviso-msg').removeClass('alert-success');
            }, 1800);
            

            return false;
        },

        //errorLabelContainer: '#error',
          errorClass: "invalid text-danger",

      }); // fim Validar Cadastro Endereço



});//FIM document


// Fecha loading page
function fechaCarregamento(){

    $('#loading').addClass('d-none');

}


function buscaCep(){
  var CEP = $('#cep').val();
  var testeCep = $('#cep').val().length;

  if(testeCep == 9){
    
    $('#loading').removeClass("d-none");
    
    var pesquisaCep = CEP.replace("-", "");

    var ajax = new XMLHttpRequest();
    ajax.open("GET", "https://viacep.com.br/ws/"+pesquisaCep+"/json/", true);
    ajax.send();
    ajax.onreadystatechange = function() {
      if (ajax.readyState == 4 && ajax.status == 200) {
         var data = ajax.responseText;
        //console.log(data);
        var dados = JSON.parse(data);

        // alert(dados.logradouro);
        $("#endereco").val(dados.logradouro);
        $("#bairro").val(dados.bairro);
        $("#cidade").val(dados.localidade);
        $("#uf").val(dados.uf);
        $("#numero").focus();
        $('#loading').addClass("d-none");
      }
    }
  }
}

