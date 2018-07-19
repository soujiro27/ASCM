<?php  

namespace Jur\App\Controllers\Catalogos;
use Jur\App\Controllers\TwigController;
use GUMP;
use Carbon\Carbon;

use Jur\App\Controllers\NotificacionesController;
use Jur\App\Controllers\BaseController;

use Jur\App\Models\Catalogos\Textos;


class TextosController extends TwigController {

	private $js = 'Textos';
	private $nombre = 'Textos-Juridico';


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

		$datos = Textos::all();
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

	public function guardar(array $data){
	
		$data['estatus'] = 'ACTIVO';
		$validate = $this->validate($data);
		if(empty($validate)){
			
			$textos = new Textos([
				'idTipoDocto' => $data['documento'],
				'tipo' => 'JURIDICO',
				'idSubTipoDocumento' => $data['subDocumento'],
				'nombre' => 'TEXTO-JURIDICO',
				'texto' => $data['texto'],
				'usrAlta' => $_SESSION['idUsuario']
			]);

			$textos->save();
			$validate[0] = 'OK';	
			
		}

		echo json_encode($validate);
		

		
	}


	public function update($data){

		$id = $data['idAccion'];

		$validate = $this->validate($data);
			if(empty($validate)){
				
				Textos::find($id)->update([
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
		$accion = Textos::find($id);
		echo json_encode($accion);
	}


	public function validate($data){

		

		$valid = GUMP::is_valid($data,array(
			'documento' => 'required|max_len,20|alpha_space',
			'subDocumento' => 'required|max_len,2',
			'texto' => 'required',
			'estatus' => 'required|max_len,8|alpha',
		));

		if($valid === true){
			$valid = [];	
		}

		return $valid;
	}

}

?>