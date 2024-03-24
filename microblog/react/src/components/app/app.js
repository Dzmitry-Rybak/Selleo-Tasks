import FormPage from "../form/form";
import Header from "../header/header";
import Post from "../post/post";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AppStateProvider } from "../utils/context";

const App = () => {
    return (
        <AppStateProvider>
            <Router>
                <Header/>
                <main className="container">
                    <Routes>
                        <Route path="/" element={<Post/>}/>
                        <Route path="/new_post" element={<FormPage/>}/>
                    </Routes>
                </main>
            </Router>
        </AppStateProvider>
    )
}

export default App;