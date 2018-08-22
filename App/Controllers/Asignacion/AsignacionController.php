<?php

namespace Jur\App\Controllers\Asignacion;
use Jur\App\Controllers\TwigController;
use GUMP;
use Carbon\Carbon;


use Jur\App\Controllers\NotificacionesController;
use Jur\App\Controllers\BaseController;

use Jur\App\Models\Volantes\Volantes;
use Jur\App\Models\Volantes\VolantesDocumentos;
use Jur\App\Models\Volantes\TurnadosJuridico;
use Jur\App\Models\Cedulas\DocumentosSiglas;
use Jur\App\Models\Cedulas\Espacios;
use Jur\App\Models\Modulos\Puestos;
use Jur\App\Models\Notificaciones\Usuarios;


class AsignacionController extends TwigController {

	private $js = 'Asignacion';
	private $nombre = 'Asignacion';

  public function load_asignacion_insert_template(){

		$notificaciones = new NotificacionesController();
		$base = new BaseController();
		$menu = $base->menu();


		echo $this->render('HomeLayout/InsertContainer.twig',[
			'js' => $this->js,
			'session' => $_SESSION,
			'nombre' => $this->nombre,
			'notificaciones' => $notificaciones->get_notificaciones(),
			'menu' => $menu['modulos']
		]);
  }

	public function insert_asignacion(array $data,$file){

		$validate = $this->validate_insert_asignacion($data);
		if(empty($validate)){

			$idVolante = $data['idVolante'];
			$idPuesto = $data['empleado'];
			$puestos = Puestos::where('idPuestoJuridico',"$idPuesto")->get();
			$rpe = $puestos[0]['rpe'];

			$usuarios = Usuarios::where('idEmpleado',"$rpe")->get();
			$usrReceptor = $usuarios[0]['idUsuario'];

			$turno = new TurnadosJuridico([
	            'idVolante' => $idVolante,
	            'idAreaRemitente' => $_SESSION['idArea'],
	            'idAreaRecepcion' => $_SESSION['idArea'],
	            'idUsrReceptor' => $usrReceptor,
	            'idEstadoTurnado' => 'EN ATENCION',
	            'idTipoTurnado' => 'I',
	            'idTipoPrioridad' => $data['prioridad'],
	            'comentario' => $data['asunto'],
	            'usrAlta' => $_SESSION['idUsuario'],
	            'estatus' => 'ACTIVO'
	    	]);

	    	$turno->save();

				$idTurnadoJuridico =  TurnadosJuridico::all()->max('idTurnadoJuridico');
				$base = new BaseController();

				if(!empty($file)){
					$base->upload_file_areas($file,$idVolante,$idTurnadoJuridico,'Internos',$_SESSION['idArea'],$_SESSION['idArea']);
				}


				$base->notifications_turnados('Turnado Interno',$rpe,$idVolante);

				$validate[0] = 'OK';

		}

		echo json_encode($validate);

	}


	public function validate_insert_asignacion($data){

		$is_valid = GUMP::is_valid($data,array(
			'empleado' => 'required|max_len,10|numeric',
			'prioridad'=> 'required|max_len,20|alpha_numeric',
			'asunto' => 'required|max_len,350',
			'idVolante' => 'required|max_len,4|numeric',
		));

		if($is_valid === true){
			$is_valid = [];
		}

		return $is_valid;

	}

}


?>
