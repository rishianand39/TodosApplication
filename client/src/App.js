import Navbar from "./components/navbar";
import Main from "./components/main";
import Sidebar from "./components/sidebar";

function App() {
  return (
    <div className="container">
      {/* <Sidebar /> */}
      {/* <div className="right"> */}
        <Navbar />
        <Main />
      {/* </div> */}
    </div>
  );
}

export default App;
