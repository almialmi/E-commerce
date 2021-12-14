import { Send } from '@material-ui/icons';
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { mobile } from '../responsive';
import Sentiment from 'sentiment';
import neutral from '../images/natural.gif'
import negative from '../images/negative.gif'
import positive from '../images/pos.gif'
import axios from 'axios';


const Container = styled.div`
    height:60vh;
    background-color:#fcf5f5;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction:column;

`;
const Title = styled.h1`
    font-size:70px;
    margin-bottom:20px;
    ${mobile({ textAlign: "center" })};
`;
const Desc = styled.p`
    font-size:24px;
    font-weight:300;
    margin-bottom:20px;
    ${mobile({ textAlign: "center" })};
`;
const InputContainer = styled.div`
    width:50%;
    height:40px;
    background-color:white;
    display:flex;
    justify-content:space-between;
    border:1px solid lightgray;
    ${mobile({ width: "80%" })};
`;

const Input = styled.input`
    border:none;
    flex:8;
    padding-left:20px;
`;

const Button = styled.button`
    flex:1;
    border:none;
    background: rgb(23,21,21);
    background: linear-gradient(58deg, rgba(23,21,21,1) 0%, rgba(209,31,90,1) 100%, rgba(0,0,0,1) 100%);
    color:white;
`;

const AnalaysisContainer = styled.div`
    height:100px;
    display:flex;
    margin-top:15px;
    justify-content:center;
    align-items:center;
    flex-direction:column;

`

const Image = styled.img`
    height:75%;
    z-index:2;
    margin-top:10px;
    ${mobile({ height: "50%",marginTop:"5px" })};
   
`
const Score = styled.p`
    font-size:20px;

`
const Success = styled.p`
    color:green;
    margin-top:5px;
`

const sentiment = new Sentiment();

const Comment = () => {
    const [comment, setPhrase] = useState('');
    const [sentimentScore, setSentimentScore] = useState(null);
    const [value,setValue] = useState("")

    useEffect(() => {
        setSentimentScore(sentiment.analyze(comment));
    }, [comment]);

    const handleClick = async ()=>{
        await axios.post(`http://localhost:5000/api/addComment`,comment)
        .then((res)=>{
            setValue(res.data.message)
           setTimeout(() =>setValue(''), 3000);
        }).catch(e=>{
            console.log(e)
        })
        
    }
   
    return (
        <Container>
            <Title>Add Comment</Title>
            <Desc>Please give us your comment about our service</Desc>
            <InputContainer>
                <Input value={comment} onChange={e => setPhrase(e.target.value)} placeholder='Your comment' />
                <Button onClick={handleClick}>
                    <Send />
                </Button>
            </InputContainer>
            <Success>{value}</Success>
            <AnalaysisContainer>
                {
                    sentimentScore !== null ?
                        <Score>Your Satisfaction Level: {sentimentScore.score}</Score>
                        : ''
                }

                {
                    sentimentScore ?
                        sentimentScore.score === 0 ?
                            <Image src={neutral} alt="neutral" />
                            :
                            sentimentScore.score > 0 ?
                                <Image src={positive} alt="postive" />
                                :
                                <Image src={negative} alt="negative" />
                        : ''
                }
            </AnalaysisContainer>

        </Container>
    )
}

export default Comment
