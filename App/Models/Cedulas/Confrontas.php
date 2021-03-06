<?php
namespace Jur\App\Models\Cedulas;
use Illuminate\Database\Eloquent\Model;


class Confrontas extends Model {
     protected $primaryKey = 'idConfrontaJuridico';
     protected $table = 'sia_ConfrontasJuridico';
     protected $fillable = ['idVolante','notaInformativa','nombreResponsable','cargoResponsable','nombreRemitente','puestoRemitente','hConfronta','fOficio','fConfronta','numFolio','siglas','refDocumento','usrAlta','estatus','usrModificacion','fModificacion'];
     public $timestamps = false;

 }
