//Ready
$(document).ready(function(){


    pfPj();

    $('#tipo').change(function(){
      pfPj();
    });


    $("#razao_social").keyup(function(){
      $(this).val($(this).val().toUpperCase());
    });

    $("#nome_fantasia").keyup(function(){
      $(this).val($(this).val().toUpperCase());
    });

    jQuery.validator.addMethod("valCNPJ", function(value, element) {
 
    cnpj = value.replace(/[^\d]+/g,'');
 
    if(cnpj == '') return false;
     
    if (cnpj.length != 14)
        return false;
 
    // Elimina CNPJs invalidos conhecidos
    if (cnpj == "00000000000000" || 
        cnpj == "11111111111111" || 
        cnpj == "22222222222222" || 
        cnpj == "33333333333333" || 
        cnpj == "44444444444444" || 
        cnpj == "55555555555555" || 
        cnpj == "66666666666666" || 
        cnpj == "77777777777777" || 
        cnpj == "88888888888888" || 
        cnpj == "99999999999999")
        return false;
         
    // Valida DVs
    tamanho = cnpj.length - 2
    numeros = cnpj.substring(0,tamanho);
    digitos = cnpj.substring(tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0))
        return false;
         
    tamanho = tamanho + 1;
    numeros = cnpj.substring(0,tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1))
          return false;
           
    return true;
}, "CNPJ não confere."); // Mensagem padrão

    
    liberaBotao();   


      //Mask
       $("#cnpj").mask("99.999.999/9999-99");
       $("#telefone").mask("(00) 0000-0000");
       $("#cep").mask("00000-000");

       $("#cpf").mask("000.000.000-00");

       $("#telefoneContato").mask("(00) 0000-0000");
       

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


      //Validar Cadastro Cliente Principal
      $('#formCliente').validate({

        rules : {
          cnpj:           { required : true, valCNPJ : true },
          razao_social:   { minlength : 5, required : true },
          telefone:       { minlength : 14, required : true },
          emailFinanceiro:{ email : true},
        },

        messages : {
          cnpj:     { required : "<b>- CNPJ</b> é obrigatório!",  valCNPJ : "<b>- CNPJ</b> inválido!" },
          razao_social: { minlength: "<b>- Razão Social</b> mínimo de 5 caracteres.", required : "<b>- Razão Social</b> é obrigatório!" },
          telefone:      { minlength: "<b>- Telefone</b> inválido!", required : "<b>- Telefone</b> é obrigatório!" },
          emailFinanceiro:      { email: "<b>- E-mail</b> inválido!", required : "<b>- E-mail</b> é obrigatório!" },
        },

        submitHandler: function( form ){
            var dados = $('#formCliente').serialize();
            $('#loading').removeClass('d-none');

            $.ajax({
              type: "POST",
              url: "../_controler/clientesSalvaCadastro.php",
              data: dados,
              success: function( data )
              {

                $('#id_cliente').val(data);
                $('#id_cliente_end').val(data);
                $('#id_cliente_contato').val(data);
                liberaBotao();

                $('#aviso-msg').html('<b>Cliente</b> salvo com sucesso.');
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

      }); // fim Validar Cadastro Cliente Principal

      //Validar Cadastro Endereço
      $('#formEnderecoCliente').validate({

        rules : {
          cep:      { minlength : 9, required : true },
          endereco: { required : true },
          numero:   { required : true },
          bairro:   { required : true },
          cidade:   { required : true },
          uf:       { required : true },
        },

        messages : {
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
              url: "../_controler/clientesEnderecoSalvaCadastro.php",
              data: dados,
              success: function( data ){

                $('#id_endereco').val(data);
                var cliente = $('#id_cliente').val();
                atualizaTabelaEnderco(cliente);
                carregaDataTablesEndereco();
     
              }
            });

            var qtd_end = $('#qtd_end').val();
            qtd_end++;
            $('#qtd_end').val(qtd_end);

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

      //Validar Cadastro Contato
      $('#formContatoCliente').validate({

        rules : {
          nome:      { minlength : 4, required : true },
          telefoneContato: { minlength : 14, required : true },
          celular: { minlength : 14 },
          email:{ email : true},
          
        },

        messages : {
          cep:      { minlength: "<b>- Nome</b> mínimo 4 caracteres!", required : "<b>- CEP</b> é obrigatório!" },
          telefoneContato: { minlength: "<b>- Telefone</b> inválido!", required : "<b>- Telefone</b> é obrigatório!" },
          celular: { minlength: "<b>- Celular</b> inválido!"},
          email:      { email: "<b>- E-mail</b> inválido!"},

        },

        submitHandler: function( form ){
          //alert('teste');
          $('#loading').removeClass('d-none');
            var dados = $('#formContatoCliente').serialize();
            
            $.ajax({
              type: "POST",
              url: "../_controler/clientesContatoSalvaCadastro.php",
              data: dados,
              success: function( data ){

                $('#id_contato').val(data);
                var cliente = $('#id_cliente').val();
                atualizaTabelaContato(cliente);
     
              }
            });

            $('#aviso-msg').html('<b>Contato</b> salvo com sucesso.');
            $('#aviso-msg').addClass('alert-success');

            setTimeout(function() { 
                $('#loading').addClass('d-none');
                $('#aviso').removeClass('d-none');
            }, 200);

            setTimeout(function() { 
                $('#aviso').addClass('d-none');
                $('#aviso-msg').removeClass('alert-success');
            }, 2500);
            

            return false;
        },

        //errorLabelContainer: '#error',
          errorClass: "invalid text-danger",

      }); // fim Validar Cadastro Conato   


});//FIM document


// Consulta Placa
  function consultaCnpj(){

    var idCliente = $("#id_cliente").val();
    var cnpj = $("#cnpj").val();

    var ajax = new XMLHttpRequest();


    // Seta tipo de requisição e URL com os parâmetros
    ajax.open("GET", "../_controler/clienteChecarCnpj.php?W="+idCliente+"&P="+cnpj, true);

    // Envia a requisição
    ajax.send(); 

    // Cria um evento para receber o retorno.
    ajax.onreadystatechange = function() {

      if (ajax.readyState == 4 && ajax.status == 200) {
        var data = ajax.responseText;
        // Retorno do Ajax
        console.log(data);

          if(data == 1){

            $('#aviso-msg').html('<b>CNPJ</b> já cadastrado.');
            $('#aviso-msg').addClass('alert-danger');

            setTimeout(function() { 
                $('#loading').addClass('d-none');
                $('#aviso').removeClass('d-none');
            }, 200);

            setTimeout(function() { 
                $('#aviso').addClass('d-none');
                $('#aviso-msg').removeClass('alert-danger');
            }, 4500);

            // $("#btn_salvar").addClass(  "disabled" );
            $("#btn_salvar").attr("disabled","disabled");
            
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
  


//Função tela de Cadastrao Cliente
function liberaBotao(){
  var idCliente = $('#id_cliente').val();
  if(idCliente != ''){
      $("#btn-enderecos").prop( "disabled", false );
      $("#btn-contatos").prop( "disabled", false );
  }
};

//Limpa Formulario de Endereço
function novoEndereco(){
 
  $("#id_endereco").val('');
  $("#cep").val('');
  $("#endereco").val('');
  $("#numero").val('');
  $("#complemento").val('');
  $("#bairro").val('');
  $("#cidade").val('');
  $("#uf").val('');
  $("#cep").focus();


}

//Seleciona endereço da tabela
function selecionarEndereco(id_end){
  var sel_cep = $("#"+id_end+"-cep").html();
  var sel_rua = $("#"+id_end+"-rua").html();
  var sel_numero = $("#"+id_end+"-numero").html();
  var sel_complemento = $("#"+id_end+"-complemento").html();
  var sel_bairro = $("#"+id_end+"-bairro").html();
  var sel_cidade = $("#"+id_end+"-cidade").html();
  var sel_uf = $("#"+id_end+"-uf").html();

  $("#id_endereco").val(id_end);
  $("#cep").val(sel_cep);
  $("#endereco").val(sel_rua);
  $("#numero").val(sel_numero);
  $("#complemento").val(sel_complemento);
  $("#bairro").val(sel_bairro);
  $("#cidade").val(sel_cidade);
  $("#uf").val(sel_uf);


}

//Atualiza Tabela de endereço
function atualizaTabelaEnderco(cliente){

  // $.get( "../_controler/clientesEndereroAtualiza.php?idCliente=3", function( data ) {
  //   alert(data);
  // }, "json" );
    var ajax = new XMLHttpRequest();
    ajax.open("GET", "../_controler/clientesEndereroAtualiza.php?idCliente="+cliente, true);
    ajax.send();

    // Cria um evento para receber o retorno.
    ajax.onreadystatechange = function() {
      if (ajax.readyState == 4 && ajax.status == 200) {
        var data = ajax.responseText;
          // console.log(data);
        //alert(data);
        $("#tabelaEnderecos").html(data);
      }
    }

}

//Atualiza Tabela de Contato
function atualizaTabelaContato(cliente){

    var ajax = new XMLHttpRequest();
    ajax.open("GET", "../_controler/clientesContatoAtualiza.php?idCliente="+cliente, true);
    ajax.send();

    // Cria um evento para receber o retorno.
    ajax.onreadystatechange = function() {
      if (ajax.readyState == 4 && ajax.status == 200) {
        var data = ajax.responseText;
         
        $("#tabelaClientes").html(data);
        carregaDataTablesClientes();
      }
    }

}

//Troca endereço Principal
function trocarPrincipal(idEndereco){
    $('#loading').removeClass('d-none');
    var cliente = $('#id_cliente').val();

    var ajax = new XMLHttpRequest();
    ajax.open("GET", "../_controler/clientesAtualizaEnderecoPrincipal.php?idCliente="+cliente+"&idEndereco="+idEndereco, true);
    ajax.send();

    // Cria um evento para receber o retorno.
    ajax.onreadystatechange = function() {
      if (ajax.readyState == 4 && ajax.status == 200) {
        var data = ajax.responseText;
          // console.log(data);
        //alert(data);
        atualizaTabelaEnderco(cliente);
        carregaDataTablesEndereco();
        
        $('#aviso-msg').html('Troca de <b>Endereço Principal</b> efetuada com sucesso.');
        $('#aviso-msg').addClass('alert-info');

        setTimeout(function() { 
            $('#loading').addClass('d-none');
            $('#aviso').removeClass('d-none');
        }, 200);

        setTimeout(function() { 
            $('#aviso').addClass('d-none');
            $('#aviso-msg').removeClass('alert-info');
        }, 1800);


      }
    }

}

//
//Exclui Contato - abre modal confirmação
function deletaContato(idContato){
  $("#contatoExcluir").val(idContato);
  $('#excluirContatoModal').modal('show');
}
//Exclui Contato
function excluirContatoModal(){

    var idContato = $("#contatoExcluir").val();

    $('#loading').removeClass('d-none');
    var cliente = $('#id_cliente').val();

    var ajax = new XMLHttpRequest();
    ajax.open("GET", "../_controler/clientesDeletaContato.php?idContato="+idContato, true);
    ajax.send();

    // Cria um evento para receber o retorno.
    ajax.onreadystatechange = function() {
      if (ajax.readyState == 4 && ajax.status == 200) {
        var data = ajax.responseText;
          // console.log(data);
        //alert(data);
        atualizaTabelaContato(cliente);
        $('#excluirContatoModal').modal('hide');

        $('#aviso-msg').html('<b>Contato</b> excluído com sucesso.');
        $('#aviso-msg').addClass('alert-warning');

        setTimeout(function() { 
            $('#loading').addClass('d-none');
            $('#aviso').removeClass('d-none');
        }, 200);

        setTimeout(function() { 
            $('#aviso').addClass('d-none');
            $('#aviso-msg').removeClass('alert-warning');
        }, 1800);


      }
    }

}
//

//Exclui endereço - abre modal confirmação
function deletaEndereco(idEndereco){
  $("#endercoExcluir").val(idEndereco);
  $('#excluirEnderecoModal').modal('show');
}
//Exclui endereço
function confirmaDeletaEndereco(){

    var idEndereco = $("#endercoExcluir").val();

    $('#loading').removeClass('d-none');
    var cliente = $('#id_cliente').val();

    var ajax = new XMLHttpRequest();
    ajax.open("GET", "../_controler/clientesDeletaEndereco.php?idEndereco="+idEndereco, true);
    ajax.send();

    // Cria um evento para receber o retorno.
    ajax.onreadystatechange = function() {
      if (ajax.readyState == 4 && ajax.status == 200) {
        var data = ajax.responseText;
          // console.log(data);
        //alert(data);
        atualizaTabelaEnderco(cliente);
        carregaDataTablesEndereco();
        $('#excluirEnderecoModal').modal('hide');

        $('#aviso-msg').html('<b>Endereço</b> excluído com sucesso.');
        $('#aviso-msg').addClass('alert-warning');

        setTimeout(function() { 
            $('#loading').addClass('d-none');
            $('#aviso').removeClass('d-none');
        }, 200);

        setTimeout(function() { 
            $('#aviso').addClass('d-none');
            $('#aviso-msg').removeClass('alert-warning');
        }, 1800);


      }
    }

}

function carregaDataTablesEndereco(){

  $("#tabelaEnderecos").dataTable().fnDestroy();

    var table2 = $('#tabelaEnderecos').DataTable( {
      // rowReorder: {
      //     // selector: 'td:nth-child(1)'
      // },
      responsive: true,
      "searching": false,
       "paging": false,
       "ordering": false,
      "info":     false,
      // "autoWidth": false, 
      "columnDefs": [
        { "min-width": "200px", "targets": 0 }
      ]
  } );
}
//dataTables tabela Clientes
function carregaDataTablesClientes() {

    $("#tabelaClientes").dataTable().fnDestroy();
    //antes de recagar o dataTable destroi a

    var table4 = $('#tabelaClientes').DataTable( {
      // rowReorder: {
      //     selector: 'td:nth-child(2)'
      // },
      responsive: true,
      "searching": false,
       "paging": false,
       "ordering": false,
      "info":     false,


  } );
}

// Fecha loading page
function fechaCarregamento(){

  // var cliente = $('#id_cliente').val();

  carregaDataTablesClientes();

  carregaDataTablesEndereco();

  setTimeout(function() { 
    $('#loading').addClass('d-none');
    $('#dadosEndereco').addClass('d-none');
    $('#dadosContato').addClass('d-none');
  }, 2);


  // $('#loading').addClass('d-none');
}

//Limpa Formulario de Endereço
function novoContato(){
 
  $("#id_contato").val('');
  $("#cargo").val('');
  $("#nome").val('');
  $("#sobrenome").val('');
  $("#telefoneContato").val('');
  $("#celular").val('');
  $("#email").val('');
  $("#cargo").focus();


}

//Seleciona Contato da Tabela
function selecionarContato(id_con){

  var sel_cargo = $("#"+id_con+"-cargo").html();
  var sel_nome = $("#"+id_con+"-nome").html();
  var sel_sobrenome = $("#"+id_con+"-sobrenome").html();
  var sel_telefone = $("#"+id_con+"-telefone").html();
  var sel_celular = $("#"+id_con+"-celular").html();
  var sel_email = $("#"+id_con+"-email").html();


  $("#id_contato").val(id_con);
  $("#cargo").val(sel_cargo);
  $("#nome").val(sel_nome);
  $("#sobrenome").val(sel_sobrenome);
  $("#telefoneContato").val(sel_telefone);
  $("#celular").val(sel_celular);
  $("#email").val(sel_email);

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



//Funções troca de tela
function telaCadastro(telaClique){

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

function pfPj(){
      if( $('#tipo').val() == 'PJ' ){

        $('#cpf').prop('disabled', true);
        $('#rg').prop('disabled', true);

        $('#cnpj').prop('disabled', false);
        $('#nome_fantasia').prop('disabled', false);
        $('#inscricao_estadual').prop('disabled', false);
        $('#inscricao_municipal').prop('disabled', false);

      }else{
        $('#cpf').prop('disabled', false);
        $('#rg').prop('disabled', false);

        $('#cnpj').prop('disabled', true);
        $('#nome_fantasia').prop('disabled', true);
        $('#inscricao_estadual').prop('disabled', true);
        $('#inscricao_municipal').prop('disabled', true);

      }
    }