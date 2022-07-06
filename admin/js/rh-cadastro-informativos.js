$(document).ready(function(){

  $("#data").mask("99/99/9999");
  $("#hora").mask("99:99");

  //Editor 
  tinymce.init({
      selector: '#editor',
      language: 'pt_BR',
      //automatic_uploads: true,
      //language: 'en',
      height: 500,
      menubar: false,
      convert_urls: false,
      theme: 'modern',
      plugins: [
              "advlist autolink link image lists charmap print preview hr anchor pagebreak spellchecker",
              "searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking",
              "save table contextmenu directionality emoticons template paste textcolor media"
          ],
          toolbar: "styleselect | fontsizeselect | forecolor | backcolor | pastetext | removeformat |  bold | italic | underline | strikethrough | bullist | numlist  | image code | alignleft | aligncenter | alignright |  link | unlink | upinsideimage | media |  outdent | indent | preview | code | fullscreen",
          fontsize_formats: '8pt 10pt 12pt 14pt 18pt 24pt 36pt',
      
      // without images_upload_url set, Upload tab won't show up
      images_upload_url: '../_model/upload-tinymce.php',
      
      // override default upload handler to simulate successful upload
      images_upload_handler: function (blobInfo, success, failure) {
          var xhr, formData;
        
          xhr = new XMLHttpRequest();
          xhr.withCredentials = false;
          xhr.open('POST', '../_model/upload-tinymce.php');
        
          xhr.onload = function() {
              var json;

              if (xhr.status != 200 ) {
                  failure('Arquivo inválido verifique se o nome contém caracteres especiais como acento e símbolos ou se a extensão é JPG, GIF ou PNG.');
                  return;
              }
          
              json = JSON.parse(xhr.responseText);
          
              if (!json || typeof json.location != 'string') {
                  failure('Invalid JSON: ' + xhr.responseText);
                  return;
              }
          
              success(json.location);
          };
        
          formData = new FormData();
          formData.append('file', blobInfo.blob(), blobInfo.filename());
        
          xhr.send(formData);
      },
  }); // fim editor
      

    // $("#data").mask("99/99/9999");
    // $("#hora").mask("99:99");

    //Validar Dados Principais
      $('#formCliente').validate({
 
    rules : {
      titulo          : { required : true },
      conteudo        : { required : true },
      'unidade[]'     : { required : true },
      'departamento[]': { required : true },
      data            : { minlength: 10, required : true },
      hora            : { minlength: 5, required : true },
    },

    messages : {

    titulo: { required : "<b>- Título</b> é obrigatório!" },
    conteudo: { required : "<b>- Conteúdo</b> é obrigatório!" },
    
  'unidade[]': { required : "<b>- Unidade</b> é obrigatório!" },
  
  'departamento[]': { required : "<b>- Departamento</b> é obrigatório!" },

  data: { minlength: "<b>- Data</b> inválida!", required : "<b>- Data</b> é obrigatório!" },

  hora: { minlength: "<b>- Hora</b> inválida!", required : "<b>- Hora</b> é obrigatório!" },
        
    },

        submitHandler: function( form ){
            var dados = $('#formCliente').serialize();
            $('#loading').removeClass('d-none');

            $.ajax({
              type: "POST",
            url: "../_controler/rhSalvaCadastroInformativo.php",
              data: dados,
              success: function( data )
              {
      
      $("html, body").animate({ scrollTop: 0 }, "slow");

      $('#loading').addClass('d-none');

      $('#id_user').val(data);

      $('#aviso-msg').html('<b>Perfil</b> salvo com sucesso.');
      
      $('#aviso-msg').addClass('alert-success');

      $('#aviso-msg').removeClass('d-none');

      setTimeout(function() { 
                  $('#aviso-msg').addClass('d-none');
                }, 1800);

     
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

