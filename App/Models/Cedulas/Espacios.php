<?php
namespace Jur\App\Models\Cedulas;
use Illuminate\Database\Eloquent\Model;


class Espacios extends Model {
     protected $primaryKey = 'idEspacioJuridico ';
     protected $table = 'sia_EspaciosJuridico';
     protected $fillable = [
     	'idVolante',
		'encabezado',
		'cuerpo',
		'pie',
		'atte',
		'copia',
		'copiaCedula',
    'fechaDocto',
		'sigla',
		'usrAlta',
		'usrModificacion',
		'fModificacion'
	];
     public $timestamps = false;

 }
