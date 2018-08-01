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

class VolantesDiversosController extends TwigController {

	private $js = 'VolantesDiversos';
	private $nombre = 'Volantes-Diversos';


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

		$volantes = Volantes::select('sia_Volantes.*','vd.cveAuditoria','sub.nombre','t.idEstadoTurnado','t.idAreaRecepcion','t.idAreaRemitente')
		->leftJoin('sia_VolantesDocumentos as vd','vd.idVolante','=','sia_volantes.idVolante')
		->leftJoin('sia_TurnadosJuridico as t','t.idVolante','=','sia_Volantes.idVolante'  )
		->leftJoin('sia_catSubTiposDocumentos as sub','sub.idSubTipoDocumento','=','vd.idSubTipoDocumento')
		->where('sub.auditoria','NO')
		->where('t.idTipoTurnado','V')
		->where('t.estatus','ACTIVO')
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
				'idRemitenteJuridico' => $data['idRemitenteJuridico'],
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
				'promocion' => 'NO',
				'idSubTipoDocumento' => $data['subDocumento'],
				'notaConfronta' => 'NO',
				'usrAlta' => $_SESSION['idUsuario']
			]);

			$volantesDocumentos->save();

			$areas = explode(',',$data['turnado']);

			

			foreach ($areas as $key => $value) {

				$datos_director_area = $base->get_data_area($value);
				
				$turno = new TurnadosJuridico([
		            'idVolante' => $max,
		            'idAreaRemitente' => 'DGAJ',
		            'idAreaRecepcion' => $value,
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
        	}
        	
        	$idTurnadoJuridico =  TurnadosJuridico::all()->max('idTurnadoJuridico');

        	
			if(!empty($file)){

				$base->upload_file_areas($file,$max,$idTurnadoJuridico,'Areas');
				
			}

			foreach ($areas as $key => $value) {
				
				$data['idTurnado'] = $value;
				$base->notifications_complete('Volante',$data['idTurnado'],$max);
			}
			

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

			TurnadosJuridico::where('idVolante',"$id")->where('idTipoTurnado','V')->update([
				'estatus' => 'INACTIVO'
			]);

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

			$areas = explode(',',$data['turnado']);

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
		            'fAlta' => Carbon::now('America/Mexico_City')->format('Y-d-m H:i:s')
        		]);

        		$turno->save();
        	}



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
		$datos = Volantes::select('sia_volantes.*','idAreaRecepcion','a.nombre')
						->join('sia_TurnadosJuridico as tj','tj.idVolante','=','sia_Volantes.idVolante')
						->join('sia_areas as a','a.idArea','=','idAreaRecepcion')
						->where('sia_Volantes.idVolante',"$id")
						->where('tj.estatus','ACTIVO')
						->get();
		echo json_encode($datos);
	}


	public function validate($data){


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


		$base = new BaseController();

		$turnados = $data['turnado'];

		$areas = explode(',',$turnados);
		
		
		foreach ($areas as $key => $value) {
			
			
			$datos_director_area = $base->get_data_area($value);

				if($datos_director_area->isEmpty()){

				array_push($is_valid, 'El Director de: '.$value.' NO se encuentra dado de alta ');
			}
		}


		return $is_valid;

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
			'turnado' => 'required|max_len,30',
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