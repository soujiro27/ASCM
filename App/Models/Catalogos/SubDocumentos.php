<?php 
namespace Jur\App\Models\Catalogos;
use Illuminate\Database\Eloquent\Model;


class SubDocumentos extends Model {
     protected $primaryKey = 'idSubTipoDocumento';
     protected $table = 'sia_catSubTiposDocumentos';
     protected $fillable = ['nombre','idTipoDocto','auditoria','tipo','usrAlta','fAlta','estatus','usrModificacion','fModificacion'];
     public $timestamps = false;

 }
