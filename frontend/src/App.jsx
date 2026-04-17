import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Layouts
import AppLayout from './components/layout/AppLayout';
import FreelancerLayout from './components/layout/FreelancerLayout';

// Shared Pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import ContractDetails from './pages/ContractDetails';
import Profile from './pages/Profile';

// Client Pages
import Dashboard from './pages/Dashboard';
import Contracts from './pages/Contracts';
import CreateContract from './pages/CreateContract';
import ServiceAgreement from './pages/ServiceAgreement';
import Payments from './pages/Payments';
import Disputes from './pages/Disputes';
import Messages from './pages/Messages';
import Activity from './pages/Activity';
import HelpSupport from './pages/HelpSupport';
import Notifications from './pages/Notifications';

// Freelancer Pages
import FreelancerDashboard from './pages/FreelancerDashboard';
import MyWork from './pages/MyWork';
import FreelancerEarnings from './pages/FreelancerEarnings';
import FreelancerSubmissions from './pages/FreelancerSubmissions';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />

        {/* Client Dashboard */}
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/contracts" element={<Contracts />} />
          <Route path="/create-contract" element={<CreateContract />} />
          <Route path="/service-agreement" element={<ServiceAgreement />} />
          <Route path="/contract/:id" element={<ContractDetails />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/disputes" element={<Disputes />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/activity" element={<Activity />} />
          <Route path="/help" element={<HelpSupport />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        {/* Freelancer Dashboard */}
        <Route element={<FreelancerLayout />}>
          <Route path="/freelancer" element={<FreelancerDashboard />} />
          <Route path="/freelancer/work" element={<MyWork />} />
          <Route path="/freelancer/earnings" element={<FreelancerEarnings />} />
          <Route path="/freelancer/submissions" element={<FreelancerSubmissions />} />
          <Route path="/freelancer/service-agreement" element={<ServiceAgreement />} />
          <Route path="/freelancer/messages" element={<Messages />} />
          <Route path="/freelancer/disputes" element={<Disputes />} />
          <Route path="/freelancer/help" element={<HelpSupport />} />
          <Route path="/freelancer/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
