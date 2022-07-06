//Configurações Funcionarios
//Ready
$(document).ready(function(){

      //Valida Unidade
      $('#formUnidade').validate({

        rules : {
          unidade:   { minlength : 3, required : true },
		},

        messages : {
          unidade:   { minlength: "<b>- Unidade</b> mínimo de 3 caracteres!", required : "<b>- Unidade</b> é obrigatório!" },
        },

        submitHandler: function( form ){
            var dados = $('#formUnidade').serialize();
            $('#loading').removeClass('d-none');

            $.ajax({
              type: "POST",
              url: "../_controler/funcionariosConfiguracoesSalvaUnidade.php",
              data: dados,
              success: function( data )
              {

                
              	atualizaTabelaUnidades();
              	carregaDataTablesUnidade();
            
              	$("#id_unidade").val('');
  				$("#unidade").val('');
     			$('#loading').addClass('d-none');
              }
            });

            return false;
        },

          errorLabelContainer: '#errorUnidade',
          errorClass: "invalid text-danger",

      }); // fim Valida Unidade


      //Valida Departamento
      $('#formDepartamento').validate({

        rules : {
          departamento:   { minlength : 3, required : true },
		},

        messages : {
          departamento:   { minlength: "<b>- Departamento</b> mínimo de 3 caracteres!", required : "<b>- Departamento</b> é obrigatório!" },
        },

        submitHandler: function( form ){
            var dados = $('#formDepartamento').serialize();
            $('#loading').removeClass('d-none');

            $.ajax({
              type: "POST",
              url: "../_controler/funcionariosConfiguracoesSalvaDepartamento.php",
              data: dados,
              success: function( data )
              {

                
              	atualizaTabelaDepartamento();
              	carregaDataTablesDepartamento();
            
              	$("#id_departamento").val('');
  				$("#departamento").val('');
     			$('#loading').addClass('d-none');
              }
            });

            return false;
        },

          errorLabelContainer: '#errorDepartamento',
          errorClass: "invalid text-danger",

      }); // fim Valida Departamento

      //Valida Cargo
      $('#formCargo').validate({

        rules : {
          cargo:   { minlength : 3, required : true },
		},

        messages : {
          cargo:   { minlength: "<b>- Cargo</b> mínimo de 3 caracteres!", required : "<b>- Cargo</b> é obrigatório!" },
        },

        submitHandler: function( form ){
            var dados = $('#formCargo').serialize();
            $('#loading').removeClass('d-none');

            $.ajax({
              type: "POST",
              url: "../_controler/funcionariosConfiguracoesSalvaCargo.php",
              data: dados,
              success: function( data )
              {

                
              	atualizaTabelaCargo();
              	carregaDataTablesCargo();
            
              	$("#id_cargo").val('');
  				$("#cargo").val('');
     			$('#loading').addClass('d-none');
              }
            });

            return false;
        },

          errorLabelContainer: '#errorCargo',
          errorClass: "invalid text-danger",

      }); // fim Valida Cargo


      //Valida País
      $('#formPais').validate({

        rules : {
          pais:   { minlength : 3, required : true },
		},

        messages : {
          pais:   { minlength: "<b>- País</b> mínimo de 3 caracteres!", required : "<b>- País</b> é obrigatório!" },
        },

        submitHandler: function( form ){
            var dados = $('#formPais').serialize();
            $('#loading').removeClass('d-none');

            $.ajax({
              type: "POST",
              url: "../_controler/funcionariosConfiguracoesSalvaPais.php",
              data: dados,
              success: function( data )
              {

                
              	atualizaTabelaPais();
              	carregaDataTablesPais();
            
              	$("#id_pais").val('');
  				$("#pais").val('');
     			$('#loading').addClass('d-none');
              }
            });

            return false;
        },

          errorLabelContainer: '#errorPais',
          errorClass: "invalid text-danger",

      }); // fim Valida Cargo



});//FIM document

// Fecha loading page
function fechaCarregamento(){

  carregaDataTablesUnidade();
  carregaDataTablesDepartamento();
  carregaDataTablesCargo();
  carregaDataTablesPais();

  setTimeout(function() { 
    $('#loading').addClass('d-none');
  }, 2);


  // $('#loading').addClass('d-none');
}

////////////////////////////////
////// Unidades ///////////////
//////////////////////////////

//dataTables tabela Unidades
function carregaDataTablesUnidade() {

    $("#tabelaUnidades").dataTable().fnDestroy();
    //antes de recagar o dataTable destroi a

    var tableUnidades = $('#tabelaUnidades').DataTable( {
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

//Atualiza Tabela de Unidade
function atualizaTabelaUnidades(){

    var ajax = new XMLHttpRequest();
    ajax.open("GET", "../_controler/funcionariosConfiguracoesListaUnidade.php", true);
    ajax.send();

    // Cria um evento para receber o retorno.
    ajax.onreadystatechange = function() {
      if (ajax.readyState == 4 && ajax.status == 200) {
        var data = ajax.responseText;
          // console.log(data);
        //alert(data);
        $("#tbodyUnidades").html(data);
      }
    }

}

//Seleciona Unidade da tabela
function selecionarUnidade(id_unidade){
  
  var sel_unidade = $("#"+id_unidade+"-unidade").html();
 
  $("#id_unidade").val(id_unidade);
  $("#unidade").val(sel_unidade);
 
}

function DesativaUnidade(id_unidade){
	var ajax = new XMLHttpRequest();
    ajax.open("GET", "../_controler/funcionariosConfiguracoesDesativaUnidade.php?idUnidade="+id_unidade, true);
    ajax.send();

    // Cria um evento para receber o retorno.
    ajax.onreadystatechange = function() {
      if (ajax.readyState == 4 && ajax.status == 200) {
        var data = ajax.responseText;
         console.log(data);
      }
    }

    atualizaTabelaUnidades();
    carregaDataTablesUnidade();

}

////////////////////////////////
////// Departamento ///////////
//////////////////////////////

////dataTables tabela Departamento
function carregaDataTablesDepartamento() {

    $("#tabelaDepartamento").dataTable().fnDestroy();
    //antes de recagar o dataTable destroi a

    var tableUnidades = $('#tabelaDepartamento').DataTable( {
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

//Seleciona Departamento da tabela
function selecionarDepartamento(id_departamento){
  
  var sel_departamento = $("#"+id_departamento+"-departamento").html();
 
  $("#id_departamento").val(id_departamento);
  $("#departamento").val(sel_departamento);
 
}

//Atualiza Tabela de Departamento
function atualizaTabelaDepartamento(){

    var ajax = new XMLHttpRequest();
    ajax.open("GET", "../_controler/funcionariosConfiguracoesListaDepartamento.php", true);
    ajax.send();

    // Cria um evento para receber o retorno.
    ajax.onreadystatechange = function() {
      if (ajax.readyState == 4 && ajax.status == 200) {
        var data = ajax.responseText;
          // console.log(data);
        //alert(data);
        $("#tbodyDepartamento").html(data);
      }
    }

}


function DesativaDepartamento(id_departamento){
	var ajax = new XMLHttpRequest();
    ajax.open("GET", "../_controler/funcionariosConfiguracoesDesativaDepartamento.php?idDepartamento="+id_departamento, true);
    ajax.send();

    // Cria um evento para receber o retorno.
    ajax.onreadystatechange = function() {
      if (ajax.readyState == 4 && ajax.status == 200) {
        var data = ajax.responseText;
         console.log(data);
      }
    }

    atualizaTabelaDepartamento();
	carregaDataTablesDepartamento();

}

////////////////////////////////
////// Cargo ///////////
//////////////////////////////

////dataTables tabela Departamento
function carregaDataTablesCargo() {

    $("#tabelaCargo").dataTable().fnDestroy();
    //antes de recagar o dataTable destroi a

    var tableUnidades = $('#tabelaCargo').DataTable( {
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

//Seleciona Departamento da tabela
function selecionarCargo(id_Cargo){
  
  var sel_cargo = $("#"+id_Cargo+"-cargo").html();
 
  $("#id_cargo").val(id_Cargo);
  $("#cargo").val(sel_cargo);
 
}

//Atualiza Tabela de Departamento
function atualizaTabelaCargo(){

    var ajax = new XMLHttpRequest();
    ajax.open("GET", "../_controler/funcionariosConfiguracoesListaCargo.php", true);
    ajax.send();

    // Cria um evento para receber o retorno.
    ajax.onreadystatechange = function() {
      if (ajax.readyState == 4 && ajax.status == 200) {
        var data = ajax.responseText;
          // console.log(data);
        //alert(data);
        $("#tbodyCargo").html(data);
      }
    }

}


function DesativaCargo(id_cargo){
	var ajax = new XMLHttpRequest();
    ajax.open("GET", "../_controler/funcionariosConfiguracoesDesativaCargo.php?idCargo="+id_cargo, true);
    ajax.send();

    // Cria um evento para receber o retorno.
    ajax.onreadystatechange = function() {
      if (ajax.readyState == 4 && ajax.status == 200) {
        var data = ajax.responseText;
         console.log(data);
      }
    }

    atualizaTabelaCargo();
	carregaDataTablesCargo();

}


////////////////////////////////
////// País ///////////
//////////////////////////////
////dataTables tabela Pais
function carregaDataTablesPais() {

    $("#tabelaPais").dataTable().fnDestroy();
    //antes de recagar o dataTable destroi a

    var tableUnidades = $('#tabelaPais').DataTable( {
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

//Seleciona Departamento da tabela
function selecionarPais(id_Pais){
  
  var sel_pais = $("#"+id_Pais+"-pais").html();
 
  $("#id_pais").val(id_Pais);
  $("#pais").val(sel_pais);
 
}

//Atualiza Tabela de Departamento
function atualizaTabelaPais(){

    var ajax = new XMLHttpRequest();
    ajax.open("GET", "../_controler/funcionariosConfiguracoesListaPais.php", true);
    ajax.send();

    // Cria um evento para receber o retorno.
    ajax.onreadystatechange = function() {
      if (ajax.readyState == 4 && ajax.status == 200) {
        var data = ajax.responseText;
          // console.log(data);
        //alert(data);
        $("#tbodyPais").html(data);
      }
    }

}


function DesativaPais(id_pais){
	var ajax = new XMLHttpRequest();
    ajax.open("GET", "../_controler/funcionariosConfiguracoesDesativaPais.php?idPais="+id_pais, true);
    ajax.send();

    // Cria um evento para receber o retorno.
    ajax.onreadystatechange = function() {
      if (ajax.readyState == 4 && ajax.status == 200) {
        var data = ajax.responseText;
         console.log(data);
      }
    }

    atualizaTabelaPais();
	carregaDataTablesPais();

}
