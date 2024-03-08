import { useState } from "react";
import { GrPrevious, GrNext } from "react-icons/gr";
import { AiOutlineEye, AiOutlineShoppingCart } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import "./home.css"

const Home = () => {
    //List image bottom slide show
    const listImage = [ 
        {
            alt: 0,
            src: 'https://res.cloudinary.com/doh8xw3s5/image/upload/v1706003582/1_tv4cve.jpg'
        },
        {
            alt: 1,
            src: 'https://res.cloudinary.com/doh8xw3s5/image/upload/v1704562430/logoShop_vr4zyy.png'
        },
        {
            alt: 2,
            src: 'https://res.cloudinary.com/doh8xw3s5/image/upload/v1706170266/msyg1qahpihmql5apsdl.jpg'
        },
        {
            alt: 3,
            src: 'https://res.cloudinary.com/doh8xw3s5/image/upload/v1704563865/introducelogo_vugzg2.png'
        },
    ];

    const newProducts = [
        {
            title: "Toàn bộ",
            products: [
                {
                    img: "https://res.cloudinary.com/doh8xw3s5/image/upload/v1706003582/1_tv4cve.jpg",
                    name: "All",
                    code: "1",
                    price: 100000
                },
                {
                    img: "https://res.cloudinary.com/doh8xw3s5/image/upload/v1706003582/1_tv4cve.jpg",
                    name: "Trousers",
                    code: "2",
                    price: 200000
                },
                {
                    img: "https://res.cloudinary.com/doh8xw3s5/image/upload/v1706003582/1_tv4cve.jpg",
                    name: "All",
                    code: "3",
                    price: 300000
                },
                {
                    img: "https://res.cloudinary.com/doh8xw3s5/image/upload/v1706003582/1_tv4cve.jpg",
                    name: "Trousers",
                    code: "4",
                    price: 400000
                },
                {
                    img: "https://res.cloudinary.com/doh8xw3s5/image/upload/v1706003582/1_tv4cve.jpg",
                    name: "All",
                    code: "5",
                    price: 500000
                },
                {
                    img: "https://res.cloudinary.com/doh8xw3s5/image/upload/v1706003582/1_tv4cve.jpg",
                    name: "Trousers",
                    code: "6",
                    price: 600000
                },{
                    img: "https://res.cloudinary.com/doh8xw3s5/image/upload/v1706003582/1_tv4cve.jpg",
                    name: "All",
                    code: "7",
                    price: 700000
                },
                {
                    img: "https://res.cloudinary.com/doh8xw3s5/image/upload/v1706003582/1_tv4cve.jpg",
                    name: "Trousers",
                    code: "8",
                    price: 800000
                },{
                    img: "https://res.cloudinary.com/doh8xw3s5/image/upload/v1706003582/1_tv4cve.jpg",
                    name: "All",
                    code: "9",
                    price: 900000
                },
            ]
        },
        {
            title: "Quần",
            products: [
                {
                    img: "https://res.cloudinary.com/doh8xw3s5/image/upload/v1706003582/1_tv4cve.jpg",
                    name: "Trousers",
                    price: 100000
                }
            ]
        },
        {
            title: "Áo",
            products: [
                {
                    img: "https://res.cloudinary.com/doh8xw3s5/image/upload/v1706003582/1_tv4cve.jpg",
                    name: "Shirt",
                    price: 100000
                }
            ]
        },
        {
            title: "Giày",
            products: [
                {
                    img: "https://res.cloudinary.com/doh8xw3s5/image/upload/v1706003582/1_tv4cve.jpg",
                    name: "Shoes",
                    price: 100000
                }
            ]
        },
        {
            title: "Balo",
            products: [
                {
                    img: "https://res.cloudinary.com/doh8xw3s5/image/upload/v1706003582/1_tv4cve.jpg",
                    name: "Backpack",
                    price: 100000
                }
            ]
        },
        {
            title: "Túi xách",
            products: [
                {
                    img: "https://res.cloudinary.com/doh8xw3s5/image/upload/v1706003582/1_tv4cve.jpg",
                    name: "Hand bag",
                    price: 100000
                }
            ]
        },
    ];

    const hotProducts = [
        {
            img: "https://res.cloudinary.com/doh8xw3s5/image/upload/v1706003582/1_tv4cve.jpg",
            name: "All",
            code: "1",
            price: 100000
        },
        {
            img: "https://res.cloudinary.com/doh8xw3s5/image/upload/v1706003582/1_tv4cve.jpg",
            name: "Trousers",
            code: "2",
            price: 200000
        },
        {
            img: "https://res.cloudinary.com/doh8xw3s5/image/upload/v1706003582/1_tv4cve.jpg",
            name: "All",
            code: "3",
            price: 300000
        },
        {
            img: "https://res.cloudinary.com/doh8xw3s5/image/upload/v1706003582/1_tv4cve.jpg",
            name: "Trousers",
            code: "4",
            price: 400000
        },
        {
            img: "https://res.cloudinary.com/doh8xw3s5/image/upload/v1706003582/1_tv4cve.jpg",
            name: "All",
            code: "5",
            price: 500000
        },
        {
            img: "https://res.cloudinary.com/doh8xw3s5/image/upload/v1706003582/1_tv4cve.jpg",
            name: "Trousers",
            code: "6",
            price: 600000
        },{
            img: "https://res.cloudinary.com/doh8xw3s5/image/upload/v1706003582/1_tv4cve.jpg",
            name: "All",
            code: "7",
            price: 700000
        },
        {
            img: "https://res.cloudinary.com/doh8xw3s5/image/upload/v1706003582/1_tv4cve.jpg",
            name: "Trousers",
            code: "8",
            price: 800000
        },{
            img: "https://res.cloudinary.com/doh8xw3s5/image/upload/v1706003582/1_tv4cve.jpg",
            name: "All",
            code: "9",
            price: 900000
        }
    ]
    // Image current display on slide show 
    const [currentImage, setCurrentImage] = useState(listImage[0]);
    // Dislay filter animation 
    const [animation, setAnimation] = useState();

    // Event on click button pre or next on slide show
    const onClickControlPrevNext = (event) => {
        setAnimation({opacity: 0});

        setTimeout(() => {
            switch (event) {
                case "prev":
                    if(currentImage.alt === listImage.at(0).alt){
                        setCurrentImage(listImage.at(-1));
                    } else{
                        setCurrentImage(listImage[currentImage.alt -1]);
                    }
                    break;
                case "next":
                    if(currentImage.alt === listImage.at(-1).alt){
                        setCurrentImage(listImage.at(0));
                    } else if(currentImage.alt === listImage.at(-2)){
                        setCurrentImage(listImage.at(-1));
                    } else{
                        setCurrentImage(listImage[currentImage.alt +1]);
                    }
                    break;
                default: 
            }
        setAnimation({opacity: 1});
        }, 150);
    }

    // Event on click image in list image
    const onClickImage = (value) => {
        setCurrentImage({
            alt: parseInt(value.alt),
            src: value.src
        })
    }

    const renderHotProducts = (products) => {
        return <div className="row">
        {
            products?.map((product, key) => (
                <div key={key} className="col-lg-3">
                    <div className="product">
                        <div className="product-image" >
                            <img alt={key} src={product?.img}/>
                        </div>
                        <div className="product-info">
                            <div className="product-name">
                                <Link>{product?.name}</Link>
                            </div>
                            <div className="product-price">
                                <b>Giá: </b>
                                <b style={{color:'#de0101',fontSize: "18px"}}>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product?.price)}</b>
                            </div>
                            <div className="product-code">
                                <span>Mã: </span>
                                <b style={{color:'#b24bb2',fontSize: "13px"}}>{product?.code}</b>
                            </div>
                        </div>
                        <ul>
                            <li>
                                <AiOutlineEye/>
                            </li>
                            <li>
                                <AiOutlineShoppingCart/>
                            </li>
                        </ul>
                    </div>
                </div>
            ))
        }
        </div>
    }
    
    const renderNewProducts = (data) => {
        return <Tabs>
                    <TabList>
                    { 
                        data?.map((value, key) => (
                            <Tab key={key}>{value.title}</Tab>
                        ))
                    }
                    </TabList>
                    
                    {
                        data?.map((value, key) => (
                            <TabPanel key={key}>
                                <div className="row">
                                {
                                    value.products?.map((product, childKey) => (
                                        <div key={childKey} className="col-lg-3">
                                            <div className="product">
                                                <div className="product-image" >
                                                    <img alt={childKey} src={product?.img}/>
                                                </div>
                                                <div className="product-info">
                                                    <div className="product-name">
                                                        <Link>{product?.name}</Link>
                                                    </div>
                                                    <div className="product-price">
                                                        <b>Giá: </b>
                                                        <b style={{color:'#de0101',fontSize: "18px"}}>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product?.price)}</b>
                                                    </div>
                                                    <div className="product-code">
                                                        <span>Mã: </span>
                                                        <b style={{color:'#b24bb2',fontSize: "13px"}}>{product?.code}</b>
                                                    </div>
                                                </div>
                                                <ul>
                                                    <li>
                                                        <AiOutlineEye/>
                                                    </li>
                                                    <li>
                                                        <AiOutlineShoppingCart/>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    ))
                                }
                                </div>
                            </TabPanel>
                        ))
                    }
                </Tabs> 
    }

    return (
        <div className="home">
            <div className="container-center">
                <div className="slide-show">
                    <img className="image-feature" style={animation} alt={currentImage.src} src={currentImage.src}/>
                    <div className="control prev" onClick={() => onClickControlPrevNext("prev")}>
                        <GrPrevious className="prev-button"/>
                    </div>
                    <div className="control next" onClick={() => onClickControlPrevNext("next")}>
                        <GrNext className="next-button"/>
                    </div>
                </div>
                <div className="list-image">
                    {
                        listImage?.map((image, itemKey) => (
                            <div className={currentImage.alt === image.alt ? "active dot" : "dot"} key={itemKey}>
                                <img alt={image.alt} src={image.src} onClick={(e) => onClickImage(e.target)}/>
                            </div>
                        ))
                    }
                </div>

                <div className="featured">
                    <div className="title">
                        <h2>Sản phẩm bán chạy</h2>
                        <div className="hot-products">
                            {renderHotProducts(hotProducts)}
                            <div className="control prev">
                                <GrPrevious className="prev-button"/>
                            </div>
                            <div className="control next">
                                <GrNext className="next-button"/>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="featured">
                    <div className="title">
                        <h2>Hàng mới về</h2>
                        {renderNewProducts(newProducts)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home