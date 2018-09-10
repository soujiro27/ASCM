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


class ConfrontaController extends TwigController {

	private $js = 'Confronta';
	private $nombre = 'Confronta';


	/*---------------------Templates ------------------*/
	public function load_data_templates() {

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

		$data = $this->load_data_templates();
		$ds = Confrontas::where('idVolante',"$id")->get();
		if($ds->isEmpty()){
					echo $this->render('HomeLayout/InsertContainer.twig',$data);
		} else {
				
				echo $this->render('HomeLayout/UpdateContainer.twig',$data);
		}

	}


	/*------------------- Tabla ----------------------------*/

	public function tabla(){
		try{
			$area = $_SESSION['idArea'];
        	$confronta = Volantes::select('sia_Volantes.*','c.nombre as caracter','a.nombre as accion','audi.clave','sia_Volantes.extemporaneo','t.idEstadoTurnado','vd.notaConfronta')
            ->join('sia_catCaracteres as c','c.idCaracter','=','sia_Volantes.idCaracter')
            ->join('sia_CatAcciones as a','a.idAccion','=','sia_Volantes.idAccion')
            ->join('sia_VolantesDocumentos as vd','vd.idVolante','=','sia_Volantes.idVolante')
            ->join('sia_auditorias as audi','audi.idAuditoria','=','vd.cveAuditoria')
            ->join( 'sia_catSubTiposDocumentos as sub','sub.idSubTipoDocumento','=','vd.idSubTipoDocumento')
            ->join('sia_TurnadosJuridico as t','t.idVolante','=','sia_Volantes.idVolante')
            ->where('sub.nombre','=','CONFRONTA')
            ->where('t.idAreaRecepcion','=',"$area")
            ->where('t.idTipoTurnado','V')
            ->get();
			

			echo json_encode(array('status'=>true,'data' => $confronta));

		}catch(\Illuminate\Database\QueryException $e){

			$error = new ErrorsController();
			$error->errores_load_table($e,'Confronta');

		}
        
	}

	/*----------------- Obtener Registro ------------------------*/


	public function get_register_cedula($id){
		try{
			$cedula = Confrontas::select('sia_ConfrontasJuridico.*','e.*')
							->leftJoin('sia_espaciosJuridico as e','e.idVolante','=','sia_ConfrontasJuridico.idVolante')
							->where('sia_ConfrontasJuridico.idVolante',"$id")->get();
			echo json_encode(array('status'=>true,'data' => $cedula));

		}catch(\Illuminate\Database\QueryException $e){

			$error = new ErrorsController();
			$error->errores_load_table($e,'Confronta');

		}		
	}


	/*------------------------- Insertar  ----------------------*/

	public function insert_cedula(array $data){

		try{

			
			$validate =  $this->validate($data);
			if($validate['status']){
				
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
					'nombreRemitente' => $data['nombreRemitente'],
					'puestoRemitente' => $data['puestoRemitente'],
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
			}
			echo json_encode($validate);

		}catch(\Illuminate\Database\QueryException $e){

			$error = new ErrorsController();
			$error->errores_load_table($e,'Confronta');

		}	
	}


	public function update_cedula(array $data){
		try{

			
			$validate = $this->validate($data);
			
			if($validate['status']){
				
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
					'nombreRemitente' => $data['nombreRemitente'],
					'puestoRemitente' => $data['puestoRemitente'],
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
			
			}
		echo json_encode($validate);

		} catch(\Illuminate\Database\QueryException $e){

			$error = new ErrorsController();
			$error->errores_load_table($e,'Confronta');

		}	

	}


	public function validate(array $data){

		$validacion = [];
		$validacion['status'] = false;

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
			'nombreRemitente' => 'required|max_len,100',
			'puestoRemitente' => 'required|max_len,300',
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
