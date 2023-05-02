import React, { useContext, useEffect, useState } from 'react'
import img_1 from './../images/img_1.svg'
import { Link } from 'react-router-dom'
import { storeLink } from '../api/helper'
import { Loading } from '../Loading'
import axios from 'axios'


const Course = (params) => {
    const {loading, setLoading} = useContext(Loading)
    const item = params.item
    let setLink = () => {
        storeLink(item.detail_link)
    }
    return (
        <div className='col-md-6 col-lg-4 col-xl-3 p-3'>
            
            <div className='card border-0 theme_box_shadow'>
                <div>
                    <img className='w-100' src={item.cover} alt="" />
                </div>
                <div className='p-3 mt-2'>
                    <div className='d-flex justify-content-between text-muted'>
                        <p className='font_sm me-2'>{item.category}</p>
                        <p className='font_sm'>{item.createdAt}</p>
                    </div>
                    <Link to={`/detail`} onClick={setLink} className='title'>
                        <div>{item.title}</div>
                    </Link>     
                    <p className='mt-3'>
                        {item.description}
                    </p>
                </div>
            </div>
        </div>
    )
}

const Home = (params) => {
    const {courses, setCourses} = params.data
    const [text, setText] = useState('')
    useEffect(() => {
        console.log(text)
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
    }, [text])

    return (
        <div>
            <div className='hero_section'>
                <div className='container py-5'>
                    <div className='row'>
                        <div className='col-lg-6 d-flex justify-content-center img'>
                            <img src={img_1} className='w-100' alt="" />
                        </div>
                        <div className='col-lg-6 d-flex flex-column justify-content-center px-2'>
                            <h3 className=''>Learn From Tutorials</h3>
                            <h5 className='mt-3 lh-lg'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis adipisci labore aperiam quas delectus, qui suscipit atque mollitia et voluptas tenetur eligendi necessitatibus aspernatur sunt debitis eveniet quo, aliquam consectetur!
                            </h5>
                        </div>
                    </div>
                </div>
            </div>

            <div className='p-5'>
                <div className='d-flex justify-content-end py-3'>
                    <div className='me-3'>
                        <input type="search" value={text} onChange={(e) => setText(e.target.value)} placeholder="Search" className='bg-light'/>
                    </div>
                    <div class="select">
                        <select>
                            <option value="1">Pure CSS Select</option>
                            <option value="2">No JS</option>
                            <option value="3">Nice!</option>
                        </select>
                    </div>
                </div>
                <div className=''>
                    <div className='row'>
                        {
                            courses ? courses.map((item, index) => {
                                return <Course item={item}/>
                            }) : null
                        }
                        
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Home
