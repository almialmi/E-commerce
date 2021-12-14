import styled from "styled-components";


export const BoxContainer = styled.div`
    width:100%;
    display:flex;
    flex-direction:column;
    align-items:center;
    margin-top:10px;
`;

export const FormContainer = styled.form`
    width:90%;
    display:flex;
    flex-direction:column;
    box-shadow:0px 0px 2.5px rgba(15,15,15,0.19);

`;

export const MutedLink = styled.a`
    font-size:12px;
    color:rgba(15,15,15,0.5);
    font-weight:500;
    text-decoration:none;
    margin-top:20px;

`;

export const BoldLink = styled.a`
    font-size:12px;
    color:rgb(23,21,21);
    font-weight:500;
    text-decoration:none;

`;

export const Input = styled.input`
    width:100%;
    height: 42px;
    outline:none;
    border: 1px solid rgba(200,200,200,0.3);
    padding:0px 10px;
    transition: all 200ms ease-in-out; 
    border-bottom: 1.4px solid transparent;

    &:placeholder{
        color:rgba(200,200,200,1);
    }
    &:not(:last-of-type){
        border-bottom: 1.5px solid rgba(200,200,200,0.4);
    }
    &:focus {
        outline:none;
        border-bottom: 2px solid rgb(23,21,21);
    }

`;

export const SubmmitButton = styled.button`
    width:90%;
    padding:11px 40%;
    margin-top:20px;
    color:#fff;
    font-size:12px;
    font-weight:600;
    border:none;
    border-radius:100px 100px 100px 100px;
    cursor:pointer;
    transition: all 240ms ease-in-out; 
    background: rgb(23,21,21);
    background: linear-gradient(58deg, rgba(23,21,21,1) 0%, rgba(209,31,90,1) 100%, rgba(0,0,0,1) 100%);

    &:hover {
        filter: brightness(1.03);
        outline: none;
    }
    &:focus{
        outline: none;
    }
    &:disabled {
        color:rgb(15,15,15);
        cursor:not-allowed;

    }
`;