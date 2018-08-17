<?php

namespace Jur\App\Controllers\Documentos;
use Jur\App\Controllers\TwigController;
use GUMP;
use Carbon\Carbon;

use Jur\App\Controllers\NotificacionesController;
use Jur\App\Controllers\BaseController;

use Jur\App\Models\Catalogos\Acciones;
use Jur\App\Models\Volantes\Volantes;
use Jur\App\Models\Volantes\AnexosJuridico;
use Jur\App\Models\Volantes\TurnadosJuridico;


class DocumentosDirectoresController extends TwigController {

	private $js = 'DocumentosDirectores';
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


    $idArea = $_SESSION['idArea'];

		$documentos = Volantes::select('sia_Volantes.*','vd.cveAuditoria','sub.nombre','t.idEstadoTurnado','t.idAreaRecepcion','t.idAreaRemitente','t.idTurnadoJuridico')
		->join('sia_VolantesDocumentos as vd','vd.idVolante','=','sia_volantes.idVolante')
		->join('sia_TurnadosJuridico as t','t.idVolante','=','sia_Volantes.idVolante'  )
		->join('sia_catSubTiposDocumentos as sub','sub.idSubTipoDocumento','=','vd.idSubTipoDocumento')
		->where('t.idTipoTurnado','V')
    ->where('idAreaRecepcion',"$idArea")
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

	public function guardar(array $data, $file){

		$data['estatus'] = 'ACTIVO';
		$idVolante = $data['idVolante'];
		$idTurnado = $data['idTurnadoJuridico'];
		$areaRecepcion = $data['areaRecepcion'];

		$validate = [];
		array_push($validate, 'Error');

		if(!empty($file)){

			$base = new BaseController();
			$base->upload_file_areas($file,$idVolante,$idTurnado,'Areas','DGAJ',$areaRecepcion);
			$validate[0] = 'OK';
		}


		echo json_encode($validate);
	}


	public function update($data){

		$id = $data['id'];

		$validate = $this->validate($data);
			if(empty($validate)){

				AnexosJuridico::find($id)->update([
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

		$documentos = AnexosJuridico::select('sia_anexosJuridico.*','t.idVolante')
					->join('sia_TurnadosJuridico as t','t.idTurnadoJuridico','=','sia_anexosJuridico.idTurnadoJuridico')
					->where('sia_anexosJuridico.idTurnadoJuridico',"$id")
					->where('sia_anexosJuridico.estatus','ACTIVO')
					->orderBy('sia_anexosJuridico.idAnexoJuridico','DESC')
					->get();

		if($documentos->isEmpty()){

			$documentos = TurnadosJuridico::where('idTurnadoJuridico',"$id")->get();
		}
		echo json_encode($documentos);
	}


	public function validate($data){



		$valid = GUMP::is_valid($data,array(
			'id' => 'required|numeric',
			'estatus' => 'required|max_len,8|alpha',
		));

		if($valid === true){
			$valid = [];
		}

		return $valid;
	}

}

?>
