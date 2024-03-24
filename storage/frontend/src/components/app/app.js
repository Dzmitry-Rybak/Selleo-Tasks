import Header from "../header/heder";
import Fs from "../fs/fs";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App = () => {
    return (
        <Router>
            <Header/>
            <Routes>
                <Route path="*" element={<Fs/>}/>
            </Routes>
        </Router>
    )
}

export default App;