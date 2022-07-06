//Cadastro Funcionario

//Ready
$(document).ready(function(){
    
    liberaBotao();  

     // Variação de 8 para 9 digitos.
      var masks = ['(00) 00000-0000', '(00) 0000-00009'],
        maskBehavior = function(val, e, field, options) {
          return val.length > 14 ? masks[0] : masks[1];
      };

      $('#celular').mask(maskBehavior, {onKeyPress:
              function(val, e, field, options) {
                  field.mask(maskBehavior(val, e, field, options), options);
              }
      });  

      $('#celular_pessoal').mask(maskBehavior, {onKeyPress:
              function(val, e, field, options) {
                  field.mask(maskBehavior(val, e, field, options), options);
              }
      }); 


      //Mask
       $("#cnpj").mask("99.999.999/9999-99");
       $("#cpf").mask("000.000.000-00");
       
       $("#telefone").mask("(00) 0000-0000");
       $("#cep").mask("00000-000");
       $('#ramal').mask("00000");

       $('#telefone_pessoal').mask("(00) 0000-0000");

       $("#vencimento_cnh").mask("99/99/9999");
       $("#vencimento_mopp").mask("99/99/9999");

       $("#data_nascimento").mask("99/99/9999");

       $("#contratacao").mask("99/99/9999");

       $("#telefoneContato").mask("(00) 0000-0000");
       
       $('#vencimento_gris').mask("99/99/9999");
     


      //Validar Dados Principais
      $('#formDadosPrincipais').validate({

        rules : {
          nome:         { minlength : 3, required : true },
          sobrenome:    { minlength : 3, required : true },
          cargo:        {  required : true },
          departamento: { required : true },
          unidade:      { required : true },
          pais:         { required : true },
          telefone:     { minlength : 14 },
          celular:      { minlength : 14 },
          email:        { email : true},

        },

        messages : {
          nome:
            { minlength: "<b>- Nome</b> mínimo 3 caracteres!", required : "<b>- Nome</b> é obrigatório!" },

          sobrenome: 
            { minlength: "<b>- Sobrenome</b> mínimo de 3 caracteres.", required : "<b>- Sobrenome</b> é obrigatório!" },

          cargo:
            {  required : "<b>- Cargo</b> é obrigatório!" },

          departamento:
            {  required : "<b>- Departamento</b> é obrigatório!" },

          unidade:
            {  required : "<b>- Unidade</b> é obrigatório!" },

          pais:
            {  required : "<b>- País</b> é obrigatório!" },

          telefone: 
            { minlength: "<b>- Telefone</b> inválido!", required : "<b>- Telefone</b> é obrigatório!" },

            celular: 
            { minlength: "<b>- Celular</b> inválido!", required : "<b>- Celular</b> é obrigatório!" },

          email:
            { email: "<b>- E-mail</b> inválido!" },
        },

        submitHandler: function( form ){
            var dados = $('#formDadosPrincipais').serialize();
            $('#loading').removeClass('d-none');

            $.ajax({
              type: "POST",
              url: "../_controler/funcionariosPrincipalSalvaCadastro.php",
              data: dados,
              success: function( data )
              {
                
                // alert(data);
                $('#id_funcionario').val(data);
                liberaBotao()
                $('#loading').addClass('d-none');

                $('#aviso-msg').html('<b>Salvo</b> com sucesso.');
                $('#aviso-msg').addClass('alert-success');

            setTimeout(function() { 
                $('#loading').addClass('d-none');
                $('#aviso').removeClass('d-none');
            }, 200);

            setTimeout(function() { 
                $('#aviso').addClass('d-none');
                $('#aviso-msg').removeClass('alert-success');
            }, 1800);

     
              }
            });

            return false;
        },

        //errorLabelContainer: '#error',
          errorClass: "invalid text-danger",

      }); // fim Validar Dados Principais


      //Validar Dados Pessoais
      $('#formDadosPessoais').validate({

        rules : {
          cpf:              { minlength : 14},
          data_nascimento:  { minlength: 10 },
          telefone_pessoal: { minlength : 14 },
          celular_pessoal:  { minlength : 14 },
          email_pessoal:    { email : true},

        },

        messages : {
          cpf:
            {minlength: "<b>- CPF</b> inválido!"},

          data_nascimento: 
            { minlength: "<b>- Data </b> inválida!" },

          telefone_pessoal:
            {  minlength: "<b>- Telefone</b> inválido!" },

          celular_pessoal:
            {   minlength: "<b>- Celuar</b> inválido!" },

           email_pessoal:
            { email: "<b>- E-mail</b> inválido!" },
        },

        submitHandler: function( form ){
            var dados = $('#formDadosPessoais').serialize();
            $('#loading').removeClass('d-none');

            $.ajax({
              type: "POST",
              url: "../_controler/funcionariosPessoaisSalvaCadastro.php",
              data: dados,
              success: function( data )
              {
                // alert(data);
                // $('#id_funcionario').val(data);
                
                $('#loading').addClass('d-none');

                $('#aviso-msg').html('<b>Salvo</b> com sucesso.');
                $('#aviso-msg').addClass('alert-success');

            setTimeout(function() { 
                $('#loading').addClass('d-none');
                $('#aviso').removeClass('d-none');
            }, 200);

            setTimeout(function() { 
                $('#aviso').addClass('d-none');
                $('#aviso-msg').removeClass('alert-success');
            }, 1800);

     
              }
            });

            return false;
        },

        //errorLabelContainer: '#error',
          errorClass: "invalid text-danger",

      }); // fim Validar Dados Pessoais

      //Validar Dados CNH
      $('#formDadosCNH').validate({

        rules : {
        
          vencimento_cnh:  { minlength : 10 },
          vencimento_mopp:  { minlength : 10 },

        },

        messages : {
          
          vencimento_cnh: 
            { minlength: "<b>- Data </b> inválida!" },
          vencimento_mopp: 
            { minlength: "<b>- Data </b> inválida!" },

        },

        submitHandler: function( form ){
            var dados = $('#formDadosCNH').serialize();
            $('#loading').removeClass('d-none');

            $.ajax({
              type: "POST",
              url: "../_controler/funcionariosCnhSalvaCadastro.php",
              data: dados,
              success: function( data )
              {
                // alert(data);
                // $('#id_funcionario').val(data);
                
                $('#loading').addClass('d-none');

                $('#aviso-msg').html('<b>Salvo</b> com sucesso.');
                $('#aviso-msg').addClass('alert-success');

            setTimeout(function() { 
                $('#loading').addClass('d-none');
                $('#aviso').removeClass('d-none');
            }, 200);

            setTimeout(function() { 
                $('#aviso').addClass('d-none');
                $('#aviso-msg').removeClass('alert-success');
            }, 1800);


     
              }
            });

            return false;
        },

        //errorLabelContainer: '#error',
          errorClass: "invalid text-danger",

      }); // fim Validar Dados Principais


      //Validar Foto Perfil
      $('#formFotoPerfil').validate({

        rules : {
        
          fotoPerfil:  { extension: "jpg", required: true },

        },

        messages : {
          
          fotoPerfil: 
            { extension: "<b>- Arquivo </b> inválido! Use somente arquivo '.jpg'.", required: "Selecione uma foto." },

        },

        submitHandler: function( form ){
          $('#loading').removeClass('d-none');
          var data = new FormData();
          var id_func = $("#id_funcionario").val();
          // var data = $('#formFotoPerfil').serialize();

          data.append('fotoPerfil', $('#fotoPerfil')[0].files[0]);

        $.ajax({
        
          url: '../_controler/funcionariosSalvaFotoPerfil.php?id='+id_func,
          data: data,
          processData: false,
          contentType: false,
          type: 'POST',
          success: function(data){
            
            $('#modalFotoPerfil').modal('hide');
            $('#loading').addClass('d-none');

            $("#foto-perfil").attr('src', 'https://app.agenciawoohoo.com.br/_leadership/_uploads/usuario/perfil/'+id_func+'.jpg?'+Math.random());

          }
        
        });
           
            return false;
        },

        //errorLabelContainer: '#error',
          errorClass: "invalid text-danger",

      }); // fim Validar foto Perfil

      //Validar Foto CNH
      $('#formFotoCnh').validate({

        rules : {
        
          fotoCNH:  { extension: "jpg", required: true },

        },

        messages : {
          
          fotoCNH: 
            { extension: "<b>- Arquivo </b> inválido! Use somente arquivo '.jpg'.", required: "Selecione uma foto." },

        },

        submitHandler: function( form ){
          $('#loading').removeClass('d-none');
          var data = new FormData();
          var id_func = $("#id_funcionario").val();
          // var data = $('#formFotoPerfil').serialize();

          data.append('fotoCNH', $('#fotoCNH')[0].files[0]);

        $.ajax({
        
          url: '../_controler/funcionariosSalvaFotoCNH.php?id='+id_func,
          data: data,
          processData: false,
          contentType: false,
          type: 'POST',
          success: function(data){
            
            $('#loading').addClass('d-none');

            $("#foto-CNH").attr('src', 'https://app.agenciawoohoo.com.br/_leadership/_uploads/cnh/'+id_func+'.jpg?'+Math.random());

          }
        
        });
           
            return false;
        },

        //errorLabelContainer: '#error',
          errorClass: "invalid text-danger",

      }); // fim Validar foto Perfil

      

});//FIM document

// Fecha Loading
function fechaCarregamento(){
  $('#loading').addClass('d-none');
}


//Funções troca de tela
function trocaTela(telaClique){

  var menuAtual = $('#menuAtual').val();
  $('#menuAtual').val(telaClique);

  if(telaClique != menuAtual){
    $('#'+menuAtual).addClass('fadeOut');
    $('#'+telaClique).addClass('fadeIn');

    setTimeout(delayAcao, 800);

  }

  function delayAcao(){
    $('#'+menuAtual).addClass('d-none');
    $('#'+menuAtual).removeClass('fadeOut fadeIn');
    $('#'+telaClique).removeClass('d-none fadeOut');

  }


}

function previewFile() {
  var preview = document.querySelector('#fotoPerfilUpload');
  var file    = document.querySelector('#arquivoTeste').files[0];

  if(file.size > 307200){
    $('#aviso-tamanho').html('Imagem muito pesada, tamanho máximo é de 300KB.');
  }else{
      $('#aviso-tamanho').html(' '); 

      var reader  = new FileReader();

      reader.onloadend = function () {
        preview.src = reader.result;
      }

      if (file) {
        reader.readAsDataURL(file);
      } else {
        preview.src = "../images/avatar.png";
      }
  }


}

function caminhoFile(){
   var src = $('#fotoPerfilUpload').attr("src");

  if(src != "../images/avatar.png"){
    $("#img-perfil").val(src);
    $("#foto-perfil").attr("src", src); 
  }

}

function previewCNH() {
  var preview = document.querySelector('#fotoCNH');
  var file    = document.querySelector('#inputFotoCNH').files[0];

  if(file.size > 2097152){
    $('#aviso-tamanho').html('Imagem muito pesada, tamanho máximo é de 2MB.');
  }else{
      $('#aviso-tamanho-cnh').html(' '); 

      var reader  = new FileReader();

      reader.onloadend = function () {
        preview.src = reader.result;
      }

      if (file) {
        reader.readAsDataURL(file);
      } else {
        preview.src = "../images/cnh.jpg";
      }
  }


}

function caminhoFileCNH(){
   var src = $('#fotoCNH').attr("src");

  if(src != "../images/cnh.jpg"){
    $("#img-cnh").val(src);
    // $("#img-cnh").attr("src", src); 
  }
 
  $('#modalCNH').modal('hide');

}

function abreFotoPerfil(menu){
  $('#modalFotoPerfil').modal('show');

  trocaTela(menu);

}


function abreFotoCNH(menu){
  $('#modalCNH').modal('show');
  trocaTela(menu);

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


//Função tela de Cadastrao Cliente
function liberaBotao(){
  var idCliente = $('#id_funcionario').val();
  if(idCliente != ''){
      $("#btn-cnh").prop( "disabled", false );
      $("#btn-pessoal").prop( "disabled", false );
      $("#btn-FotoCnh").prop( "disabled", false );
      $('#btn-salvaFoto').prop( "disabled", false );
      $('#fotoPerfil').prop( "disabled", false );
      
      
  }
};