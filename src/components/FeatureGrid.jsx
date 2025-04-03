import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
const features = [
        { title: "Loud Siren", description: "Triggers an alarm sound in emergencies.", emoji: "📢" },
        { title: "Fake Call", description: "Triggers a fake call in emergencies.", emoji: "📞🎭" },
        { title: "SOS Emergency Alert", description: "Sends location & alert to contacts.", emoji: "🚨" },
        { title: "Tracker", description: "Predict your next cycle & symptoms.", emoji: "📅" },
        { title: "Mood & Journal", description: "Log emotions and write journals.", emoji: "😊" },
        { title: "Pregnancy Guide", description: "Weekly health tips for pregnant women.", emoji: "🤰" },
        { title: "Nutrition & Fitness", description: "Suggests diet & workouts.", emoji: "🥗" },
  { title: "Legal Awareness", description: "Know your rights & legal help.", emoji: "⚖" },


  { title: "Find Help", description: "Locate hospitals & police stations.", emoji: "🚑" },


  { title: "Self-Defense Tutor", description: "Learn techniques for safety.", emoji: "🥋" },


];

const FeatureGrid = () => {
    const navigate = useNavigate();

    const handleFeatureClick = (title) => {

      if (title == "SOS Emergency Alert")
        navigate("/sos");
      else if (title == "Loud Siren")
        navigate("/siren")
      else if (title == "Tracker")
        navigate("/tracker")
      else if (title == "Mood & Journal")
        navigate("/mood")
      else if (title == "Pregnancy Guide")
        navigate("/guide")
      else if (title == "Fake Call")
        navigate("/fakeCall")
      else if (title == "Find Help")
        navigate("/nearbyPlace")
      else if (title == "Legal Awareness")
        navigate("/awareness")
      else if (title == "Self-Defense Tutor")
        navigate("/selfDefence")
      else if (title == "Nutrition & Fitness")
        navigate("/fitness")



  };

  return (
    <div className="max-w-8xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold text-center mb-6">Safety & Health Features</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {features.map((feature, index) => (
           <div
            key={index}
            className="bg-white shadow-md rounded-lg p-8 text-center hover:shadow-lg transition cursor-pointer hover:bg-gray-100"
            onClick={() => handleFeatureClick(feature.title)} // OnClick event added here
          >
            <motion.span
    className="text-3xl inline-block"
   whileHover={{
      rotateY: 360,
      scale: 1.5,
      y: -15, // Moves the emoji slightly upwards
      transition: { duration: 1, ease: "easeInOut" },
    }}
            >
              <span className="text-3xl">{feature.emoji}</span>

  </motion.span>

            <h3 className="text-lg font-semibold mt-2">{feature.title}</h3>
            <p className="text-gray-600 text-sm mt-1">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureGrid;