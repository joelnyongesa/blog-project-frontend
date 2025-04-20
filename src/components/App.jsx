import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Header from "./Header";
import Login from "./auth/Login";
import Article from "./Article";
import Signup from "./auth/Signup";
import Footer from "./Footer";
import CreateArticle from "./CreateArticle";
import MyArticles from "./MyArticles";
import UpdateProfile from "./UpdateProfile";

import { useEffect, useState } from 'react'

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/api/check_session", {
      credentials: "include",
    }).then((response) => {
      if(response.ok) {
        response.json().then((user) => setUser(user))
      }
    });
  }, []);

  function handleLogin(user) {
    setUser(user);
  }

  function handleLogOut() {
    setUser(null)
  }

  function handleSignup(user) {
    setUser(user)
  }


  return (
    <div className="app">
      <Header user={user} onLogout={handleLogOut} />
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="/login" element={<Login onLogin={handleLogin}/>}/>
          <Route path="/signup" element={<Signup onSignup={handleSignup}/>}/>
          <Route path="/articles/:id" element={<Article />}/>
          <Route path="create-article" element={<CreateArticle />} />
          <Route path="my-articles" element={<MyArticles />} />
          <Route path="update-profile" element={<UpdateProfile />} />
        </Route>
          
      </Routes>
      <Footer />
    </div>
  )
}

export default App