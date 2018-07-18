<?php 

namespace Jur\App\Controllers;
use Jur\App\Models\Security\UsuariosRoles;
use Jur\App\Models\Security\RolesModulos;


class SecurityController {

	public function validacion_sesion(){
		if($_SESSION['logueado'] == 0){

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


	}


 ?>