<?php
session_start();
// Include the main TCPDF library (search for installation path).
require_once('./../tcpdf/tcpdf.php');

//$idVolante = $_GET['param'];
$atte = $_GET['atte'];
$copias = $_GET['copias'];
$siglas = $_GET['siglas'];


// create new PDF document
$pdf = new TCPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);

// set document information
$pdf->SetCreator(PDF_CREATOR);
$pdf->SetAuthor('Auditoria Superior de la Ciudad de México');
$pdf->SetTitle('IRAC OFICIO PREVIEW');

 $pdf->setPrintHeader(false);
$pdf->setPrintFooter(false);

// set header and footer fonts
$pdf->setHeaderFont(Array(PDF_FONT_NAME_MAIN, '', PDF_FONT_SIZE_MAIN));
$pdf->setFooterFont(Array(PDF_FONT_NAME_DATA, '', PDF_FONT_SIZE_DATA));

// set default monospaced font
$pdf->SetDefaultMonospacedFont(PDF_FONT_MONOSPACED);

// set margins
$pdf->SetMargins('25','24','26',true);
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


$pdf->SetFont('helvetica', '', 11);


$pdf->AddPage('P','LETTER',true);

$header = '<table  border="0" width="100%">
    <tr>
        <td width="140"><img src="../img/asamblea.png" width="124" height="160" /></td>
        <td width="139"></td>
        <td width="308"><p style="text-align:justify;"><b>AUDITORÍA SUPERIOR DE LA CIUDAD DE MÉXICO</b></p>
          <p style="text-align:justify;margin-top:0px"><b>DIRECCIÓN GENERAL DE ASUNTOS JURÍDICOS</b></p>
          <p><b>OFICIO NÚM. PREVIEW/18/722</b></p>
            <span style="text-align:justify"><b>ASUNTO:</b> Se remite evaluación del Informe de</span>
            <span style="text-align:justify">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;Resultados de Auditoría para Confronta</span>
            <span style="text-align:justify">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;(IRAC) correspondiente a la Auditoría</span>
             <span style="text-align:justify">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; PREVIEW/21/16.</span>

          <p>Ciudad de México, 01 DE ENERO DE 2018.</p>
          <p><i>"Fiscalizar con Integridad para Prevenir y Mejorar"</i></p>
        </td>
    </tr>
</table>';




$pdf->SetFont('helvetica', '', 11);

$pdf->writeHTML($header);



// -------------------------------------------------------------------
$pdf->SetFont('helvetica', '', 11);
$tbl = <<<EOD
<br><br>
<table cellspacing="0" cellpadding="0" border="0"  width="260">
    <tr >
        <td ><b>NOMBRE DE PRUEBA DE OFICIO IRAC<br>PUESTO DE PRUEBA DE OFICIO IRAC<br>P R E S E N T E</b></td>


    </tr>
</table>
EOD;

$pdf->writeHTML($tbl, true, false, false, false, '');



// -------------------------------------------------------------------
$pdf->SetFont('helvetica', '', 11);
$tbl = <<<EOD
<table cellspacing="0" cellpadding="0" border="0">

    <tr>
        <td align="justify">En atención al oficio número PRUEBAS de fecha 01 de ENERO de 2018, presentado ante esta Dirección General el día 01 de ENERO de 2018, y de conformidad con lo dispuesto por el Manual del Proceso General de Fiscalización en su Apartado 7. “Fases de Auditoría”, inciso B) “Fase de Ejecución”, Subapartado 4. “Confronta de Resultados de Auditoría con el Sujeto Fiscalizado”, numeral 1, por este conducto, me permito remitir junto al original en sobre cerrado, la Hoja de Evaluación del Informe de Resultados de Auditoría para Confronta (IRAC-PREVIEW):</td>
    </tr>

</table>
EOD;

$pdf->writeHTML($tbl, true, false, false, false, '');

// -----------------------------------------------------------------------------


$tbl = <<<EOD
  <table cellspacing="0" cellpadding="1" border="1">
    <tr style="background-color:#E7E6E6;">
      <th colspan="1" align="center" width="25"><b>No.</b></th>
      <th colspan="1" align="center" width="80"><b>AUDITORÍA NÚM.</b></th>
      <th colspan="1" align="center" width="100"><b>SUJETO<br>FISCALIZADO</b></th>
      <th colspan="1" align="center" width="90"><b>TIPO DE AUDITORÍA</b></th>
      <th colspan="4" align="center"><b>RUBRO</b></th>
    </tr>
    <tr>
      <td colspan="1" align="center">1</td>
      <td colspan="1" align="center">PRUEBA/12/18</td>
      <td colspan="1">PREVIEW OFICIO IRAC</td>
      <td colspan="1">PREVIEW OFICIO IRAC</td>
      <td colspan="7">PREVIEW OFICIO IRAC</td>
    </tr>
    </table>
EOD;

$pdf->SetFont('helvetica', '', 8);

$pdf->writeHTML($tbl, true, false, false, false, '');

// -----------------------------------------------------------------------------


$atentamente ='';
for ($i=0; $i <$atte ; $i++) {
 $atentamente .= <<<EOD
  <br>

EOD;
}

$atentamente .= <<<EOD
<table cellspacing="0" cellpadding="0" border="0">

    <tr>
        <td>Sin otro particular por el momento, hago propicia la ocasión para enviarle un cordial saludo.<br></td>
    </tr>
    <tr>
        <td><b>ATENTAMENTE<br>EL DIRECTOR GENERAL<br><br><br></b></td>
    </tr>
    <tr>
        <td><b>DR. IVÁN DE JESÚS OLMOS CANSINO</b></td>
    </tr>
</table>
EOD;
$pdf->SetFont('helvetica', '', 11);
$pdf->writeHTML($atentamente, true, false, false, false, '');
// -----------------------------------------------------------------------------

$pdf->SetFont('helvetica', '', 8);

$textoCopias = '';
for ($i=0; $i <$copias; $i++) {
 $textoCopias .= <<<EOD
  <br>
EOD;
}

$textoCopias .= <<<EOD
<table cellspacing="0" cellpadding="0" border="0">
    <tr>
        <td width="34">c.c.p.</td>
        <td width="555"><b>DR. DAVID MANUEL VEGA VERA,</b> Auditor Superior. Presente. Para su conocimiento.<br><b>DR. ARTURO VÁZQUEZ ESPINOSA,</b> Titular de la Unidad Técnica Sustantiva de Fiscalización Especializada y de Asuntos Jurídicos. Presente. Para su conocimiento.</td>
    </tr>
</table>
EOD;

$pdf->writeHTML($textoCopias, true, false, false, false, '');

// -----------------------------------------------------------------------------
$textoSiglas = '';
for ($i=0; $i <$siglas; $i++) {
 $textoSiglas .= <<<EOD
  <br>
EOD;
}
$textoSiglas .= <<<EOD
  <table cellspacing="0" cellpadding="0" border="0">
    <tr><td colspan="6" align="justify">SIGLAS PREVIEW</td></tr>
  </table>
EOD;

$pdf->writeHTML($textoSiglas, true, false, false, false, '');
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
//Close and output PDF document
$pdf->Output('OFICIOIRACPREVIEW.pdf', 'I');

//============================================================+
// END OF FILE
//============================================================+
