<?php
	namespace App\Rutas;

	use Jur\App\Controllers\SecurityController;

	use Jur\App\Controllers\Volantes\VolantesController;

	$controller = new VolantesController();


	$rol = function(){
		$security = new SecurityController();
		$security->valida_rol('VOLANTES');
	};

	$auth = function(){

		$security = new SecurityController();
		$security->validacion_sesion();
	};

<<<<<<< HEAD

=======
>>>>>>> nuevo




$app->group('/juridico',$auth,function() use($app,$controller){

/*-----------------Home--------------------------*/

	$app->get('/Volantes',function() use ($controller){
		$controller->home_template();
	});

	$app->get('/Volantes/All',function() use ($controller){
		$controller->tabla();
	});

	$app->get('/Volantes/Export',function() use ($controller){
		$controller->export();
	});


/*------------------Insert--------------------------*/

	$app->get('/Volantes/Add',function() use ($controller){
		$controller->insert_template();
	});

	$app->post('/Volantes/Save',function() use ($controller,$app){
		$controller->guardar($app->request->post(),$_FILES);
	});

/*----------------Update-----------------------------*/

	$app->get('/Volantes/Update',function() use ($controller){
		$controller->update_template();
	});

	$app->get('/Volantes/Update/:id',function($id) use ($controller){
		$controller->registro($id);
	});

	$app->post('/Volantes/Update',function() use ($controller,$app){
		$controller->Update($app->request->post());
	});

});





?>
