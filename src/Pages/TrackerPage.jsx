import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";


const TrackerPage = () => {
  const [startDate, setStartDate] = useState("");
  const [cycleLength, setCycleLength] = useState(28);
  const [symptoms, setSymptoms] = useState("");
  const [predictedCycle, setPredictedCycle] = useState(null);

  useEffect(() => {
    const savedData = localStorage.getItem("predictedCycle");
    if (savedData) {
      setPredictedCycle(JSON.parse(savedData));
    }
  }, []);

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

    const result = {
      nextPeriod: nextPeriod.toDateString(),
      ovulationDate: ovulationDate.toDateString(),
      fertileWindow: `${fertileStart.toDateString()} - ${fertileEnd.toDateString()}`,
      fertileRange: [fertileStart, fertileEnd],
      ovulationDateRaw: ovulationDate,
      nextPeriodRaw: nextPeriod,
      symptoms,
    };

    setPredictedCycle(result);
    localStorage.setItem("predictedCycle", JSON.stringify(result));
  };

  const isSameDay = (d1, d2) =>
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();

  const tileClassName = ({ date, view }) => {
    if (predictedCycle && view === "month") {
      const ovulation = new Date(predictedCycle.ovulationDateRaw);
      const period = new Date(predictedCycle.nextPeriodRaw);
      const fertileStart = new Date(predictedCycle.fertileRange[0]);
      const fertileEnd = new Date(predictedCycle.fertileRange[1]);

      if (isSameDay(date, period)) return "period-day";
      if (isSameDay(date, ovulation)) return "ovulation-day";
      if (date >= fertileStart && date <= fertileEnd) return "fertile-day";
    }
    return null;
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-pink-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-pink-600 text-center">Tracker</h2>
        <p className="text-gray-600 text-center mb-4">
          Predict your next cycle, symptoms & ovulation.
        </p>

        {/* Inputs */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Last Period Start Date:
          </label>
          <input
            type="date"
            className="w-full p-2 border rounded-lg"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Average Cycle Length:
          </label>
          <input
            type="number"
            className="w-full p-2 border rounded-lg"
            value={cycleLength}
            onChange={(e) => setCycleLength(parseInt(e.target.value))}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Symptoms (Optional):
          </label>
          <textarea
            className="w-full p-2 border rounded-lg"
              placeholder="E.g. cramps, bloating, headache..."
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
          />
        </div>

        <button
          onClick={calculateNextCycle}
          className="w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600"
        >
          Predict Cycle
        </button>

        {/* Prediction Summary */}
        {predictedCycle && (
          <div className="mt-4 p-4 bg-pink-50 border border-pink-300 rounded-lg">
            <p>📅 <strong>Next Period:</strong> {predictedCycle.nextPeriod}</p>
            <p>🥚 <strong>Ovulation:</strong> {predictedCycle.ovulationDate}</p>
            <p>🌱 <strong>Fertility Window:</strong> {predictedCycle.fertileWindow}</p>
          </div>
        )}

        {/* Calendar View */}
        {predictedCycle && (
          <div className="mt-6 bg-white p-4 rounded-xl shadow border">
            <Calendar tileClassName={tileClassName} />
            <div className="mt-4 text-sm text-gray-600 space-y-1">
              <p><span className="dot fertile-dot"></span> Fertile Days</p>
              <p><span className="dot ovulation-dot"></span> Ovulation Day</p>
              <p><span className="dot period-dot"></span> Next Period</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackerPage;
