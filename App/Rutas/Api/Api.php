<?php  
	namespace App\Rutas;
	
	use Jur\App\Controllers\SecurityController;

	use Jur\App\Controllers\ModulosController;

	$controller = new ModulosController();


	$auth = function(){

		$security = new SecurityController();
		$security->validacion_sesion();
	};

	

$app->group('/juridico/Api',$auth,function() use($app,$controller){


	$app->get('/Documentos',function() use ($controller,$app){
		$controller->get_tipos_documentos();
	});

	$app->get('/SubDocumentos',function() use ($controller,$app){
		$controller->get_subDocumentos($app->request->get());
	});

	$app->get('/Caracteres',function() use ($controller){
		$controller->get_Caracteres();
	});

	$app->get('/Turnados',function() use ($controller,$app){
		$controller->get_Areas_Volantes($app->request->get());
	});

	$app->get('/Acciones',function() use ($controller){
		$controller->get_Acciones();
	});

	$app->get('/DatosAuditoria',function() use ($controller,$app){
		$controller->get_Datos_Auditoria($app->request->get());
	});

	$app->get('/TurnadosAuditoria',function() use ($controller,$app){
		$controller->get_Turnados_Auditoria($app->request->get());
	});

});





?>