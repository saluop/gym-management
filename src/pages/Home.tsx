import React from 'react';
import { Link } from 'react-router-dom';
import { Dumbbell, Users, Calendar, Award } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="relative">
        <div className="absolute inset-0">
          <img
            className="w-full h-[480px] object-cover"
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
            alt="Gym"
          />
          <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Transform Your Life with GymPro
          </h1>
          <p className="mt-6 text-xl text-gray-300 max-w-3xl">
            Join our community and get access to personalized workout plans,
            expert guidance, and a supportive environment to achieve your
            fitness goals.
          </p>
          <div className="mt-10">
            <Link
              to="/register"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <Dumbbell className="h-12 w-12 text-indigo-600 mb-4" />
            <h3 className="text-xl font-bold mb-2">Personalized Workouts</h3>
            <p className="text-gray-600">
              Get custom exercise plans tailored to your fitness level and
              goals.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <Users className="h-12 w-12 text-indigo-600 mb-4" />
            <h3 className="text-xl font-bold mb-2">Expert Trainers</h3>
            <p className="text-gray-600">
              Learn from certified professionals who guide you every step of the
              way.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <Award className="h-12 w-12 text-indigo-600 mb-4" />
            <h3 className="text-xl font-bold mb-2">Track Progress</h3>
            <p className="text-gray-600">
              Monitor your improvements and celebrate your achievements.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
