import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Todo from '../components/Todo';
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate()
    const [data, setData] = useState(null)
    const [modal, setModal] = useState(false)
    const todoRef = useRef(null)

    const fetchTodo = () => {
        const Data = JSON.parse(localStorage.getItem('data'))
        setData(Data)
    }
    useEffect(() => {
        fetchTodo()

        if (!localStorage.getItem('data')) {
            navigate('/')
        }
    })

    const addTodo = () => {

        if (todoRef.current.value !== "") {
            const newTodo = {
                id: Math.floor(Math.random() * 1000),
                createdOn: new Date().toUTCString(),
                subject: todoRef.current?.value,
                completed: false
            }
            localStorage.setItem("data", JSON.stringify({
                ...data,
                todos: [newTodo, ...data.todos]
            }))
            setModal(false)
            fetchTodo()
            todoRef.current.value = ""
        }
    }

    const logout = () => {
        localStorage.clear('data')
        navigate('/')
    }


    return (
        <MainContainer>
            <Container style={{ filter: modal ? "blur(2px)" : 'none' }} onClick={() => modal && setModal(false)}>
                <Header>
                    <p style={{ fontStyle: "italic" }}>Neko's Todo</p>
                    <div>
                        <p>Hello {data?.name}</p>
                        <LogOutBtn onClick={() => logout()}>Log Out</LogOutBtn>
                    </div>
                </Header>
                <div className="todo_container">
                    <div className="todos">
                        {
                            data?.todos.length > 0 ? (<>
                                {
                                    data?.todos.map((todo) => (
                                        <Todo todo={todo} key={todo.id} data={data} refresh={fetchTodo} />
                                    ))
                                }
                            </>) : (<div style={{ width: '100%', height: '100%', display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 10 }}>
                                <img src="https://cdn-icons-png.flaticon.com/256/10444/10444910.png" alt="no todo" width={100} />
                                <p>No todo</p>
                                <p style={{ fontSize: 12, color: "#bbb" }}>Click to complete</p>
                                <p style={{ fontSize: 12, color: "#bbb" }}>Double click to Delete</p>
                            </div>)
                        }
                    </div>
                </div>
                <div className='addBtn' onClick={() => setModal(true)}>
                    +
                </div>
            </Container>
            <ModalContainer style={{ transform: modal ? 'scale(100%)' : 'scale(0)' }}>
                <input ref={todoRef} type="text" placeholder='Enter Subject' required />
                <div className='addBtn' onClick={() => addTodo()} >Done</div>
            </ModalContainer>
        </MainContainer>
    )
}

const MainContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 20px;
    align-items: center;
    background: radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%);
    .todo_container {
        width: 320px;
        height: 400px;
        background: rgba(255,255,255,0.6);
        border-radius: 8px;
        display: grid;
        place-items: center;
        .todos {
            width: 250px;
            height: 85%;
            overflow: scroll;
        }
    }
    .addBtn {
        width: 60px;
        height: 60px;
        border-radius: 60px;
        background: rgb(255, 255, 255);
        font-size: 48px;
        font-weight: bold;
        color: rgba(148,187,233,1);
        display: grid;
        place-Items: center;
    }
`

const Header = styled.h1`
    position: absolute;
    top: 10px;
    width: 80%;
    height: 60px;
    background: #fff;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    div {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 10px;
        p {
            @media (max-width: 568px) {
                display: none;
            }
        }
    }
`

const ModalContainer = styled.div`
    position: absolute;
    width: 330px;
    height: 150px;
    background: #fff;
    border-radius: 20px;
    padding: 10px 20px;
    transition: transform 400ms;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    input {
        width: 200px;
        height: 50px;
        padding: 0 20px;
        outline: none;
        border: none;
        border-radius: 8px;
        background-color: #eee;
    }
    .addBtn {
        width: 100px;
        height: 50px;
        border-radius: 8px;
        background-color: rgba(148,187,233,1);
        display: grid;
        place-Items: center;
        color: #fff;
        font-size: 18px;
        font-style: italic;
        font-weight: bold;
        cursor: pointer;
    }
`

const LogOutBtn = styled.div`
    padding: 10px 20px;
    background-color: rgba(148,187,233,1);
    border-radius: 20px;
    color: #fff;
    cursor: pointer;
`

export default Home
