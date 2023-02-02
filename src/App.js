import Content from "./components/Content/Content";
import Sort from "./components/Content/Meals/Sort/Sort";
import Navigation from "./components/Navigation/Navigation";
import './App.css'


function App() {
  return (
    <div className="App">
      <Navigation />
      <Content />
    </div>
  );
}

export default App;
