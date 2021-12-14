import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    height: 30px;
    background: rgb(23,21,21);
    background: linear-gradient(58deg, rgba(23,21,21,1) 0%, rgba(209,31,90,1) 100%, rgba(0,0,0,1) 100%);
    color:white;
    display:flex;
    align-items: center;
    justify-content: center;
    font-size:14px;
    font-weight:500;
`;

const Announcement = () => {
    return (
        <Container>
            Super Deal!! Free Shipping on Orders Over $50 
        </Container>
    )
}

export default Announcement
