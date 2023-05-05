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
  
  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:5001/course/categories",
    }).then(response => {
      if(response.data.status === true){
        setCategories(response.data.data)
      }else {
        console.log(response.data.message)
      }
    }).catch(error => {
      console.log(error)
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
      }
    }).catch(error => {
      console.log(error)
    });
  }, [])

  return (
      <div className='app'>
        {/* {"res-table " + (table.status == 'active' ? 'active' : '') + (table.status == 'finish' ? 'finish-noti' : '')} */}
          <div className={"loader-container " + (loading ? 'd-flex' : 'd-none')}>
            <div className="spinner"></div>
          </div>
          <div hidden={loading ? 'hidden' : ''}>
            <BrowserRouter>
              <div className='d-flex justify-content-center  py-3 header'>
                <h3 className='p-0 m-0 '><Link className='logo_text' to={'/'}>TUTORIALS</Link></h3>
              </div>
              <Loading.Provider value={{ loading, setLoading }}>
                <Routes>
                  <Route path='/' element={<Home data={{
                      categories, 
                      courses, 
                      setCourses,
                      text,
                      setText,
                      filterCat,
                      setFilterCat
                    }} />} 
                  />
                  <Route path='/detail' element={<DetailMiddleware><Detail /></DetailMiddleware>} />
                </Routes>
              </Loading.Provider>
              <div className='d-flex justify-content-center theme_box_shadow py-3 footer'>
                <h5 className='p-0 m-0'>Copyright © 2023 TUTORIALS. Learn every course freely.</h5>
              </div>
            </BrowserRouter>  
          </div>          

      </div>
  );
}



export default App;
