import React, { useState, useEffect } from "react";
import { PlusCircle, Trash2, CheckCircle } from "lucide-react";

const weeklyTips = [
  "Eat a balanced diet rich in folic acid and iron.",
  "Stay hydrated and drink at least 8 glasses of water daily.",
  "Exercise moderately with pregnancy-safe workouts.",
  "Get enough sleep and manage stress effectively.",
  "Take prenatal vitamins as recommended by your doctor.",
  "Monitor fetal movements and kick counts after 20 weeks.",
  "Attend all prenatal check-ups and ultrasounds.",
  "Prepare a birth plan and discuss it with your doctor.",
  "Start organizing baby essentials and hospital bag.",
  "Practice relaxation techniques for labor preparation.",
];

const PregnancyGuidePage = () => {
  const [currentWeek, setCurrentWeek] = useState(1);
  const [symptoms, setSymptoms] = useState("");
  const [loggedSymptoms, setLoggedSymptoms] = useState([]);
  const [reminders, setReminders] = useState("");
  const [tasks, setTasks] = useState([]);
  const [doctorVisits, setDoctorVisits] = useState("");


  useEffect(() => {
    const storedWeek = localStorage.getItem("pregnancyWeek");
    const storedSymptoms =
      JSON.parse(localStorage.getItem("loggedSymptoms")) || [];
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

    if (storedWeek) setCurrentWeek(parseInt(storedWeek));
    setLoggedSymptoms(storedSymptoms);
    setTasks(storedTasks);
  }, []);


  useEffect(() => {
    localStorage.setItem("pregnancyWeek", currentWeek);
    localStorage.setItem("loggedSymptoms", JSON.stringify(loggedSymptoms));
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [currentWeek, loggedSymptoms, tasks]);


  const addSymptoms = () => {
    if (symptoms.trim() !== "") {
      setLoggedSymptoms([
        ...loggedSymptoms,
        { week: currentWeek, text: symptoms },
      ]);
      setSymptoms("");
    }
  };

  // Add Reminder Task
  const addTask = () => {
    if (reminders.trim() !== "") {
      setTasks([...tasks, { text: reminders, completed: false }]);
      setReminders("");
    }
  };

  const toggleTaskCompletion = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-pink-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">Pregnancy Guide</h2>

        <div className="flex justify-between items-center mb-4">
          <button
            className="px-4 py-1 bg-blue-500 text-white rounded-lg disabled:opacity-50"
            disabled={currentWeek === 1}
            onClick={() => setCurrentWeek((prev) => prev - 1)}
          >
            ⬅ Previous
          </button>
          <span className="text-lg font-semibold">Week {currentWeek}</span>
          <button
            className="px-4 py-1 bg-blue-500 text-white rounded-lg disabled:opacity-50"
            disabled={currentWeek === weeklyTips.length}
            onClick={() => setCurrentWeek((prev) => prev + 1)}
          >
            Next ➡
          </button>
        </div>

        <div className="p-3 bg-gray-200 rounded-lg text-gray-700 mb-4">
          <strong>Tip of the Week:</strong> {weeklyTips[currentWeek - 1]}
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-semibold">Log Symptoms</h3>
          <input
            type="text"
            className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter symptoms..."
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
          />
          <button
            onClick={addSymptoms}
            className="bg-blue-500 text-white w-full mt-2 p-2 rounded-lg hover:scale-105 transition"
          >
            Add Symptoms
          </button>
        </div>

        {loggedSymptoms.length > 0 && (
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Logged Symptoms</h3>
            <ul className="list-disc pl-4 text-gray-700">
              {loggedSymptoms
                .filter((entry) => entry.week === currentWeek)
                .map((entry, index) => (
                  <li key={index} className="text-sm">
                    {entry.text}
                  </li>
                ))}
            </ul>
          </div>
        )}

        <div className="mb-4">
          <h3 className="text-lg font-semibold">Reminders & Tasks</h3>
          <div className="flex gap-2">
            <input
              type="text"
              className="flex-1 p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Add a reminder..."
              value={reminders}
              onChange={(e) => setReminders(e.target.value)}
            />
            <button
              onClick={addTask}
              className="bg-green-500 text-white p-2 rounded-lg"
            >
              <PlusCircle size={20} />
            </button>
          </div>
        </div>

        {tasks.length > 0 && (
          <ul className="space-y-2">
            {tasks.map((task, index) => (
              <li
                key={index}
                className="flex items-center justify-between bg-gray-200 p-2 rounded-lg"
              >
                <span
                  className={`text-gray-700 ${
                    task.completed ? "line-through text-green-500" : ""
                  }`}
                  onClick={() => toggleTaskCompletion(index)}
                >
                  {task.text}
                </span>
                <button
                  onClick={() => deleteTask(index)}
                  className="text-red-600"
                >
                  <Trash2 size={18} />
                </button>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-4">
          <h3 className="text-lg font-semibold">Doctor Visits</h3>
          <input
            type="text"
            className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Next appointment details..."
            value={doctorVisits}
            onChange={(e) => setDoctorVisits(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default PregnancyGuidePage;
