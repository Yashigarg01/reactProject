
import './App.css';
// import Api from './components/Api';
import 'bootstrap/dist/css/bootstrap.min.css';
// import Create from './components/Create';
// import { Route, Routes } from 'react-router-dom';
// import Read from './components/Read';
// import PracticeApi from './components/PracticeApi';
// import FetchApi from './components/FetchApi';
// import Doto from './components/Doto';
import Todo from './components/Todo';
// import ChangeColor from './components/ChangeColor';
// import Greeting from './components/GreetingMssg';
//import ToggleButton from './components/ToggleButton';
// import Counter from './components/digitalClock/Counter';
// import DigitalClock from './components/digitalClock/DigitalClock';

function App() {
  return (
    <div className="Container">
     {/* <Routes>
        <Route exact path='/' element={<Read />}> </Route>
        <Route exact path='/create' element={<Create />}>
        </Route>
      </Routes>

      {/* <PracticeApi/> */}
      {/* <FetchApi/> */}
      {/* <Api/> */}
      {/* <Doto/> */}
       <Todo/> 
      {/* <ChangeColor/> */}
      {/* <Greeting/> */}
      {/* <ToggleButton/> */}
      {/* <Counter/> */}
      {/* <DigitalClock/> */}
    </div>
  );
}

export default App;
