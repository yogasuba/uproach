'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import DotsNavigation from '../../components/DotsNavigation'

const Welcome = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get('userId'); // Retrieve userId from query parameters

  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [timezone, setTimezone] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !fullName || !timezone) {
      setError('All fields are required');
      return;
    }

    try {
      const response = await fetch('/api/auth/welcome', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, username, fullName, timezone }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Welcome data updated successfully');
        router.push('/connect-calendar'); // Redirect to the next step
      } else {
        setError(data.error || 'Failed to update welcome data');
      }
    } catch (error) {
      console.error('Failed to update welcome data:', error);
      setError('Failed to update welcome data');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <header className="text-center mb-8">
        <h1 className="text-2xl font-bold">Welcome to UPROACH.ME</h1>
        <p className="text-lg font-semibold">Plan. Schedule. Thrive.</p>
      </header>
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <form className="flex flex-col" onSubmit={handleSubmit}>
          {success && <p className="text-green-500 mb-4">{success}</p>}
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div className="mb-4">
            <label htmlFor="username" className="block mb-2 font-bold text-sm">
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              className="w-full p-3 border border-gray-400 rounded-lg text-sm"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="fullName" className="block mb-2 font-bold text-sm">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              placeholder="Enter your full name"
              className="w-full p-3 border border-gray-400 rounded-lg text-sm"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="timezone" className="block mb-2 font-bold text-sm">
              Timezone
            </label>
            <select
              id="timezone"
              className="w-full p-3 border border-gray-400 rounded-lg text-sm"
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
            >
              <option value="">Select your timezone</option>
              <option value="Asia/Kolkata">Asia/Kolkata</option>
              <option value="America/New_York">America/New_York</option>
              {/* Add more options as needed */}
            </select>
          </div>
          <button
          onClick={() => router.push('/connect-calendar')}
          className="w-full py-2 sm:py-2 mt-3 sm:mt-4 text-white bg-teal-600 rounded-lg text-sm sm:text-sm"> {/* Adjusted margin-top */}
          Next Step <span className="ml-2 text-lg sm:text-xl">→</span>
        </button>
          <div class="flex space-x-2 mt-2">
          </div>
        </form>
        <DotsNavigation currentStep={0} totalSteps={5} />
      </div>
    </div>
  );
};

export default Welcome;
