import './App.scss';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Landing from './components/layout/Landing';
import Auth from './views/Auth';
import AuthContextProvider from './contexts/AuthContext';
import DashBoard from './views/Dashboard';
import PrivateRoute from './routing/PrivateRoute';
import About from './views/About';
import PostContextProvider from './contexts/PostContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (<>
    <AuthContextProvider>
      <PostContextProvider>
        <Router>
          <Routes>
            <Route exact path="/" element={<Landing />} />
            <Route exact path="/login" element={<Auth authRoute="login" />} />
            <Route exact path="/register" element={<Auth authRoute="register" />} />
            <Route exact path='/' element={<PrivateRoute />}>
              <Route exact path='/dashboard' element={<DashBoard />} />
              <Route exact path='/about' element={<About />} />

            </Route>
          </Routes>
        </Router>
      </PostContextProvider>

    </AuthContextProvider>
    <ToastContainer
      position="bottom-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  </>


  );
}

export default App;
