<?php

namespace Jur\App\Controllers\Cedulas;
use Jur\App\Controllers\TwigController;
use GUMP;
use Carbon\Carbon;


use Jur\App\Controllers\NotificacionesController;
use Jur\App\Controllers\BaseController;
use Jur\App\Controllers\ErrorsController;

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

	/*--------------------- Templates ------------------*/
	
	public function load_data_templates(){

		$notificaciones = new NotificacionesController();
		$base = new BaseController();
		$menu = $base->menu();

		$data = [
			'js' => $this->js,
			'session' => $_SESSION,
			'nombre' => $this->nombre,
			'notificaciones' => $notificaciones->get_notificaciones(),
			'menu' => $menu['modulos']
		];

		return $data;

	}


	public function home_template(){

		$data = $this->load_data_templates();
		echo $this->render('HomeLayout/HomeContainer.twig',$data);
	}

	public function load_cedula_template($id){

		$volantes = Volantes::where('idVolante',"$id")->get();
		$tipo = $volantes[0]['idTipoDocto'];
		$data = $this->load_data_templates();

		if($tipo == 'OFICIO' || $tipo == 'CIRCULAR'){
			$data['js'] = 'OficiosGenericos';
		} elseif ( $tipo == 'NOTA') {
			$data['js'] = 'NotaGenerico';
		}

		$ds = Plantillas::where('idVolante',"$id")->get();
		if($ds->isEmpty()){
				echo $this->render('HomeLayout/InsertContainer.twig',$data);
		} else {
				echo $this->render('HomeLayout/UpdateContainer.twig',$data);
		}

	}


	/*------------------------- Tabla -----------------------*/

	public function tabla(){

		try{
			
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
	
			echo json_encode(array('status'=>true,'data' => $diversos));
		} catch(\Illuminate\Database\QueryException $e){

			$error = new ErrorsController();
			$error->errores_load_table($e,'Diversos');

		}
	}

	/*---------------- Obtener el registro -------------------*/


	public function get_register_cedula($id){

		try {

			$cedula = plantillas::select('sia_plantillasJuridico.*','e.*','r.tipoRemitente')
						->leftJoin('sia_espaciosJuridico as e','e.idVolante','=','sia_plantillasJuridico.idVolante')
						->leftJoin('sia_remitentesJuridico as r','r.idRemitenteJuridico','=','sia_plantillasJuridico.idRemitente')
						->where('sia_plantillasJuridico.idVolante',"$id")->get();

			echo json_encode(array('status'=>true,'data' => $cedula));

		} catch(\Illuminate\Database\QueryException $e){

			$error = new ErrorsController();
			$error->errores_load_table($e,'Diversos');

		}
	}


	public function get_register_nota(array $data){
		
		try{
			
			$idVolante = $data['id'];
			$vd = Volantes::select('idTipoDocto')->where('idVolante',"$idVolante")->get();
			echo json_encode(array('status'=>true,'data' => $vd));
		} catch(\Illuminate\Database\QueryException $e){

			$error = new ErrorsController();
			$error->errores_load_table($e,'Diversos');

		}
	}


	/*---------------------- Insertar ------------------------*/


	public function insert_cedula_oficio(array $data){
		
		try{
			
			$validate =  $this->validate_oficio($data);
			if($validate['status']){

				$idVolante = $data['idVolante'];

				$v = Volantes::find($idVolante);
				$remitente = $v['idRemitenteJuridico'];

				//$copias = $data['Internos'].$data['Externos'];
				

				$plantilla = new Plantillas([
					'idVolante' => $idVolante,
					'siglas' => $data['siglas'],
					'numFolio' => $data['folio'],
					'fOficio' => $data['fecha_documento'],
					'asunto' => $data['asunto'] ,
					'copias' => $data['copias'],
					'nombreRemitente' => $data['nombre_remitente'],
					'puestoRemitente' => $data['puesto_remitente'],
					'texto' => $data['texto'],
					'idRemitente' => $remitente,
					'usrAlta' => $_SESSION['idUsuario'],
				]);

				if(isset($data['institucion_remitente'])){
					$plantilla['institucionRemitente'] = $data['institucion_remitente'];	
				}

				$plantilla->save();

				$espacios = new Espacios([
					'idVolante' => $idVolante,
					'atte' => $data['e_atte'],
					'copia' => $data['e_copias'],
					'sigla' => $data['e_siglas'],
					'usrAlta' => $_SESSION['idUsuario']
				]);

					$espacios->save();

			}
			echo json_encode($validate);
		} catch(\Illuminate\Database\QueryException $e){

			$error = new ErrorsController();
			$error->errores_load_table($e,'Diversos');

		}
	
	}

	public function insert_cedula_nota(array $data){

		try{
			$validate = $this->validate_nota($data);
			if($validate['status']){
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
						
			}
					
			echo json_encode($validate);
		} catch(\Illuminate\Database\QueryException $e){

			$error = new ErrorsController();
			$error->errores_load_table($e,'Diversos');

		}
	}


	/*------------------ Update ----------------------*/


	public function update_cedula_oficio(array $data){

		try{

			$validate = $this->validate_oficio($data);
			
			if($validate['status']){
				
				$id = $data['idPlantillaJuridico'];
				$idVolante = $data['idVolante'];
				
				if(isset($data['institucion_remitente'])){
					$plantilla['institucionRemitente'] = $data['institucion_remitente'];	
				}
				
				
				Plantillas::find($id)->update([
					'idVolante' => $idVolante,
					'siglas' => $data['siglas'],
					'numFolio' => $data['folio'],
					'fOficio' => $data['fecha_documento'],
					'asunto' => $data['asunto'] ,
					'copias' => $data['copias'],
					'nombreRemitente' => $data['nombre_remitente'],
					'puestoRemitente' => $data['puesto_remitente'],
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

			}
				
			echo json_encode($validate);
		
		} catch(\Illuminate\Database\QueryException $e){

			$error = new ErrorsController();
			$error->errores_load_table($e,'Diversos');

		}

	}

	public function update_cedula_nota(array $data){

		try{

			$validate = $this->validate_nota($data);
			if($validate['status']){
					
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
										
			}
			echo json_encode($validate);
		} catch(\Illuminate\Database\QueryException $e){

			$error = new ErrorsController();
			$error->errores_load_table($e,'Diversos');

		}
	}



	/*----------------------- Validacion ------------------*/

	public function validate_oficio(array $data){

		$validacion = [];
		$validacion['status'] = false;

		$valid = GUMP::is_valid($data,array(
			'siglas' => 'required|max_len,100',
			'folio' => 'required|max_len,50',
			'fecha_documento' => 'required|max_len,10',
			'asunto' =>'required|max_len,200',
			'texto' => 'required',
			'copias' => 'required',
			'nombre_remitente' => 'required|max_len,100',
			'puesto_remitente' => 'required|max_len,300',
			'e_atte' => 'required|max_len,2|numeric',
			'e_copias' => 'required|max_len,2|numeric',
			'e_siglas' => 'required|max_len,2|numeric',
		));

		if($valid === true){
			$validacion['status'] = true;
		} else{
			$validacion['message'] = $valid[0];
		}

		return $validacion;
	}

	public function validate_nota(array $data){

		$validacion = [];
		$validacion['status'] = false;

	

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
			$validacion['status'] = true;
		} else{
			$validacion['message'] = $valid[0];
		}

		return $validacion;
	}

}

?>
