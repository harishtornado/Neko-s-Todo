import React from 'react'
import styled from 'styled-components'

const Todo = ({ todo, data, refresh }) => {

    const updateTodo = () => {
        const updatedTodo = {
            ...todo,
            completed: !todo.completed
        }

        const index = data.todos.indexOf(todo)

        const updatedData = [
            ...data.todos.slice(0, index),
            updatedTodo,
            ...data.todos.slice(index + 1),
        ];

        localStorage.setItem("data", JSON.stringify({
            ...data,
            todos: updatedData,
        }))

        refresh()
    }

    const removeTodo = () => {
        const updatedData = data.todos.filter(item => item.id !== todo.id)
        localStorage.setItem("data", JSON.stringify({
            ...data,
            todos: updatedData,
        }))

        refresh()
    }

    return (
        <TodoContainer style={{ background: todo.completed ? "rgb(169, 255, 167)" : "#fff" }} onClick={() => updateTodo()} onDoubleClick={() => removeTodo()}>
            <h1>{todo?.subject}</h1>
            <p>{todo?.createdOn}</p>
        </TodoContainer>
    )
}

const TodoContainer = styled.div`
    width: 250px;
    height: 100px;
    border-radius: 8px;
    background: #fff;
    padding: 10px 20px;
    margin-bottom: 15px;
    position: relative;
    display: flex;
    align-items: center;
    p {
        font-size: 9px;
        color: #bbb;
        position: absolute;
        bottom: 10px;
        right: 10px;
    }
`

export default Todo