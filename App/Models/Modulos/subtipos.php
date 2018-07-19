<?php 
namespace Jur\App\Models\Modulos;
use Illuminate\Database\Eloquent\Model;


class SubTipos extends Model {
     protected $primaryKey = 'idSubTipoDocumento';
     protected $table = 'sia_catSubTiposDocumentos';
     protected $fillable = ['nombre','idTipoDocto','auditoria','tipo','usrAlta','fAlta','estatus'];
     public $timestamps = false;

 }
