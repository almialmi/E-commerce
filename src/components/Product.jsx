import { FavoriteBorderOutlined, SearchOutlined, ShoppingCartOutlined } from '@material-ui/icons'
import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';


const Info = styled.div`
    opacity:0;
    width:100%;
    height:100%;
    top:0;
    left:0;
    position:absolute;
    background-color:rgba(0,0,0,0.2);
    z-index:3;
    display:flex;
    justify-content:center;
    align-items:center;
    transition: all 0.5s ease;
    cursor:pointer;
`;
const Container = styled.div`
    flex:1;
    margin:5px;
    min-width:280px;
    height:350px;
    display:flex;
    justify-content:center;
    align-items:center;
    background-color:#f5fbfd;
    position:relative;

    &:hover ${Info}{
        opacity:1;
    }
`
const Circle = styled.div`
    width:200px;
    height:200px;
    border-radius:50%;
    background-color:white;
    position:absolute;
`;
const Image = styled.img`
    height:75%;
    z-index:2;
`;

const Icon = styled.div`
    width:40px;
    height:40px;
    border-radius:50%;
    background-color:white;
    margin:10px; 
    display:flex;
    justify-content:center;
    align-items:center;
    transition: all 0.5s ease;
    &:hover{
        background-color:#e9f5f5;
        transform:scale(1.1)
    }
`;


const Product = ({item}) => {
  
    return (
        <Container>
            <Circle />
            <Image src={`http://localhost:5000/api/${item.photo}`} />
            <Info>
                <Link>
                <Icon to={`/product/${item._id}`}>
                    <ShoppingCartOutlined />
                </Icon>
                </Link>
                <Icon>
                    <Link to={`/product/${item._id}`}>
                    <SearchOutlined />
                    </Link> 
                </Icon>
                <Link>
                <Icon to={`/product/${item._id}`}>
                    <FavoriteBorderOutlined />
                </Icon>
                </Link>
                
            </Info>
            
           
        </Container>
    )
}

export default Product
