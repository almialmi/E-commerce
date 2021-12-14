import React,{useState} from 'react'
import styled from 'styled-components'
import { BoldLink, BoxContainer, FormContainer, Input, MutedLink, SubmmitButton } from '../components/common';
import { mobile } from '../responsive';
import { login } from '../redux/apiCalls';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

const Container = styled.div`
    width:100vw;
    height:100vh;
    flex-direction:column;
    display:flex;
    align-items:center;
    justify-content:center;
`;

const Wrapper = styled.div`
    width:280px;
    min-height:550px;
    flex-direction:column;
    border-radius:19px;
    background-color:white;
    box-shadow: 0 0 2px rgba(15,15,15,0.28);
    position:relative;
    overflow:hidden;
    ${mobile({width:"75%"})};
`;

const TopContainer = styled.div`
    width:100%;
    height:180px;
    display:flex;
    flex-direction:column;
    justify-content:flex-end;
    padding: 0 10px;
    padding-bottom:5em;
`;

const BackDrop = styled.div`
    width:160%;
    height:550px;
    position:absolute;
    display:flex;
    flex-direction:column;
    top:-290px;
    left:-70px;
    transform:rotate(60deg);
    border-radius:50%;
    background: rgb(23,21,21);
    background: linear-gradient(58deg, rgba(23,21,21,1) 0%, rgba(209,31,90,1) 100%, rgba(0,0,0,1) 100%);
`;

const HeaderContainer = styled.div`
    width:100%;
    display:flex;
    flex-direction:column;
`;


const HeaderText = styled.h2`
    font-size:30px;
    font-weight:600;
    font-family:Poppins;
    line-height:1.24;
    text-align:center;
    margin:0;
    margin-top:50px;
    color:#fff;
    z-index:10;
`;

const InnerContainer = styled.div`
    width:90%;
    display:flex;
    flex-direction:column;
    padding-left: 1Opx;
    padding-right: 1Opx;
`;

const Error = styled.span`
    color:red;

`;


const Login = () => {
    const [userName, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch()
    const {isFetching,error} = useSelector((state)=>state.user);
   
    const handleClick=(e)=>{
        login(dispatch,{userName,password})

    }
 
     
    return (
        <Container>
             <Wrapper>
                <TopContainer>
                <HeaderContainer>
                        <HeaderText>LOG IN</HeaderText>
                    </HeaderContainer>
                    <BackDrop />
                </TopContainer>
                <InnerContainer>
                <BoxContainer>
                    <FormContainer>
                        <Input required onChange={(e)=>setUsername(e.target.value)} type='text' placeholder='Username' />
                        <Input required onChange={(e)=>setPassword(e.target.value)} placeholder='Password'
                        type="password"
                        />
                    </FormContainer>
                    <MutedLink href="#">Forget your password?</MutedLink>
                    <SubmmitButton disabled={isFetching} onClick={handleClick} type='submit'>LOGIN</SubmmitButton>
                    {error && <Error>Something went wrong...</Error>}
                    <MutedLink href="#">Don't have an account?<BoldLink href="/register">Signup</BoldLink></MutedLink>
                </BoxContainer>
                </InnerContainer>
            </Wrapper>
        </Container>
    )
}

export default Login
