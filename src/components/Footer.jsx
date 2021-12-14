import { Facebook, Instagram, MailOutline, Phone, Room, Twitter } from '@material-ui/icons'
import React from 'react'
import styled from 'styled-components'
import payment from '../images/payment.png'
import { mobile } from '../responsive'

const Container = styled.div`
    display:flex;
    ${mobile({ flexDirection: "column" })};
`
const Left = styled.div`
    flex:1;
    display:flex;
    flex-direction:column;
    padding:20px;
`
const Logo = styled.h1``;
const Desc = styled.p`
    margin:20px 0px;
`;
const SocialContainer = styled.div`
    display:flex;
`;
const SocialIcon = styled.div`
    width:40px;
    height:40px;
    border-radius:50%;
    background-color: #${props => props.color};
    display:flex;
    justify-content:center;
    align-items:center;
    margin-right:20px;
`;

const Center = styled.div`
    flex:1;
    margin-right:20px;
    padding:20px;
    ${mobile({ display: "none" })};
`
const Right = styled.div`
    flex:1;
    margin-right:20px;
    padding:20px;
    ${mobile({ backgroundColor: "#fff8f8" })};
`

const Title = styled.h3`
    margin-bottom:30px;
`;
const List = styled.ul`
    margin:0;
    padding:0;
    list-style:none;
    display:flex;
    flex-wrap:wrap;
`;
const ListItem = styled.li`
    width:50%;
    margin-bottom:10px;
`;

const ContactItem = styled.div`
    margin-bottom:20px;
    display:flex;
    align-items:center;
`;
const Payment = styled.img`
    width:50%;
    height:50px;
`;

const Footer = () => {
    return (
        <Container>
            <Left>
                <Logo>DM.</Logo>
                <Desc>Short Ethiopian dress, habesha dress fashion, Traditional Ethiopian fashion cloth, Handspun Ethiopian cotton fabric, Hand weaved,traditional cloth
                </Desc>
                <SocialContainer>
                    <SocialIcon color="3B5999">
                        <Facebook />
                    </SocialIcon>
                    <SocialIcon color="E4405F">
                        <Instagram />
                    </SocialIcon>
                    <SocialIcon color="55ACEE">
                        <Twitter />
                    </SocialIcon>
                </SocialContainer>
            </Left>
            <Center>
                <Title>Useful Links</Title>
                <List>
                    <ListItem>Home</ListItem>
                    <ListItem>Cart</ListItem>
                    <ListItem>Man Fashion</ListItem>
                    <ListItem>Women Fashion</ListItem>
                    <ListItem>Terms</ListItem>
                </List>

            </Center>
            <Right>
                <Title>Contact</Title>
                <ContactItem><Room style={{ marginRight: '10px' }} /> shiro meda</ContactItem>
                <ContactItem><Phone style={{ marginRight: '10px' }} /> +251960931547</ContactItem>
                <ContactItem><MailOutline style={{ marginRight: '10px' }} /> contact@aspn.dev</ContactItem>
                <Payment src={payment} />
            </Right>

        </Container>
    )
}

export default Footer
