import { Search,ShoppingCartOutlined } from '@material-ui/icons';
import Badge from '@material-ui/core/Badge';
import React from 'react'
import styled from 'styled-components'
import { mobile } from '../responsive';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


const Container = styled.div`
    height:60px;
    ${mobile({height:"50px"})};
  `;

const Wrapper = styled.div`
   padding: 0px 20px;
   display: flex;
   align-items: center;
   justify-content: space-between;
   ${mobile({padding:"10px 0px"})};

`;

const Left = styled.div`
    flex:1;
    display:flex;
    align-items: center;
`

const FilterContainer = styled.div`
    display:flex;
    border:none;
    justify-content:center;
    ${mobile({display:"none"})};
`;
const Filter = styled.div`
    margin:10px;
`;
const Select = styled.select`
    padding:5px;
    margin-right:5px;
`;
const Option = styled.option``;

const SearchContainer = styled.div`
    border: 0.5px solid lightgray;
    display:flex;
    margin-left:25px;
    padding:5px;
    align-items: center;
`;
const Input = styled.input`
    border:none;
    ${mobile({width:"50px"})};
`
const Logo = styled.h1`
    font-weight:bold;
    ${mobile({fontSize:"24px"})};
`

const Center = styled.div`
    flex:1;
    text-align: center;
    display: flex;
    align-items: center;
`
const Right = styled.div`
    flex:1;
    align-items: center;
    display:flex;
    justify-content: flex-end;
    ${mobile({justifyContent:"center",flex:2})};
`;
const MenuItem = styled.div`
    font-size: 14px;
    cursor:pointer;
    margin-left:25px;
    ${mobile({fontSize:"12px",marginLeft:"10px"})};

`

const Navbar = () => {

    const quantity = useSelector(state =>state.cart.quantity)
    return (
        <Container>
            <Wrapper>
             <Left>
                 <FilterContainer>
                     <Filter>
                     <Select>
                        <Option disabled>LN.</Option>
                        <Option>EN</Option>
                        <Option>AM</Option>
                    </Select>
                     </Filter>
                 </FilterContainer>
                 <SearchContainer>
                     <Input placeholder='Search' />
                     <Search style={{color:"gray",fontSize:16}}/>
                 </SearchContainer>
             </Left>
             <Center>
                 <Logo>DM.</Logo>
             </Center>
             <Right>
                 <Link to='/register'>
                 <MenuItem>REGISTER</MenuItem>
                 </Link>
                 <Link to='/login'>
                 <MenuItem>SIGN IN </MenuItem>
                 </Link>
                 <MenuItem>
                 <Badge badgeContent={quantity} color="primary">
                     <ShoppingCartOutlined />
                </Badge>
                 </MenuItem>
             </Right>
            </Wrapper>
        </Container>
    )
}

export default Navbar
