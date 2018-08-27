<?php

namespace Jur\App\Controllers\Internos;
use Jur\App\Controllers\TwigController;
use GUMP;
use Carbon\Carbon;


use Jur\App\Controllers\NotificacionesController;
use Jur\App\Controllers\BaseController;

use Jur\App\Models\Volantes\Volantes;
use Jur\App\Models\Volantes\VolantesDocumentos;
use Jur\App\Models\Volantes\TurnadosJuridico;
use Jur\App\Models\Cedulas\DocumentosSiglas;
use Jur\App\Models\Cedulas\Espacios;


class IracController extends TwigController {

	private $js = 'Irac-Internos';
	private $nombre = 'Irac-Internos';


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



	public function tabla_internos(){

			$area =  $_SESSION['idArea'];

        $idUsuario = $_SESSION['idUsuario'];


         $iracs = Volantes::select('sia_Volantes.*','c.nombre as caracter','a.nombre as accion','audi.clave','sia_Volantes.extemporaneo','t.idEstadoTurnado')
            ->join('sia_catCaracteres as c','c.idCaracter','=','sia_Volantes.idCaracter')
            ->join('sia_CatAcciones as a','a.idAccion','=','sia_Volantes.idAccion')
            ->join('sia_VolantesDocumentos as vd','vd.idVolante','=','sia_Volantes.idVolante')
            ->join('sia_auditorias as audi','audi.idAuditoria','=','vd.cveAuditoria')
            ->join( 'sia_catSubTiposDocumentos as sub','sub.idSubTipoDocumento','=','vd.idSubTipoDocumento')
            ->join('sia_TurnadosJuridico as t','t.idVolante','=','sia_Volantes.idVolante')
            ->where('sub.nombre','=','IRAC')
            ->where('t.idAreaRecepcion','=',"$area")
            ->where('t.idUsrReceptor',"$idUsuario")
            ->where('t.idTipoTurnado','I')
            ->orderBy('t.idTurnadoJuridico','DESC')
            ->first();

            $res[0] = $iracs;

		echo json_encode($res);
}

	public function load_cedula_template($id){

		$notificaciones = new NotificacionesController();
		$base = new BaseController();
		$menu = $base->menu();

		$template = [
			'js' => 'Irac',
			'session' => $_SESSION,
			'nombre' => $this->nombre,
			'notificaciones' => $notificaciones->get_notificaciones(),
			'menu' => $menu['modulos']
		];

		$ds = DocumentosSiglas::where('idVolante',"$id")->get();
		if($ds->isEmpty()){
					echo $this->render('HomeLayout/InsertContainer.twig',$template);
		} else {
				$template['id'] = $id;
				echo $this->render('HomeLayout/UpdateContainer.twig',$template);
		}

	}



	public function get_register_cedula($id){
			$idVolante =$id;
			$cedula = DocumentosSiglas::select('sia_documentosSiglas.*','e.*')
							->leftJoin('sia_espaciosJuridico as e','e.idVolante','=','sia_documentosSiglas.idVolante')
							->where('sia_documentosSiglas.idVolante',"$idVolante")->get();
			echo json_encode($cedula);
	}


	public function insert_cedula(array $data){

		$validate =  $this->validate($data);
		if(empty($validate)){

			$idVolante = $data['idVolante'];

			$volantesDocumentos = VolantesDocumentos::where('idVolante',"$idVolante")->get();
			$subTipo = $volantesDocumentos[0]['idSubTipoDocumento'];

			$documento = new DocumentosSiglas([
				'idVolante' => $idVolante,
				'idSubTipoDocumento' => $subTipo,
				'idPuestosJuridico' => $data['firmas'],
				'fOficio' => $data['fecha_documento'],
				'siglas' => $data['siglas'],
        'numFolio' => $data['folio'],
				'usrAlta' => $_SESSION['idUsuario'],
			]);

			$documento->save();

			$espacios = new Espacios([
				'idVolante' => $idVolante,
				'encabezado' => $data['e_observaciones'],
				'cuerpo' => $data['e_texto'],
				'pie' => $data['e_firmas'],
				'copiaCedula' => $data['e_copias'],
        'atte' => $data['e_atte'],
        'copia' => $data['e_copias_oficio'],
        'sigla' => $data['e_siglas'],
				'usrAlta' => $_SESSION['idUsuario']
			]);

				$espacios->save();
				$validate[0] = 'OK';

		}
		echo json_encode($validate);
	}


	public function update_cedula(array $data){

		$validate = $this->validate($data);

		if(empty($validate)){

		$id = $data['idDocumentoSiglas'];
		$idVolante = $data['idVolante'];

		DocumentosSiglas::find($id)->update([
      'numFolio' => $data['folio'],
			'idPuestosJuridico' => $data['firmas'],
			'fOficio' => $data['fecha_documento'],
			'siglas' => $data['siglas'],
			'usrModificacion' => $_SESSION['idUsuario'],
			'fModificacion' => Carbon::now('America/Mexico_City')->format('Y-m-d H:i:s')
		]);


		Espacios::where('idVolante',"$idVolante")->update([
			'encabezado' => $data['e_observaciones'],
			'cuerpo' => $data['e_texto'],
			'pie' => $data['e_firmas'],
			'copiaCedula' => $data['e_copias'],
      'atte' => $data['e_atte'],
      'copia' => $data['e_copias_oficio'],
      'sigla' => $data['e_siglas'],
			'usrModificacion' => $_SESSION['idUsuario'],
			'fModificacion' => Carbon::now('America/Mexico_City')->format('Y-m-d H:i:s')
		]);

			 $validate[0] = 'OK';

		}
		echo json_encode($validate);

	}


	public function validate(array $data){

		$valid = GUMP::is_valid($data,array(
			'siglas' => 'required|max_len,150',
			'fecha_documento' => 'required|max_len,10',
			'e_observaciones' => 'required|max_len,2|numeric',
			'e_texto' => 'required|max_len,2|numeric',
			'e_firmas' => 'required|max_len,2|numeric',
			'e_copias' => 'required|max_len,2|numeric',
      'e_atte' => 'required|max_len,2|numeric',
      'e_copias_oficio' => 'required|max_len,2|numeric',
      'e_siglas' => 'required|max_len,2|numeric',
      'folio' => 'required|max_len,50' ,
			'firmas' => 'required|max_len,50',
		));

		if($valid === true){
			$valid = [];
		}

		return $valid;
	}




}

?>