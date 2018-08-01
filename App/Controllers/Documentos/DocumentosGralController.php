<?php  

namespace Jur\App\Controllers\Documentos;
use Jur\App\Controllers\TwigController;
use GUMP;
use Carbon\Carbon;

use Jur\App\Controllers\NotificacionesController;
use Jur\App\Controllers\BaseController;

use Jur\App\Models\Catalogos\Acciones;
use Jur\App\Models\Volantes\Volantes;


class DocumentosGralController extends TwigController {

	private $js = 'DocumentosGral';
	private $nombre = 'Documentos';


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

		$documentos = Volantes::select('sia_Volantes.*','vd.cveAuditoria','sub.nombre','t.idEstadoTurnado','t.idAreaRecepcion','t.idAreaRemitente')
		->join('sia_VolantesDocumentos as vd','vd.idVolante','=','sia_volantes.idVolante')
		->join('sia_TurnadosJuridico as t','t.idVolante','=','sia_Volantes.idVolante'  )
		->join('sia_catSubTiposDocumentos as sub','sub.idSubTipoDocumento','=','vd.idSubTipoDocumento')
		->where('t.idTipoTurnado','V')
		->where('t.estatus','ACTIVO')
		->orderBy("folio","ASC")
		->get();

		echo json_encode($documentos);
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

	public function guardar($data){
	
		$data['estatus'] = 'ACTIVO';
		$validate = $this->validate($data);
		if(empty($validate)){
			
			$accion = new Acciones([
				'nombre' => $data['nombre'],
				'usrAlta' => $_SESSION['idUsuario']
			]);

			$accion->save();
			$validate[0] = 'OK';	
			
		}

		echo json_encode($validate);
	}


	public function update($data){

		$id = $data['idAccion'];

		$validate = $this->validate($data);
			if(empty($validate)){
				
				Acciones::find($id)->update([
					'nombre' => $data['nombre'],
					'estatus' => $data['estatus'],
					'usrModificacion' => $_SESSION['idUsuario'],
					'fModificacion' => Carbon::now('America/Mexico_City')->format('Y-d-m H:i:s')


				]);
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
		$accion = Acciones::find($id);
		echo json_encode($accion);
	}


	public function validate($data){

		

		$valid = GUMP::is_valid($data,array(
			'nombre' => 'required|max_len,5|alpha_space',
			'estatus' => 'required|max_len,8|alpha',
		));

		if($valid === true){
			$valid = [];	
		}

		return $valid;
	}

}

?>