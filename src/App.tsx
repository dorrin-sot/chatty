import React from 'react';
import './App.css';
import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom";
import {AuthController} from "./controllers/auth-controller";
import ChatPage from "./pages/chat-page/ChatPage";
import AuthPage from "./pages/auth-page/AuthPage";

function App() {
    const isLoggedIn = AuthController.isLoggedIn
    return (
        <Router>
            <Routes>
                <Route path="/" element={isLoggedIn ? <Navigate to="/chats" /> : <Navigate to="/auth" />} />
                <Route path="/chats" element={isLoggedIn ? <ChatPage /> : <Navigate to="/auth" />} />
                <Route path="/auth" element={isLoggedIn ? <Navigate to="/chats" /> : <AuthPage />} />
            </Routes>
        </Router>
    );
}

export default App;
