<?php

namespace Jur\App\Controllers;
use Jur\App\Models\Security\UsuariosRoles;
use Jur\App\Models\Security\RolesModulos;
use Jur\App\Models\Volantes\TurnadosJuridico;
use Jur\App\Models\Modulos\Observaciones;

class SecurityController {

	public function validacion_sesion(){

		if($_SESSION["idUsuario"] =='Undefined' || $_SESSION["sCuentaActual"] =='Undefined' || $_SESSION["sUsuario"] == 'Undefined '){
			$app = \Slim\Slim::getInstance();
			$app->redirect('/SIA');

		}
	}

	public function valida_rol($rol){

		$idUsuario = $_SESSION['idUsuario'];
		$roles = UsuariosRoles::find($idUsuario);
		$idRol = $roles['idRol'];

		$modulos = RolesModulos::where('idRol',"$idRol")->where('idModulo',"$rol")->get();
		if($modulos->isEmpty()){
			$app = \Slim\Slim::getInstance();
			$app->redirect('/SIA');
		}

	}

	public function validate_idVolante($idVolante){

		$idArea = $_SESSION['idArea'];
		$idUsuario = $_SESSION['idUsuario'];

		$turnos = TurnadosJuridico::where('idAreaRecepcion',"$idArea")->where('idUsrReceptor',"$idUsuario")->where('idVolante',"$idVolante")->get();
		if($turnos->isEmpty()){
			$app = \Slim\Slim::getInstance();
			$app->redirect('/SIA');
		}

	}

	public function validate_update_observaciones($idObservacion){

		$obvs = Observaciones::find($idObservacion)->get();
		$idVolante = $obvs[0]['idVolante'];

		$idArea = $_SESSION['idArea'];
		$idUsuario = $_SESSION['idUsuario'];

		$turnos = TurnadosJuridico::where('idAreaRecepcion',"$idArea")->where('idUsrReceptor',"$idUsuario")->where('idVolante',"$idVolante")->get();
		if($turnos->isEmpty()){
			$app = \Slim\Slim::getInstance();
			$app->redirect('/SIA');
		}
	}


}


 ?>
