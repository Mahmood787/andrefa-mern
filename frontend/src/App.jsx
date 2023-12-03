import "./index.css"
import { Container } from 'react-bootstrap';
import { Link, Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header/Header';

const App = () => {
  return (
    <>
      <div className="flex flex-col">
      <Header />
      <ToastContainer />
      <Container className=' min-h-[73vh] my-4'>
        <Outlet />
      </Container>
      <div className="p-3
       flex justify-center page-footer border-t-2 text-center">
        <Link className="no-underline" to="/contact">Contact</Link>
      </div>
      </div>
    </>
  );
};

export default App;
