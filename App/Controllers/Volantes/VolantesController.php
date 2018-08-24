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

class VolantesController extends TwigController {

	private $js = 'Volantes';
	private $nombre = 'Volantes';
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

/*-------------------Tabla-----------------------------*/

	public function tabla(){
		try{
			$volantes = Volantes::select('sia_Volantes.*','vd.cveAuditoria','a.clave','sub.nombre','t.idEstadoTurnado','t.idAreaRecepcion')
				->join('sia_VolantesDocumentos as vd','vd.idVolante','=','sia_volantes.idVolante')
				->join('sia_TurnadosJuridico as t','t.idVolante','=','sia_Volantes.idVolante'  )
				->join('sia_auditorias as a','a.idAuditoria','=','vd.cveAuditoria')
				->join('sia_catSubTiposDocumentos as sub','sub.idSubTipoDocumento','=','vd.idSubTipoDocumento')
				->where('sub.auditoria','SI')
				->where('t.idTipoTurnado','V')
				->orderBy("folio","ASC")
				->get();

			echo json_encode(array('status'=>true,'data' => $volantes));

		}catch(\Illuminate\Database\QueryException $e){

			$error = new ErrorsController();
			$error->errores_load_table($e,'Volantes');

		}
	}

	/*----------------- Obtiene Registro -------------*/

	public function registro($id){
		$datos = Volantes::select('sia_volantes.*','idAreaRecepcion')
						->join('sia_TurnadosJuridico as tj','tj.idVolante','=','sia_Volantes.idVolante')
						->where('sia_Volantes.idVolante',"$id")
						->get();
		echo json_encode($datos);
	}

	/*---------------- Insertar Registro ---------------*/



	public function guardar(array $data,$file){

		try {

			$base = new BaseController();
			$datos_director_area = $base->get_data_area($data['turnado']);
			$validate = $this->validate($data);

			if($validate['status']){

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
					'promocion' => $data['promocion'],
					'cveAuditoria' => $data['cveAuditoria'],
					'idSubTipoDocumento' => $data['subDocumento'],
					'notaConfronta' => $data['nota'],
					'usrAlta' => $_SESSION['idUsuario']
				]);


				$volantesDocumentos->save();

				$turno = new TurnadosJuridico([
					'idVolante' => $idVolante,
					'idAreaRemitente' => 'DGAJ',
					'idAreaRecepcion' => $data['turnado'],
					'idUsrReceptor' => $datos_director_area[0]['idUsuario'],
					'idEstadoTurnado' => 'EN ATENCION',
					'idTipoTurnado' => 'V',
					'idTipoPrioridad' => $data['caracter'],
					'comentario' => 'SIN COMENTARIOS',
					'usrAlta' => $_SESSION['idUsuario'],
					'estatus' => 'ACTIVO',
				]);

				$turno->save();
				$idTurnadoJuridico =  $turno->idTurnadoJuridico;

				if(!empty($file)){
					$base->upload_file_areas($file,$idVolante,$idTurnadoJuridico,'Areas','DGAJ',$data['turnado']);
				}

				$base->notifications_complete('Volante',$data['turnado'],$idVolante);

			}

			echo json_encode($validate);

		} catch (\Illuminate\Database\QueryException $e) {
			$error = new ErrorsController();
			$error->errores_load_table($e,'Volantes');

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



/*------------------Actualizar Registro---------------*/

	public function update(array $data){

		try {

		$id = $data['idVolante'];

		$validate = $this->validate_update($data);
		$base = new BaseController();
		$datos_director_area = $base->get_data_area($data['turnado']);

		if($validate['status']){

			$vd = VolantesDocumentos::where('idVolante',"$id")->get();
			$data['idSubTipoDocumento'] = $vd[0]['idSubTipoDocumento'];


				Volantes::find($id)->update([
					'numDocumento' => $data['Numero_Documento'],
					'anexos' => $data['anexos'],
					'fDocumento' => $data['fecha_documento'],
					'fRecepcion' => $data['fecha_recepcion'],
					'asunto' => $data['asunto'],
					'idCaracter' => $data['caracter'],
					'idAccion' => $data['accion'],
					'usrModificacion' => $_SESSION['idUsuario'],
					'fModificacion' => Carbon::now('America/Mexico_City')->format($this->date),
				]);

				TurnadosJuridico::where('idVolante',"$id")->where('idTipoTurnado','V')->update([
					'idAreaRecepcion' => $data['turnado'],
					'idUsrReceptor' => $datos_director_area[0]['idUsuario'],
					'idTipoPrioridad' => $data['caracter'],
					'usrModificacion' => $_SESSION['idUsuario'],
					'fModificacion' => Carbon::now('America/Mexico_City')->format($this->date),
				]);

				$turnados = TurnadosJuridico::where('idVolante',"$id")->where('idTipoTurnado','V')->get();
				$idTurnado = $turnados[0]['idTurnadoJuridico'];

				$anexosJuridico = AnexosJuridico::where('idTurnadoJuridico',"$idTurnado")->get();

				if($anexosJuridico->isNotEmpty()){
						$idAnexos = $anexosJuridico[0]['idAnexoJuridico'];
						AnexosJuridico::find($idAnexos)->update([
							'areaRemitente' => 'DGAJ',
							'areaRecepcion' => $data['turnado'],
							'usrModificacion' => $_SESSION['idUsuario'],
							'fModificacion' => Carbon::now('America/Mexico_City')->format($this->date),
						]);
				}

				$base->notifications_complete('Volante',$data['turnado'],$id);

			}

			echo json_encode($validate);


		} catch (\Illuminate\Database\QueryException $e) {
			$error = new ErrorsController();
			$error->errores_load_table($e,'Volantes');
		}






	}


/*------------- Validar Registros --------------------*/

	public function validate($data){

		$validacion = [];
		$validacion['status'] = false;

		$is_valid = GUMP::is_valid($data,array(
			'documento' => 'required|max_len,15|alpha',
			'subDocumento'=> 'required|max_len,2|numeric',
			'promocion' => 'required|max_len,2|alpha',
			'extemporaneo' => 'required|max_len,2|alpha',
			'folio' =>  'required|max_len,4|numeric',
			'subFolio' =>'required|max_len,4|numeric',
			'Numero_Documento' => 'required|max_len,50',
			'anexos' => 'required|max_len,2|numeric',
			'fecha_documento' => 'required|max_len,10',
			'fecha_recepcion' => 'required|max_len,10',
			'hora_recepcion' => 'required|max_len,5',
			'asunto' => 'required|max_len,3000',
			'caracter' => 'required|max_len,2|numeric',
			'turnado' => 'required|max_len,10|alpha',
			'accion' => 'required|max_len,2|numeric',
			'nota' => 'required|max_len,2|alpha',
			'idRemitente' => 'required|max_len,10',
			'cveAuditoria' => 'required|max_len,10|numeric'
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

		$cveAuditoria = $data['cveAuditoria'];
		$subTipo = $data['subDocumento'];

		$vd = VolantesDocumentos::where('cveAuditoria',"$cveAuditoria")->where('idSubTipoDocumento',"$subTipo")->get();



		if($vd->isNotEmpty()){
			$validacion['message'] =  'La Auditoria ya ha sido Asignada a ese Documento';
			$validacion['status'] = false;
		}

		$base = new BaseController();
		$datos_director_area = $base->get_data_area($data['turnado']);

		if($datos_director_area->isEmpty()){
			$validacion['message'] =  'El Director NO se encuentra dado de alta ';
			$validacion['status'] = false;
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
			'asunto' => 'max_len,3000',
			'caracter' => 'required|max_len,2|numeric',
			'turnado' => 'required|max_len,10|alpha',
			'accion' => 'required|max_len,2|numeric'
		));

		if($is_valid === true){
			$validacion['status'] = true;
		} else{
			$validacion['message'] = $is_valid[0];
		}


		$base = new BaseController();
		$datos_director_area = $base->get_data_area($data['turnado']);

		if($datos_director_area->isEmpty()){
			$validacion['message'] =  'El Director NO se encuentra dado de alta ';
			$validacion['status'] = false;
		}

		return $validacion;
	}



}

?>
