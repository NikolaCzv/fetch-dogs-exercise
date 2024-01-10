import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import ProtectedRoute from './components/ProtectedRoute';
import { useEffect, useState } from 'react';
import './App.css';

const App = () => {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const localAuth = window.localStorage.getItem('isAuth');
    if(localAuth){
      console.log("localAuth", localAuth)
      setIsAuth(true);
    }
    if(localAuth === null || typeof localAuth === 'undefined'){
      setIsAuth(false);
    }
    
  },[]);

  return (
    <Routes>
      {/**@ts-ignore */}
      <Route path='/' render={<ProtectedRoute isAuth={isAuth} />}>
        <Route path='/' element={<Home />}/> 
      </Route>
      <Route path='/login' element={<Login />}/>
    </Routes>
  );
}

export default App;
