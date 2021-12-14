import React,{useState,useEffect} from 'react'
import styled from 'styled-components'
import Product from './Product';
import axios from 'axios';

const Container = styled.div`
    display:flex;
    padding:20px;
    flex-direction:column;
`;
const InnerContainer = styled.div`
    display:flex;
    padding:20px;
    justify-content:space-between;
    flex-wrap:wrap;
`;

const TopText = styled.p`
    font-size:24px;
    font-weight:600;
`;

const Products = ({cat,filters}) => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        const getProducts = async ()=>{
            try{
                const res = await axios.get(cat ? `http://localhost:5000/api/fetchAllProducts?category=${cat}&size=${-20}`:`http://localhost:5000/api/fetchAllProducts?size=${-20}`);
                setProducts(res.data.Products);
            }catch(err){

            }
        }
       getProducts()
    }, [cat])

    useEffect(()=>{
        cat && setFilteredProducts(
            products.filter((item)=>Object.entries(filters).every(([key,value])=>(
                item[key].includes(value)
            )))
        )
    },[products,cat,filters])

    return (
        <Container>
            <TopText>Popular Products</TopText>
            <InnerContainer>
            {cat ? filteredProducts.map((item)=>(
                 <Product item={item} key={item._id}/>
            )):products.slice(0,8)
                        .map((item)=>(<Product item={item} key={item._id}/>))}
            </InnerContainer>
        </Container>
    )
}

export default Products
