<?php
namespace Jur\App\Controllers;

use Jur\App\Models\Notificaciones\Notificaciones;
use Jur\App\Models\Modulos\Puestos;
use Carbon\Carbon;

class NotificacionesController{

	public function get_notificaciones(){

		$idUsuario = $_SESSION['idUsuario'];

		$notificaciones = Notificaciones::where('idUsuario',"$idUsuario")->get();

		return($notificaciones->count());


	}

	public function get_rpe_asiste($rpe_boss){

		$puestos = Puestos::where('usrAsisteA',"$rpe_boss")->get();
		$rpe = [];
		foreach ($puestos as $key => $value) {
			array_push($rpe,$puestos[$key]['rpe']);
		}

		return $rpe;
	}
	public function create_message_notifications($tipo,$nombre,$tipoDocumento,$folio){

		$mensaje = 'Mensaje enviado a: '.$nombre.
				"\nHas recibido un ".$tipo.": ".$tipoDocumento.
				"\nCon el folio: ".$folio;

		return $mensaje;

	}

	public function send_notifications($idUsuario,$mensaje){

			$notifica = new Notificaciones([
				'idNotificacion' => '1',
				'idUsuario' => $idUsuario,
				'mensaje' => $mensaje,
				'idPrioridad' => 'ALTA',
				'idImpacto' => 'MEDIO',
				'fAlta' => Carbon::now('America/Mexico_City')->format('Y-m-d H:i:s'),
				'usrAlta' => $_SESSION['idUsuario'],
				'estatus' => 'ACTIVO',
				'situacion' => 'NUEVO',
				'identificador' => '1',
				'idCuenta' => $_SESSION['idCuentaActual'],
				'idAuditoria' => '1',
				'idModulo' => 'Volantes',
				'referencia' => 'idVolante'

			]);
			$notifica->save();

	}

}

 ?>
