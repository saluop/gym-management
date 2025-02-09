import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

interface Exercise {
  id: string;
  name: string;
  description: string;
  difficulty: string;
  target_muscle: string;
}

const Exercises = () => {
  const navigate = useNavigate();
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedExercise, setSelectedExercise] = useState<string | null>(null);
  const [sets, setSets] = useState('3');
  const [reps, setReps] = useState('10');

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          navigate('/login');
          return;
        }

        const { data, error } = await supabase
          .from('exercises')
          .select('*')
          .order('name');

        if (error) throw error;
        setExercises(data || []);
      } catch (error) {
        console.error('Error fetching exercises:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchExercises();
  }, [navigate]);

  const handleAddExercise = async () => {
    if (!selectedExercise) return;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate('/login');
        return;
      }

      const { error } = await supabase
        .from('member_exercises')
        .insert([
          {
            profile_id: user.id,
            exercise_id: selectedExercise,
            sets: parseInt(sets),
            reps: parseInt(reps)
          }
        ]);

      if (error) throw error;

      setSelectedExercise(null);
      setSets('3');
      setReps('10');
      alert('Exercise added to your routine!');
    } catch (error) {
      console.error('Error adding exercise:', error);
      alert('Failed to add exercise. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="md:flex md:items-center md:justify-between mb-8">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Available Exercises
          </h2>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label htmlFor="exercise" className="block text-sm font-medium text-gray-700">
                Select Exercise
              </label>
              <select
                id="exercise"
                value={selectedExercise || ''}
                onChange={(e) => setSelectedExercise(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="">Choose an exercise</option>
                {exercises.map((exercise) => (
                  <option key={exercise.id} value={exercise.id}>
                    {exercise.name} - {exercise.target_muscle} ({exercise.difficulty})
                  </option>
                ))}
              </select>
            </div>

            {selectedExercise && (
              <>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="sets" className="block text-sm font-medium text-gray-700">
                      Sets
                    </label>
                    <input
                      type="number"
                      id="sets"
                      value={sets}
                      onChange={(e) => setSets(e.target.value)}
                      min="1"
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="reps" className="block text-sm font-medium text-gray-700">
                      Reps
                    </label>
                    <input
                      type="number"
                      id="reps"
                      value={reps}
                      onChange={(e) => setReps(e.target.value)}
                      min="1"
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <button
                    onClick={handleAddExercise}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Add to My Routine
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Exercise List</h3>
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <ul className="divide-y divide-gray-200">
            {exercises.map((exercise) => (
              <li key={exercise.id} className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-lg font-medium text-indigo-600">{exercise.name}</h4>
                    <p className="mt-1 text-sm text-gray-500">{exercise.description}</p>
                  </div>
                  <div className="ml-2 flex-shrink-0 flex">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      exercise.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
                      exercise.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {exercise.difficulty}
                    </span>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-sm text-gray-500">Target: {exercise.target_muscle}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Exercises;