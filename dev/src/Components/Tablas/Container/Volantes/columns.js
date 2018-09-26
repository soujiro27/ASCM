
const columns = [
    {
        Header:'Folio',
        accessor: (props) =>    {
            return parseInt(props.folio)
        },
        id:'idFolio',
        width:50
    },
    {
        Header:'Sub',
        accessor: (props) => {
            return parseInt(props.subFolio)
        },
        id:'idSub',
        width:50
    },
    {
        Header:'Documento',
        accessor:'numDocumento'
    },
    {
        Header:'Remitente',
        accessor:'idRemitente',
        width:100
    },
    {
        Header:'Turnado',
        accessor:'idAreaRecepcion',
        width:100
    },
    {
        Header:'Fecha Recepcion',
        accessor:'fRecepcion'
    },
    {
        Header:'Desfazado',
        accessor:'extemporaneo',
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
]


export default columns;
