import React, { useState, useEffect } from "react";
import { Upload, Search, Trash2 } from "lucide-react";

const moods = [
  { emoji: "😊", label: "Happy" },
  { emoji: "😢", label: "Sad" },
  { emoji: "😡", label: "Angry" },
  { emoji: "😌", label: "Relaxed" },
  { emoji: "🤔", label: "Thoughtful" },
  { emoji: "😟", label: "Anxious" },
  { emoji: "🎉", label: "Excited" },
];

const MoodJournal = () => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [journalEntry, setJournalEntry] = useState("");
  const [entries, setEntries] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    const savedEntries =
      JSON.parse(localStorage.getItem("journalEntries")) || [];
    setEntries(savedEntries);
  }, []);

  useEffect(() => {
    localStorage.setItem("journalEntries", JSON.stringify(entries));
  }, [entries]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const analyzeSentiment = (text) => {
    const positiveWords = ["happy", "love", "excited", "great", "amazing"];
    const negativeWords = ["sad", "angry", "bad", "upset", "worried"];

    const words = text.toLowerCase().split(/\s+/);
    const positiveMatches = words.filter((word) =>
      positiveWords.includes(word)
    ).length;
    const negativeMatches = words.filter((word) =>
      negativeWords.includes(word)
    ).length;

    if (positiveMatches > negativeMatches) return "😊 Positive";
    if (negativeMatches > positiveMatches) return "😢 Negative";
    return "😐 Neutral";
  };

  const saveEntry = () => {
    if (journalEntry.trim() !== "" || selectedMood) {
      const newEntry = {
        id: Date.now(),
        mood: selectedMood,
        text: journalEntry,
        date: new Date().toLocaleString(),
        sentiment: analyzeSentiment(journalEntry),
        image,
      };
      const updatedEntries = [...entries, newEntry];
      setEntries(updatedEntries);
      setJournalEntry("");
      setSelectedMood(null);
      setImage(null);
    }
  };

  const deleteEntry = (id) => {
    const updatedEntries = entries.filter((entry) => entry.id !== id);
    setEntries(updatedEntries);
  };

  const filteredEntries = entries.filter((entry) =>
    entry.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">Mood & Journal</h2>

        <div className="flex gap-3 justify-center mb-4 flex-wrap">
          {moods.map((mood) => (
            <button
              key={mood.label}
              className={`text-2xl p-2 rounded-full border ${
                selectedMood === mood.label
                  ? "bg-blue-300"
                  : "hover:bg-gray-200"
              }`}
              onClick={() => setSelectedMood(mood.label)}
            >
              {mood.emoji}
            </button>
          ))}
        </div>

        <textarea
          className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Write about your day..."
          value={journalEntry}
          onChange={(e) => setJournalEntry(e.target.value)}
        ></textarea>

        <label className="flex items-center gap-2 cursor-pointer mt-2 text-blue-600">
          <Upload size={18} />
          <span>Upload Image</span>
          <input type="file" className="hidden" onChange={handleImageUpload} />
        </label>

        {image && (
          <img
            src={image}
            alt="Uploaded"
            className="mt-2 w-full rounded-lg shadow-sm"
          />
        )}

        <button
          onClick={saveEntry}
          className="bg-blue-500 text-white w-full mt-3 p-2 rounded-lg hover:scale-105 transition"
        >
          Save Entry
        </button>

        <div className="flex gap-2 mt-4 items-center border p-2 rounded-lg">
          <Search size={18} className="text-gray-500" />
          <input
            type="text"
            className="flex-1 outline-none"
            placeholder="Search entries..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Display Entries */}
        {filteredEntries.length > 0 ? (
          <div className="mt-6 space-y-3">
            <h3 className="text-lg font-semibold">Previous Entries</h3>
            {filteredEntries.map((entry) => (
              <div
                key={entry.id}
                className="p-3 bg-gray-200 rounded-lg relative"
              >
                <p className="text-gray-700">
                  {entry.mood && (
                    <span className="text-xl">
                      {moods.find((m) => m.label === entry.mood)?.emoji}{" "}
                    </span>
                  )}
                  {entry.text}
                </p>
                <p className="text-sm text-gray-500">{entry.date}</p>
                <p className="text-sm font-semibold">{entry.sentiment}</p>
                {entry.image && (
                  <img
                    src={entry.image}
                    alt="Uploaded"
                    className="mt-2 rounded-lg"
                  />
                )}

                {/* Delete Button */}
                <button
                  onClick={() => deleteEntry(entry.id)}
                  className="absolute top-2 right-2 text-red-600 hover:text-red-800"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 mt-4">No journal entries found.</p>
        )}
      </div>
    </div>
  );
};

export default MoodJournal;
