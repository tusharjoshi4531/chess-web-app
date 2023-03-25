import { Route, Routes } from "react-router";
import Layout from "./components/layout/Layout";
import Loginpage from "./pages/Loginpage";
import Mainpage from "./pages/Mainpage";
import Signuppage from "./pages/Signuppage";
import UserProvider from "./store/user/UserProvider";

function App() {
    return (
        <UserProvider>
            <Layout>
                <Routes>
                    <Route path="/" element={<Mainpage />} />
                    <Route path="/login" element={<Loginpage />} />
                    <Route path="/signup" element={<Signuppage />} />
                </Routes>
            </Layout>
        </UserProvider>
    );
}

export default App;
