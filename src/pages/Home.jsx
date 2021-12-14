import React from 'react'
import Categories from '../components/Categories'
import Comment from '../components/Comment'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Products from '../components/Products'
import Slider from '../components/Slider'

const Home = () => {
    return (
        <div>
            <Navbar />
            <Slider />
            <Categories />
            <Products />
            <Comment />
            <Footer />
        </div>
    )
}

export default Home

