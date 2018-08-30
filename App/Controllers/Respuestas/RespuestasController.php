<?php

namespace Jur\App\Controllers\Respuestas;
use Jur\App\Controllers\TwigController;

use Jur\App\Controllers\NotificacionesController;
use Jur\App\Controllers\BaseController;


class RespuestasController extends TwigController {

	private $js = 'Respuestas';
	private $nombre = 'Respuestas';

  public function home_template(){
    $notificaciones = new NotificacionesController();
    $base = new BaseController();
    $menu = $base->menu();


    echo $this->render('HomeLayout/HomeContainer.twig',[
      'js' => $this->js,
      'session' => $_SESSION,
      'nombre' => $this->nombre,
      'notificaciones' => $notificaciones->get_notificaciones(),
      'menu' => $menu['modulos']
    ]);
  }

}


?>
