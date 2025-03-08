import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import './App.css';
import EventCalendar from './components/EventCalendar';

function App() {
  return (
    <Theme accentColor="sky" radius="small" scaling="95%" appearance="dark">
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 -z-10" />
      <div className="min-h-screen">
        <div className="max-w-6xl mx-auto p-6 relative z-10">
          <EventCalendar />
        </div>
      </div>
    </Theme>
  );
}

export default App;
