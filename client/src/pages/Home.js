import React, { useContext } from 'react'
import img_1 from './../images/img_1.svg'
import { Link } from 'react-router-dom'
import { storeLink } from '../api/helper'
import { Loading } from '../Loading'


const Course = (params) => {
    const {loading, setLoading} = useContext(Loading)
    const item = params.item
    let setLink = () => {
        storeLink(item.detail_link)
    }
    return (
        <div className='col-md-6 col-lg-4 col-xl-3 p-3'>
            <Link to={`/detail`} onClick={setLink}>
            <div className='card border-0 theme_box_shadow'>
                <div>
                    <img className='w-100' src={item.cover} alt="" />
                </div>
                <div className='p-2'>
                    <div className='d-flex justify-content-between text-muted'>
                        <p className='font_sm me-2'>{item.category}</p>
                        <p className='font_sm'>{item.createdAt}</p>
                    </div>
                    <h6>{item.title}</h6>
                    <p className='mt-3'>
                        {item.description}
                    </p>
                </div>
            </div>
            </Link>
        </div>
    )
}

const Home = (params) => {
    const {courses} = params
    return (
        <div>
            <div className='hero_section bg-light'>
                <div className='container py-5'>
                    <div className='row'>
                        <div className='col-lg-6 d-flex justify-content-center'>
                            <img src={img_1} className='w-100' alt="" />
                        </div>
                        <div className='col-lg-6 d-flex flex-column justify-content-center px-2'>
                            <h4 className='theme_color'>Learn On TUTORIALS</h4>
                            <h5 className='mt-3 lh-lg'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis adipisci labore aperiam quas delectus, qui suscipit atque mollitia et voluptas tenetur eligendi necessitatibus aspernatur sunt debitis eveniet quo, aliquam consectetur!
                            </h5>
                        </div>
                    </div>
                </div>
            </div>

            <div className='p-5'>
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
