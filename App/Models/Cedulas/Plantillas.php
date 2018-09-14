<?php
namespace Jur\App\Models\Cedulas;
use Illuminate\Database\Eloquent\Model;


class Plantillas extends Model {
     protected $primaryKey = 'idPlantillaJuridico';
     protected $table = 'sia_plantillasJuridico';
     protected $fillable = [
		'idVolante',
		'numFolio',
		'asunto',
		'fOficio',
		'idRemitente',
		'texto',
		'siglas',
		'copias',
		'espacios',
		'nombreRemitente',
		'puestoRemitente',
		'institucionRemitente',
		'espacios2',
		'idPuestoJuridico',
		'usrAlta',
		'refDocumento',
		'fAlta',
		'usrModificacion',
		'fModificacion'
     ];
     public $timestamps = false;

 }
