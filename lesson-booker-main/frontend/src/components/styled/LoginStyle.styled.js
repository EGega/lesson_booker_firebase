import styled from "styled-components"
import loginBG from "../../assets/login.jpg"
export const LoginContainer = styled.div `
width: 100vw;
max-width: 100%;
padding: 0 20px;
margin: 0 auto;
background: url(${loginBG});
background-position: center;
background-size: cover;
background-repeat: no-repeat;
height: 100vh;
font-size: 30px;
display: flex;
justify-content: flex-end;
align-items: center;
padding-right: 5%;
`

export const LoginInnerContainer = styled.div `
height: 80%;
background-color: #ffffffb7;
width: 40%;
border-radius: 5px;
box-shadow: 5px 5px 5px 5px #00FFFF22;
display: flex;
flex-direction: column;
justify-content: space-around;
align-items: center;
`
export const FormStyle = styled.form `
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
gap: 30px;
width: 100%;
h3 {
  color: #FF69B4 ;
}
`

export const LoginBtn = styled.button `
color: #fff;
background-color: #00FFFF;
padding: 15px 30px;
font-size: 1.2rem;
border: none;
outline: none;
border-radius: 5px;
cursor: pointer;

&:hover{
background-color:  #00FFDD ;
}
`



export const InputStyle = styled.div `
display: flex;
justify-content: center;
gap: 10px;
width: 80%;
border-bottom: 2px solid #00FFFF;
input {
  width: 100%;
  border: none;
  outline: none;
  font-size: 1rem;
  background: none;
}
`

export const NotAnUser = styled.div `
display: flex;
gap: 15px;

div {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}
p {
  font-size: 1.3rem;
}
`
// It is possible to create instances of this button