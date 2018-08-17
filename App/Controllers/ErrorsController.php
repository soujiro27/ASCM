<?php
namespace Jur\App\Controllers;
use Carbon\Carbon;
use Jur\App\Models\Errors\Errores;

class ErrorsController {
  public function errores_load_table($error,$modulo){

    $message = $error->getMessage();

    $abrir = fopen('./jur/App/error.log','a+');
    fwrite($abrir,"[".date("r")."] Error: $message\r\n");
    fclose($abrir);

    //var_dump($message);

    $error = new Errores([
      'usrAlta' => $_SESSION['idUsuario'],
      'modulo' => $modulo,
      'descripcion' => $message
    ]);
    $error->save();


    echo json_encode(array('status'=>false,'message'=>'Ha habido un Error Contacta a tu Administrador de Sistemas'));
  }
}











?>
