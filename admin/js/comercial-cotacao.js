$(document).ready(function(){ 
 
    $("#PesquisaCliente").keyup(function(){
      var caracteres = $("#PesquisaCliente").val().length;
      if(caracteres > 2){
          pesquisaClientes();
      }
    });

    //pesquisa origem
    $("#buscaLocalOrigem").keyup(function(){
         var caracteres = $("#buscaLocalOrigem").val().length;
      if(caracteres > 2){
          pesquisaOrigem();
      }
    });

      //pesquisa destino
    $("#buscaLocalDestino").keyup(function(){
         var caracteres = $("#buscaLocalDestino").val().length;
      if(caracteres > 2){
          pesquisaDestino();
      }
    });


    $(".peso").mask("#.##0,00", {reverse: true});
    $(".cubagem").mask("#.##0,00", {reverse: true});
    $(".cm").mask("#.##0,00", {reverse: true});
    $(".volumes").mask("#0", {reverse: true});
    $(".valor").mask("#.##0,00", {reverse: true});
    $(".inteiro").mask("#0", {reverse: true});
    $('.uf').mask('SS');

    $("#entrega_uf").keyup(function(){
      $(this).val($(this).val().toUpperCase());
    });

    $("#coleta_uf").keyup(function(){
      $(this).val($(this).val().toUpperCase());
    });
    
    
    $('#faturar').change(function(){
      if( $(this).val() == 0 )
        $('#cobranca').prop('disabled', false);
      else
        $('#cobranca').prop('disabled', true);
    });

    $('#pedagioIda').change(function(){
      alterouCusto();
    });

    $('#pedagioVolta').change(function(){
      alterouCusto();
    });

    $('#valor_notas').change(function(){
      alterouCusto();
    });

    $('#Ajudante').change(function(){
      alterouCusto();
    });

    $('#Pernoite').change(function(){
      alterouCusto();
    });

    $('#AgenteOrigem').change(function(){
      alterouCusto();
    });

    $('#Transferencia').change(function(){
      alterouCusto();
    });

    $('#AgenteDestino').change(function(){
      alterouCusto();
    });

    $('#horaExtra').change(function(){
      alterouCusto();
    });

    $('#outrasDespesas').change(function(){
      alterouCusto();
    });

    $('#rntc').change(function(){
      alterouCusto();
    });

    $('#taxaBoleto').change(function(){
      alterouCusto();
    });

    $('#possui_ie').change(function(){
      alterouCusto();
    });

    $('#veiculo').change(function(){
      if( $(this).val() != 0 ){
        // $('#valorCombustivel').prop('disabled', false);
        // $('#custoCombustivel').prop('disabled', false);
        var veiculo = $(this).val();
        var detalhes = veiculo.split("|");

        var kmIda = Number($('#kmIda').val());
        var kmVolta = Number($('#kmVolta').val());

        var combustivel = $("#"+detalhes[2]).val();
        var km_litro = detalhes[1];
        var custoCombustivel = (kmIda + kmVolta);

      
        custoCombustivel = custoCombustivel / km_litro;
        custoCombustivel = custoCombustivel * combustivel;
        custoCombustivel = custoCombustivel * 1.05;


        custoCombustivel = custoCombustivel.toFixed(2);

        $('#valorCombustivel').val(combustivel);
        $('#custoCombustivel').val(custoCombustivel);

        $('#p_valorCombustivel').html(combustivel.replace('.',','));
        $('#p_custoCombustivel').html(custoCombustivel.replace('.',','));

      }else{
        // $('#valorCombustivel').prop('disabled', true);
        // $('#custoCombustivel').prop('disabled', true);
        $('#p_valorCombustivel').html('&nbsp');
        $('#p_custoCombustivel').html('&nbsp');
        $('#valorCombustivel').val('');
        $('#custoCombustivel').val('');
      }

      alterouCusto();
    });




    $('.rota').change(function(){
      verificaPesquisa();
    });

    if( $('#faturar').val() == 0 ){
        $('#cobranca').prop('disabled', false);
    }else{
        $('#cobranca').prop('disabled', true);
    }


    $("#data").mask("99/99/9999");
    $("#hora").mask("99:99");
    $('#coleta_cep').mask("99999-999");
    $('#entrega_cep').mask("99999-999");


});
    

     function fechaCarregamento(){
       $('#loading').addClass('d-none');
    }

    function validaForm(){

      $('#validate').val(1);
      var form = $('#formCotacao');

          form.validate({

      rules : {
        data:             { minlength: 10, required : true },
        hora:             { minlength: 5, required : true },
        coleta_local:     { minlength: 3, required: true },
        coleta_cep:       { minlength : 8, required: true },
        coleta_endereco:  { minlength: 3, required: true },
        coleta_numero:    { required: true },
        coleta_bairro:    { minlength: 3, required: true },
        coleta_cidade:    { minlength: 3, required: true },
        coleta_uf:        { minlength: 2, required: true },

        entrega_local:     { minlength: 3, required: true },
        entrega_cep:       { minlength : 8, required: true },
        entrega_endereco:  { minlength: 3, required: true },
        entrega_numero:    { required: true },
        entrega_bairro:    { minlength: 3, required: true },
        entrega_cidade:    { minlength: 3, required: true },
        entrega_uf:        { minlength: 2, required: true },

        kmIda:             { minlength: 4, required: true },
        kmVolta:           { minlength: 4, required: true },
        pedagioIda:        { minlength: 4, required: true },
        pedagioVolta:      { minlength: 4, required: true },
        valor_notas:       { minlength: 4, required: true },
        total_volumes:     { required: true },

        //segunda tela
        valorCombustivel:  { minlength: 4 },
        custoAjudante:     { minlength: 4 },

        Ajudante:          { minlength: 4 },
        Pernoite:          { minlength: 4 },
        AgenteOrigem:      { minlength: 4 },
        Transferencia:     { minlength: 4 },

        AgenteDestino:     { minlength: 4 },
        horaExtra:         { minlength: 4 },
        outrasDespesas:    { minlength: 4 },
        rntc:              { minlength: 4 },

        rndc:              { minlength: 4 },
        taxaBoleto:        { minlength: 4 },

        //terceira tela
        'valor[]':         { minlength: 4 },
        'peso[]':          { minlength: 4 },
        'comprimento[]':   { minlength: 4 },
        'largura[]':       { minlength: 4 },
        'altura[]':        { minlength: 4 },
        'rodoviario[]':    { minlength: 4 },
        'aereo[]':         { minlength: 4 },
        valor_frete:       {required: true, minlength: 4}

        }, //rules

        messages : {
          data:
            { minlength: "<b>- Data</b> inválida!", required : "<b>- Data</b> é obrigatório!" },
          hora:
            { minlength: "<b>- Hora</b> inválida!", required : "<b>- Hora</b> é obrigatório!" },

          coleta_local:
            { minlength: "<b>- Local</b> inválido!", required : "<b>- Local</b> é obrigatório!"},
          coleta_cep:
            { minlength: "<b>- CEP</b> inválido!", required : "<b>- CEP</b> é obrigatório!"},
          coleta_endereco: 
            { minlength: "<b>- Endereço</b> inválido!", required : "<b>- Endereço</b> é obrigatório!"},
          coleta_numero: 
            { required : "<b>- Número</b> é obrigatório!"},
          coleta_bairro: 
            { minlength: "<b>- Bairro</b> inválido!", required : "<b>- Bairro</b> é obrigatório!"},
          coleta_cidade: 
            { minlength: "<b>- Cidade</b> inválido!", required : "<b>- Cidade</b> é obrigatório!"},
          coleta_bairro: 
            { minlength: "<b>- UF</b> inválido!", required : "<b>- UF</b> é obrigatório!"},

          entrega_local:
            { minlength: "<b>- Local</b> inválido!", required : "<b>- Local</b> é obrigatório!"},
          entrega_cep:
            { minlength: "<b>- CEP</b> inválido!", required : "<b>- CEP</b> é obrigatório!"},
          entrega_endereco: 
            { minlength: "<b>- Endereço</b> inválido!", required : "<b>- Endereço</b> é obrigatório!"},
          entrega_numero: 
            { required : "<b>- Número</b> é obrigatório!"},
          entrega_bairro: 
            { minlength: "<b>- Bairro</b> inválido!", required : "<b>- Bairro</b> é obrigatório!"},
          entrega_cidade: 
            { minlength: "<b>- Cidade</b> inválido!", required : "<b>- Cidade</b> é obrigatório!"},
          entrega_bairro: 
            { minlength: "<b>- UF</b> inválido!", required : "<b>- UF</b> é obrigatório!"},

          kmIda: 
            { minlength: "<b>- KM</b> inválido!", required : "<b>- KM</b> é obrigatório!"},
          kmVolta:
            { minlength: "<b>- KM</b> inválido!", required : "<b>- KM</b> é obrigatório!"},
          pedagioIda:
            { minlength: "<b>- Pedágio</b> inválido!", required : "<b>- Pedágio</b> é obrigatório!"},
          pedagioVolta:
            { minlength: "<b>- Pedágio</b> inválido!", required : "<b>- Pedágio</b> é obrigatório!"},
          valor_notas:
            { minlength: "<b>- Valor</b> inválido!", required : "<b>- Valor</b> é obrigatório!"},
          total_volumes:
            { required : "<b>- Volumes</b> é obrigatório!"},

          'valor[]':  
            { minlength: "Inválido!" },
          'peso[]':          
            { minlength: "Inválido!" },
          'comprimento[]':   
            { minlength: "Inválido!" },
          'largura[]':       
            {  minlength: "Inválido!" },
          'altura[]':        
            {  minlength: "Inválido!" },
          'rodoviario[]':   
            { minlength: "Inválido!" },
          'aereo[]':         
            {  minlength: "Inválido!"  },
          valor_frete:       
            {minlength: "<b>- Valor</b> inválido!", required : "<b>- Valor</b> é obrigatório!"}

        }, // messages

        submitHandler: function( form ){
            var dados = $('#formCotacao').serialize();
            $('#loading').removeClass('d-none');

            $.ajax({
              type: "POST",
              url: "../_controler/cotacaoSalvaRodo.php",
              data: dados,
              success: function( data )
              {
                $("html, body").animate({ scrollTop: 0 }, "slow");

                $('#loading').addClass('d-none');

              
                $('#id_solicitacao').val(data);

                $('#aviso-msg').html('<b>Cotação</b> salva com sucesso.');
                
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
    
      if (form.valid() == true){
        return true;
      }else{
        return false;
      }

    }

      
    function telaCadastro(telaClique){ 
      if (validaForm() == true){
          var menuAtual = $('#menuAtual').val();
          $('#menuAtual').val(telaClique);

          if(telaClique != menuAtual){
            $('#'+menuAtual).addClass('fadeOut');
            $('#'+telaClique).addClass('fadeIn');

            setTimeout(delayAcao, 800);
            
            $('#validate').val(0);
          }

          function delayAcao(){
            $('#'+menuAtual).addClass('d-none');
            $('#'+menuAtual).removeClass('fadeOut fadeIn');
            $('#'+telaClique).removeClass('d-none fadeOut');

          }
      }//if 

      //calculo de frete
      var calc = $('#caluloCusto').val();

         if(telaClique == "dadosCarga" && calc == 0){
            var dados = $('#formCotacao').serialize();
            $('#loading').removeClass('d-none');

            $.ajax({
              type: "POST",
              url: "../_controler/comercialCotacaoCalculo.php",
              data: dados,
              success: function( data )
              {
                var resposta = JSON.parse(data);
                
                var advalorem = resposta['advalorem'];
                var gris = resposta['gris'];
                var custoTotal = resposta['custoTotal'];
                var freteSugerido = resposta['freteSugerido'];
                var icms = resposta['icms'];

                var p_advalorem = resposta['p_advalorem'];
                var p_gris = resposta['p_gris'];
                var p_custoTotal = resposta['p_custoTotal'];
                var p_freteSugerido = resposta['p_freteSugerido'];
                var p_icms = resposta['p_icms'];


      $('#p_advalorem').html(p_advalorem);
      $('#advalorem').val(advalorem);

      $('#p_gris').html(p_gris);
      $('#gris').val(gris);

      $('#p_custo_total').html(p_custoTotal);
      $('#custo_total').val(custoTotal);

      $('#p_icms').html(p_icms);
      $('#icms').val(icms);

      $('#p_frete_sugerido').html(p_freteSugerido);
      $('#frete_sugerido').val(freteSugerido);

                // alert(resposta['advalorem']);
                
                $('#loading').addClass('d-none');

                $('#caluloCusto').val(1);
              }
            });
         }
      //fim calculo de frete

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

cols += '<td><input class="form-control text-center nota-fiscal" id="nota-fiscal-'+iLinha+'" name="nota-fiscal[]" type="text" onblur="calculoTabela()"></td>';

cols += '<td><input class="form-control text-center valor valorNF" id="valor-'+iLinha+'" name="valor[]" type="text" onblur="calculoTabela()"></td>';

cols += '<td><input class="form-control text-center volumes" id="volumes-'+iLinha+'" name="volumes[]" type="text" onblur="calculoCubagem('+iLinha+');"></td>';

cols += '<td><input class="form-control text-center peso" id="peso-'+iLinha+'" name="peso[]" type="text" onblur="calculoTabela()"></td>';

cols += '<td><input class="form-control text-center cm" id="comprimento-'+iLinha+'" name="comprimento[]" type="text" onblur="calculoCubagem('+iLinha+');"></td>';

cols += '<td><input class="form-control text-center cm" id="largura-'+iLinha+'" name="largura[]" type="text" onblur="calculoCubagem('+iLinha+');"></td>';



cols += '<td><input class="form-control text-center cm" id="altura-'+iLinha+'" name="altura[]" type="text" onblur="calculoCubagem('+iLinha+');"></td>';

cols += '<td><input class="form-control text-center cubagem cubagem-aereo" id="aereo-'+iLinha+'" name="aereo[]" type="text"></td>';

cols += '<td><input class="form-control text-center cubagem cubagem-rodo" id="rodoviario-'+iLinha+'" name="rodoviario[]" type="text"></td>';

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


function abrePesquisaCliente(){
  $('#pesquisa-cliente').modal('show');
      setTimeout(function() { 
               $('#PesquisaCliente').focus();

            }, 500);
}

//abre origem
function abrePesquisaLocalOrigem(){
  $('#modalOrigem').modal('show');
      setTimeout(function() { 
               $('#buscaLocalOrigem').focus();

            }, 500);
}

//abre destino
function abrePesquisaLocalDestino(){
  $('#modalDestino').modal('show');
      setTimeout(function() { 
               $('#buscaLocalDestino').focus();

            }, 500);
}

// pesquisa cliente
function pesquisaClientes(){
  var var_origem = $("#PesquisaCliente").val();

  var ajax = new XMLHttpRequest();

  ajax.open("GET", "../_controler/operacionalSolicitacaoColetaCliente.php?W="+var_origem, true);

  ajax.send();
  ajax.onreadystatechange = function() {

    if (ajax.readyState == 4 && ajax.status == 200) {
      var data = ajax.responseText;
      
      console.log(data);

      $( "#tableCliente" ).html(data);
      
    }
  }
}


// pesquisa origem

function pesquisaOrigem(){

  // alert(2);

  var var_origem = $("#buscaLocalOrigem").val();

  var ajax = new XMLHttpRequest();

  ajax.open("GET", "../_controler/comercialPesquisaLocalOrigem.php?W="+var_origem, true);

  ajax.send();
  ajax.onreadystatechange = function() {

    if (ajax.readyState == 4 && ajax.status == 200) {
      var data = ajax.responseText;
      
      console.log(data);

      $( "#tableOrigem" ).html(data);
      
    }
  }
}

function pesquisaDestino(){

  // alert(2);

  var var_origem = $("#buscaLocalDestino").val();

  var ajax = new XMLHttpRequest();

  ajax.open("GET", "../_controler/comercialPesquisaLocalDestino.php?W="+var_origem, true);

  ajax.send();
  ajax.onreadystatechange = function() {

    if (ajax.readyState == 4 && ajax.status == 200) {
      var data = ajax.responseText;
      
      console.log(data);

      $( "#tableDestino" ).html(data);
      
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
  $('#id_cliente').val(IdCliente);
  $('#nome_fantasia').val(selNomeFantasia);
  $('#p_nome_fantasia').html(selNomeFantasia);

  $('#razao_social').val(selRazaoSocial);
  $('#p_razao_social').html(selRazaoSocial);

  $('#cnpj').val(selCnpj);
  $('#p_cnpj').html(selCnpj);

  $('#coleta_local').val(selNomeFantasia);
  $('#coleta_cep').val(selCep);
  $('#coleta_endereco').val(selEndereco);
  $('#coleta_numero').val(selNumero);
  $('#coleta_complemento').val(selComplemento);
  $('#coleta_bairro').val(selBairro);
  $('#coleta_cidade').val(selCidade);
  $('#coleta_uf').val(selUf);

  $('#pesquisa-cliente').modal('hide');

        setTimeout(function() { 
          if($('#validate').val() == 1){
            validaForm(); 
          }
         }, 500);
 
  verificaPesquisa();

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
  $('#id_cliente').val(IdCliente);
  $('#nome_fantasia').val(selNomeFantasia);
  $('#p_nome_fantasia').html(selNomeFantasia);

  $('#razao_social').val(selRazaoSocial);
  $('#p_razao_social').html(selRazaoSocial);

  $('#cnpj').val(selCnpj);
  $('#p_cnpj').html(selCnpj);

  $('#coleta_local').val(selNomeFantasia);
  $('#coleta_cep').val(selCep);
  $('#coleta_endereco').val(selEndereco);
  $('#coleta_numero').val(selNumero);
  $('#coleta_complemento').val(selComplemento);
  $('#coleta_bairro').val(selBairro);
  $('#coleta_cidade').val(selCidade);
  $('#coleta_uf').val(selUf);

  $('#pesquisa-cliente').modal('hide');

        setTimeout(function() { 
          if($('#validate').val() == 1){
            validaForm(); 
          }
         }, 500);



}

//Local Origem
function localSelecaoOrigem(idLinha, IdCliente){

  var selNomeFantasia     = $('#loNomeFantasia-'+idLinha).html();
  var selCnpj             = $('#loCnpj-'+idLinha).html(); 
  var selRazaoSocial      = $('#loRazaoSocial-'+idLinha).html(); 
  var selEndereco         = $('#loEndereco-'+idLinha).html();
  var selNumero           = $('#loNumero-'+idLinha).html();
  var selComplemento      = $('#loComplemento-'+idLinha).html();
  var selBairro           = $('#loBairro-'+idLinha).html();
  var selCidade           = $('#loCidade-'+idLinha).html();
  var selUf               = $('#loUf-'+idLinha).html();
  var selCep              = $('#loCep-'+idLinha).html();

  // alert(selNomeFantasia);
  // $('#id_cliente').val(IdCliente);
  // $('#nome_fantasia').val(selNomeFantasia);
  // $('#p_nome_fantasia').html(selNomeFantasia);

  // $('#razao_social').val(selRazaoSocial);
  // $('#p_razao_social').html(selRazaoSocial);

  // $('#cnpj').val(selCnpj);
  // $('#p_cnpj').html(selCnpj);

  $('#coleta_local').val(selNomeFantasia);
  $('#coleta_cep').val(selCep);
  $('#coleta_endereco').val(selEndereco);
  $('#coleta_numero').val(selNumero);
  $('#coleta_complemento').val(selComplemento);
  $('#coleta_bairro').val(selBairro);
  $('#coleta_cidade').val(selCidade);
  $('#coleta_uf').val(selUf);

  $('#modalOrigem').modal('hide');

        setTimeout(function() { 
          if($('#validate').val() == 1){
            validaForm(); 
          }

          verificaPesquisa();
         }, 500);

}

//Local Origem
function localSelecaoDestino(idLinha, IdCliente){

  // alert(1);

  var selNomeFantasia     = $('#ldNomeFantasia-'+idLinha).html();
  var selCnpj             = $('#ldCnpj-'+idLinha).html(); 
  var selRazaoSocial      = $('#ldRazaoSocial-'+idLinha).html(); 
  var selEndereco         = $('#ldEndereco-'+idLinha).html();
  var selNumero           = $('#ldNumero-'+idLinha).html();
  var selComplemento      = $('#ldComplemento-'+idLinha).html();
  var selBairro           = $('#ldBairro-'+idLinha).html();
  var selCidade           = $('#ldCidade-'+idLinha).html();
  var selUf               = $('#ldUf-'+idLinha).html();
  var selCep              = $('#ldCep-'+idLinha).html();

  // alert(selNomeFantasia);
  // $('#id_cliente').val(IdCliente);
  // $('#nome_fantasia').val(selNomeFantasia);
  // $('#p_nome_fantasia').html(selNomeFantasia);

  // $('#razao_social').val(selRazaoSocial);
  // $('#p_razao_social').html(selRazaoSocial);

  // $('#cnpj').val(selCnpj);
  // $('#p_cnpj').html(selCnpj);

  $('#entrega_local').val(selNomeFantasia);
  $('#entrega_cep').val(selCep);
  $('#entrega_endereco').val(selEndereco);
  $('#entrega_numero').val(selNumero);
  $('#entrega_complemento').val(selComplemento);
  $('#entrega_bairro').val(selBairro);
  $('#entrega_cidade').val(selCidade);
  $('#entrega_uf').val(selUf);

  $('#modalDestino').modal('hide');

        setTimeout(function() { 
          if($('#validate').val() == 1){
            validaForm();
          }

          verificaPesquisa();
         }, 500);



}

function inverterEndereco(){
  
  var cLocal          =   $('#coleta_local').val();
  var cCep            =   $('#coleta_cep').val();
  var cEndereco       =   $('#coleta_endereco').val();
  var cNumero         =   $('#coleta_numero').val();
  var cComplemento    =   $('#coleta_complemento').val();
  var cBairro         =   $('#coleta_bairro').val();
  var cNumero         =   $('#coleta_numero').val();
  var cCidade         =   $('#coleta_cidade').val();
  var cUF             =   $('#coleta_uf').val();
  var cCep            =   $('#coleta_cep').val();
  var cObservacao     =   $('#coleta_observacao').val();
  var kmIda           =   $('#kmIda').val();

  var eLocal          =   $('#entrega_local').val();
  var eCep            =   $('#entrega_cep').val();
  var eEndereco       =   $('#entrega_endereco').val();
  var eNumero         =   $('#entrega_numero').val();
  var eComplemento    =   $('#entrega_complemento').val();
  var eBairro         =   $('#entrega_bairro').val();
  var eNumero         =   $('#entrega_numero').val();
  var eCidade         =   $('#entrega_cidade').val();
  var eUF             =   $('#entrega_uf').val();
  var eCep            =   $('#entrega_cep').val();
  var eObservacao     =   $('#entrega_observacao').val();
  var kmVolta         =   $('#kmVolta').val();

  $('#coleta_local').val(eLocal);
  $('#coleta_cep').val(eCep);
  $('#coleta_endereco').val(eEndereco);
  $('#coleta_numero').val(eNumero);
  $('#coleta_complemento').val(eComplemento);
  $('#coleta_bairro').val(eBairro);
  $('#coleta_cidade').val(eCidade);
  $('#coleta_uf').val(eUF);
  $('#coleta_observacao').val(eObservacao);
  $('#kmIda').val(kmVolta);

  $('#entrega_local').val(cLocal);
  $('#entrega_cep').val(cCep);
  $('#entrega_endereco').val(cEndereco);
  $('#entrega_numero').val(cNumero);
  $('#entrega_complemento').val(cComplemento);
  $('#entrega_bairro').val(cBairro);
  $('#entrega_cidade').val(cCidade);
  $('#entrega_uf').val(cUF);
  $('#entrega_observacao').val(cObservacao);
  $('#kmVolta').val(kmIda);

  setTimeout(function() { 
    if($('#validate').val() == 1){
      validaForm(); 
    }

    verificaPesquisa();
   }, 500);

  // pesquisaClientes();


}

    $("#buscaOrigem").keyup(function(){
      buscarOrigem();     
      
    });

    $("#buscaDestino").keyup(function(){
      buscarDestino();
    });

function buscaCepOrigem(){
  var CEP = $('#coleta_cep').val();
  var testeCep = $('#coleta_cep').val().length;

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

        $('#coleta_endereco').val(dados.logradouro);
        $('#coleta_bairro').val(dados.bairro);
        $('#coleta_cidade').val(dados.localidade);
        $('#coleta_uf').val(dados.uf);

        $("#coleta_numero").focus();
        $('#loading').addClass("d-none");

        verificaPesquisa();

        setTimeout(function() { 
          if($('#validate').val() == 1){
            validaForm(); 
          }
         }, 500);
 
  
      }
    }
  }
}


function buscaCepDestino(){
  var CEP = $('#entrega_cep').val();
  var testeCep = $('#entrega_cep').val().length;

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

        $('#entrega_endereco').val(dados.logradouro);
        $('#entrega_bairro').val(dados.bairro);
        $('#entrega_cidade').val(dados.localidade);
        $('#entrega_uf').val(dados.uf);

        $("#entrega_numero").focus();
        $('#loading').addClass("d-none");

        verificaPesquisa();

        setTimeout(function() { 
          if($('#validate').val() == 1){
            validaForm();
          }
         }, 500);

    
  
      }
    }
  }
}

function calculoTabela(){
  var qtdNf = $('.nota-fiscal').length;
  $('#qtd_nf').val(qtdNf);
  $('#p_qtd_nf').html(qtdNf);

  var totalNf = 0.00;
  $('.valorNF').each(function(){
    linhaNF = $(this).val();

    linhaNF = moedaParaNumero(linhaNF);
    if(isNaN(Number(linhaNF)) || linhaNF.value == ''){
      linhaNF = 0;
    }

    totalNf = Number(totalNf) + Number(linhaNF);
  });
  
  if(isNaN(totalNf)) {
    $('#p_total_nf').html("0,00");
    $('#total_nf').val('0.00');
  }else{
    totalNf = totalNf.toFixed(2);
    $('#total_nf').val(totalNf);
    totalNf = totalNf.replace('.', ',');
    $('#p_total_nf').html(totalNf);
  }

  //volumes
  var totalVolumes = 0;
  $('.volumes').each(function(){
    linhaVolumes = $(this).val();
        
    totalVolumes = Number(totalVolumes) + Number(linhaVolumes);

  });
  
  if(isNaN(totalVolumes)) {
    $('#p_total_vol').html("0");
    $('#total_vol').val('0');
  }else{
    $('#total_vol').val(totalVolumes);
    $('#p_total_vol').html(totalVolumes);
  }

  // total_peso
  var totalPeso = 0.00;
  $('.peso').each(function(){
    linhaPeso = $(this).val();

    linhaPeso = moedaParaNumero(linhaPeso);
    if(isNaN(Number(linhaPeso)) || linhaPeso.value == ''){
      linhaPeso = 0;
    }
    
    totalPeso = Number(totalPeso) + Number(linhaPeso);
   
  });
  
  if(isNaN(totalPeso)) {
    $('#p_total_peso').html("0,00");
    $('#total_peso').val("0.00");
  }else{
    totalPeso = totalPeso.toFixed(2);
    $('#total_peso').val(totalPeso);
    totalPeso = totalPeso.replace('.', ',');
    $('#p_total_peso').html(totalPeso);
  }

  // cubagem aereo
  var totalAereo = 0.00;
  $('.cubagem-aereo').each(function(){
    linhaAereo = $(this).val();
    
    linhaAereo = moedaParaNumero(linhaAereo);
    if(isNaN(Number(linhaAereo)) || linhaAereo.value == ''){
      linhaAereo = 0;
    }
    
    totalAereo = Number(totalAereo) + Number(linhaAereo);
   
  });
  
  if(isNaN(totalAereo)) {
    $('#p_total_aereo').html("0,00");
     $('#total_aereo').val("0.00");
  }else{
    totalAereo = totalAereo.toFixed(2);
    $('#total_aereo').val(totalAereo);
    totalAereo = totalAereo.replace('.', ',');
    $('#p_total_aereo').html(totalAereo);
  }

  // cubagem rodo
  var totalRodo = 0.00;
  $('.cubagem-rodo').each(function(){
    linhaRodo = $(this).val();
    
    linhaRodo = moedaParaNumero(linhaRodo);
    if(isNaN(Number(linhaRodo)) || linhaRodo.value == ''){
      linhaRodo = 0;
    }
    
    
    totalRodo = Number(totalRodo) + Number(linhaRodo);
   
  });
  
  if(isNaN(totalRodo)) {
    $('#p_total_rodo').val("0,00");
    $('#total_rodo').val("0.00");
  }else{
    totalRodo = totalRodo.toFixed(2);
    $('#total_rodo').val(totalRodo);
    totalRodo = totalRodo.replace('.', ',');
    $('#p_total_rodo').html(totalRodo);
  }

  valorNotaInformado = $('#valor_notas').val();
  if(valorNotaInformado.replace('.','') != totalNf){
    var msg = "Valor da total da Nota Fiscal difetente do informado anteriormente.<br>"
    $("#msg_nf").html(msg);
  }else{
    $("#msg_nf").html("");
  }


  volumeInformado = $('#total_volumes').val();
  if(volumeInformado != totalVolumes){
    var msg = "Volume total  difetente do informado anteriormente.<br>"
    $("#msg_vol").html(msg);
  }else{
    $("#msg_vol").html("");
  }


}

function moedaParaNumero(valor){
    return isNaN(valor) == false ? parseFloat(valor) :   parseFloat(valor.replace("R$","").replace(".","").replace(",","."));
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

    calculoTabela();
  
}

  function alterouCusto(){
    $('#caluloCusto').val(0);
  }

  function alteraStatus(status){
  $('#loading').removeClass('d-none');
  var id = $("#id_solicitacao").val();

  var ajax = new XMLHttpRequest();

  ajax.open("GET", "../_controler/cotacaoStatusRodo.php?W="+id+"&S="+status, true);

  // alert("../_controler/cotacaoStatusRodo?W="+id+"&S="+status);

  ajax.send();
  ajax.onreadystatechange = function() {

    if (ajax.readyState == 4 && ajax.status == 200) {
      var data = ajax.responseText;
      
      btnStatus = ["btn-dark", "btn-secondary", "btn-info", "btn-success", "btn-danger"];

      $('#loading').addClass('d-none');

      $('#aviso-msg').html('<b>Status</b> alterado com sucesso.');
      $('#aviso-msg').removeClass('d-none');
      
      $('.btn-status').removeClass('btn-success btn-danger btn-danger btn-info btn-secondary');

      $('.btn-status').addClass('btn-outline-secondary');

      $('#status-'+status).removeClass('btn-outline-secondary');
      $('#status-'+status).addClass(btnStatus[status]);

      setTimeout(function() { 
        $('#aviso-msg').addClass('d-none');
      }, 1800);

      }
    }

  }