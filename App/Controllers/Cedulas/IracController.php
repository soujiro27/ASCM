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


class IracController extends TwigController {

	private $js = 'Irac';
	private $nombre = 'Irac';

/*------------------ Carga de Templates -------------*/


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

public function home_template_internos(){
	$data = $this->load_data_templates();
	$data['js'] = 'Irac-Internos';
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

/*-------------------- Tabla ---------------------*/


	public function tabla(){
		try {

			$area = $_SESSION['idArea'];
	    $irac = Volantes::select('sia_Volantes.*','c.nombre as caracter','a.nombre as accion','audi.clave','sia_Volantes.extemporaneo','t.idEstadoTurnado')
	        ->join('sia_catCaracteres as c','c.idCaracter','=','sia_Volantes.idCaracter')
	        ->join('sia_CatAcciones as a','a.idAccion','=','sia_Volantes.idAccion')
	        ->join('sia_VolantesDocumentos as vd','vd.idVolante','=','sia_Volantes.idVolante')
	        ->join('sia_auditorias as audi','audi.idAuditoria','=','vd.cveAuditoria')
	        ->join( 'sia_catSubTiposDocumentos as sub','sub.idSubTipoDocumento','=','vd.idSubTipoDocumento')
	        ->join('sia_TurnadosJuridico as t','t.idVolante','=','sia_Volantes.idVolante')
	        ->where('sub.nombre','=','IRAC')
	        ->where('t.idAreaRecepcion','=',"$area")
	        ->where('t.idTipoTurnado','V')
	        ->get();


			echo json_encode(array('status'=>true,'data' => $irac));

		}catch(\Illuminate\Database\QueryException $e){

			$error = new ErrorsController();
			$error->errores_load_table($e,'Irac');

		}
	}

	public function tabla_internos(){
		try {

			$area = $_SESSION['idArea'];

  			$idUsuario = $_SESSION['idUsuario'];
			
			$iracs = Volantes::select('sia_Volantes.*','c.nombre as caracter','a.nombre as accion','audi.clave','sia_Volantes.extemporaneo','t.idEstadoTurnado')
			->join('sia_catCaracteres as c','c.idCaracter','=','sia_Volantes.idCaracter')
			->join('sia_CatAcciones as a','a.idAccion','=','sia_Volantes.idAccion')
			->join('sia_VolantesDocumentos as vd','vd.idVolante','=','sia_Volantes.idVolante')
			->join('sia_auditorias as audi','audi.idAuditoria','=','vd.cveAuditoria')
			->join( 'sia_catSubTiposDocumentos as sub','sub.idSubTipoDocumento','=','vd.idSubTipoDocumento')
			->join('sia_TurnadosJuridico as t','t.idVolante','=','sia_Volantes.idVolante')
			->where('sub.nombre','=','IRAC')
			->where('t.idAreaRecepcion','=',"$area")
			->where('t.idUsrReceptor',"$idUsuario")
			->where('t.idTipoTurnado','I')
			->orderBy('t.idTurnadoJuridico','DESC')
			->first();
	  
			$res[0] = $iracs;

			echo json_encode(array('status'=>true,'data' => $res));

		}catch(\Illuminate\Database\QueryException $e){

			$error = new ErrorsController();
			$error->errores_load_table($e,'Irac');

		}
	}


/*------------------ Obtener el Registro -----------------*/

	public function get_register_cedula($id){

		try {
			$cedula = DocumentosSiglas::select('sia_documentosSiglas.*','e.*')
							->leftJoin('sia_espaciosJuridico as e','e.idVolante','=','sia_documentosSiglas.idVolante')
							->where('sia_documentosSiglas.idVolante',"$id")->get();
			echo json_encode(array('status'=>true,'data' => $cedula));

		}catch(\Illuminate\Database\QueryExcepton $e){
			$error = new ErrorsController();
			$error->errores_load_table($e,'Irac');
		}

	}

/*--------------------- Insert Cedula -------------------*/


	public function insert_cedula(array $data){

		try {

			$validate =  $this->validate($data);
			if($validate['status']){

				$idVolante = $data['idVolante'];

				$volantesDocumentos = VolantesDocumentos::where('idVolante',"$idVolante")->get();
				$subTipo = $volantesDocumentos[0]['idSubTipoDocumento'];

				$documento = new DocumentosSiglas([
					'idVolante' => $idVolante,
					'idSubTipoDocumento' => $subTipo,
					'idPuestosJuridico' => $data['firmas'],
					'fOficio' => $data['fecha_documento'],
					'siglas' => $data['siglas'],
	        'numFolio' => $data['folio'],
					'nombreRemitente' => $data['nombre_remitente'],
					'puestoRemitente' => $data['puesto_remitente'],
					'usrAlta' => $_SESSION['idUsuario'],
				]);

				$documento->save();

				$espacios = new Espacios([
					'idVolante' => $idVolante,
					'atte' => $data['e_atte'],
					'copia' => $data['e_copias_oficio'],
					'sigla' => $data['e_siglas'],
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

		} catch(\Illuminate\Database\QueryExcepton $e){
			$error = new ErrorsController();
			$error->errores_load_table($e,'Irac');
		}


	}




	public function update_cedula(array $data){

		try {


					$validate = $this->validate($data);

					if($validate['status']){

					$id = $data['idDocumentoSiglas'];
					$idVolante = $data['idVolante'];

					DocumentosSiglas::find($id)->update([
						'siglas' => $data['siglas'],
			      'numFolio' => $data['folio'],
						'fOficio' => $data['fecha_documento'],
						'nombreRemitente' => $data['nombre_remitente'],
						'puestoRemitente' => $data['puesto_remitente'],
						'idPuestosJuridico' => $data['firmas'],
						'usrModificacion' => $_SESSION['idUsuario'],
						'fModificacion' => Carbon::now('America/Mexico_City')->format('Y-d-m H:i:s')
					]);


					Espacios::where('idVolante',"$idVolante")->update([
						'atte' => $data['e_atte'],
						'copia' => $data['e_copias_oficio'],
						'sigla' => $data['e_siglas'],
						'encabezado' => $data['e_observaciones'],
						'cuerpo' => $data['e_texto'],
						'pie' => $data['e_firmas'],
						'copiaCedula' => $data['e_copias'],
						'fechaDocto' => $data['e_fecha'],
						'usrModificacion' => $_SESSION['idUsuario'],
						'fModificacion' => Carbon::now('America/Mexico_City')->format('Y-d-m H:i:s')
					]);

					}
					echo json_encode($validate);

		} catch(\Illuminate\Database\QueryExcepton $e){
			$error = new ErrorsController();
			$error->errores_load_table($e,'Irac');
		}

	}



/*------------------------ Validacion ---------------------------*/

	public function validate(array $data){

		$validacion = [];
		$validacion['status'] = false;

		$valid = GUMP::is_valid($data,array(
			'siglas' => 'required|max_len,150',
			'folio' => 'required|max_len,50' ,
			'fecha_documento' => 'required|max_len,10',
			'nombre_remitente' => 'required|max_len,100',
			'puesto_remitente' => 'required|max_len,100',
			'firmas' => 'required|max_len,50',
			'e_observaciones' => 'required|max_len,2|numeric',
			'e_texto' => 'required|max_len,2|numeric',
			'e_firmas' => 'required|max_len,2|numeric',
			'e_copias' => 'required|max_len,2|numeric',
			'e_atte' => 'required|max_len,2|numeric',
			'e_copias_oficio' => 'required|max_len,2|numeric',
			'e_siglas' => 'required|max_len,2|numeric',
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
