function fechaCarregamento(){
  $('#loading').addClass('d-none');
}

$(document).ready(function() {
    var table = $('#tabelaFuncionarios').DataTable( {
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
