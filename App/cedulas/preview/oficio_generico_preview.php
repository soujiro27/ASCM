<?php
session_start();
// Include the main TCPDF library (search for installation path).

require_once('./../tcpdf/tcpdf.php');


$datos = [
  'idVolante' => $_GET['idVolante'],
  'nombreRemitente' => $_GET['nombreRemitente'],
  'puestoRemitente' => $_GET['puestoRemitente'],
  'asunto' => $_GET['asunto'],
  'texto' => $_GET['texto'],
  'atte' => $_GET['atte'],
  'copias' => $_GET['copias'],
  'siglas' => $_GET['siglas'],
  'ancho' => $_GET['ancho']

];



foreach ($datos as $key => $value) {
  if(empty($value)){
    header('Location: /SIA/juridico/Public/cedula.html');
  }
  
}
$datos['institucion'] = $_GET['institucion'];



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
    <th class="tg-0pky" rowspan="8" width="45%"><img src="../img/asamblea.png" width="124" height="160" /></th>
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
    <td class="tg-0pky" colspan="2"><span style="font-weight:bold">OFICIO NÚM. VISTA PREVIA</span></td>
  </tr>
  <tr>
    <td class="tg-0pky" colspan="2"></td>
  </tr>
  <tr style="text-align:justify">
    <td class="tg-0pky" width="11%"><span style="font-weight:bold">ASUNTO:</span></td>
    <td class="tg-0pky" width="44%">{$datos['asunto']}</td>
  </tr>
  <tr>
    <td class="tg-0lax"></td>
    <td class="tg-0lax" colspan="2"></td>
  </tr>
  <tr>
    <td class="tg-0lax"></td>
    <td class="tg-0lax" colspan="2">Ciudad de México, 01 DE ENERO DE 2018</td>
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


// -------------------------------------------------------------------
$pdf->SetFont('helvetica', '', 11);

$width = ($datos['ancho'] / 10)  * 17;

$textoPuesto = <<<EOD
<table  border="0" width="100%">
    <tr>
        <td colspan="0" style="line-height:15px;"><b>{$datos['nombreRemitente']}</b></td>
    </tr>
</table>
EOD;
$pdf->writeHTMLCell(170,0,21,115,$textoPuesto,0, 1, 0, true, 'J', true);


$textoPuesto = <<<EOD
<table  border="1" width="100%" >
    <tr>
        <td colspan="1" style="line-height:15px"><b>{$datos['puestoRemitente']}</b></td>
    </tr>
</table>
EOD;
$pdf->writeHTMLCell($width,0,21,119,$textoPuesto,0, 1, 0, true, 'J', true);


// -------------------------------------------------------------------


$textoCuerpo = <<<EOD
<br><br>
<table cellspacing="0" cellpadding="0" border="0">

    <tr>
        <td align="justify" style="line-height:14px">{$datos['texto']}</td>
    </tr>

</table>
EOD;
$pdf->SetFont('helvetica', '', 11);
$pdf->writeHTML($textoCuerpo, true, false, false, false, '');

// -----------------------------------------------------------------------------
$pdf->SetFont('helvetica', '', 9);



$espaciosFirma = $datos['atte'];
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

    $arreglo = $datos['copia'];
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

$tbl = <<<EOD
<table cellspacing="0" cellpadding="0" border="0" style="text-align:justify" width="100%">
    <tr style="text-align:justify">
      <td width="5%">c.c.p.</td>
      <td width="95%"><b>C.P. Nombre de la persona que recibe copia Titular de la Unidad Técnica Sustantiva de Fiscalización Especializada Financiera y Administración .- Presente.- Para su conocimiento</b>
      </td>
     
    </tr>
</table>
EOD;

$pdf->writeHTML($tbl, true, false, false, false, '');

// -----------------------------------------------------------------------------

$pdf->SetFont('helvetica', '', 8);

    $arreglo = $datos['siglas'];
    $total = $arreglo;

   // $total = '0';
    $to = '';

for($i=0;$i<$total;$i++){
    $to .= '<br>';
}

$tbl = <<<EOD
  $to
  <table cellspacing="0" cellpadding="0" border="0">
    <tr><td colspan="6" align="left">SIGLAS<br><br></td></tr>
  </table>
EOD;

$pdf->writeHTML($tbl, true, false, false, false, '');
// -----------------------------------------------------------------------------

//Close and output PDF document
ob_end_clean();
$pdf->Output('OFICIO-PREVIEW.pdf','I');

//============================================================+
// END OF FILE
//============================================================+
