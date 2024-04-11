import './Programacao.css';
import Compromisso from './Compromisso';

function Programacao() {

    //Criar os dados para mandar para compromisso
    //nome é text, hora é time e data é date
    const compromissos = [
        {nome: 'Reunião', hora: '09:00', data: '2021-10-10'},
        {nome: 'Consulta', hora: '10:00', data: '2021-10-10'},
        {nome: 'Almoço', hora: '12:00', data: '2021-10-10'},
        {nome: 'Reunião', hora: '14:00', data: '2021-10-10'},
        {nome: 'Consulta', hora: '15:00', data: '2021-10-10'},
    ];


    //Chamar compromisso
    return(
        <div className="blocoProgramacao">
            {compromissos.map(compromisso => (
                <Compromisso compromisso={compromisso} />
            ))}
        </div>
    );

}

export default Programacao;