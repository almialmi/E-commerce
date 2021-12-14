import { Add, Remove } from '@material-ui/icons';
import React,{useState,useEffect} from 'react'
import { useLocation } from 'react-router-dom';
import styled from 'styled-components'
import Announcement from '../components/Announcement';
import Comment from '../components/Comment';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { mobile } from '../responsive';
import axios from 'axios';
import { addProduct } from '../redux/cartRedux';
import { useDispatch } from 'react-redux';

const Container = styled.div``;
const Wrapper = styled.div`
    padding:50px;
    display:flex;
    ${mobile({padding:"10px",flexDirection:"column"})};
`;
const ImageContainer = styled.div`
    flex:1;
`;

const Image = styled.img`
    width:100%;
    height:90vh;
    object-fit:cover;
    ${mobile({height:"40vh"})};
`;

const InfoContainer = styled.div`
    flex:1;
    padding:0px 50px;
    ${mobile({padding:"10px"})};
`;

const Title = styled.h1`
    font-weight:200;
`;

const Desc = styled.p`
    margin:20px 0px;
`;

const Price = styled.span`
    font-weight:100;
    font-size:40px;
`;

const AddContainer = styled.div`
    display:flex;
    align-items:center;
    margin-top:20px;
    width:50px;
    justify-content:space-between;
    ${mobile({width:"100%"})};
`;
const AmountContainer = styled.div`
    display:flex;
    flex-direction:row;
    align-items:center;
    font-weight:700;
`;
const Amount = styled.span`
    width:30px;
    height:30px;
    border-radius:10px;
    border:1px solid rgb(23,21,21);
    display:flex;
    align-items:center;
    justify-content:center;
    margin:0px 5px;
`;
const Button = styled.button`
    padding:15px;
    border: none;
    border-radius:10px;
    background: rgb(23,21,21);
    background: linear-gradient(58deg, rgba(23,21,21,1) 0%, rgba(209,31,90,1) 100%, rgba(0,0,0,1) 100%);
    cursor:pointer;
    margin-left:40px;
    font-weight:500;
    color:#fff;

    &:hover{
        background-color:#f8f4f4;
        outline: none;
    }
    &:focus{
        outline: none;
    }
`;


const Product = () => {
    const location = useLocation();
    const id = location.pathname.split("/")[2];
    const [product,setProduct] = useState({});
    const [quantity,setQuantity] = useState(1);
    const dispatch = useDispatch()

    useEffect(()=>{
        const getProduct = async ()=>{
            try{
                const res = await axios.get(`http://localhost:5000/api/fetchProductDetail/${id}`);
                setProduct(res.data);
            }catch{

            }

        }
        getProduct();
    },[id])

    const handleQuantity =(type)=>{
        if(type === 'dec'){
            quantity >1 && setQuantity(quantity - 1)
        }else{
            setQuantity(quantity + 1)
        }
    }

    const handleClick = () =>{
        dispatch( addProduct({...product,quantity})) 
    }

    return (
        <Container>
            <Navbar />
            <Announcement />
            <Wrapper>
                <ImageContainer>
                    <Image src={`http://localhost:5000/api/${product.photo}`} />
                </ImageContainer>
                <InfoContainer>
                    <Title>{product.name}</Title>
                    <Desc>{product.description}</Desc>
                    <Price>Br.{product.price}</Price>
                    <AddContainer>
                        <AmountContainer>
                            <Remove onClick={()=>handleQuantity("dec")} />
                            <Amount>{quantity}</Amount>
                            <Add  onClick={()=>handleQuantity("inc")}/>
                        </AmountContainer>
                        <Button onClick={handleClick}>ADD</Button>
                    </AddContainer>
                </InfoContainer>

            </Wrapper>
            <Comment />
            <Footer />
            
        </Container>
    )
}

export default Product
