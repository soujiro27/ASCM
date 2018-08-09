<?php
	namespace App\Rutas;

	use Jur\App\Controllers\SecurityController;

	use Jur\App\Controllers\Observaciones\ObservacionesController;

	$controller = new ObservacionesController();


	$auth = function(){

		$security = new SecurityController();
		$security->validacion_sesion();
	};





$app->group('/juridico',$auth,function() use($app,$controller){



	$app->post('/Observaciones/save',function() use ($controller,$app){
		$controller->guardar($app->request->post());
	});

  $app->post('/Observaciones/Update',function() use ($controller,$app){
    $controller->update($app->request->post());
  });

  $app->get('/:modulo/Observaciones/Update/:id',function($modulo,$id) use ($controller){
    $controller->update_template($modulo,$id);
  });


  $app->get('/Observaciones/Register/:id',function($id) use ($controller){
    $controller->registro($id);
  });


/*	$app->post('/Acciones/Update',function() use ($controller,$app){
		$controller->Update($app->request->post());
	});*/

});





?>
