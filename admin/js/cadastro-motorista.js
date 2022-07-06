
      function previewFile() {
          var preview = document.querySelector('img');
          var file    = document.querySelector('#arquivoTeste').files[0];
          // var file    = $('#arquivoTeste').files[0];
          
          var reader  = new FileReader();

          reader.onloadend = function () {
            preview.src = reader.result;
          }

          if (file) {
            reader.readAsDataURL(file);
          } else {
            preview.src = "";
          }

          setTimeout(function() { 
                 caminhoFile();
            }, 2);
        

        }

// pega caminho file
function caminhoFile(){
  var src = $('#teste-image').attr("src");
  $("#img-perfil").val(src);

}