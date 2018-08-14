<?php
	namespace App\Rutas;

	use Jur\App\Controllers\SecurityController;

	use Jur\App\Controllers\Asignacion\AsignacionController;

	$controller = new AsignacionController();


	$validate_idVolante = function($idVolante){
		$security = new SecurityController();
		$security->validate_idVolante($idVolante);
	};

	$auth = function(){

		$security = new SecurityController();
		$security->validacion_sesion();
	};





$app->group('/juridico',$auth,function() use($app,$controller,$validate_idVolante){



	$app->get('/Asignacion/:id',function($id) use ($controller,$validate_idVolante){
    $validate_idVolante($id);
		$controller->load_asignacion_insert_template();
	});

	$app->post('/Asignacion/Add',function() use ($controller,$app){
		$controller->insert_asignacion($app->request->post(),$_FILES);
	});




});





?>
