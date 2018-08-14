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





$app->group('/juridico',$auth,function() use($app,$controller,$validate_idVolante){



	$app->get('/Respuestas/:id',function($id) use ($controller,$validate_idVolante){
    $validate_idVolante($id);
		$controller->load_respuestas_home_template();
	});



});





?>
