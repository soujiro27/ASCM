<?php
	namespace App\Rutas;

	use Jur\App\Controllers\SecurityController;

	use Jur\App\Controllers\Asignacion\TurnosController;

	$controller = new TurnosController();


	$validate_idVolante = function($idVolante){
		$security = new SecurityController();
		$security->validate_idVolante($idVolante);
	};

	$auth = function(){

		$security = new SecurityController();
		$security->validacion_sesion();
	};


$app->group('/juridico',$auth,function() use($app,$controller,$validate_idVolante){

	$app->get('/turnos',function() use ($controller){
		$controller->home_template();
	});

	$app->get('/turnos/All',function() use ($controller){
		$controller->tabla();
	});

});





?>
