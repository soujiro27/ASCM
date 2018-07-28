<?php  

namespace Jur\App\Controllers\Catalogos;
use Jur\App\Controllers\TwigController;
use GUMP;
use Carbon\Carbon;

use Jur\App\Controllers\NotificacionesController;
use Jur\App\Controllers\BaseController;

use Jur\App\Models\Catalogos\Caracteres;


class CaracteresController extends TwigController {

	private $js = 'Caracteres';
	private $nombre = 'Caracteres';


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

		$datos = Caracteres::all();
		echo json_encode($datos);
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
			
			$accion = new Caracteres([
				'siglas' => $data['siglas'],
				'nombre' => $data['nombre'],
				'usrAlta' => $_SESSION['idUsuario']
			]);

			$accion->save();
			$validate[0] = 'OK';	
			
		}

		echo json_encode($validate);
	}


	public function update($data){

		$id = $data['idCaracter'];

		$validate = $this->validate($data);
			if(empty($validate)){
				
				Caracteres::find($id)->update([
					'siglas' => $data['siglas'],
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
		$accion = Caracteres::find($id);
		echo json_encode($accion);
	}


	public function validate($data){

		

		$valid = GUMP::is_valid($data,array(
			'siglas' => 'required|max_len,2',
			'nombre' => 'required|max_len,10|alpha_space',
			'estatus' => 'required|max_len,8|alpha',
		));

		if($valid === true){
			$valid = [];	
		}

		return $valid;
	}

}

?>