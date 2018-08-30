<?php
	namespace App\Rutas;

	use Jur\App\Controllers\SecurityController;

	use Jur\App\Controllers\Respuestas\RespuestasController;

	$controller = new RespuestasController();


	$validate_idVolante = function($idVolante){
		$security = new SecurityController();
		$security->validate_idVolante($idVolante);
	};

	$auth = function(){

		$security = new SecurityController();
		$security->validacion_sesion();
	};


$app->group('/juridico',$auth,function() use($app,$controller){

	$app->get('/Respuestas',function() use ($controller){
		$controller->home_template();
	});

});


?>
