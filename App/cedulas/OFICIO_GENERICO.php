﻿<?php
session_start();
// Include the main TCPDF library (search for installation path).

require_once('./tcpdf/tcpdf.php');

$idVolante = $_GET['param'];


function conecta(){
  try{
    require './../../../src/conexion.php';
    $db = new \PDO("sqlsrv:Server={$hostname}; Database={$database}", $username, $password );
    return $db;
  }catch (PDOException $e) {
    print "ERROR: " . $e->getMessage();
    die();
  }
}

function consultaRetorno($sql,$db){
    $query=$db->prepare($sql);
    $query->execute();
    return $query->fetchAll(PDO::FETCH_ASSOC);
}

$sql = "SELECT * FROM sia_plantillasJuridico WHERE idVolante='$idVolante'";
$db=conecta();
$datos=consultaRetorno($sql, $db);

if(empty($datos)){
  header('Location: /SIA/juridico/Public/cedula.html');
}

$sql = "SELECT * FROM sia_plantillasJuridico WHERE idVolante='$idVolante'";
$db=conecta();
$datos=consultaRetorno($sql, $db);

$copias = $datos[0]['copias'];

if(empty($copias)){
  header('Location: /SIA/juridico/Public/cedula.html');
}


$sql = "select * from sia_plantillasJuridico where idVolante ='$idVolante'";
$db=conecta();
$datos=consultaRetorno($sql, $db);

$id = $datos[0]['idRemitente'];

$sql = "select * from sia_RemitentesJuridico where idRemitenteJuridico='$id'";
$db=conecta();
$datosNombre=consultaRetorno($sql, $db);
$saludo=$datosNombre[0]['saludo'];
$nombrel = $datosNombre[0]['nombre'];
$name = $saludo.' '.$nombrel;
$puesto = $datosNombre[0]['puesto'];
$texto = $datos[0]['texto'];
$siglas = $datos[0]['siglas'];
$asunto = $datos[0]['asunto'];
$folio = $datos[0]['numFolio'];
$nombreRemitente = $datos[0]['nombreRemitente'];
$puestoRemitente = $datos[0]['puestoRemitente'];
//var_dump($datos);

function convierte($cadena){
  $str = utf8_decode($cadena);
  return $str;
}

function mes($num){
  $meses= ['Enero','Febrero','Marzo','Abril','Mayo','Junio', 'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
  return $meses[$num-1];
}


$feoficio=explode('-',$datos[0]['fOficio']);
$mes2=mes(intval($feoficio[1]));


// create new PDF document
$pdf = new TCPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);

// set document information
$pdf->SetCreator(PDF_CREATOR);
$pdf->SetAuthor('Auditoria Superior de la Ciudad de México');
$pdf->SetTitle('OFICIO GENERICO');

 $pdf->setPrintHeader(false);
$pdf->setPrintFooter(false);

// set header and footer fonts
$pdf->setHeaderFont(Array(PDF_FONT_NAME_MAIN, '', PDF_FONT_SIZE_MAIN));
$pdf->setFooterFont(Array(PDF_FONT_NAME_DATA, '', PDF_FONT_SIZE_DATA));

// set default monospaced font
$pdf->SetDefaultMonospacedFont(PDF_FONT_MONOSPACED);

// set margins
$pdf->SetMargins('22','33','25',true);
$pdf->SetFooterMargin('21');
// set auto page breaks
$pdf->SetY(0, true, true);
$pdf->SetAutoPageBreak(true, '21');
// set image scale factor
$pdf->setImageScale(PDF_IMAGE_SCALE_RATIO);

// set some language-dependent strings (optional)
if (@file_exists(dirname(__FILE__).'/lang/eng.php')) {
    require_once(dirname(__FILE__).'/lang/eng.php');
    $pdf->setLanguageArray($l);
}

// -------------------------------------------------------------------


$pdf->AddPage('P','LETTER',true);
$pdf->SetFont('helvetica', '', 11);



$header = <<<EOD
<table class="tg" border="0">
  <tr>
    <th class="tg-0pky" rowspan="8" width="45%"><img src="img/asamblea.png" width="124" height="160" /></th>
    <th class="tg-fymr" colspan="2" width="55%"><b>AUDITORÍA&nbsp;&nbsp;&nbsp;&nbsp; SUPERIOR&nbsp;&nbsp;&nbsp;&nbsp; DE&nbsp;&nbsp;&nbsp;&nbsp; LA&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; CIUDAD</b></th>
  </tr>
  <tr>
    <td class="tg-fymr" colspan="2"><b>DE MÉXICO</b></td>
  </tr>
  <tr>
    <td class="tg-0pky" colspan="2"></td>
  </tr>
  <tr style="text-align:justify">
    <td class="tg-0pky" colspan="2"><b>DIRECCIÓN GENERAL DE ASUNTOS JURÍDICOS</b></td>
  </tr>
  <tr>
    <td class="tg-0pky" colspan="2"></td>
  </tr>
  <tr>
    <td class="tg-0pky" colspan="2"><span style="font-weight:bold">OFICIO NÚM. {$datos[0]["numFolio"]}</span></td>
  </tr>
  <tr>
    <td class="tg-0pky" colspan="2"></td>
  </tr>
  <tr style="text-align:justify">
    <td class="tg-0pky" width="11%"><span style="font-weight:bold">ASUNTO:</span></td>
    <td class="tg-0pky" width="44%">{$datos[0]['asunto']}</td>
  </tr>
  <tr>
    <td class="tg-0lax"></td>
    <td class="tg-0lax" colspan="2"></td>
  </tr>
  <tr>
    <td class="tg-0lax"></td>
    <td class="tg-0lax" colspan="2">Ciudad de México, {$feoficio[2]} de {$mes2} de {$feoficio[0]}</td>
  </tr>
  <tr>
  <td class="tg-0pky" colspan="2"></td>
</tr>
  <tr>
    <td class="tg-0lax"></td>
    <td class="tg-0lax" colspan="2"><span style="font-style:italic">"Fiscalizar con Integridad para Prevenir y Mejorar"</span></td>
  </tr>
</table>
EOD;
$pdf->writeHTML($header);

/*

<p><b>OFICIO NÚM. ' .$datos[0]["numFolio"] .'</b></p>

            <span style="border:1px solid red"><b>ASUNTO:</b></span>
              <span style="text-align:justify">'.$datos[0]['asunto'].'.'.'</span>

          <p>Ciudad de México, '. $feoficio[2] . ' de ' .$mes2 . ' de ' . $feoficio[0].'.</p>
          <p><i>"Fiscalizar con Integridad para Prevenir y Mejorar"</i></p>

          */

// -------------------------------------------------------------------
$pdf->SetFont('helvetica', '', 11);
$sql = "select * from sia_EspaciosJuridico where idVolante ='$idVolante'";
$db=conecta();
$datos=consultaRetorno($sql, $db);


$width = ($datos[0]['anchoPuesto'] / 10)  * 17;


$textoPuesto = <<<EOD
<table  border="0" width="100%">
    <tr>
        <td colspan="0" style="line-height:15px;"><b>{$nombreRemitente}</b></td>
    </tr>
</table>
EOD;
$pdf->writeHTMLCell(170,0,21,115,$textoPuesto,0, 1, 0, true, 'J', true);


$textoPuesto = <<<EOD
<table  border="0" width="100%" >
    <tr>
        <td colspan="1" style="line-height:15px"><b>{$puestoRemitente}</b></td>
    </tr>
</table>
EOD;
$pdf->writeHTMLCell($width,0,21,119,$textoPuesto,0, 1, 0, true, 'J', true);

// -------------------------------------------------------------------
$textoCuerpo = <<<EOD
<br><br>
<table cellspacing="0" cellpadding="0" border="0">

    <tr>
        <td align="justify" style="line-height:14px">$texto</td>
    </tr>

</table>
EOD;
$pdf->SetFont('helvetica', '', 11);
$pdf->writeHTML($textoCuerpo, true, false, false, false, '');

// -----------------------------------------------------------------------------
$pdf->SetFont('helvetica', '', 9);


$sql = "select * from sia_EspaciosJuridico where idVolante ='$idVolante'";
    $db=conecta();
    $datos=consultaRetorno($sql, $db);
    $espaciosFirma = $datos[0]['atte'];
$tbl='';
for ($i=0; $i <$espaciosFirma ; $i++) {
    # code...
$tbl .= <<<EOD
<br>
EOD;
}


$tbl .= <<<EOD
<table cellspacing="0" cellpadding="0" border="0">
    <tr>
        <td>Sin otro particular por el momento, hago propicia la ocasión para enviarle un cordial saludo.<br></td>
    </tr>
</table>
EOD;


$pdf->SetFont('helvetica', '', 11);
$tbl .= <<<EOD
<table>
    <tr><td><b>ATENTAMENTE<br>EL DIRECTOR GENERAL<br><br><br><br></b></td>
    </tr>
    <tr>
        <td><b>DR. IVÁN DE JESÚS OLMOS CANSINO</b></td>
    </tr>
</table>
EOD;




$pdf->writeHTML($tbl, true, false, false, false, '');
// -----------------------------------------------------------------------------
//saltos de linea
    $sql = "select * from sia_EspaciosJuridico where idVolante ='$idVolante'";
    $db=conecta();
    $datos=consultaRetorno($sql, $db);
    $arreglo = $datos[0]['copia'];
    $total = $arreglo;

   // $total = '0';
    $to = '';

for($i=0;$i<$total;$i++){
    $to .= '<br>';
}

$tbl = <<<EOD

    $to

EOD;

$pdf -> writeHTML($tbl,true,false,false,false,'');


//---------------------------------------------------



$pdf->SetFont('helvetica', '', 8);
$sql = "select copias from sia_plantillasJuridico where idVolante ='$idVolante'";
$db=conecta();
$datos=consultaRetorno($sql, $db);
$arreglo = explode(",",$datos[0]['copias']);

$tr = '';
foreach ($arreglo  as $valor){
    $sql = "select * from sia_RemitentesJuridico where idRemitenteJuridico ='$valor'";
    $db=conecta();
    $datos=consultaRetorno($sql, $db);
    $puesto = $datos[0]['puesto'];
    $nombre = $datos[0]['nombre'];
    $saludo = $datos[0]['saludo'];

    $tr .=  '<b>' .$saludo .' '. $nombre.', '.'</b>' . $puesto .'.- Presente.- Para su conocimiento.<br>';
}



$tbl = <<<EOD
<table cellspacing="0" cellpadding="0" border="0" style="text-align:justify" width="100%">
    <tr style="text-align:justify">
      <td width="5%">c.c.p.</td>
      <td width="95%">$tr </td>
    </tr>
</table>
EOD;

$pdf->writeHTML($tbl, true, false, false, false, '');

// -----------------------------------------------------------------------------

$pdf->SetFont('helvetica', '', 8);

  $sql = "select * from sia_EspaciosJuridico where idVolante ='$idVolante'";
    $db=conecta();
    $datos=consultaRetorno($sql, $db);
    $arreglo = $datos[0]['sigla'];
    $total = $arreglo;

   // $total = '0';
    $to = '';

for($i=0;$i<$total;$i++){
    $to .= '<br>';
}

$tbl = <<<EOD
  $to
  <table cellspacing="0" cellpadding="0" border="0">
    <tr><td colspan="6" align="left">$siglas<br><br></td></tr>
  </table>
EOD;

$pdf->writeHTML($tbl, true, false, false, false, '');
// -----------------------------------------------------------------------------

//Close and output PDF document
ob_end_clean();
$pdf->Output('Folio ' .$folio.'.pdf', 'I');

//============================================================+
// END OF FILE
//============================================================+
