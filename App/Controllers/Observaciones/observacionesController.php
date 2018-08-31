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



	public function update_template($id){
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












  public function registro($id){
    $observacion = Observaciones::find($id);
    echo json_encode($observacion);
  }








	public function guardar($data){

		$data['estatus'] = 'ACTIVO';
		$validate = $this->validate($data);
		if(empty($validate)){

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

			$validate[0] = 'OK';

		}

		echo json_encode($validate);
	}




	public function update($data){

		$id = $data['idObservacionDoctoJuridico'];

		$validate = $this->validate($data);
			if(empty($validate)){

				Observaciones::find($id)->update([
          'pagina' => $data['hoja'],
          'parrafo' => $data['parrafo'],
          'observacion' => $data['texto'],
					'estatus' => $data['estatus'],
					'usrModificacion' => $_SESSION['idUsuario'],
					'fModificacion' => Carbon::now('America/Mexico_City')->format('Y-d-m H:i:s')
				]);
				$validate[0] = 'OK';

			}

			echo json_encode($validate);

	}


/*----------------------viejos ---------------------*/



	public function validate($data){

		$valid = GUMP::is_valid($data,array(
			'hoja' => 'required|max_len,3|numeric',
			'parrafo' => 'required|max_len,3|numeric',
      'texto' =>'required',
      'estatus' => 'required|max_len,8|alpha',
		));

		if($valid === true){
			$valid = [];
		}

		return $valid;
	}

}

?>
