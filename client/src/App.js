import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import './App.css';
import Home from './pages/Home';
import Detail from './pages/Detail';
import { useEffect, useState } from 'react';
import axios from 'axios';
import DetailMiddleware from './middleware/DetailMiddleware';
import { Loading } from './Loading';


function App() {
  const [courses, setCourses] = useState(null)
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [text, setText] = useState('')
  const [filterCat, setFilterCat] = useState(null)
  const [page, setPage] = useState(1)
  const [errMsg, setErrMsg] = useState(false)
  
  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:5001/course/categories",
    }).then(response => {
      if(response.data.status === true){
        setCategories(response.data.data)
      }else {
        console.log(response.data.message)
        setErrMsg(true)
      }
    }).catch(error => {
      console.log(error)
      setErrMsg(true)
    });
  })

  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:5001/course",
    }).then(response => {
      if(response.data.status === true){
        setCourses(response.data.data)
        setLoading(false)
      }else {
        console.log(response.data.message)
        setLoading(false)
      }
    }).catch(error => {
      console.log(error)
      setLoading(false)
    });
  }, [])

  return (
      <div className='app'>
        {/* {"res-table " + (table.status == 'active' ? 'active' : '') + (table.status == 'finish' ? 'finish-noti' : '')} */}
          <div className={"loader-container " + (loading ? 'd-flex' : 'd-none')}>
            <div className="spinner"></div>
          </div>
          <div hidden={loading ? 'hidden' : ''} className='content-container'>
            <BrowserRouter>
              <div  className='content'>
                <div className='d-flex justify-content-center  py-3 header'>
                  <h3 className='p-0 m-0 '><Link className='logo_text' to={'/'}>TUTORIALS</Link></h3>
                </div>
                {
                  errMsg ? 
                    <div className='errMsg'>
                      <p className='text-danger text-center'>Oops, Something Wrong. Please reload the page!</p>
                    </div>
                  : (
                    <Loading.Provider value={{ loading, setLoading }}>
                      <Routes>
                        <Route path='/' element={<Home data={{
                            categories, 
                            courses, 
                            setCourses,
                            text,
                            setText,
                            filterCat,
                            setFilterCat,
                            page,
                            setPage
                          }} />} 
                        />
                        <Route path='/detail/:course' element={<Detail />} />
                        <Route path="*" element={<p className='py-5 text-center'>There's nothing here: 404!</p>} />
                      </Routes>
                    </Loading.Provider>
                  )
                }
              </div>
              <div className='d-flex justify-content-center theme_box_shadow py-3 footer'>
                <h5 className='px-2 m-0 lh-lg'>Copyright © 2023 TUTORIALS. Learn every course freely.</h5>
              </div>
            </BrowserRouter>  
          </div>          

      </div>
  );
}



export default App;
