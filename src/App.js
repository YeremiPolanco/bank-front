import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AllAnccounts from "./components/AllAnccounts";

function App() {
    return (
        <div>
            <BrowserRouter>
                <div className="container">
                    <div className="content">
                        <Routes>
                            <Route exact path="/" element={<AllAnccounts />} />
                        </Routes>
                    </div>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;
