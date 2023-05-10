import React, { useContext, useEffect, useState } from 'react'
import img_1 from './../images/img_1.svg'
import { Link, Navigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { Loading } from '../Loading'


const Top_post = ({post, setLink}) => {
  const {loading, setLoading} = useContext(Loading)
  let changeLink = () => {
    setLink(post.detail)
    setLoading(true)
  }
  return (
    <div className='post mb-3 shadow'>
      <Link className='d-flex' to={`/detail/${post.detail}`} onClick={changeLink}>
        <img className='me-3' src={post.cover} alt="" />
        <h6 className='text-light'>{post.title}</h6>
      </Link>
    </div>
  )
}

const Course = ({item, setLink}) => {
  const {loading, setLoading} = useContext(Loading)
  let changeLink = () => {
    setLink(item.detail)
    setLoading(true)
  }
  return (
    <div className='col-md-6 col-lg-4'>
        <Link to={`/detail/${item.detail}`} onClick={changeLink}>
          <div className='card border-0 theme_box_shadow'>
              <div>
                  <img className='w-100' src={item.cover} alt="" />
              </div>
              <div className='p-2'>
                  <p className='font_sm text-muted'>{item.createdAt}</p>
                  <h6>{item.title}</h6>
              </div>
          </div>
        </Link>
    </div>
  )
}

const Detail = () => {
  const routeParams = useParams()
  const {loading, setLoading} = useContext(Loading)
  const [course, setCourse] = useState(null)
  const [link, setLink] = useState(null)

  useEffect(() => {
    setLoading(true)
  }, [])

  useEffect(() => {
    let detail = routeParams.course
    if(detail){
      axios({
        method: "get",
        url: `http://localhost:5001/course/detail?detail=${detail}`,
      }).then(response => {
        if(response.data.status === true){
          setCourse(response.data.data)
          setLoading(false)
        }else {
          console.log(response.data.message)
          setLoading(false)
        }
      }).catch(error => {
        console.log(error)
        setLoading(false)
      });
    }
  }, [link])
  return (
    
    <div>
          {
            course ? (
              <div className='p-5 content'>
                  <div className='py-5 '>
                    <div className='row mb-3'>

                      <div className='col-lg-8 '>
                        {
                          course ? (
                            <div>
                              <div>
                                <img className='w-100' src={course.cover} alt="" />
                              </div>
                              <div className='mt-3'>
                                <div className='font_sm text-muted'>{course.categories}</div>
                                <div className='d-flex justify-content-between mt-2'>
                                  <h5>{course.title}</h5>
                                  <div className='font_sm text-muted'>{course.createdAt}</div>
                                </div>
                                <p>
                                  {course.desc}
                                </p>
                                <p>
                                  Download Link - <Link target='_blank' to={course.download_link} className='download'>{course.download_text}</Link>
                                </p>
                              </div>
                            </div>
                          ) : null
                        }
                        <div className='mt-5'>
                          <h5 className='mb-5'>YOU MIGHT ALSO LIKE</h5>
                          <div className='row g-3'>
                            {
                              course.courses.map((item, index) => {
                                return <Course item={item} setLink={setLink}/>
                              })
                            }
                          </div>
                        </div>
                      </div>
                      <div className='col-lg-4'>
                        <h4 className='mb-3 top_posts_title'>Top Posts</h4>
                        <div className='top_posts'>
                            {
                              course.top_posts.map((post, index) => {
                                return <Top_post post={post} setLink={setLink}/>
                              })
                            }
                        </div>
                      </div>
                    </div>
                  </div>
              </div>
            ) : null
          }

    </div>

  )
}

export default Detail
