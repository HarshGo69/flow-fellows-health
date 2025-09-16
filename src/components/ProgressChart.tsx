import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Calendar, Plus, Minus } from "lucide-react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const getAuthToken = () => {
  return localStorage.getItem('token');
};

const ProgressChart = () => {
  const [progressData, setProgressData] = useState({
    sleep: 0,
    exercise: 0,
    water: 0,
    study: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for the form inputs
  const [formData, setFormData] = useState({
    sleep: 0,
    exercise: 0,
    water: 0,
    study: 0,
  });

  const fetchProgressData = async () => {
    setLoading(true);
    const token = getAuthToken();
    if (!token) {
      setError("Please log in to view your progress.");
      setLoading(false);
      return;
    }
    try {
      const response = await axios.get("http://localhost:5000/api/progress", {
        headers: { "x-auth-token": token },
      });
      // Correctly set state with the 'habits' object from the response
      setProgressData(response.data.habits); 
      setFormData(response.data.habits); // Also populate the form with current data
    } catch (err) {
      setError("Failed to fetch progress data.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: parseFloat(value),
    }));
  };

  const handleUpdateProgress = async (e) => {
    e.preventDefault();
    const token = getAuthToken();
    if (!token) {
      setError("Not authenticated.");
      return;
    }
    try {
      const response = await axios.post("http://localhost:5000/api/progress/set", formData, {
        headers: { "x-auth-token": token },
      });
      // Update state with the new data from the server
      setProgressData(response.data.habits); 
      alert("Progress updated successfully!");
    } catch (err) {
      setError("Failed to update progress.");
      console.error(err);
    }
  };

  const handleIncrement = async (habit, value = 1) => {
    const token = getAuthToken();
    if (!token) {
      setError("Not authenticated.");
      return;
    }
    try {
      const response = await axios.post("http://localhost:5000/api/progress", 
        { habit, action: 'increment', value },
        { headers: { "x-auth-token": token } }
      );
      setProgressData(response.data.habits);
      setFormData(response.data.habits);
    } catch (err) {
      setError("Failed to update progress.");
      console.error(err);
    }
  };

  const handleDecrement = async (habit, value = 1) => {
    const token = getAuthToken();
    if (!token) {
      setError("Not authenticated.");
      return;
    }
    try {
      const response = await axios.post("http://localhost:5000/api/progress", 
        { habit, action: 'decrement', value },
        { headers: { "x-auth-token": token } }
      );
      setProgressData(response.data.habits);
      setFormData(response.data.habits);
    } catch (err) {
      setError("Failed to update progress.");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProgressData();
  }, []);

  if (loading) {
    return <div>Loading progress data...</div>;
  }
  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  const getBarHeight = (value, max) => Math.max((value / max) * 100, 5);

  const habits = [
    { key: 'sleep', label: 'Sleep (hrs)', color: 'bg-accent', max: 10 },
    { key: 'exercise', label: 'Exercise (min)', color: 'bg-success', max: 90 },
    { key: 'water', label: 'Water (cups)', color: 'bg-primary', max: 10 },
    { key: 'study', label: 'Study (hrs)', color: 'bg-warning', max: 5 },
  ];

  return (
    <Card className="card-futuristic">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Weekly Progress
        </CardTitle>
        <CardDescription className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          Today's Performance
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Chart */}
        <div className="space-y-4">
          <div className="flex items-end gap-2 h-20">
            {habits.map((habit) => (
              <div key={habit.key} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full bg-muted rounded-md overflow-hidden relative h-16">
                  <div
                    className={`${habit.color} rounded-md transition-all duration-500 ease-out absolute bottom-0 w-full`}
                    style={{ height: `${getBarHeight(progressData[habit.key], habit.max)}%` }}
                  />
                </div>
                <span className="text-xs text-muted-foreground">{habit.label.split(' ')[0]}</span>
                <div className="flex items-center gap-1 mt-1">
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-6 w-6 p-0 bg-transparent border-gray-600 hover:bg-gray-700"
                    onClick={() => handleDecrement(habit.key, 1)}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="text-xs font-medium min-w-[2rem] text-center">
                    {progressData[habit.key]}
                  </span>
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-6 w-6 p-0 bg-transparent border-gray-600 hover:bg-gray-700"
                    onClick={() => handleIncrement(habit.key, 1)}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <form onSubmit={handleUpdateProgress} className="space-y-4">
          <h4 className="font-medium">Update Today's Progress</h4>
          <div className="grid grid-cols-2 gap-4">
            {habits.map((habit) => (
              <div key={habit.key} className="space-y-1">
                <label className="text-sm font-medium">{habit.label}</label>
                <Input
                  type="number"
                  name={habit.key}
                  value={formData[habit.key]}
                  onChange={handleFormChange}
                  min="0"
                  max={habit.max}
                  step="0.1"
                  className="bg-transparent text-white border border-gray-600 focus:border-white"
                />
              </div>
            ))}
          </div>
          <Button type="submit" className="w-full bg-white text-black font-semibold hover:bg-gray-200">
            Save Progress
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProgressChart;