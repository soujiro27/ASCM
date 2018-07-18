<?php 
namespace Jur\App\Controllers;

use Jur\App\Models\Notificaciones\Notificaciones;

class NotificacionesController{

	public function get_notificaciones(){

		$idUsuario = $_SESSION['idUsuario'];

		$notificaciones = Notificaciones::where('idUsuario',"$idUsuario")->get();
		
		return($notificaciones->count());
		

	}

}

 ?>