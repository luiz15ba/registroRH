'use client'

import { useEffect, useState } from "react";

const Page = () => {
  let msg;
  const [horaAtual, setHoraAtual] = useState<Date | null>(null);
  const horaMostrar = new Date().getHours();
  const [escolhadeEscala, setEscolhaEscala] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Entrou');
  const [horasTrabalhadas, setHorasTrabalhadas] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const storedHorasTrabalhadas = localStorage.getItem('horasTrabalhadas');
      if (storedHorasTrabalhadas) {
        return JSON.parse(storedHorasTrabalhadas);
      }
    }
    return [];
  });
  const [limparHistorico, setLimparHistorico] = useState(false);


  useEffect(() => {
    localStorage.setItem('horasTrabalhadas', JSON.stringify(horasTrabalhadas));
  }, [horasTrabalhadas]);


  setInterval(() => {
    setHoraAtual(new Date());
  }, 1000);


  if (horaMostrar !== null) {
    switch (true) {
      case horaMostrar >= 0 && horaMostrar <= 11:
        msg = 'Bom dia!'
        break;
      case horaMostrar >= 12 && horaMostrar <= 17:
        msg = 'Boa Tarde!'
        break;
      case horaMostrar >= 18 && horaMostrar <= 23:
        msg = 'Boa Noite!'
        break;
    }
  }

  const escolhaEscala = () => {
    setEscolhaEscala(!escolhadeEscala);
    //window.open("https://www.google.com", "_blank")
  }

  const handleClick = () => {
    if (horaAtual !== null) {
      let dia = `${horaAtual.getDate()}` //dia
      let mes; //`${horaAtual.getMonth()}` //Mês
      let ano = `${horaAtual.getFullYear()}` //Ano

      switch (horaAtual.getMonth()) {
        case 0:
          mes = 'Janeiro'
          break
        case 1:
          mes = 'Fevereiro'
          break
        case 2:
          mes = 'Março'
          break
        case 3:
          mes = 'Abril'
          break
        case 4:
          mes = 'Maio'
          break
        case 5:
          mes = 'Junho'
          break
        case 6:
          mes = 'Julho'
          break
        case 7:
          mes = 'Agosto'
          break
        case 8:
          mes = 'Setembro'
          break
        case 9:
          mes = 'Outubro'
          break
        case 10:
          mes = 'Novembro'
          break
        case 11:
          mes = 'Dezembro'
          break
        default:
          mes = 'Mês Não Reconhecido'
          break
      }

      let msgHora = `[${selectedOption}] - ${dia} de ${mes} de ${ano} - ${horaAtual.toLocaleTimeString()}`;
      const newHorasTrabalhadas = [
        ...horasTrabalhadas,
        msgHora,
      ];
      setHorasTrabalhadas(newHorasTrabalhadas);
      window.open(`https://api.whatsapp.com/send?phone=5577999671029&text=${msgHora}`);
    }
    escolhaEscala()
    //https://api.whatsapp.com/send?phone=5577999671029&text=Teste
  }

  return (
    <div className="bg-white/90 w-full min-h-screen flex justify-center items-center">
      <div className="bg-black text-white p-5 w-full max-w-xl rounded-md">
        {escolhadeEscala === false &&
          <>
            <h1 className="font-bold text-3xl text-center p-3">Registro de Horas</h1>
            <p className="text-center text-3xl mb-3 ">{horaAtual !== null ? horaAtual.toLocaleTimeString() : ''}</p>
            <div className="flex flex-col items-center">
              <p className="w-80 text-center border-b border-gray-300 mb-4">{msg} Registre clicando abaixo</p>
              <button onClick={escolhaEscala} className="py-2 px-24 rounded-md bg-green-600">REGISTRAR</button>
            </div>
            <div className="flex flex-col items-center mt-5">
              <div className="text-3xl border-b border-gary-300 mt-5">Historico de Horas</div>
              {limparHistorico === false && horasTrabalhadas.length !== 0 &&
                <button onClick={() => setLimparHistorico(!limparHistorico)} className="py-2 px-2 rounded-md bg-red-600 mt-4">Limpar Historico</button>
              }
              {limparHistorico === false &&
                <>
                  {horasTrabalhadas.map((item, key) => {
                    const [acao, ...resto] = item.split(']');
                    return (
                      <div className="pt-5 border-b border-gray-300" key={key}>
                        <span style={{ color: acao === '[Entrou' ? 'green' : 'red' }}>{acao}]</span>{resto}
                      </div>
                    );
                  })}
                </>
              }
              {limparHistorico === true &&
                <>
                  <div className="w-full border mt-2">
                    <div className="text-center text-2xl">Realmente Limpar?</div>
                    <div className="flex justify-center">
                      <button onClick={() => {localStorage.clear(); setLimparHistorico(!limparHistorico); setHorasTrabalhadas([])}} className="py-2 px-8 rounded-md bg-red-600 m-4">SIM</button>
                      <button onClick={() => setLimparHistorico(!limparHistorico)} className="py-2 px-8 rounded-md bg-green-600 m-4">NÂO</button>
                    </div>
                    <div className="text-center">
                      <p>Essa ação limpa todo seu historico local <br></br><span className="text-sm" style={{ color: 'red' }}>NÃO SENDO POSSIVEL RECUPERAR</span></p>

                    </div>
                  </div>
                </>
              }
            </div>
          </>
        }
        {escolhadeEscala === true &&
          <>
            <h1 className="font-bold text-3xl text-center p-3">Registro de Horas</h1>
            <p className="text-center text-3xl mb-3 ">{horaAtual !== null ? horaAtual.toLocaleTimeString() : ''}</p>
            <div className="flex flex-col items-center">
              <h1 className="text-center text-xl mb-2">Escolha abaixo o Turno de Trabalho</h1>
              <select className="text-white text-xl p-1 mt-3 rounded bg-sky-600 border border-sky-300 outline-none"
                onChange={(event) => setSelectedOption(event.target.value)}
                value={selectedOption}
              >
                <option value='Entrou'>Entrada</option>
                <option value='Saiu'>Saida</option>
              </select>
              <button onClick={handleClick} className="py-2 px-24 rounded-md mt-5 bg-green-600">SALVAR REGISTRO</button>
            </div>
          </>
        }

      </div>
    </div>
  )

}

export default Page;