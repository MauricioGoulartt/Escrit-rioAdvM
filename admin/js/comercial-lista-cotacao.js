function fechaCarregamento(){
  $('#loading').addClass('d-none');
}

$(document).ready(function() {
    var table = $('#tabelaClientes').DataTable( {
        // rowReorder: {
        //     selector: 'td:nth-child(2)'
        // },
        responsive: true,
        "searching": false,
         "paging": false,
         "ordering": false,
        "info":     false,
      
    } );
} );


function abreDesativaModal(idContato){
  $("#contatoExcluir").val(idContato);
  $('#desativaModal').modal('show');
}

//Desativa Cliente
function desativaCliente(){

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