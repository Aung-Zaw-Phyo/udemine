import React, { useContext, useEffect, useState } from 'react'
import img_1 from './../images/img_1.svg'
import { Link } from 'react-router-dom'
import { Loading } from '../Loading'
import axios from 'axios'


const Course = (params) => {
    const {loading, setLoading} = useContext(Loading)
    const item = params.item
    
    return (
        <div className='col-md-6 col-lg-4 col-xxl-3 p-3'>
            
            <Link to={`/detail/${item.detail}`}>
            <div className='card border-0 theme_box_shadow home_card'>
                <div>
                    <img className='w-100' src={item.cover} alt="" />
                </div>
                <div className='p-3 mt-2'>
                    <div className='d-flex justify-content-between text-muted'>
                        <p className='font_sm me-2'>{item.category}</p>
                        <p className='font_sm'>{item.createdAt}</p>
                    </div>
                    <div className='title'>
                        <div>{item.title}</div>
                    </div>
                    <p className='mt-3'>
                        {item.description.substr(1,200)}
                    </p>
                </div>
            </div>
            </Link>     
        </div>
    )
}

const Home = (params) => {
    const {categories, courses, setCourses, text, setText, filterCat, setFilterCat, page, setPage} = params.data
    const {loading, setLoading} = useContext(Loading)
    const [innerLoading, setInnerLoading] = useState(false)


    useEffect(() => {
        if(page > 1) {
            setInnerLoading(true)
            let url = `http://localhost:5001/course?page=${page}`
            if(filterCat && filterCat != '') {
                url = `http://localhost:5001/course?page=${page}&category=${filterCat}`
            }
            if(text !== ''){
                url = `http://localhost:5001/course/search?key=${text}&page=${page}`
            }
            axios({
                method: "get",
                url: url,
            }).then(response => {
                if(response.data.status === true){
                    for (let i = 0; i < response.data.data.length; i++) {
                        const el = response.data.data[i];
                        setCourses(pre => [...pre, el])
                    }
                    setInnerLoading(false)
                    console.log(response.data.data)
                }else {
                    console.log(response.data.message)
                }
            }).catch(error => {
                console.log(error)
            });
        }
    }, [page])

    const search = () => {
        if(text !== ''){
            setPage(1)
            setFilterCat(null)
            axios({
                method: "get",
                url: `http://localhost:5001/course/search?key=${text}`,
            }).then(response => {
                if(response.data.status === true){
                setCourses(response.data.data)
                }else {
                console.log(response.data.message)
                }
            }).catch(error => {
                console.log(error)
            });
        }
    }
    

    useEffect(() => {
        if(filterCat !== null){
            setLoading(true)
            setText('')
            setPage(1)
            let url = `http://localhost:5001/course`
            if('' !== filterCat){
                url = `http://localhost:5001/course?category=${filterCat}`
            }
            axios({
                method: "get",
                url: url,
            }).then(response => {
                if(response.data.status === true){
                    setCourses(response.data.data)
                    setLoading(false)
                }else {
                console.log(response.data.message)
                }
            }).catch(error => {
                console.log(error)
            });
        }
    }, [filterCat])

    useEffect(() => {
        const handleScroll = (e) => {
            const scrollHeight = e.target.documentElement.scrollHeight
            const currentHeight = e.target.documentElement.scrollTop + window.innerHeight
            if(currentHeight + 1 >= scrollHeight){
                setPage(pre => pre + 1)
            }
        }
        window.addEventListener('scroll', handleScroll)
        return window.addEventListener('scroll', handleScroll)
    }, [])

    return (
        <div>
            <div className='hero_section'>
                <div className='container py-5 pt-5'>
                    <div className='row'>
                        <div className='col-lg-6 d-flex justify-content-center img'>
                            <img src={img_1} className='w-100' alt="" />
                        </div>
                        <div className='col-lg-6 d-flex flex-column justify-content-center p-3'>
                            <h3 className=''>Learn From Tutorials</h3>
                            <h5 className='mt-3 lh-lg'>
                                For your career, you can learn everything from Tutorials.
                            </h5>
                        </div>
                    </div>
                </div>
            </div>

            <div className='p-5 content'>
                <div className='d-flex justify-content-end flex-wrap p-2 py-3'>
                    <div className='mt-3'>
                        <div className='input-group'>
                            <input type="search" onKeyUp={(e) => e.key == 'Enter' ? search() : null} value={text} onChange={(e) => setText(e.target.value)} placeholder="Search" className='bg-light'/>
                            <button className='search-btn' onClick={search}>Search</button>
                        </div>
                    </div>
                    <div className="select ms-3 mt-3">
                        <select onChange={(e) => setFilterCat(e.target.value)}>
                            <option value="">All</option>
                            {
                                categories ? categories.map((cat, index) => {
                                    return (
                                        filterCat == cat.category ? 
                                            <option key={index} value={cat.category} selected>{cat.text}</option> : 
                                            <option key={index} value={cat.category} >{cat.text}</option>
                                    )
                                }) : null
                            }
                        </select>
                    </div>
                </div>
                <div className='mt-4'>
                    <div className='row g-2'>
                        {
                            courses ? courses.map((item, index) => {
                                return <Course key={index} item={item}/>
                            }) : null
                        }
                        
                    </div>
                    {
                        innerLoading ?  
                        <div class="wave py-5">
                            <div class="ball"></div>
                            <div class="ball"></div>
                            <div class="ball"></div>
                            <div class="ball"></div>
                            {/* <div class="ball"></div> */}
                        </div> : null
                    }
                </div>
            </div>

        </div>
    )
}

export default Home
