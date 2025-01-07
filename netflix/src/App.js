import './App.css';
import Nav from './components/Nav'
import Footer from './components/Footer'
import {BrowserRouter,Routes,Route,Outlet} from 'react-router-dom'
import MainPage from './components/MainPage';
import DetailPage from './components/DetailPage'
import SearchPage from './components/SearchPage'

function Layout () {
   return (
      <div>
         <Nav />

         <Outlet />

         <Footer />
      </div>
   )
}

function App() {
   return(
      <div className='App'>
         <BrowserRouter basename='netflix'>
            <Routes> 
               {/* 레이아웃 적용 */}
               <Route path="/" element={<Layout />} >
                  <Route index element={<MainPage />} />
                  <Route path=":movieId" element={<DetailPage />} />
                  <Route path="search" element={<SearchPage />} />
               </Route>
            </Routes>
         </BrowserRouter>
      </div>
   )
}
export default App;
