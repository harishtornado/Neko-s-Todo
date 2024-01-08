import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Login = () => {
    const nameRef = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("data")) {
            console.log("Automatically logged in as", JSON.parse(localStorage.getItem("data")).name)
            navigate("/home")
        }
    })

    const login = () => {
        if (nameRef.current.value !== '') {
            if (localStorage.getItem("data")) {
                console.log("logged in as", JSON.parse(localStorage.getItem("data")).name)
            }
            else {
                localStorage.setItem("data", JSON.stringify({
                    name: nameRef.current.value,
                    todos: []
                }))
            }
            navigate('/home')
        }
    }
    return (
        <Container>
            <div className="login_container">
                <img src="https://cdn-icons-png.flaticon.com/256/10296/10296568.png" alt="login" width={100} />
                <Input ref={nameRef} type="text" placeholder='Enter User Name' required />
                <LoginBtn onClick={() => login()}>Login</LoginBtn>
            </div>
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%);
    .login_container {
        width: 320px;
        height: 300px;
        padding: 20px 0;
        display: flex;
        gap: 20px;
        flex-direction: column;
        background: rgba(255, 255, 255,0.6);
        align-items: center;
        border-radius: 8px;
        h1 {
            font-size: 32px;
            font-weight: 800;
            font-style: italic;
            color: rgba(238,174,202,1);
        }
    }
`

const Input = styled.input`
    width: 250px;
    height: 40px;
    padding: 0 20px;
    outline: none;
    border: none;
    border-radius: 8px;
`


const LoginBtn = styled.div`
    width: 250px;
    height: 40px;
    padding: 0 20px;
    display: grid;
    border-radius: 8px;
    place-Items: center;
    background: rgba(148,187,233,1);
    color: #fff;
    cursor: pointer;
`

export default Login