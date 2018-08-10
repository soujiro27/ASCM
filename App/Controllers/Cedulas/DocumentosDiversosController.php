<?php

namespace Jur\App\Controllers\Cedulas;
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
use Jur\App\Models\Cedulas\Confrontas;


class DocumentosDiversosController extends TwigController {

	private $js = 'DocumentosDiversos';
	private $nombre = 'DocumentosDiversos';


	public function Home(){

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

	public function tabla(){

        $area = $_SESSION['idArea'];

        $diversos = Volantes::select('sia_Volantes.*','c.nombre as caracter','a.nombre as accion','t.idEstadoTurnado','sub.idTipoDocto')
             ->join('sia_catCaracteres as c','c.idCaracter','=','sia_Volantes.idCaracter')
             ->join('sia_CatAcciones as a','a.idAccion','=','sia_Volantes.idAccion')
             ->join('sia_VolantesDocumentos as vd','vd.idVolante','=','sia_Volantes.idVolante')
             ->join( 'sia_catSubTiposDocumentos as sub','sub.idSubTipoDocumento','=','vd.idSubTipoDocumento')
             ->join('sia_TurnadosJuridico as t','t.idVolante','=','sia_Volantes.idVolante')
             ->where('sub.auditoria','NO')
             ->where('t.idAreaRecepcion','=',"$area")
             ->where('t.idTipoTurnado','V')
             ->get();

		echo json_encode($diversos);
	}

	public function load_cedula_template($id,$modulo){

		$base = new BaseController();
		$base->asignacion_template($id,$this->js,$this->nombre,$modulo);
	}


	public function insert_asignacion(array $data,$file){
		$base = new BaseController();
		$validate = $base->insert_asignacion($data,$file);
		echo json_encode($validate );
	}

	public function nueva_observacion($id){
		$notificaciones = new NotificacionesController();
		$base = new BaseController();
		$menu = $base->menu();


		echo $this->render('HomeLayout/InsertObservaciones.twig',[
			'js' => 'Observaciones',
			'session' => $_SESSION,
			'nombre' => $this->nombre,
			'notificaciones' => $notificaciones->get_notificaciones(),
			'menu' => $menu['modulos'],
			'id' => $id
		]);
	}


	public function get_register_cedula(array $data){
			$idVolante = $data['id'];
			$cedula = Confrontas::select('sia_ConfrontasJuridico.*','e.*')
							->leftJoin('sia_espaciosJuridico as e','e.idVolante','=','sia_ConfrontasJuridico.idVolante')
							->where('sia_ConfrontasJuridico.idVolante',"$idVolante")->get();
			echo json_encode($cedula);
	}


	public function get_register_nota(array $data){
		$idVolante = $data['id'];
		$vd = VolantesDocumentos::where('idVolante',"$idVolante")->get();
		echo json_encode($vd);
	}

	public function insert_cedula(array $data){

		$validate =  $this->validate($data);
		if(empty($validate)){

			$idVolante = $data['idVolante'];

			$confronta = new Confrontas([
				'idVolante' => $idVolante,
				'nombreResponsable' => $data['nombre'],
				'cargoResponsable' => $data['cargo'],
				'siglas' => $data['siglas'],
				'numFolio' => $data['folio'],
				'refDocumento' => $data['ref_documento'],
				'fConfronta' => $data['fecha_confronta'],
				'fOficio' => $data['fecha_documento'],
				'hConfronta' => $data['hora_confronta'],
				'usrAlta' => $_SESSION['idUsuario'],
			]);

			if(isset($data['notaInformativa'])){ $confronta['notaInformativa'] = $data['notaInformativa'];  }

			$confronta->save();

			$espacios = new Espacios([
				'idVolante' => $idVolante,
        'sigla' => $data['e_siglas'],
				'usrAlta' => $_SESSION['idUsuario']
			]);

				$espacios->save();
				$validate[0] = 'OK';

		}
		echo json_encode($validate);
	}


	public function update_cedula(array $data){

		$validate = $this->validate($data);

		if(empty($validate)){

		$id = $data['idConfrontaJuridico'];
		$idVolante = $data['idVolante'];

		$datos_confronta = [
			'nombreResponsable' => $data['nombre'],
			'cargoResponsable' => $data['cargo'],
			'siglas' => $data['siglas'],
			'numFolio' => $data['folio'],
			'refDocumento' => $data['ref_documento'],
			'fConfronta' => $data['fecha_confronta'],
			'fOficio' => $data['fecha_documento'],
			'hConfronta' => $data['hora_confronta'],
			'usrModificacion' => $_SESSION['idUsuario'],
			'fModificacion' => Carbon::now('America/Mexico_City')->format('Y-d-m H:i:s')
		];

		if(isset($data['notaInformativa'])){ $datos_confronta['notaInformativa'] = $data['notaInformativa'];  }

		Confrontas::find($id)->update($datos_confronta);


		Espacios::where('idVolante',"$idVolante")->update([
      'sigla' => $data['e_siglas'],
			'usrModificacion' => $_SESSION['idUsuario'],
			'fModificacion' => Carbon::now('America/Mexico_City')->format('Y-d-m H:i:s')
		]);

			 $validate[0] = 'OK';

		}
		echo json_encode($validate);

	}


	public function validate(array $data){

		$valid = GUMP::is_valid($data,array(
			'nombre' => 'required|max_len,120',
			'cargo' => 'required|max_len,120',
			'siglas' => 'required|max_len,100',
			'folio' => 'required|max_len,50',
			'ref_documento' => 'required|max_len,50',
			'fecha_confronta' => 'required|max_len,10',
			'fecha_documento' => 'required|max_len,10',
			'hora_confronta' => 'required|max_len,5',
      'e_siglas' => 'required|max_len,2|numeric',
		));

		if($valid === true){
			$valid = [];
		}

		return $valid;
	}




}

?>
