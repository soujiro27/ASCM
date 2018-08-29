<?php

namespace Jur\App\Controllers\Documentos;
use Jur\App\Controllers\TwigController;
use GUMP;
use Carbon\Carbon;

use Jur\App\Controllers\NotificacionesController;
use Jur\App\Controllers\BaseController;
use Jur\App\Controllers\ErrorsController;

use Jur\App\Models\Catalogos\Acciones;
use Jur\App\Models\Volantes\Volantes;
use Jur\App\Models\Volantes\AnexosJuridico;
use Jur\App\Models\Volantes\TurnadosJuridico;


class DocumentosGralController extends TwigController {

	private $js = 'DocumentosGral';
	private $nombre = 'Documentos';

/*------------- Carga de Templates -----------------*/

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


public function update_template(){
	$data = $this->load_data_templates();
	echo $this->render('HomeLayout/UpdateContainer.twig',$data);
}


/*--------------------------- Tabla ------------------------*/

	public function tabla(){

		try{

			$documentosGral = Volantes::select('sia_Volantes.*','vd.cveAuditoria','sub.nombre','t.idEstadoTurnado','t.idAreaRecepcion','t.idAreaRemitente','t.idTurnadoJuridico')
			->join('sia_VolantesDocumentos as vd','vd.idVolante','=','sia_volantes.idVolante')
			->join('sia_TurnadosJuridico as t','t.idVolante','=','sia_Volantes.idVolante'  )
			->join('sia_catSubTiposDocumentos as sub','sub.idSubTipoDocumento','=','vd.idSubTipoDocumento')
			->where('t.idTipoTurnado','V')
			->where('t.estatus','ACTIVO')
			->orderBy("folio","ASC")
			->get();

			echo json_encode(array('status'=>true,'data' => $documentosGral));

		}catch(\Illuminate\Database\QueryException $e){

			$error = new ErrorsController();
			$error->errores_load_table($e,'DocumentosGral');
		}
	}


/*------------------- Obtener REgistro ----------------*/

	public function registro($id){

		try {
			$documentos = AnexosJuridico::where('idTurnadoJuridico',"$id")->orderBy('idAnexoJuridico','DESC')->get();
			echo json_encode(array('status'=>true,'data' => $documentos));

		} catch(\Illuminate\Database\QueryException $e){

			$error = new ErrorsController();
			$error->errores_load_table($e,'DocumentosGral');
		}

	}

	/*------------- Update -----------------*/

	public function update(array $data){
		try {
			$validate = $this->validate($data);
			if($validate['status']){

				$id = $data['id'];
				AnexosJuridico::find($id)->update([
					'estatus' => $data['estatus'],
					'usrModificacion' => $_SESSION['idUsuario'],
					'fModificacion' => Carbon::now('America/Mexico_City')->format('Y-d-m H:i:s')
				]);

				}
				echo json_encode($validate);

		} catch (\Illuminate\Database\QueryException $e) {
			$error = new ErrorsController();
			$error->errores_load_table($e,'DocumentosGral');
		}
	}


/*----------------- Insertar -------------------*/

	public function guardar(array $data, $file){
		try {

			$idTurnado = $data['idTurnadoJuridico'];

			$validacion['status'] = false;

			if(!empty($file)){

				$turnado = TurnadosJuridico::find($idTurnado);
				$anexo = AnexosJuridico::select('areaRecepcion')->where('idTurnadoJuridico',"$idTurnado")->get();
				$areaRecepcion = $anexo[0]['areaRecepcion'];

				$data_file = [
					'idVolante' => $turnado->idVolante,
					'idTurnadoJuridico' => $idTurnado,
					'carpeta' => 'Areas',
					'areaRemitente' => 'DGAJ',
					'areaRecepcion' => $areaRecepcion,
					'tipo' => 'V'
				];

				$base = new BaseController();
				$base->upload_file_areas($file,$data_file);
				$validacion['status'] = true;
			}

			echo json_encode($validacion);

		} catch (\Illuminate\Database\QueryException $e) {
			$error = new ErrorsController();
			$error->errores_load_table($e,'DocumentosGral');
		}


	}

/*------------------- Validacion --------------*/

	public function validate($data){

		$validacion = [];
		$validacion['status'] = false;

		$valid = GUMP::is_valid($data,array(
			'id' => 'required|numeric',
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
