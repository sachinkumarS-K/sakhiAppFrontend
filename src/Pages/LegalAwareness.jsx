import React from "react";
import { motion } from "framer-motion";

const LegalAwareness = () => {
  return (
    <motion.div
      className="max-w-4xl mx-auto p-6 bg-white shadow-xl rounded-lg mt-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.h1
        className="text-4xl font-bold text-center text-red-600 mb-6"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        ⚖️ Legal Awareness for Women Safety
      </motion.h1>

      <motion.div className="mb-6 bg-gray-100 p-4 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          👩‍⚖️ Your Legal Rights
        </h2>
        <ul className="list-disc ml-6 text-gray-700">
          <li>
            📌 **Right to Self-Defense**: Women can protect themselves if
            attacked (Section 96-106 IPC).
          </li>
          <li>
            📌 **Sexual Harassment Law**: Protection at workplace (POSH Act
            2013).
          </li>
          <li>
            📌 **Domestic Violence Protection**: Women can file complaints under
            the Domestic Violence Act 2005.
          </li>
          <li>
            📌 **Stalking & Cybercrime**: Laws against online harassment
            (Section 354D IPC).
          </li>
        </ul>
      </motion.div>

      <motion.div className="mb-6 bg-red-100 p-4 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-red-700 mb-2">
          📞 Emergency Helpline Numbers
        </h2>
        <p className="text-gray-700">
          🚨 **National Women Helpline**: **1091**
        </p>
        <p className="text-gray-700">🚔 **Police**: **100**</p>
        <p className="text-gray-700">🆘 **Cyber Crime Helpline**: **155260**</p>
        <p className="text-gray-700">🏥 **Medical Emergency**: **108**</p>
      </motion.div>

      <motion.div className="mb-6 bg-blue-100 p-4 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-blue-700 mb-2">
          🚔 How to Report a Crime?
        </h2>
        <ol className="list-decimal ml-6 text-gray-700">
          <li>Contact **1091 (Women’s Helpline)** or **100 (Police)**.</li>
          <li>
            Visit the nearest police station & file an **FIR (First Information
            Report)**.
          </li>
          <li>
            For **cybercrime**, file a complaint at{" "}
            <a
              href="https://cybercrime.gov.in"
              className="text-blue-600 underline"
            >
              Cyber Crime Portal
            </a>
            .
          </li>
          <li>Seek legal aid via **NCW (National Commission for Women)**.</li>
        </ol>
      </motion.div>

      <motion.div className="mb-6 bg-green-100 p-4 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-green-700 mb-2">
          ❓ Frequently Asked Questions (FAQs)
        </h2>
        <details className="mb-2">
          <summary className="font-semibold">
            🔹 Can I file an FIR without a lawyer?
          </summary>
          <p className="text-gray-700 ml-4">
            Yes, you can directly visit a police station and file an FIR.
          </p>
        </details>
        <details className="mb-2">
          <summary className="font-semibold">
            🔹 What if police refuse to register my complaint?
          </summary>
          <p className="text-gray-700 ml-4">
            You can escalate the complaint to **SP (Superintendent of Police)**
            or file a complaint with the **NCW**.
          </p>
        </details>
        <details className="mb-2">
          <summary className="font-semibold">
            🔹 Are online complaints valid?
          </summary>
          <p className="text-gray-700 ml-4">
            Yes, online FIRs and cybercrime complaints are legally valid.
          </p>
        </details>
      </motion.div>

      <motion.div className="text-center">
        <p>
          Meanwhile, feel free to browse our{" "}
          <a
            href="https://sakhi-app-frontend.vercel.app"
            className="text-red-600 font-bold underline"
          >
            Help Center
          </a>{" "}
          for quick answers.
        </p>
      </motion.div>
    </motion.div>
  );
};

export default LegalAwareness;
