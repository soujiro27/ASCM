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

	/*---------------- Template ------------------*/

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

	public function nuevo_registro(){
		$data = $this->load_data_templates();
		echo $this->render('HomeLayout/InsertContainer.twig',$data);

	}


	public function update_template(){
		$data = $this->load_data_templates();
		echo $this->render('HomeLayout/UpdateContainer.twig',$data);
			}

/*------------------ Tabla --------------------*/
	public function tabla(){

		try {
			$datos = Textos::all();
			echo json_encode(array('status'=>true,'data' => $datos));
		} catch(\Illuminate\Database\QueryException $e){
		$error = new ErrorsController();
		$error->errores_load_table($e,'Textos');
		}

	}

	/*------------------ Obtener Registro ----------------*/

		public function registro($id){
			try {
				$accion = Textos::find($id);
				echo json_encode(array('status'=>true,'data' => $accion));
			} catch(\Illuminate\Database\QueryException $e){
				$error = new ErrorsController();
				$error->errores_load_table($e,'CARACTERES');
			}
		}

/*--------------------- Insertar --------------------------*/

	public function guardar(array $data){
		try {

			$data['estatus'] = 'ACTIVO';
			$validate = $this->validate($data);
			if($validate['status']){

				$textos = new Textos([
					'idTipoDocto' => $data['documento'],
					'tipo' => 'JURIDICO',
					'idSubTipoDocumento' => $data['subDocumento'],
					'nombre' => 'TEXTO-JURIDICO',
					'texto' => $data['texto'],
					'usrAlta' => $_SESSION['idUsuario']
				]);

				$textos->save();
			}

			echo json_encode($validate);

		} catch(\Illuminate\Database\QueryException $e){
			$error = new ErrorsController();
			$error->errores_load_table($e,'CARACTERES');
		}

	}


	public function update($data){
		try {

			$id = $data['idDocumentoTexto'];

			$validate = $this->validate($data);
				if($validate['status']){

					Textos::find($id)->update([
						'idSubTipoDocumento' => $data['subDocumento'],
						'texto' => $data['texto'],
						'estatus' => $data['estatus'],
						'usrModificacion' => $_SESSION['idUsuario'],
						'fModificacion' => Carbon::now('America/Mexico_City')->format('Y-d-m H:i:s')

					]);
				}

				echo json_encode($validate);

		} catch(\Illuminate\Database\QueryException $e){
			$error = new ErrorsController();
			$error->errores_load_table($e,'CARACTERES');
		}
	}


	public function validate($data){

		$validacion = [];
		$validacion['status'] = false;

		$valid = GUMP::is_valid($data,array(
			'documento' => 'required|max_len,20|alpha_space',
			'subDocumento' => 'required|max_len,2',
			'texto' => 'required',
			'estatus' => 'required|max_len,8|alpha',
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
