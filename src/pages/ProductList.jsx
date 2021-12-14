import React,{useState} from 'react'
import { useLocation } from 'react-router-dom';
import styled from 'styled-components'
import Announcement from '../components/Announcement';
import Comment from '../components/Comment';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Products from '../components/Products';
import { mobile } from '../responsive';

const Container = styled.div``;
const Title = styled.h1`
    margin:20px;
`;
const FilterContainer = styled.div`
    display:flex;
    justify-content:space-between;
`;
const Filter = styled.div`
    margin:20px;
    ${mobile({width:"0px 20px",display:"flex",flexDirection:"column"})};
`;

const FilterText = styled.span`
    font-size:20px;
    font-weight:600;
    margin-right:20px;
    ${mobile({marginRight:"0px"})};
`;

const Select = styled.select`
    padding:10px;
    margin-right:20px;
    ${mobile({margin:"10px 0px"})};

`;
const Option = styled.option``;

const ProductList = () => {
    const location = useLocation();
    const cat= location.pathname.split("/")[2];
    const [filters, setFilter] = useState({});
    const handleFilter = (e)=>{
        const value = e.target.value;
        setFilter({
            ...filters,
            [e.target.name]:value
        })

    }
    return (
        <Container>
            <Navbar />
            <Announcement />
            <Title>{cat}</Title>
            <FilterContainer>
                <Filter>
                    <FilterText>Filter Products:</FilterText>
                    <Select name="color" onChange={handleFilter}>
                        <Option disabled>color</Option>
                        <Option>White</Option>
                        <Option>Black</Option>
                        <Option>Red</Option>
                        <Option>Blue</Option>
                        <Option>Yellow</Option>
                        <Option>Green</Option>
                    </Select>
                    <Select name="size" onChange={handleFilter}>
                        <Option disabled >size</Option>
                        <Option>XS</Option>
                        <Option>S</Option>
                        <Option>M</Option>
                        <Option>L</Option>
                        <Option>XL</Option>
                    </Select>
                </Filter>
             
            </FilterContainer>
            <Products cat={cat} filters={filters} />
            <Comment />
            <Footer />
        </Container>
    )
}

export default ProductList
