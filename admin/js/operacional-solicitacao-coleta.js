$(document).ready(function(){ 

    $("#PesquisaCliente").keyup(function(){
      var caracteres = $("#PesquisaCliente").val().length;
      if(caracteres > 2){
          pesquisaClientes();
      }
    });

    $(".peso").mask("#.##0,00", {reverse: true});
    $(".cubagem").mask("#.##0,00", {reverse: true});
    $(".cm").mask("#.##0,00", {reverse: true});
    $(".volumes").mask("#0", {reverse: true});
    $(".valor").mask("#.##0,00", {reverse: true});

    
    $('#faturar').change(function(){
      if( $(this).val() == 0 )
        $('#cobranca').prop('disabled', false);
      else
        $('#cobranca').prop('disabled', true);
    });

    if( $('#faturar').val() == 0 ){
        $('#cobranca').prop('disabled', false);
    }else{
        $('#cobranca').prop('disabled', true);
    }


    $("#data").mask("99/99/9999");
    $("#hora").mask("99:99");
    $('#coleta-cep').mask("99999-999");
    $('#entrega-cep').mask("99999-999");


    liberarBtnSalva();

    //Validar Dados Principais
      $('#formRota').validate({

        rules : {
          data:       { minlength: 10, required : true },
          hora:       { minlength: 5, required : true },
          km_inicial:  { required : true },
        },

        messages : {
          data:
            { minlength: "<b>- Data</b> inválida!", required : "<b>- Data</b> é obrigatório!" },
          hora:
            { minlength: "<b>- Hora</b> inválida!", required : "<b>- Hora</b> é obrigatório!" },

          km_inicial:
            { minlength: "<b>- Hora</b> inválida!", required : "<b>- KM</b> é obrigatório!", min: "KM menor que anterior." },
        },

        submitHandler: function( form ){
            var dados = $('#formRota').serialize();
            $('#loading').removeClass('d-none');

            $.ajax({
              type: "POST",
              url: "../_controler/veiculosSalvaRota.php",
              data: dados,
              success: function( data )
              {
                $("html, body").animate({ scrollTop: 0 }, "slow");

                $('#loading').addClass('d-none');

                $(".form-control").prop( "disabled", true );
                $("#btnSalva").prop( "disabled", true );

                $('#aviso-msg').html('<b>Rota</b> criada com sucesso.');
                
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

function abreModalOrigem(){
    $('#modalOrigem').modal('show');
    
    setTimeout(function() { 
                $('#buscaOrigem').focus();

            }, 500);
}

function abreModalDestino(){
    $('#modalDestino').modal('show');
    
    setTimeout(function() { 
                $('#buscaDestino').focus();

            }, 500);
}

function linhaOrigem(id_linha){
  
  var selecaoOrigem = $('#linha-'+id_linha).html();

  $('#origemView').html(selecaoOrigem);
   $('#origem').val(selecaoOrigem);

   liberarBtnSalva();

  $('#modalOrigem').modal('hide');
  // alert(selecaoOrigem);
  // origemView
}

function linhaDestino(id_linha){
  
  var selecaoDestino = $('#linhaD-'+id_linha).html();

  $('#destinoView').html(selecaoDestino);
  $('#destino').val(selecaoDestino);

  liberarBtnSalva();

  $('#modalDestino').modal('hide');
  // alert(selecaoOrigem);
  // origemView
}

function buscarOrigem(){

    var var_origem = $("#buscaOrigem").val();

    var ajax = new XMLHttpRequest();

  ajax.open("GET", "../_controler/veiculosSaidasOrigem.php?W="+var_origem, true);

  ajax.send();
  ajax.onreadystatechange = function() {

    if (ajax.readyState == 4 && ajax.status == 200) {
      var data = ajax.responseText;
      
      console.log(data);

      $( "#tableOrigem" ).html(data);
      
    }
  }
} // FIM AJAX


function buscarDestino(){

    var var_origem = $("#buscaDestino").val();

    var ajax = new XMLHttpRequest();

  ajax.open("GET", "../_controler/veiculosSaidasDestino.php?W="+var_origem, true);

  ajax.send();
  ajax.onreadystatechange = function() {

    if (ajax.readyState == 4 && ajax.status == 200) {
      var data = ajax.responseText;
      
      console.log(data);

      $( "#tableDestino" ).html(data);
      
    }
  }
} // FIM AJAX

    $("#buscaOrigem").keyup(function(){
      buscarOrigem();
    });

    $("#buscaDestino").keyup(function(){
      buscarDestino();
    });


function liberarBtnSalva(){

  var var_destino = $("#destino").val();
  var var_origem = $("#origem").val();

  if((var_origem !== "") && (var_destino !== "")){
    $("#btnSalva").prop( "disabled", false );
  }
}

function inverterEndereco(){
  
  var cLocal          =   $('#coleta-local').val();
  var cCep            =   $('#coleta-cep').val();
  var cEndereco       =   $('#coleta-endereco').val();
  var cNumero         =   $('#coleta-numero').val();
  var cComplemento    =   $('#coleta-complemento').val();
  var cBairro         =   $('#coleta-bairro').val();
  var cNumero         =   $('#coleta-numero').val();
  var cCidade         =   $('#coleta-cidade').val();
  var cUF             =   $('#coleta-uf').val();
  var cCep            =   $('#coleta-cep').val();
  var cObservacao     =   $('#coleta-observacao').val();

  var eLocal          =   $('#entrega-local').val();
  var eCep            =   $('#entrega-cep').val();
  var eEndereco       =   $('#entrega-endereco').val();
  var eNumero         =   $('#entrega-numero').val();
  var eComplemento    =   $('#entrega-complemento').val();
  var eBairro         =   $('#entrega-bairro').val();
  var eNumero         =   $('#entrega-numero').val();
  var eCidade         =   $('#entrega-cidade').val();
  var eUF             =   $('#entrega-uf').val();
  var eCep            =   $('#entrega-cep').val();
  var eObservacao     =   $('#entrega-observacao').val();

  $('#coleta-local').val(eLocal);
  $('#coleta-cep').val(eCep);
  $('#coleta-endereco').val(eEndereco);
  $('#coleta-numero').val(eNumero);
  $('#coleta-complemento').val(eComplemento);
  $('#coleta-bairro').val(eBairro);
  $('#coleta-cidade').val(eCidade);
  $('#coleta-uf').val(eUF);
  $('#coleta-observacao').val(eObservacao);

  $('#entrega-local').val(cLocal);
  $('#entrega-cep').val(cCep);
  $('#entrega-endereco').val(cEndereco);
  $('#entrega-numero').val(cNumero);
  $('#entrega-complemento').val(cComplemento);
  $('#entrega-bairro').val(cBairro);
  $('#entrega-cidade').val(cCidade);
  $('#entrega-uf').val(cUF);
  $('#entrega-observacao').val(cObservacao);


}

function pesquisaClientes(){
  var var_origem = $("#PesquisaCliente").val();

  var ajax = new XMLHttpRequest();

  ajax.open("GET", "../_controler/operacionalSolicitacaoColetaCliente?W="+var_origem, true);

  ajax.send();
  ajax.onreadystatechange = function() {

    if (ajax.readyState == 4 && ajax.status == 200) {
      var data = ajax.responseText;
      
      console.log(data);

      $( "#tableCliente" ).html(data);
      
    }
  }
}

function clienteSelecao(idLinha, IdCliente){

  var selNomeFantasia     = $('#lNomeFantasia-'+idLinha).html();
  var selCnpj             = $('#lCnpj-'+idLinha).html(); 
  var selRazaoSocial      = $('#lRazaoSocial-'+idLinha).html(); 
  var selEndereco         = $('#lEndereco-'+idLinha).html();
  var selNumero           = $('#lNumero-'+idLinha).html();
  var selComplemento      = $('#lComplemento-'+idLinha).html();
  var selBairro           = $('#lBairro-'+idLinha).html();
  var selCidade           = $('#lCidade-'+idLinha).html();
  var selUf               = $('#lUf-'+idLinha).html();
  var selCep              = $('#lCep-'+idLinha).html();

  // alert(selNomeFantasia);
  $('#id-cliente').val(IdCliente);
  $('#nome-fantasia').val(selNomeFantasia);
  $('#p-nome-fantasia').html(selNomeFantasia);

  $('#razao-social').val(selRazaoSocial);
  $('#p-razao-social').html(selRazaoSocial);

  $('#cnpj').val(selCnpj);
  $('#p-cnpj').html(selCnpj);

  $('#coleta-local').val(selNomeFantasia);
  $('#coleta-cep').val(selCep);
  $('#coleta-endereco').val(selEndereco);
  $('#coleta-numero').val(selNumero);
  $('#coleta-complemento').val(selComplemento);
  $('#coleta-bairro').val(selBairro);
  $('#coleta-cidade').val(selCidade);
  $('#coleta-uf').val(selUf);

  $('#pesquisa-cliente').modal('hide');

}

function abrePesquisaCliente(){
  $('#pesquisa-cliente').modal('show');
      setTimeout(function() { 
               $('#PesquisaCliente').focus();

            }, 500);
}

function buscaCepOrigem(){
  var CEP = $('#coleta-cep').val();
  var testeCep = $('#coleta-cep').val().length;

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

        $('#coleta-endereco').val(dados.logradouro);
        $('#coleta-bairro').val(dados.bairro);
        $('#coleta-cidade').val(dados.localidade);
        $('#coleta-uf').val(dados.uf);

        $("#coleta-numero").focus();
        $('#loading').addClass("d-none");

 
  
      }
    }
  }
}


function buscaCepDestino(){
  var CEP = $('#entrega-cep').val();
  var testeCep = $('#entrega-cep').val().length;

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

        $('#entrega-endereco').val(dados.logradouro);
        $('#entrega-bairro').val(dados.bairro);
        $('#entrega-cidade').val(dados.localidade);
        $('#entrega-uf').val(dados.uf);

        $("#entrega-numero").focus();
        $('#loading').addClass("d-none");

 
  
      }
    }
  }
}

function RemoveTableRow(item) {

  var tr = $(item).closest('tr');
  tr.fadeOut(400, function() {
    tr.remove();        
  }); 

  return false;   

};


function AddTableRow() { 

  var iLinha = $("#linhaVolumes").html();
  iLinha++;
  var newRow = $("<tr>");
  var cols = "";

cols += '<td><input class="form-control text-center" id="nota-fiscal-'+iLinha+'" name="nota-fiscal['+iLinha+']" type="text"></td>';

cols += '<td><input class="form-control text-center valor" id="valor-'+iLinha+'" name="valor['+iLinha+']" type="text"></td>';

cols += '<td><input class="form-control text-center volumes" id="volumes-'+iLinha+'" name="volumes['+iLinha+']" type="text" onblur="calculoCubagem('+iLinha+');"></td>';

cols += '<td><input class="form-control text-center peso" id="peso-'+iLinha+'" name="peso['+iLinha+']" type="text"></td>';

cols += '<td><input class="form-control text-center cm" id="altura-'+iLinha+'" name="altura['+iLinha+']" type="text" onblur="calculoCubagem('+iLinha+');"></td>';

cols += '<td><input class="form-control text-center cm" id="largura-'+iLinha+'" name="largura['+iLinha+']" type="text" onblur="calculoCubagem('+iLinha+');"></td>';

cols += '<td><input class="form-control text-center cm" id="comprimento-'+iLinha+'" name="comprimento['+iLinha+']" type="text" onblur="calculoCubagem('+iLinha+');"></td>';

cols += '<td><input class="form-control text-center cubagem" id="aereo-'+iLinha+'" name="aereo['+iLinha+']" type="text"></td>';

cols += '<td><input class="form-control text-center cubagem" id="rodoviario-'+iLinha+'" name="rodoviario['+iLinha+']" type="text"></td>';

cols += '<td><button type="button" class="btn btn-danger" onclick="RemoveTableRow(this);">Remover</button></td>';

  newRow.append(cols);

  $("#products-table").append(newRow);

  $(".peso").mask("#.##0,00", {reverse: true});
    $(".cubagem").mask("#0,00", {reverse: true});
    $(".cm").mask("#.##0,00", {reverse: true});
    $(".volumes").mask("#0", {reverse: true});
    $(".valor").mask("#.###0,00", {reverse: true});
  
  $("#linhaVolumes").html(iLinha);

  return false;   

//Cálculo de Cubagem
}

function calculoCubagem(iLinha){
  // alert(1);input[value='Hot Fuzz']
  var volumes = $("#volumes-"+iLinha).val().replace(",", ".");
  var altura = $("#altura-"+iLinha).val().replace(",", ".");
  var largura = $("#largura-"+iLinha).val().replace(",", ".");
  var comprimento = $("#comprimento-"+iLinha).val().replace(",", ".");

// if(volumes != "" & altura != "" & largura != "" & comprimento != ""){
    var aereo = volumes * altura * largura * comprimento * 167;
    var rodo = volumes * altura * largura * comprimento * 300;  

    aereo = aereo.toFixed(2).replace(".", ",");
    rodo  = rodo.toFixed(2).replace(".", ",");
    // aereo = parseInt(aereo);
    // aereo = aereo.mask("#.##0,00", {reverse: true});

    $("#aereo-"+iLinha).val(aereo);
    $("#rodoviario-"+iLinha).val(rodo);

    $(".cubagem").mask("#0,00", {reverse: true});

  // }
  
}


