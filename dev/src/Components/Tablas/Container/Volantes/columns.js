const columns = [
    {
        Header:'Folio',
        accessor:'folio'
    },
    {
        Header:'SubFolio',
        accessor:'subFolio'
    },
    {
        Header:'Documento',
        accessor:'numDocumento'
    },
    {
        Header:'Remitente',
        accessor:'idRemitente'
    },
    {
        Header:'Turnado',
        accessor:'idAreaRecepcion'
    },
    {
        Header:'Fecha Recepcion',
        accessor:'fRecepcion'
    },
    {
        Header:'Desfazado',
        accessor:'extemporaneo'
    },
    {
        Header:'Auditoria',
        accessor:'clave'
    },
    {
        Header:'Oficio',
        accessor:'nombre'
    },
    {
        Header:'Estado',
        accessor:'idEstadoTurnado'
    },
    {
        Header:'Estatus',
        accessor:'estatus'
    }
]


export default columns;
