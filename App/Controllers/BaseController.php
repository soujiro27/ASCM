<?php
namespace Jur\App\Controllers;

use Jur\App\Models\Security\UsuariosRoles;
use Jur\App\Models\Security\RolesModulos;
use Jur\App\Models\Notificaciones\Usuarios;

use Jur\App\Models\Volantes\AnexosJuridico;
use Jur\App\Models\Volantes\Volantes;
use Jur\App\Models\Volantes\TurnadosJuridico;

use Jur\App\Models\Modulos\Puestos;

use Carbon\Carbon;
use GUMP;

use Jur\App\Controllers\NotificacionesController;
use Jur\App\Controllers\TwigController;

class BaseController extends TwigController{


	#obtiene los modulos que le corresponden al usuario
	public function get_roles_modulos(){

		$idUsuario = $_SESSION['idUsuario'];

		$usuarios_roles = UsuariosRoles::select('m.*')
						->join('sia_rolesmodulos as rm','rm.idRol','=','sia_usuariosroles.idRol')
						->join('sia_modulos as m','m.idModulo','=','rm.idModulo')
						->where('idUsuario',"$idUsuario")
						->get();


		return $usuarios_roles;

	}




	#crea el array para el render del home layout
	public function menu(){

		$url = 'jur/Templates/HomeLayout/menu.json';
		$data = file_get_contents($url);
		$json = json_decode($data,TRUE);

		$roles = $this->get_roles_modulos();

		foreach ($roles as $key => $value) {

		$pos = strstr($value->liga,'.');

		if($pos != false){
			$liga = './.'.$value->liga;
		} else {
			$liga = $value->liga;
		}


		$data = array(
					'modulo' => $value->idModulo,
					'nombre' => $value->nombre,
					'panel' => $value->panel,
					'liga' => $liga,
					'icono' => $value->icono
		);

			array_push($json['modulos'][$value->panel]['submenus'],$data);


		}


		return $json;

	}

		public function get_data_area($area){

		$datos = Puestos::select('sia_PuestosJuridico.*','u.idUsuario')
				->join('sia_usuarios as u','u.idEmpleado','=','sia_PuestosJuridico.rpe')
				->where('sia_PuestosJuridico.titular','SI')
				->where('sia_PuestosJuridico.idArea',"$area")
				->get();

		return $datos;
	}


	public function upload_file_areas($file,array $data){


		$time = Carbon::now('America/Mexico_City')->format('H:i:s');
		$formatTime = str_replace(':', '-', $time);

		$nombre_file = $file['file']['name'];
		$extension = explode('.',$nombre_file);
		$nombre_final = $formatTime.'.'.$extension[1];

		$directory ='jur/files/'.$data['idVolante'].'/'.$data['carpeta'];

        $extension = explode('.',$nombre_file);

        if(!file_exists($directory)){

            mkdir($directory,0777,true);
        }

    move_uploaded_file($file['file']['tmp_name'],$directory.'/'.$nombre_final);

      $anexo = new AnexosJuridico([
  		'idTurnadoJuridico' => $data['idTurnadoJuridico'],
  		'archivoOriginal' => $nombre_file,
  		'archivoFinal' => $nombre_final,
  		'idTipoArchivo' => $extension[1],
  		'idVolante' => $data['idVolante'],
  		'areaRemitente' => $data['areaRemitente'],
  		'areaRecepcion' => $data['areaRecepcion'],
			'tipo' => $data['tipo'],
  		'usrAlta' => $_SESSION['idUsuario'],
      'estatus' => 'ACTIVO'
          ]);

  	$anexo->save();


	}


	public function notifications_complete($tipo,$area,$idVolante){

		$datosArea = $this->get_data_area($area);
		$rpe_boss = $datosArea[0]['rpe'];

		$this->send_notification_complete($rpe_boss,$idVolante,$datosArea,$tipo);


	}

	public function notifications_turnados($tipo,$recibe,$idVolante){


		$datosArea = Puestos::where('rpe',"$recibe")->get();
		$rpe_boss = $recibe;

		$this->send_notification_complete($rpe_boss,$idVolante,$datosArea,$tipo);

	}


	public function get_datos_Volante($idVolante){


		$volantes = Volantes::select('sia_volantes.*','vd.cveAuditoria','c.idTipoDocto','c.nombre')
					->leftjoin('sia_volantesDocumentos as vd','vd.idVolante','=','sia_volantes.idVolante')
					->leftjoin('sia_catSubTiposDocumentos as c','c.idSubTipoDocumento','=','vd.idSubTipoDocumento')
					->where('sia_volantes.idVolante',"$idVolante")
					->get();

		return $volantes[0];

	}

	public function get_id_usr($rpe){

		$usuarios = Usuarios::where('idEmpleado',"$rpe")->where('estatus','ACTIVO')->get();
		$idUsuario = $usuarios[0]['idUsuario'];
		return $idUsuario;
	}

	public function send_notification_complete($rpe_recibe,$idVolante,$datosArea,$tipo){

		$notifica = new NotificacionesController();
/*	-envia notificaciones a dos usuarios el que recibe y el que asiste

		$rpeAll = $notifica->get_rpe_asiste($rpe_recibe);
		array_push($rpeAll,$rpe_recibe);

		$idusuarios = [];


		foreach ($rpeAll as $key => $value) {
			array_push($idusuarios,$this->get_id_usr($value));
		}
*/


		$idUsuario = $this->get_id_usr($rpe_recibe);

		$datosVolante = $this->get_datos_Volante($idVolante);



		$tipoDocumento = $datosVolante['nombre'];
		$nombre = $datosArea[0]['saludo'].' '.$datosArea[0]['nombre'].' '.$datosArea[0]['paterno'].' '.$datosArea[0]['materno'];
		$folio = $datosVolante['folio'];

		$mensaje = $notifica->create_message_notifications($tipo,$nombre,$tipoDocumento,$folio);




		/*foreach ($idusuarios as $key => $value) {
			$notifica->send_notifications($value,$mensaje);
		}*/

		$notifica->send_notifications($idUsuario,$mensaje);
	}




}









?>
