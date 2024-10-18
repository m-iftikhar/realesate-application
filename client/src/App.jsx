import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import Profile from './pages/profile';
import About from './pages/about';
import Signin from './pages/signin';
import Signup from './pages/signup';
import Header from './components/header';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/sign-in" element={<Signin />} /> {/* Using hyphens for readability */}
          <Route path="/sign-up" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
