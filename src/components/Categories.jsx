import React from 'react'
import styled from 'styled-components'
import {categories} from '../data'
import CategoryItem from './CategoryItem'
import { mobile } from '../responsive'


const Container = styled.div`
    display:flex;
    padding:20px;
    flex-direction:column;
    ${mobile({padding:"0px",flexDirection:"column"})};
`
const InnerContainer = styled.div`
    display:flex;
    padding:20px;
    justify-content:space-between;
    ${mobile({padding:"0px",flexDirection:"column"})};
`;

const TopText = styled.p`
    font-size:24px;
    font-weight:600;
`;

const Categories = () => {
    return (
        <Container>
            <TopText>Available Product Categories</TopText>
           <InnerContainer>
           {categories.map((item)=>(
                <CategoryItem item={item} key={item.id} />
            ))}
           </InnerContainer>
            
        </Container>
    )
}

export default Categories
