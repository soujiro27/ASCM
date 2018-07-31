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

	



$app->group('/juridico',$auth,$rol,function() use($app,$controller){

	$app->get('/VolantesDiversos',function() use ($controller){
		$controller->Home();
	});

	$app->get('/VolantesDiversos/all',function() use ($controller){
		$controller->tabla();
	});

	$app->get('/VolantesDiversos/add',function() use ($controller){
		$controller->nuevo_registro();
	});


	$app->get('/VolantesDiversos/:id',function($id) use ($controller){
		$controller->update_template($id);
	});

	$app->get('/VolantesDiversos/Register/:id',function($id) use ($controller){
		$controller->registro($id);
	});

	$app->get('/VolantesDiversos/Export',function() use ($controller){
		$controller->export();
	});


	$app->post('/VolantesDiversos/save',function() use ($controller,$app){
		$controller->guardar($app->request->post(),$_FILES);
	});

	$app->post('/VolantesDiversos/Update',function() use ($controller,$app){
		$controller->Update($app->request->post());
	});

});





?>