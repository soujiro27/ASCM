<?php
namespace Jur\App\Models\Volantes;
use Illuminate\Database\Eloquent\Model;


class TurnadosJuridico extends Model {
     protected $table = 'sia_TurnadosJuridico';
     protected $primaryKey = 'idTurnadoJuridico';
     protected $fillable = [
     'idVolante',
     'idAreaRemitente',
     'idAreaRecepcion',
     'idUsrReceptor',
     'idEstadoTurnado',
     'idTipoTurnado',
     'idTipoPrioridad',
     'areaRecepcion',
     'areaRemitente',
     'comentario',
     'usrAlta',
     'fAlta',
     'estatus'
     ];

     public $timestamps = false;

 }
