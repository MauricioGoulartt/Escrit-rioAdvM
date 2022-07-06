
  tinymce.init({
    selector: '#editor',
    language: 'pt_BR',
     menubar: false,
    theme: 'modern',
    
    height: 300,
    entity_encoding: "raw",
        theme_advanced_resizing: true,
        plugins: [
            "advlist autolink link image lists charmap print preview hr anchor pagebreak spellchecker",
            "searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking",
            "save table contextmenu directionality emoticons template paste textcolor media"
        ],
        toolbar: "styleselect | forecolor | backcolor | pastetext | removeformat |  bold | italic | underline | strikethrough | bullist | numlist  | image code | alignleft | aligncenter | alignright |  link | unlink | upinsideimage | media |  outdent | indent | preview | code | fullscreen",


        images_upload_url: 'modulos/salva-foto.php',
        images_upload_handler: function(blobInfo, success, failure){
            var xhr, formData;

            xhr = new XMLHttpRequest();
            xhr.withCredentials = false;
            xhr.open('POST', 'modulos/salva-foto.php');

            xhr.onload = function(){
                var json;

                if (xhr.status == 400) {
                    failur('Nome ou extensão inválidos');
                    return;
                }


                
                json = JSON.parse(xhr.responseText);

                if(!json || type.location != 'string'){
                    failure('Invalid JSON: ' + xhr.responseText);
                    return;
                }

                success(json.location);
            };

            formData = new formData();
            formData.append('file', blobInfo.blod(), blobInfo.filename());

            xhr.send(formData);
        }
  }); */