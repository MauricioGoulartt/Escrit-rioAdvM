function fechaCarregamento(){
  $('#loading').addClass('d-none');
}

$(document).ready(function() {
    var table = $('#tabelaFuncionarios').DataTable( {

        responsive: true,
        "searching": false,
         "paging": false,
         "ordering": false,
        "info":     false,
   
    } );
} );
