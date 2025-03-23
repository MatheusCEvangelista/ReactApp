import { useState, useEffect } from 'react';

function Cadastro() {
    const [input, setInput] = useState('');
    const [tarefas, setTarefas] = useState([
        "Pagar a conta de luz",
        "Estudar Programação",
        "Enviar a tarefa"
    ]);
    const [nomeUsuario, setNomeUsuario] = useState('');
    const [corSelecionada, setCorSelecionada] = useState('white'); // Cor padrão

    const tarefasStorage = localStorage.getItem('@tarefa');
    const nomeUsuarioStorage = localStorage.getItem('@nomeUsuario');
    const corStorage = localStorage.getItem('@cor');

    useEffect(() => {
        if (tarefasStorage) {
            setTarefas(JSON.parse(tarefasStorage));
        }
        if (nomeUsuarioStorage) {
            setNomeUsuario(nomeUsuarioStorage);
        } else {
            const nome = prompt("Qual é o seu nome?");
            if (nome) {
                setNomeUsuario(nome);
                localStorage.setItem('@nomeUsuario', nome);
            }
        }
        if(corStorage){
            setCorSelecionada(corStorage)
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('@tarefa', JSON.stringify(tarefas));
    }, [tarefas]);

    useEffect(()=>{
        if(nomeUsuario){
            localStorage.setItem('@nomeUsuario', nomeUsuario);
        }
    }, [nomeUsuario]);

    useEffect(()=>{
        localStorage.setItem('@cor', corSelecionada);
    }, [corSelecionada]);

    function handleRegistro(e) {
        e.preventDefault();
        setTarefas([...tarefas, input]);
        setInput('');
    }

    // Função para determinar a cor do texto com base na luminosidade da cor de fundo
    function getTextColor(backgroundColor) {
        const r = parseInt(backgroundColor.slice(1, 3), 16);
        const g = parseInt(backgroundColor.slice(3, 5), 16);
        const b = parseInt(backgroundColor.slice(5, 7), 16);
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        return luminance > 0.5 ? 'black' : 'white';
    }

    return (
        <div style={{ color: getTextColor(corSelecionada), backgroundColor: corSelecionada }}>
            <h1>Cadastro de Tarefas</h1>
            {nomeUsuario && <p>{nomeUsuario}, sua lista de tarefas:</p>}
            <form onSubmit={handleRegistro}>
                <label>Nome da tarefa: </label><br />
                <input
                    placeholder='Digite uma tarefa'
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                /><br />
                <br />
                <button type='submit'>Registro</button>
            </form>
            <br /><br />
            <ul>
                {tarefas.map(tarefa => (
                    <li key={tarefa}>{tarefa}</li>
                ))}
            </ul>

            <div>
                <p>Selecione a cor do texto:</p>
                <label>
                    <input
                        type="radio"
                        value="red"
                        checked={corSelecionada === 'red'}
                        onChange={(e) => setCorSelecionada(e.target.value)}
                    />
                    Vermelho
                </label>
                <label>
                    <input
                        type="radio"
                        value="blue"
                        checked={corSelecionada === 'blue'}
                        onChange={(e) => setCorSelecionada(e.target.value)}
                    />
                    Azul
                </label>
                <label>
                    <input
                        type="radio"
                        value="green"
                        checked={corSelecionada === 'green'}
                        onChange={(e) => setCorSelecionada(e.target.value)}
                    />
                    Verde
                </label>
                <label>
                    <input
                        type="radio"
                        value="purple"
                        checked={corSelecionada === 'purple'}
                        onChange={(e) => setCorSelecionada(e.target.value)}
                    />
                    Roxo
                </label>
                <label>
                    <input
                        type="radio"
                        value="white"
                        checked={corSelecionada === 'white'}
                        onChange={(e) => setCorSelecionada(e.target.value)}
                    />
                    Branco
                </label>
            </div>
        </div>
    );
}

export default Cadastro;