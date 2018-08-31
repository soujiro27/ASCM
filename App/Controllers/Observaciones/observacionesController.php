<?php

namespace Jur\App\Controllers\Observaciones;
use Jur\App\Controllers\TwigController;
use GUMP;
use Carbon\Carbon;

use Jur\App\Controllers\NotificacionesController;
use Jur\App\Controllers\BaseController;

use Jur\App\Models\Catalogos\Acciones;
use Jur\App\Models\Modulos\Observaciones;
use Jur\App\Models\Volantes\VolantesDocumentos;

class ObservacionesController extends TwigController {

	private $js = 'Observaciones';
	private $nombre = 'Observaciones';


/*------------------ Templates -------------------------*/


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



/*------------- Tabla ---------------------*/

public function table(array $data){

	try {
		$idVolante = $data['idVolante'];
		$observaciones = Observaciones::where('idVolante',"$idVolante")->get();
		echo json_encode(array('status'=>true,'data' => $observaciones ));

	} catch(\Illuminate\Database\QueryException $e){
		$error = new ErrorsController();
		$error->errores_load_table($e,'Observaciones');
	}
}

/*----------------- Insertar --------------------*/


public function guardar(array $data){

	try {
		$validate = $this->validate($data);
		if($validate['status']){

			$idVolante = $data['idVolante'];

			$volantesDocumentos = VolantesDocumentos::where('idvolante',"$idVolante")->get();
			$subTipo = $volantesDocumentos[0]['idSubTipoDocumento'];
			$cveAuditoria = $volantesDocumentos[0]['cveAuditoria'];


			$observaciones = new Observaciones([
				'idVolante' => $data['idVolante'],
				'idSubTipoDocumento' => $subTipo,
				'cveAuditoria' => $cveAuditoria,
				'pagina' => $data['hoja'],
				'parrafo' => $data['parrafo'],
				'observacion' => $data['texto'],
				'usrAlta' => $_SESSION['idUsuario'],
			]);

			$observaciones->save();
		}

		echo json_encode($validate);
	} catch(\Illuminate\Database\QueryException $e){
		$error = new ErrorsController();
		$error->errores_load_table($e,'Observaciones');
	}

}



/*--------------- Obtener Registro -------------------*/

  public function registro($id){
		try {
			$observacion = Observaciones::find($id);
			echo json_encode(array('status'=>true,'data' => $observacion ));

		} catch(\Illuminate\Database\QueryException $e){
			$error = new ErrorsController();
			$error->errores_load_table($e,'Observaciones');
		}

  }


/*------------- Update -------------------------------*/
	public function update($data){

		try {
			$id = $data['idObservacionDoctoJuridico'];

			$validate = $this->validate($data);
				if($validate['status']){

					Observaciones::find($id)->update([
	          'pagina' => $data['hoja'],
	          'parrafo' => $data['parrafo'],
	          'observacion' => $data['texto'],
						'estatus' => $data['estatus'],
						'usrModificacion' => $_SESSION['idUsuario'],
						'fModificacion' => Carbon::now('America/Mexico_City')->format('Y-m-d H:i:s')
					]);
				}

				echo json_encode($validate);

		} catch(\Illuminate\Database\QueryException $e){
			$error = new ErrorsController();
			$error->errores_load_table($e,'Observaciones');
		}

	}


/*----------------------validar ---------------------*/
	public function validate(array $data){

		$validacion = [];
		$validacion['status'] = false;

		$is_valid = GUMP::is_valid($data,array(
			'hoja' => 'required|max_len,3|numeric',
			'parrafo' => 'required|max_len,3|numeric',
      'texto' =>'required',
		));

		if($is_valid === true){
			$validacion['status'] = true;
		} else{
			$validacion['message'] = $is_valid[0];
		}


		return $validacion;
	}

}

?>
