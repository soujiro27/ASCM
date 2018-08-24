<?php
	namespace App\Rutas;

	use Jur\App\Controllers\SecurityController;

	use Jur\App\Controllers\Volantes\VolantesDiversosController;

	$controller = new VolantesDiversosController();


	$rol = function(){
		$security = new SecurityController();
		$security->valida_rol('VOLANTES-DIVERSOS');
	};

	$auth = function(){

		$security = new SecurityController();
		$security->validacion_sesion();
	};





$app->group('/juridico',$auth,function() use($app,$controller){

	$app->get('/VolantesDiversos',function() use ($controller){
		$controller->home_template();
	});

	$app->get('/VolantesDiversos/All',function() use ($controller){
		$controller->tabla();
	});

	$app->get('/VolantesDiversos/Export',function() use ($controller){
		$controller->export();
	});


/*------------------Insert--------------------------*/

	$app->get('/VolantesDiversos/Add',function() use ($controller){
		$controller->insert_template();
	});

	$app->post('/VolantesDiversos/Save',function() use ($controller,$app){
		$controller->guardar($app->request->post(),$_FILES);
	});

/*----------------Update-----------------------------*/

	$app->get('/VolantesDiversos/Update',function() use ($controller){
		$controller->update_template();
	});

	$app->get('/VolantesDiversos/Update/:id',function($id) use ($controller){
		$controller->registro($id);
	});

	$app->post('/VolantesDiversos/Update',function() use ($controller,$app){
		$controller->Update($app->request->post());
	});


});





?>
