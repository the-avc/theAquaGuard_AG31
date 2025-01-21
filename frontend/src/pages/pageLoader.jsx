import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Home.jsx';
import CheckerPage from './checkerPage.jsx';
import Error404Page from './error404Page.jsx';
import AboutUs from './AboutUs.jsx';
// import GraphPg from './graphPg.jsx';
import WaterFlowData from '../components/WaterFlowData'
// import WaterManage from './components/WaterManage'
import WaterManage from '../components/WaterManage'

const pageLoader = () => {
  return (
    <div>
        <BrowserRouter>
            <Routes>
                <Route index element={<Home />}/>
                <Route path='/Home' element={<Home />}/>
                <Route path='/Data' element={<WaterManage />}/>
                {/* <Route path='/data' element={<GraphPg />}/> */}
                {/* <Route path='/CheckerPage' element={<CheckerPage />}/> */}
                <Route path="/AboutUs" element={<AboutUs/>}/>
                <Route path="*" element={<Error404Page/>}/>
            </Routes>
        </BrowserRouter>
    </div>
  )
}

export default pageLoader