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


class IfaController extends TwigController {

	private $js = 'Ifa';
	private $nombre = 'IFA';


	/*--------------------- Templates -------------------*/

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
	
	public function cedula_template($id){
	
		$data = $this->load_data_templates();
		$ds = DocumentosSiglas::where('idVolante',"$id")->get();
		if($ds->isEmpty()){
					echo $this->render('HomeLayout/InsertContainer.twig',$data);
		} else {
				echo $this->render('HomeLayout/UpdateContainer.twig',$data);
		}
	
	}

	/*----------------------- Tabla ----------------------*/

	public function tabla(){

		try{
			$area = $_SESSION['idArea'];
			
			$ifa = Volantes::select('sia_Volantes.*','c.nombre as caracter','a.nombre as accion','audi.clave','sia_Volantes.extemporaneo','t.idEstadoTurnado')
            ->join('sia_catCaracteres as c','c.idCaracter','=','sia_Volantes.idCaracter')
            ->join('sia_CatAcciones as a','a.idAccion','=','sia_Volantes.idAccion')
            ->join('sia_VolantesDocumentos as vd','vd.idVolante','=','sia_Volantes.idVolante')
            ->join('sia_auditorias as audi','audi.idAuditoria','=','vd.cveAuditoria')
            ->join( 'sia_catSubTiposDocumentos as sub','sub.idSubTipoDocumento','=','vd.idSubTipoDocumento')
            ->join('sia_TurnadosJuridico as t','t.idVolante','=','sia_Volantes.idVolante')
            ->where('sub.nombre','=','IFA')
            ->where('t.idAreaRecepcion','=',"$area")
            ->where('t.idTipoTurnado','V')
            ->get();
			
			
			echo json_encode(array('status'=>true,'data' => $ifa));
		} catch(\Illuminate\Database\QueryException $e){

			$error = new ErrorsController();
			$error->errores_load_table($e,'Ifa');

		}
	}

	/*--------------------- Obtener el Registro ----------------*/


	public function get_register_cedula($id){
		try{
			$cedula = DocumentosSiglas::select('sia_documentosSiglas.*','e.*')
				->leftJoin('sia_espaciosJuridico as e','e.idVolante','=','sia_documentosSiglas.idVolante')
				->where('sia_documentosSiglas.idVolante',"$id")->get();
				echo json_encode(array('status'=>true,'data' => $cedula));
		} catch(\Illuminate\Database\QueryException $e){

			$error = new ErrorsController();
			$error->errores_load_table($e,'Ifa');

		}
	}


	/*--------------------------- Insertar --------------------------*/


	public function insert_cedula(array $data){

		try{

			$validate =  $this->validate($data);
			if($validate['status']){
	
				$idVolante = $data['idVolante'];
	
				$volantesDocumentos = VolantesDocumentos::where('idVolante',"$idVolante")->get();
				$subTipo = $volantesDocumentos[0]['idSubTipoDocumento'];
	
				$documento = new DocumentosSiglas([
					'idVolante' => $idVolante,
					'idSubTipoDocumento' => $subTipo,
					'idDocumentoTexto' => $data['texto'],
					'idPuestosJuridico' => $data['firmas'],
					'fOficio' => $data['fecha_documento'],
					'siglas' => $data['siglas'],
					'usrAlta' => $_SESSION['idUsuario'],
				]);
	
				$documento->save();
	
				$espacios = new Espacios([
					'idVolante' => $idVolante,
					'encabezado' => $data['e_observaciones'],
					'cuerpo' => $data['e_texto'],
					'pie' => $data['e_firmas'],
					'copiaCedula' => $data['e_copias'],
					'fechaDocto' => $data['e_fecha'],
					'usrAlta' => $_SESSION['idUsuario']
				]);
	
				$espacios->save();	
			}
			echo json_encode($validate);

		} catch(\Illuminate\Database\QueryException $e){

			$error = new ErrorsController();
			$error->errores_load_table($e,'Ifa');

		}
	}


	/*-------------------------- Update -------------------------*/

	public function update_cedula(array $data){

		try{

			
			$validate = $this->validate($data);
			
			if($validate['status']){
				
				$id = $data['idDocumentoSiglas'];
				$idVolante = $data['idVolante'];
				
				DocumentosSiglas::find($id)->update([
					'idDocumentoTexto' => $data['texto'],
					'idPuestosJuridico' => $data['firmas'],
					'fOficio' => $data['fecha_documento'],
					'siglas' => $data['siglas'],
					'usrModificacion' => $_SESSION['idUsuario'],
					'fModificacion' => Carbon::now('America/Mexico_City')->format('Y-d-m H:i:s')
				]);
					
					
				Espacios::where('idVolante',"$idVolante")->update([
					'encabezado' => $data['e_observaciones'],
					'cuerpo' => $data['e_texto'],
					'pie' => $data['e_firmas'],
					'sigla' => $data['e_copias'],
					'fechaDocto' => $data['e_fecha'],
					'usrModificacion' => $_SESSION['idUsuario'],
					'fModificacion' => Carbon::now('America/Mexico_City')->format('Y-d-m H:i:s')
				]);		
			}
			echo json_encode($validate);
		} catch(\Illuminate\Database\QueryException $e){

			$error = new ErrorsController();
			$error->errores_load_table($e,'Ifa');

		}

	}


	/*--------------------- Validacion ---------------------*/


	public function validate(array $data){

		$validacion = [];
		$validacion['status'] = false;

		$valid = GUMP::is_valid($data,array(
			'siglas' => 'required|max_len,150',
			'fecha_documento' => 'required|max_len,10',
			'firmas' => 'required|max_len,50',
			'texto' => 'required|max_len,2|numeric',
			'e_observaciones' => 'required|max_len,2|numeric',
			'e_texto' => 'required|max_len,2|numeric',
			'e_firmas' => 'required|max_len,2|numeric',
			'e_copias' => 'required|max_len,2|numeric',
			'e_fecha' => 'required|max_len,2|numeric',
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
