import React, { useState } from "react";

const TrackerPage = () => {
  const [startDate, setStartDate] = useState("");
  const [cycleLength, setCycleLength] = useState(28);
  const [symptoms, setSymptoms] = useState("");
  const [predictedCycle, setPredictedCycle] = useState(null);

  const calculateNextCycle = () => {
    if (!startDate) return;

    const ovulationDay = Math.floor(cycleLength / 2);
    const fertilityWindowStart = ovulationDay - 3;
    const fertilityWindowEnd = ovulationDay + 2;

    const start = new Date(startDate);
    const nextPeriod = new Date(start);
    nextPeriod.setDate(start.getDate() + cycleLength);

    const ovulationDate = new Date(start);
    ovulationDate.setDate(start.getDate() + ovulationDay);

    const fertileStart = new Date(start);
    fertileStart.setDate(start.getDate() + fertilityWindowStart);

    const fertileEnd = new Date(start);
    fertileEnd.setDate(start.getDate() + fertilityWindowEnd);

    setPredictedCycle({
      nextPeriod: nextPeriod.toDateString(),
      ovulationDate: ovulationDate.toDateString(),
      fertileWindow: `${fertileStart.toDateString()} - ${fertileEnd.toDateString()}`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-pink-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-pink-600 text-center">Tracker</h2>
        <p className="text-gray-600 text-center mb-4">
          Predict your next cycle, symptoms & ovulation.
        </p>


        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Last Period Start Date:
          </label>
          <input
            type="date"
            className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-pink-400"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>


        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Average Cycle Length (days):
          </label>
          <input
            type="number"
            className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-pink-400"
            value={cycleLength}
            onChange={(e) => setCycleLength(parseInt(e.target.value))}
            min="21"
            max="35"
          />
        </div>


        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Log Symptoms (Optional):
          </label>
          <textarea
            className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-pink-400"
            placeholder="E.g. cramps, bloating, headache..."
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
          ></textarea>
        </div>


        <button
          onClick={calculateNextCycle}
          className="w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition"
        >
          Predict Cycle
        </button>


        {predictedCycle && (
          <div className="mt-4 p-4 bg-pink-50 border border-pink-300 rounded-lg">
            <p className="text-gray-800 font-medium">
              📅 <strong>Next Period:</strong> {predictedCycle.nextPeriod}
            </p>
            <p className="text-gray-800 font-medium">
              🥚 <strong>Ovulation Day:</strong> {predictedCycle.ovulationDate}
            </p>
            <p className="text-gray-800 font-medium">
              🌱 <strong>Fertility Window:</strong> {predictedCycle.fertileWindow}
            </p>
          </div>
        )}


        <div className="mt-6 p-4 bg-white shadow-md rounded-lg border">
          <h3 className="text-lg font-bold text-gray-800">💡 Health Tips</h3>
          <ul className="list-disc text-gray-600 text-sm mt-2 pl-4">
            <li>Stay hydrated to ease bloating & cramps.</li>
            <li>Maintain a balanced diet rich in iron & vitamins.</li>
            <li>Light exercise can help reduce menstrual pain.</li>
            <li>Track mood changes to understand emotional patterns.</li>
            <li>Consult a doctor if cycles are irregular.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TrackerPage;
