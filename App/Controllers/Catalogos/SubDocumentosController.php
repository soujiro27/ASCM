<?php

namespace Jur\App\Controllers\Catalogos;
use Jur\App\Controllers\TwigController;
use GUMP;
use Carbon\Carbon;

use Jur\App\Controllers\NotificacionesController;
use Jur\App\Controllers\BaseController;
use Jur\App\Controllers\ErrorsController;

use Jur\App\Models\Catalogos\SubDocumentos;


class subDocumentosController extends TwigController {

	private $js = 'SubDocumentos';
	private $nombre = 'Sub-Documentos';


	/*-------------- Templates --------------*/

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

	/*---------------------- Tabla ---------------------*/
	public function tabla(){
		try {
				$datos = SubDocumentos::all();

			echo json_encode(array('status'=>true,'data' => $datos));

		} catch(\Illuminate\Database\QueryException $e){
		$error = new ErrorsController();
		$error->errores_load_table($e,'subDocumentos');
		}

	}


/*----------------------- Obtener el Registro ----------------*/



	public function registro($id){

		try {
			$accion = SubDocumentos::find($id);
			echo json_encode(array('status'=>true,'data' => $accion));
		} catch(\Illuminate\Database\QueryException $e){
		$error = new ErrorsController();
		$error->errores_load_table($e,'subDocumentos');
		}
	}

/*------------------ Insertar --------------------*/

	public function guardar($data){

		try {
			$data['estatus'] = 'ACTIVO';
			$validate = $this->validate($data);
			if($validate['status']){

				$accion = new SubDocumentos([
					'idTipoDocto' => $data['documento'],
					'tipo' => 'JURIDICO',
					'nombre' => $data['nombre'],
					'usrAlta' => $_SESSION['idUsuario']
				]);

				$accion->save();
			}

			echo json_encode($validate);

		} catch(\Illuminate\Database\QueryException $e){
		$error = new ErrorsController();
		$error->errores_load_table($e,'subDocumentos');
		}



	}

/*-------------------- Update ---------------------*/

	public function update($data){

		try {
			$id = $data['idSubTipoDocumento'];

			$validate = $this->validate($data);
				if($validate['status']){

					SubDocumentos::find($id)->update([
						'idTipoDocto' => $data['documento'],
						'nombre' => $data['nombre'],
						'estatus' => $data['estatus'],
						'usrModificacion' => $_SESSION['idUsuario'],
						'fModificacion' => Carbon::now('America/Mexico_City')->format('Y-d-m H:i:s')

					]);
				}
			echo json_encode($validate);

		} catch(\Illuminate\Database\QueryException $e){
		$error = new ErrorsController();
		$error->errores_load_table($e,'subDocumentos');
		}
	}


/*--------------- Validate ----------------*/

	public function validate($data){

		$validacion = [];
		$validacion['status'] = false;


		$valid = GUMP::is_valid($data,array(
			'documento' => 'required|max_len,10',
			'nombre' => 'required|max_len,50|alpha_space',
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
