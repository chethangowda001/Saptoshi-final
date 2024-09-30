import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './Components/Header';
import Login from './Components/Login';
import SignUp from './Components/SignUp';  
import Dashboard from './Components/Dashboard';
import BidderDetails from './Components/Admin/BidderDetails';
import ParticipantDetails from './Components/Admin/ParticipantDetails';
import PaymentStatus from './Components/Admin/PaymentStatus';
import ParticipantDetailsWithBids from './Components/Admin/ParticipantDetailsWithBids';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <ToastContainer /> {/* For notifications if you are using Toast */}
      <Routes>
        {/* Redirect root URL to the signUp page */}
        <Route path="/" element={<Navigate to="/signUp" />} />
        
        {/* Sign Up and Login routes */}
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/signin" element={<Login />} />
        
        {/* Dashboard and other routes */}
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/bidder-details/:bidId" element={<BidderDetails />} />
        <Route path="/participant-details/:id" element={<ParticipantDetails />} />
        <Route path="/dashboard/payment-status/:bidId" element={<PaymentStatus />} />
        
        {/* Route for ParticipantDetailsWithBids */}
        <Route path="/participants/:id/bids" element={<ParticipantDetailsWithBids />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
