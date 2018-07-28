<?php  

namespace Jur\App\Controllers\Volantes;
use Jur\App\Controllers\TwigController;
use GUMP;
use Carbon\Carbon;

use Jur\App\Controllers\NotificacionesController;
use Jur\App\Controllers\BaseController;

use Jur\App\Models\Volantes\Volantes;


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

	public function guardar($data){
	
		$data['estatus'] = 'ACTIVO';
		$validate = $this->validate($data);
		if(empty($validate)){
			
			$accion = new Volantes([
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
				
				Volantes::find($id)->update([
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
		$accion = Volantes::find($id);
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