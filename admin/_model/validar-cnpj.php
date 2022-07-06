<?php

function validar_cnpj($cnpj){
  // Lista de CNPJs inválidos
  $invalidos = [
    '00.000.000/0000-00',
    '11.111.111/1111-11',
    '22.222.222/2222-22',
    '33.333.333/3333-33',
    '44.444.444/4444-44',
    '55.555.555/5555-55',
    '66.666.666/6666-66',
    '77.777.777/7777-77',
    '88.888.888/8888-88',
    '99.999.999/9999-99'
  ];
// Verifica se o CNPJ está na lista de inválidos
if (in_array($cnpj, $invalidos)) {  
  return false;
}else{
      $cnpj = preg_replace('/[^0-9]/', '', (string) $cnpj);
      // Valida tamanho
      if (strlen($cnpj) != 14)
        return false;
      // Valida primeiro dígito verificador
      for ($i = 0, $j = 5, $soma = 0; $i < 12; $i++)
      {
        $soma += $cnpj{$i} * $j;
        $j = ($j == 2) ? 9 : $j - 1;
      }
      $resto = $soma % 11;
      if ($cnpj{12} != ($resto < 2 ? 0 : 11 - $resto))
        return false;
      // Valida segundo dígito verificador
      for ($i = 0, $j = 6, $soma = 0; $i < 13; $i++)
      {
        $soma += $cnpj{$i} * $j;
        $j = ($j == 2) ? 9 : $j - 1;
      }
      $resto = $soma % 11;
      return $cnpj{13} == ($resto < 2 ? 0 : 11 - $resto);
    }

}

if(validar_cnpj('16.679.861/0001-88')){
  echo 0;
}else{
  echo 1;
}