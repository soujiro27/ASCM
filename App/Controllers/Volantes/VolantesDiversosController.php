<?php

namespace Jur\App\Controllers\Volantes;
use Jur\App\Controllers\TwigController;
use GUMP;
use Carbon\Carbon;


use Jur\App\Controllers\NotificacionesController;
use Jur\App\Controllers\BaseController;
use Jur\App\Controllers\ErrorsController;
use Jur\App\Models\Volantes\AnexosJuridico;

use Jur\App\Models\Volantes\Volantes;
use Jur\App\Models\Volantes\VolantesDocumentos;
use Jur\App\Models\Volantes\TurnadosJuridico;

class VolantesDiversosController extends TwigController {

	private $js = 'VolantesDiversos';
	private $nombre = 'Volantes-Diversos';
	private $date = 'Y-m-d H:i:s';



	/*----------------Carga de Templates ------------------*/


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

		public function insert_template(){

			$data = $this->load_data_templates();
			echo $this->render('HomeLayout/InsertContainer.twig',$data);

		}

		public function update_template(){

			$data = $this->load_data_templates();
			echo $this->render('HomeLayout/UpdateContainer.twig',$data);
		}

/*------------------------------Tabla---------------------------*/

	public function tabla(){

		try {
			$volantes = Volantes::select('sia_Volantes.*','vd.cveAuditoria','sub.nombre','t.idEstadoTurnado','t.idAreaRecepcion','t.idAreaRemitente')
			->leftJoin('sia_VolantesDocumentos as vd','vd.idVolante','=','sia_volantes.idVolante')
			->leftJoin('sia_TurnadosJuridico as t','t.idVolante','=','sia_Volantes.idVolante'  )
			->leftJoin('sia_catSubTiposDocumentos as sub','sub.idSubTipoDocumento','=','vd.idSubTipoDocumento')
			->where('sub.auditoria','NO')
			->where('t.idTipoTurnado','V')
			->where('t.estatus','ACTIVO')
			->orderBy("folio","ASC")
			->get();
				echo json_encode(array('status'=>true,'data' => $volantes));

		} catch(\Illuminate\Database\QueryException $e){
			$error = new ErrorsController();
			$error->errores_load_table($e,'Volantes');
		}
	}

/*----------------------- Obtiene Registro -------------------------*/

public function registro($id){
	$datos = Volantes::select('sia_volantes.*','idAreaRecepcion','a.nombre','rj.tipoRemitente','rj.saludo as saludoRemitente','rj.nombre as nombreRemitente','rj.puesto as puestoRemitente')
					->join('sia_TurnadosJuridico as tj','tj.idVolante','=','sia_Volantes.idVolante')
					->join('sia_areas as a','a.idArea','=','idAreaRecepcion')
					->join('sia_RemitentesJuridico as rj','rj.idRemitenteJuridico','=','sia_volantes.idRemitenteJuridico')
					->where('sia_Volantes.idVolante',"$id")
					->where('tj.estatus','ACTIVO')
					->get();
	echo json_encode($datos);
}

/*-------------------Insertar Registro ------------------------*/


	public function guardar(array $data,$file){

		try {

			$validate = $this->validate($data);

			if($validate['status']){
				$base = new BaseController();
				$datos_director_area = $base->get_data_area($data['turnado']);

				$volantes = new Volantes([
					'idTipoDocto' =>$data['documento'],
					'subFolio' => $data['subFolio'],
					'extemporaneo' => $data['extemporaneo'],
					'folio' => $data['folio'],
					'numDocumento' => $data['Numero_Documento'],
					'anexos' => $data['anexos'],
					'fDocumento' => $data['fecha_documento'],
					'fRecepcion' => $data['fecha_recepcion'],
					'hRecepcion' => $data['hora_recepcion'],
					'idRemitente' => $data['idRemitente'],
					'idRemitenteJuridico' => $data['idRemitenteJuridico'],
					'destinatario' => 'DR. IVAN OLMOS CANSIANO',
					'asunto' => $data['asunto'],
					'idCaracter' => $data['caracter'],
					'idAccion' => $data['accion'],
					'usrAlta' => $_SESSION['idUsuario']
				]);

				$volantes->save();

				$idVolante = $volantes->idVolante;

				$volantesDocumentos = new VolantesDocumentos([
					'idVolante' => $idVolante,
					'promocion' => 'NO',
					'idSubTipoDocumento' => $data['subDocumento'],
					'notaConfronta' => 'NO',
					'usrAlta' => $_SESSION['idUsuario']
				]);

				$volantesDocumentos->save();

				$areas = explode(',',$data['turnado']);

				$idTurnado = [];
				$areaRecepcion = [];

				foreach ($areas as $key => $value) {

					$datos_director_area = $base->get_data_area($value);

					$turno = new TurnadosJuridico([
						'idVolante' => $idVolante,
						'idAreaRemitente' => 'DGAJ',
						'idAreaRecepcion' => $value,
						'idUsrReceptor' => $datos_director_area[0]['idUsuario'],
						'idEstadoTurnado' => 'EN ATENCION',
						'idTipoTurnado' => 'V',
						'idTipoPrioridad' => $data['caracter'],
						'comentario' => 'SIN COMENTARIOS',
						'usrAlta' => $_SESSION['idUsuario'],
						'estatus' => 'ACTIVO',
					]);

					$turno->save();
					$idTurnadoJuridico =  TurnadosJuridico::all()->max('idTurnadoJuridico');
					array_push($idTurnado, $idTurnadoJuridico);
					array_push($areaRecepcion,$value);
			}


				if(!empty($file)){

					foreach ($idTurnado as $key => $value) {

						$file_data = [
							'idVolante' => $idVolante,
							'idTurnadoJuridico' => $value,
							'carpeta' => 'Areas',
							'areaRemitente' => 'DGAJ',
							'tipo' => 'V',
							'areaRecepcion' => $areaRecepcion[$key]
						];

						$base->upload_file_areas($file,$file_data);
					}
				}

				foreach ($areas as $key => $value) {

					$data['idTurnado'] = $value;
					$base->notifications_complete('Volante',$data['idTurnado'],$idVolante);
				}

			}

			echo json_encode($validate);

		} catch (\Illuminate\Database\QueryException $e) {
			$error = new ErrorsController();
			$error->errores_load_table($e,'VolantesDiversos');

			$idVolante = $volantes->idVolante;
			$volantesDocumentos = VolantesDocumentos::where('idVolante',$idVolante)->get();
			$turnados = TurnadosJuridico::where('idVolante',"$idVolante")->get();

			if($volantesDocumentos->isEmpty()){
						Volantes::where('idVolante',$idVolante)->delete();
			} elseif ($turnados->isEmpty()) {
					VolantesDocumentos::where('idVolante',$idVolante)->delete();
					Volantes::where('idVolante',$idVolante)->delete();
			}

		}






	}



/*------------------ Actualizar Registro ----------------*/

	public function update(array $data){

		try {

			$id = $data['idVolante'];

			$validate = $this->validate_update($data);

			if($validate['status']){

				$insertAnexo = false;

				TurnadosJuridico::where('idVolante',"$id")->where('idTipoTurnado','V')->update([
					'estatus' => 'INACTIVO'
				]);

				$anexos = AnexosJuridico::where('idVolante',"$id")->where('tipo','V')->get();
				if($anexos->isNotEmpty()){

					$anexosArray = $anexos->toArray();
					$datosAnexos = $anexosArray[0];
					AnexosJuridico::where('idVolante',"$id")->where('tipo','V')->delete();
					$insertAnexo = true;
				}

				Volantes::find($id)->update([
					'numDocumento' => $data['Numero_Documento'],
					'anexos' => $data['anexos'],
					'fDocumento' => $data['fecha_documento'],
					'fRecepcion' => $data['fecha_recepcion'],
					'idRemitente' => $data['idRemitente'],
					'idRemitenteJuridico' => $data['idRemitenteJuridico'],
					'hRecepcion' => $data['hora_recepcion'],
					'asunto' => $data['asunto'],
					'extemporaneo' => $data['extemporaneo'],
					'idCaracter' => $data['caracter'],
					'idAccion' => $data['accion'],
					'usrModificacion' => $_SESSION['idUsuario'],
					'fModificacion' => Carbon::now('America/Mexico_City')->format('Y-m-d H:i:s'),
				]);


				$areas = explode(',',$data['turnado']);
				$base = new BaseController();

			foreach ($areas as $key => $value) {

					$datos_director_area = $base->get_data_area($value);

					$turno = new TurnadosJuridico([
							          'idVolante' => $id,
							          'idAreaRemitente' => 'DGAJ',
							          'idAreaRecepcion' => $value,
							          'idUsrReceptor' => $datos_director_area[0]['idUsuario'],
							          'idEstadoTurnado' => 'EN ATENCION',
							          'idTipoTurnado' => 'V',
							          'idTipoPrioridad' => $data['caracter'],
							          'comentario' => 'SIN COMENTARIOS',
							          'usrAlta' => $_SESSION['idUsuario'],
							          'estatus' => 'ACTIVO',
	        						]);

	        $turno->save();

					$idTurnadoJuridico = $turno->idTurnadoJuridico;

					if($insertAnexo){

						$anexo = new AnexosJuridico([
				  		'idTurnadoJuridico' => $idTurnadoJuridico,
				  		'archivoOriginal' => $datosAnexos['archivoOriginal'],
				  		'archivoFinal' => $datosAnexos['archivoFinal'],
				  		'idTipoArchivo' => $datosAnexos['idTipoArchivo'],
				  		'idVolante' => $datosAnexos['idVolante'],
				  		'areaRemitente' => $datosAnexos['areaRemitente'],
				  		'areaRecepcion' => $datosAnexos['areaRecepcion'],
							'tipo' => $datosAnexos['tipo'],
				  		'usrAlta' => $_SESSION['idUsuario'],
				      'estatus' => 'ACTIVO'
			      ]);

			  		$anexo->save();
					}

					$base->notifications_complete('Volante',$value,$id);
	      }

			}

			echo json_encode($validate);

		} catch (\Illuminate\Database\QueryException $e) {
			$error = new ErrorsController();
			$error->errores_load_table($e,'Volantes');
		}




	}




/*-----------Validar Registros --------------*/
	public function validate($data){

		$validacion = [];
		$validacion['status'] = false;

		$is_valid = GUMP::is_valid($data,array(
			'documento' => 'required|max_len,15|alpha',
			'subDocumento'=> 'required|max_len,2|numeric',
			'extemporaneo' => 'required|max_len,2|alpha',
			'folio' =>  'required|max_len,4|numeric',
			'subFolio' =>'required|max_len,4|numeric',
			'Numero_Documento' => 'required|max_len,50',
			'anexos' => 'required|max_len,2|numeric',
			'fecha_documento' => 'required|max_len,10',
			'fecha_recepcion' => 'required|max_len,10',
			'hora_recepcion' => 'required|max_len,5',
			'asunto' => 'required|max_len,500',
			'caracter' => 'required|max_len,2|numeric',
			'turnado' => 'required|max_len,30',
			'accion' => 'required|max_len,2|numeric',
			'idRemitente' => 'required|max_len,10',
			'idRemitenteJuridico' => 'required|numeric',
		));

		if($is_valid === true){
			$validacion['status'] = true;
		} else{
			$validacion['message'] = $is_valid[0];
		}


		$fecha = date("Y",strtotime($data['fecha_recepcion']));

		$folio = $data['folio'];
		$subFolio = $data['subFolio'];


		$res = Volantes::where('folio',"$folio")
						->where('subFolio',"$subFolio")
						->whereYear('fRecepcion',"$fecha")
						->get();

		if($res->isNotEmpty()){
			$validacion['message'] =  'El folio ya se encuentra asignado';
			$validacion['status'] = false;
		}

		$base = new BaseController();

		$turnados = $data['turnado'];

		$areas = explode(',',$turnados);


		foreach ($areas as $key => $value) {
			$datos_director_area = $base->get_data_area($value);

			if($datos_director_area->isEmpty()){
				$validacion['message'] =  'El Director NO se encuentra dado de alta ';
				$validacion['status'] = false;
			}

		}


		return $validacion;

	}

	public function validate_update(array $data){

		$validacion = [];
		$validacion['status'] = false;

		$is_valid = GUMP::is_valid($data,array(
			'Numero_Documento' => 'required|max_len,50',
			'anexos' => 'required|max_len,2|numeric',
			'fecha_documento' => 'required',
			'fecha_recepcion' => 'required',
			'asunto' => 'max_len,200|alpha_space',
			'caracter' => 'required|max_len,2|numeric',
			'extemporaneo' =>'required|max_len,2|alpha',
			'turnado' => 'required|max_len,30',
			'accion' => 'required|max_len,2|numeric',
			'idRemitente' => 'required|max_len,10',
			'idRemitenteJuridico' => 'required|numeric',
			'hora_recepcion' => 'required|max_len,5',

		));

		if($is_valid === true){
			$validacion['status'] = true;
		} else{
			$validacion['message'] = $is_valid[0];
		}


		$base = new BaseController();

		$turnados = $data['turnado'];

		$areas = explode(',',$turnados);

		foreach ($areas as $key => $value) {

			$datos_director_area = $base->get_data_area($value);

			if($datos_director_area->isEmpty()){
				$validacion['message'] =  'El Director NO se encuentra dado de alta ';
				$validacion['status'] = false;
			}
		}

		return $validacion;
	}



}

?>
