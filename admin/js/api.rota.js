
//Tratar o retorno do DistanceMatrixService
function callbackOrigem(response, status) {
    //Verificar o Status
    if (status != google.maps.DistanceMatrixStatus.OK)
        //Se o status não for "OK"
        $('#loading').addClass("d-none");
    else {
        //Se o status for OK
        
        var origemEnd = response.originAddresses;
        var destinoEnd = response.destinationAddresses;
        var tempoRota = response.rows[0].elements[0].duration.text;
        var kmRotaOrigem = Math.ceil(response.rows[0].elements[0].distance.value/1000);

    
        $('#origemKmLfg').val(kmRotaOrigem);

    }
}


		function CalculaDistancia(origem, destino) {
             $('#loading').removeClass("d-none");
            //Instanciar o DistanceMatrixService
            var service = new google.maps.DistanceMatrixService();
            //executar o DistanceMatrixService
            service.getDistanceMatrix(
              {
                  //Origem
                  origins: [origem],
                  //Destino
                  destinations: [destino],
                  //Modo (DRIVING | WALKING | BICYCLING)
                  travelMode: google.maps.TravelMode.DRIVING,
                  //Sistema de medida (METRIC | IMPERIAL)
                  unitSystem: google.maps.UnitSystem.METRIC
                  //Vai chamar o callback
              }, callback);
        }
        //Tratar o retorno do DistanceMatrixService
        function callback(response, status) {
            //Verificar o Status
            if (status != google.maps.DistanceMatrixStatus.OK)
                //Se o status não for "OK"
                $('#loading').addClass("d-none");
            else {
                //Se o status for OK
                var kmSaida = $('#origemKmLfg').val();

                var origemEnd = response.originAddresses;
                var destinoEnd = response.destinationAddresses;
                var tempoRota = response.rows[0].elements[0].duration.text;
                var kmRota = Math.ceil(response.rows[0].elements[0].distance.value/1000) + parseInt(kmSaida);
                 
                

                $('#tempoRota').val(tempoRota);
                $('#ptempoRota').html(tempoRota);
                $('#kmIda').val(kmRota);
                $('#pkmIda').html(kmRota);
            }
        }

        //Volta

        function CalculaDistanciaVolta(origem, destino) {
             
            //Instanciar o DistanceMatrixService
            var service = new google.maps.DistanceMatrixService();
            //executar o DistanceMatrixService
            service.getDistanceMatrix(
              {
                  //Origem
                  origins: [origem],
                  //Destino
                  destinations: [destino],
                  //Modo (DRIVING | WALKING | BICYCLING)
                  travelMode: google.maps.TravelMode.DRIVING,
                  //Sistema de medida (METRIC | IMPERIAL)
                  unitSystem: google.maps.UnitSystem.METRIC
                  //Vai chamar o callback
              }, callback2);
        }
        //Tratar o retorno do DistanceMatrixService
        function callback2(response, status) {
            //Verificar o Status
            if (status != google.maps.DistanceMatrixStatus.OK)
                //Se o status não for "OK"
                $('#loading').addClass("d-none");
            else {
                //Se o status for OK
                $('#loading').addClass("d-none");

                var kmRota = Math.ceil(response.rows[0].elements[0].distance.value/1000);
                 
                $('#kmVolta').val(kmRota);
                $('#pkmVolta').html(kmRota);
               
            }
        }
	 
		function verificaPesquisa(){ 

      var cCep            =   $('#coleta_cep').val();
      var cEndereco       =   $('#coleta_endereco').val();
      var cNumero         =   $('#coleta_numero').val();
      var cComplemento    =   $('#coleta_complemento').val();
      var cBairro         =   $('#coleta_bairro').val();
      var cCidade         =   $('#coleta_cidade').val();
      var cUF             =   $('#coleta_uf').val();
    
      var eCep            =   $('#entrega_cep').val();
      var eEndereco       =   $('#entrega_endereco').val();
      var eNumero         =   $('#entrega_numero').val();
      var eComplemento    =   $('#entrega_complemento').val();
      var eBairro         =   $('#entrega_bairro').val();
      var eCidade         =   $('#entrega_cidade').val();
      var eUF             =   $('#entrega_uf').val();

  if(cCep != "" && cEndereco != "" && cBairro != "" && cCidade != "" && cUF != "" && eCep != "" && eEndereco != "" && eBairro != "" && eCidade != "" && eUF != ""){

    
    var pesquisaOrigem =  cEndereco + ", " + cNumero + " " + cComplemento + " - " + cBairro + " - " + cCidade + " - " + cUF + " - " +  cUF; 

    var pesquisaDestino =  eEndereco + ", " + eNumero + " " + eComplemento + " - " + eBairro + " - " + eCidade + " - " + eUF + " - " +  eUF; 

    //LeaderShip

    var LeaderShip = "R. Barão de Mauá, 450 - Centro, Guarulhos - SP, 07012-040";

    CalculaDistanciaOrigem(LeaderShip, pesquisaOrigem);

    // alert(kmRotaOrigem);

    CalculaDistancia(pesquisaOrigem, pesquisaDestino);

    CalculaDistanciaVolta(pesquisaDestino, LeaderShip);

      }
			
		}
		

// Calcula distancia até a origem

function CalculaDistanciaOrigem(origem, destino) {
             $('#loading').removeClass("d-none");
            //Instanciar o DistanceMatrixService
            var service = new google.maps.DistanceMatrixService();
            //executar o DistanceMatrixService
            service.getDistanceMatrix(
              {
                  //Origem
                  origins: [origem],
                  //Destino
                  destinations: [destino],
                  //Modo (DRIVING | WALKING | BICYCLING)
                  travelMode: google.maps.TravelMode.DRIVING,
                  //Sistema de medida (METRIC | IMPERIAL)
                  unitSystem: google.maps.UnitSystem.METRIC
                  //Vai chamar o callback
              }, callbackOrigem);
        }




