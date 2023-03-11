import { Route, Routes } from "react-router";
import Layout from "./components/layout/Layout";
import Loginpage from "./pages/Loginpage";
import Mainpage from "./pages/Mainpage";
import Signuppage from "./pages/Signuppage";

function App() {
    return (
        <Layout>
            <Routes>
                <Route path="/" element={<Mainpage />} />
                <Route path="/login" element={<Loginpage />} />
                <Route path="/signup" element={<Signuppage />} />
            </Routes>
        </Layout>
    );
}

export default App;
