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
use Jur\App\Models\Cedulas\Plantillas;


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


	public function Home_internos(){

		$notificaciones = new NotificacionesController();
		$base = new BaseController();
		$menu = $base->menu();


		echo $this->render('HomeLayout/HomeContainer.twig',[
			'js' => 'DiversosInternos',
			'session' => $_SESSION,
			'nombre' => $this->nombre,
			'notificaciones' => $notificaciones->get_notificaciones(),
			'menu' => $menu['modulos']
		]);
	}



		public function tabla_internos(){

	        $area = $_SESSION['idArea'];

	        $diversos = Volantes::select('sia_Volantes.*','c.nombre as caracter','a.nombre as accion','t.idEstadoTurnado','sub.idTipoDocto')
	             ->join('sia_catCaracteres as c','c.idCaracter','=','sia_Volantes.idCaracter')
	             ->join('sia_CatAcciones as a','a.idAccion','=','sia_Volantes.idAccion')
	             ->join('sia_VolantesDocumentos as vd','vd.idVolante','=','sia_Volantes.idVolante')
	             ->join( 'sia_catSubTiposDocumentos as sub','sub.idSubTipoDocumento','=','vd.idSubTipoDocumento')
	             ->join('sia_TurnadosJuridico as t','t.idVolante','=','sia_Volantes.idVolante')
	             ->where('sub.auditoria','NO')
	             ->where('t.idAreaRecepcion','=',"$area")
	             ->where('t.idTipoTurnado','I')
							 ->where('t.estatus','ACTIVO')
	             ->get();

			echo json_encode($diversos);
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
						 ->where('t.estatus','ACTIVO')
             ->get();

		echo json_encode($diversos);
	}

	public function load_cedula_template($id){

		$notificaciones = new NotificacionesController();
		$base = new BaseController();
		$menu = $base->menu();

		$volantes = Volantes::where('idVolante',"$id")->get();
		$tipo = $volantes[0]['idTipoDocto'];

		$template = [
			'session' => $_SESSION,
			'nombre' => $this->nombre,
			'notificaciones' => $notificaciones->get_notificaciones(),
			'menu' => $menu['modulos']
		];

		if($tipo == 'OFICIO' || $tipo == 'CIRCULAR'){
			$template['js'] = 'OficiosGenericos';
		} elseif ( $tipo == 'NOTA') {
			$template['js'] = 'NotaGenerico';
		}



		$ds = Plantillas::where('idVolante',"$id")->get();
		if($ds->isEmpty()){
					echo $this->render('HomeLayout/InsertContainer.twig',$template);
		} else {
				$template['id'] = $id;
				echo $this->render('HomeLayout/UpdateContainer.twig',$template);
		}


	}




	public function get_register_cedula($id){

			$cedula = plantillas::select('sia_plantillasJuridico.*','e.*')
							->leftJoin('sia_espaciosJuridico as e','e.idVolante','=','sia_plantillasJuridico.idVolante')
							->where('sia_plantillasJuridico.idVolante',"$id")->get();

			echo json_encode($cedula);
	}


	public function get_register_nota(array $data){
		$idVolante = $data['id'];
		//$vd = Volantes::where('idVolante',"$idVolante")->get();
    $vd = Volantes::select('idTipoDocto')->where('idVolante',"$idVolante")->get();
		echo json_encode($vd);
	}



	public function insert_cedula_oficio(array $data){
		$validate =  $this->validate_oficio($data);
		if(empty($validate)){

			$idVolante = $data['idVolante'];

			$v = Volantes::find($idVolante);
			$remitente = $v['idRemitenteJuridico'];

			$plantilla = new Plantillas([
				'idVolante' => $idVolante,
				'siglas' => $data['siglas'],
				'numFolio' => $data['folio'],
				'fOficio' => $data['fecha_documento'],
				'asunto' => $data['asunto'] ,
				'copias' => $data['copias'],
				'texto' => $data['texto'],
				'idRemitente' => $remitente,
				'usrAlta' => $_SESSION['idUsuario'],
			]);

			$plantilla->save();

			$espacios = new Espacios([
				'idVolante' => $idVolante,
				'atte' => $data['e_atte'],
				'copia' => $data['e_copias'],
				'sigla' => $data['e_siglas'],
				'usrAlta' => $_SESSION['idUsuario']
			]);

				$espacios->save();
				$validate[0] = 'OK';

		}
		echo json_encode($validate);
	}


	public function update_cedula_oficio(array $data){

		$validate = $this->validate_oficio($data);

		if(empty($validate)){

		$id = $data['idPlantillaJuridico'];
		$idVolante = $data['idVolante'];


		Plantillas::find($id)->update([
			'idVolante' => $idVolante,
			'siglas' => $data['siglas'],
			'numFolio' => $data['folio'],
			'fOficio' => $data['fecha_documento'],
			'asunto' => $data['asunto'] ,
			'copias' => $data['copias'],
			'texto' => $data['texto'],
			'usrModificacion' => $_SESSION['idUsuario'],
			'fModificacion' => Carbon::now('America/Mexico_City')->format('Y-d-m H:i:s')
		]);



		Espacios::where('idVolante',"$idVolante")->update([
			'atte' => $data['e_atte'],
			'copia' => $data['e_copias'],
			'sigla' => $data['e_siglas'],
			'usrModificacion' => $_SESSION['idUsuario'],
			'fModificacion' => Carbon::now('America/Mexico_City')->format('Y-d-m H:i:s')
		]);

			 $validate[0] = 'OK';

		}
		echo json_encode($validate);

	}


	public function validate_oficio(array $data){

		$valid = GUMP::is_valid($data,array(
			'siglas' => 'required|max_len,100',
			'folio' => 'required|max_len,50',
			'fecha_documento' => 'required|max_len,10',
			'asunto' =>'required|max_len,200',
			'texto' => 'required',
      'e_atte' => 'required|max_len,2|numeric',
      'e_copias' => 'required|max_len,2|numeric',
      'e_siglas' => 'required|max_len,2|numeric',
		));

		if($valid === true){
			$valid = [];
		}

		return $valid;
	}


	public function insert_cedula_nota(array $data){

			$validate = $this->validate_nota($data);
			if(empty($validate)){
				$idVolante = $data['idVolante'];

				$v = Volantes::find($idVolante);
				$remitente = $v['idRemitenteJuridico'];

				$plantilla = new Plantillas([
					'idVolante' => $idVolante,
					'siglas' => $data['siglas'],
					'numFolio' => $data['folio'],
					'fOficio' => $data['fecha_documento'],
					'copias' => $data['copias'],
					'texto' => $data['texto'],
					'idRemitente' => $remitente,
					'idPuestoJuridico' => $data['idPuestoJuridico'] ,
					'refDocumento' => $data['refDocumento'],
					'usrAlta' => $_SESSION['idUsuario'],
				]);

				$plantilla->save();

				$espacios = new Espacios([
					'idVolante' => $idVolante,
					'atte' => $data['e_atte'],
					'copia' => $data['e_copias'],
					'sigla' => $data['e_siglas'],
					'usrAlta' => $_SESSION['idUsuario']
				]);

					$espacios->save();
					$validate[0] = 'OK';

			}

			echo json_encode($validate);
	}


	public function update_cedula_nota(array $data){

		$validate = $this->validate_nota($data);
		if(empty($validate)){

			$id = $data['idPlantillaJuridico'];
			$idVolante = $data['idVolante'];


			Plantillas::find($id)->update([
				'siglas' => $data['siglas'],
				'numFolio' => $data['folio'],
				'fOficio' => $data['fecha_documento'],
				'refDocumento' => $data['refDocumento'] ,
				'copias' => $data['copias'],
				'texto' => $data['texto'],
				'idPuestoJuridico' => $data['idPuestoJuridico'] ,
				'usrModificacion' => $_SESSION['idUsuario'],
				'fModificacion' => Carbon::now('America/Mexico_City')->format('Y-d-m H:i:s')
			]);



			Espacios::where('idVolante',"$idVolante")->update([
				'atte' => $data['e_atte'],
				'copia' => $data['e_copias'],
				'sigla' => $data['e_siglas'],
				'usrModificacion' => $_SESSION['idUsuario'],
				'fModificacion' => Carbon::now('America/Mexico_City')->format('Y-d-m H:i:s')
			]);

				 $validate[0] = 'OK';

		}
		echo json_encode($validate);
	}


	public function validate_nota(array $data){
		$valid = GUMP::is_valid($data,array(
			'siglas' => 'required|max_len,100',
			'folio' => 'required|max_len,50',
			'fecha_documento' => 'required|max_len,10',
			'refDocumento' => 'required|max_len,50',
			'texto' => 'required',
      'e_atte' => 'required|max_len,2|numeric',
      'e_copias' => 'required|max_len,2|numeric',
      'e_siglas' => 'required|max_len,2|numeric',
		));

		if($valid === true){
			$valid = [];
		}

		return $valid;
	}




}

?>
