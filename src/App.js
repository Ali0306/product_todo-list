import './App.css';
import ProductInputs from './components/ProductInputs';
import Navbar from './components/Navbar';
// import Products from './components/Products';

function App() {
  return (
    <div className='main-container'>
      <Navbar/>
    <ProductInputs/>
    {/* <Products/> */}
    </div>
  );
}

export default App;
