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

	private $js = 'Acciones';
	private $nombre = 'Acciones';



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
			'hoja' => 'required|max_len,3|numeric',
			'parrafo' => 'required|max_len,3|numeric',
      'texto' =>'required',
      'idVolante' => 'required|max_len,3|numeric',
      'estatus' => 'required|max_len,8|alpha',
		));

		if($valid === true){
			$valid = [];
		}

		return $valid;
	}

}

?>
