<?php  

namespace Jur\App\Controllers\Volantes;
use Jur\App\Controllers\TwigController;
use GUMP;
use Carbon\Carbon;


use Jur\App\Controllers\NotificacionesController;
use Jur\App\Controllers\BaseController;

use Jur\App\Models\Volantes\Volantes;
use Jur\App\Models\Volantes\VolantesDocumentos;
use Jur\App\Models\Volantes\TurnadosJuridico;

class VolantesController extends TwigController {

	private $js = 'Volantes';
	private $nombre = 'Volantes';


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

		$volantes = Volantes::select('sia_Volantes.*','vd.cveAuditoria','a.clave','sub.nombre','t.idEstadoTurnado','t.idAreaRecepcion')
		->join('sia_VolantesDocumentos as vd','vd.idVolante','=','sia_volantes.idVolante')
		->join('sia_TurnadosJuridico as t','t.idVolante','=','sia_Volantes.idVolante'  )
		->join('sia_auditorias as a','a.idAuditoria','=','vd.cveAuditoria')
		->join('sia_catSubTiposDocumentos as sub','sub.idSubTipoDocumento','=','vd.idSubTipoDocumento')
		->where('sub.auditoria','SI')
		->where('t.idTipoTurnado','V')
		->orderBy("folio","ASC")
		->get();
		echo json_encode($volantes);
	}

	public function nuevo_registro(){

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

	public function guardar(array $data,$file){
	
		$data['estatus'] = 'ACTIVO';
		$validate = $this->validate($data);

		$base = new BaseController();
		$datos_director_area = $base->get_data_area($data['turnado']);

		if(empty($validate)){
			
			
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
			
			$max = Volantes::all()->max('idVolante');

			$volantesDocumentos = new VolantesDocumentos([
				'idVolante' => $max,
				'promocion' => $data['promocion'],
				'cveAuditoria' => $data['cveAuditoria'],
				'idSubTipoDocumento' => $data['subDocumento'],
				'notaConfronta' => $data['nota'],
				'usrAlta' => $_SESSION['idUsuario'],
				'fAlta' => Carbon::now('America/Mexico_City')->format('Y-d-m H:i:s')
			]);

			$volantesDocumentos->save();

			$turno = new TurnadosJuridico([
	            'idVolante' => $max,
	            'idAreaRemitente' => 'DGAJ',
	            'idAreaRecepcion' => $data['turnado'],
	            'idUsrReceptor' => $datos_director_area[0]['idUsuario'],
	            'idEstadoTurnado' => 'EN ATENCION',
	            'idTipoTurnado' => 'V',
	            'idTipoPrioridad' => $data['caracter'],
	            'comentario' => 'SIN COMENTARIOS',
	            'usrAlta' => $_SESSION['idUsuario'],
	            'estatus' => 'ACTIVO',
	            'fAlta' => Carbon::now('America/Mexico_City')->format('Y-d-m H:i:s')
        	]);

        	$turno->save();
        	$idTurnadoJuridico =  TurnadosJuridico::all()->max('idTurnadoJuridico');

        	
			if(!empty($file)){

				$base->upload_file_areas($file,$max,$idTurnadoJuridico,'Areas');
				
			}

			$base->notifications_complete('Volante',$data['turnado'],$max);
			

			$validate[0] = 'OK';	
			
		}

		echo json_encode($validate);

		
	}


	public function update(array $data){

		$data['estatus'] =  'ACTIVO';
		$id = $data['idVolante'];

		$validate = $this->validate_update($data);
		$base = new BaseController();
		$datos_director_area = $base->get_data_area($data['turnado']);

		if(empty($validate)){

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
				'fModificacion' => Carbon::now('America/Mexico_City')->format('Y-d-m H:i:s'),
			]);

			TurnadosJuridico::where('idVolante',"$id")->where('idTipoTurnado','V')->update([
				'idAreaRecepcion' => $data['turnado'],
				'idUsrReceptor' => $datos_director_area[0]['idUsuario'],
				'idTipoPrioridad' => $data['caracter'],
				'usrModificacion' => $_SESSION['idUsuario'],
				'fModificacion' => Carbon::now('America/Mexico_City')->format('Y-d-m H:i:s'),

			]);

			$base->notifications_complete('Volante',$data['turnado'],$id);
		
			$validate[0] = 'OK';	

		}

		echo json_encode($validate);
		


	}

	public function update_template($id){

		$notificaciones = new NotificacionesController();
		$base = new BaseController();
		$menu = $base->menu();


		echo $this->render('HomeLayout/UpdateContainer.twig',[
			'js' => $this->js,
			'session' => $_SESSION,
			'nombre' => $this->nombre,
			'notificaciones' => $notificaciones->get_notificaciones(),
			'menu' => $menu['modulos'],
			'id' => $id
		]);
	}

	
	public function registro($id){
		$datos = Volantes::select('sia_volantes.*','idAreaRecepcion')
						->join('sia_TurnadosJuridico as tj','tj.idVolante','=','sia_Volantes.idVolante')
						->where('sia_Volantes.idVolante',"$id")
						->get();
		echo json_encode($datos);
	}


	public function validate($data){


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
			'asunto' => 'required|max_len,500',
			'caracter' => 'required|max_len,2|numeric',
			'turnado' => 'required|max_len,10|alpha',
			'accion' => 'required|max_len,2|numeric',
			'nota' => 'required|max_len,2|alpha',
			'idRemitente' => 'required|max_len,10',
			'cveAuditoria' => 'required|max_len,10|numeric',
			'estatus' => 'required|max_len,8|alpha',
		));

		if($is_valid === true){
			$is_valid = [];	
		}

		$fecha = date("Y",strtotime($data['fecha_recepcion']));

		$folio = $data['folio'];
		$subFolio = $data['subFolio'];

		
		$res = Volantes::where('folio',"$folio")
						->where('subFolio',"$subFolio")
						->whereYear('fRecepcion',"$fecha")
						->get();

		if($res->isNotEmpty()){
			
			array_push($is_valid, 'El folio ya se encuentra asignado');
		}

		$cveAuditoria = $data['cveAuditoria'];
		$subTipo = $data['subDocumento'];

		$vd = VolantesDocumentos::where('cveAuditoria',"$cveAuditoria")->where('idSubTipoDocumento',"$subTipo")->get();

		

		if($vd->isNotEmpty()){

			array_push($is_valid, 'La Auditoria ya ha sido Asignada a ese Documento');
		}

		$base = new BaseController();
		$datos_director_area = $base->get_data_area($data['turnado']);
		
		if($datos_director_area->isEmpty()){

			array_push($is_valid, 'El Director NO se encuentra dado de alta ');
		}


		return $is_valid;



		return $valid;
	}

	public function validate_update(array $data){

		$estatus = $data['estatus'];
		
		

		$is_valid = GUMP::is_valid($data,array(
			'Numero_Documento' => 'required|max_len,50',
			'anexos' => 'required|max_len,2|numeric',
			'fecha_documento' => 'required',
			'fecha_recepcion' => 'required',
			'asunto' => 'max_len,200|alpha_space',
			'caracter' => 'required|max_len,2|numeric',
			'turnado' => 'required|max_len,10|alpha',
			'accion' => 'required|max_len,2|numeric'

		));

		if($is_valid === true){
			$is_valid = [];
		}

		

		$base = new BaseController();
		$datos_director_area = $base->get_data_area($data['turnado']);
		
		if($datos_director_area->isEmpty()){

			array_push($is_valid, 'El Director NO se encuentra dado de alta ');
		}


		return $is_valid;
	}

	

}

?>