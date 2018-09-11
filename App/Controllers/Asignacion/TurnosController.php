<?php

namespace Jur\App\Controllers\Asignacion;
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
use Jur\App\Models\Modulos\Puestos;
use Jur\App\Models\Notificaciones\Usuarios;


class TurnosController extends TwigController {

	private $js = 'Turnos';
	private $nombre = 'Turnos';

  public function home_template(){

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

		try {

            $area = $_SESSION['idArea'];

  	        $idUsuario = $_SESSION['idUsuario'];

            $iracs = Volantes::select('sia_Volantes.*','c.nombre as caracter','a.nombre as accion','audi.clave','sia_Volantes.extemporaneo','t.idEstadoTurnado')
            ->join('sia_catCaracteres as c','c.idCaracter','=','sia_Volantes.idCaracter')
            ->join('sia_CatAcciones as a','a.idAccion','=','sia_Volantes.idAccion')
            ->join('sia_VolantesDocumentos as vd','vd.idVolante','=','sia_Volantes.idVolante')
            ->join('sia_auditorias as audi','audi.idAuditoria','=','vd.cveAuditoria')
            ->join( 'sia_catSubTiposDocumentos as sub','sub.idSubTipoDocumento','=','vd.idSubTipoDocumento')
            ->join('sia_TurnadosJuridico as t','t.idVolante','=','sia_Volantes.idVolante')
            ->where('t.idAreaRecepcion','=',"$area")
            ->where('t.idUsrReceptor',"$idUsuario")
            ->where('t.idTipoTurnado','I')
			->orderBy('t.idTurnadoJuridico','DESC')
			->get();

          

            echo json_encode(array('status'=>true,'data' => $iracs));

	    } catch (\Illuminate\Database\QueryException $e) {
		    $error = new ErrorsController();
		    $error->errores_load_table($e,'Asignacion');
	    }
    }
}


?>
