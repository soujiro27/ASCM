<?php  
namespace Jur\App\Controllers;
use \Jur\App\Models\Modulos\TiposDocumentos;
use \Jur\App\Models\Modulos\SubTipos;


class ModulosController {

	public function get_tipos_documentos(){


		$documentos = TiposDocumentos::where('tipo','JURIDICO')->where('estatus','ACTIVO')->get();

		echo json_encode($documentos);

	}

	public function get_subDocumentos(array $data){

		$tipo = $data['tipo'];
		$auditoria = $data['auditoria'];

		$SubTipos = SubTipos::where('idTipoDocto',"$tipo")
					->where('auditoria',"$auditoria")
					->where('estatus','ACTIVO')
					->get();

		echo json_encode($SubTipos);

	}
}

?>