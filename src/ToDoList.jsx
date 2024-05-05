import React, { useState, useEffect } from 'react';
import './ToDoList.css';
import Icone from './assets/react.svg'

function ToDoList(){

    const listaStorage = localStorage.getItem('Lista');

    const [lista, setLista] = useState(listaStorage ? JSON.parse(listaStorage) : []);
    const [novoItem, setNovoItem] = useState("");

    useEffect(()=>{
        localStorage.setItem('Lista', JSON.stringify(lista));
    }, [lista]);

    function adicionaItem(form){
        form.preventDefault();
        if(!novoItem){
            return;
        }
        setLista([...lista, {text: novoItem, isCompleted: false}])
        setNovoItem("");
        document.getElementById('input-entrada').focus();
    }

    function clicou(index){
        const listaAux = [...lista];
        listaAux[index].isCompleted = !listaAux[index].isCompleted;
        setLista(listaAux);
    }

    function deleta(index){
        const listaAux = [...lista];
        listaAux.splice(index, 1);
        setLista(listaAux);
    }
    
    function deletaTudo(){
        setLista([]);
    }


    return(
        <div>
            <h1>Lista de Tarefas</h1>

            <form onSubmit={adicionaItem}>
                <input
                    id='input-entrada'
                    type="text"
                    placeholder="Adicione uma tarefa"

                    value={novoItem}
                    onChange={(e)=>{setNovoItem(e.target.value)}}
                />
                <button type="submit" className="btnAdicionar">Adicionar</button>
            </form>
            
            <div className="listaDeTarefas">
                {
                    lista.length < 1
                    ?
                    <div className='listaVazia'>
                        <img src={Icone} />
                        <p>ToDoList criado com React.js</p>
                    </div>
                    :
                    lista.map((item, index)=>(
                        <div
                            key={index}
                            className={item.isCompleted ? "item completo" : "item"}
                        >
                            <span onClick={()=>{clicou(index)}}>{item.text}</span>
                            <button
                                className="btnDeletar" onClick={()=>{deleta(index)}}
                            >Deletar</button> 
                        </div>

                    ))
                }
                {
                    lista.length > 0 &&
                    <button
                        className="btnDeletarTudo"
                        onClick={()=>{deletaTudo()}}
                    >Deletar Todos</button>
                }
            </div>
        </div>
    )
}

export default ToDoList