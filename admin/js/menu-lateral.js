function menuRecolher(){

  var menu = $("#menu-sidenav").val();

  if(menu == "sidenav-toggled"){
    $('#menu-sidenav').val('');
    // var sidenav = '';
  }else{
    $('#menu-sidenav').val('sidenav-toggled');
    // var sidenav = 'sidenav-toggled';
  }

    var ajax = new XMLHttpRequest();

      // Seta tipo de requisição e URL com os parâmetros
    ajax.open("GET", "https://app.agenciawoohoo.com.br/_leadership/modulos/menu-sidebar.php?menu="+menu, true);

    // Envia a requisição
    ajax.send();

    // Cria um evento para receber o retorno.
    ajax.onreadystatechange = function() {
      // Caso o state seja 4 e o http.status for 200, é porque a requisiçõe deu certo.
      if (ajax.readyState == 4 && ajax.status == 200) {
        var data = ajax.responseText;
        // Retorno do Ajax
        console.log(data);
      }
    }

}