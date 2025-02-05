import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { BadgeCheck, Briefcase, Code, GraduationCap, Trophy, Puzzle, Terminal } from "lucide-react";

const sections = [
  { id: "education", title: "Education", icon: GraduationCap, description: "University of Michigan - Computer Engineering\nRelevant Coursework: MATLAB, C++, Calculus 1, Physics 1 & Lab (Python)" },
  { id: "experience", title: "Experience", icon: Briefcase, description: "Topgolf, Lansdowne Resort - Food Runner\n- Enforced dress code policies and ensured smooth service\n- Managed multiple tables and requests efficiently" },
  { id: "projects", title: "Projects", icon: Code, description: "GPA Calculator (Java)\n- Developed a tool to calculate weighted GPA\nVisualization Tool (Java)\n- Built an interactive visualization tool for sorting and searching algorithms\nDisk Stacking (Java)\n- Designed a game utilizing stacks and queues\nDealing with Radiation (MATLAB)\n- Processed images through vectorization and logical indexing\nSiting a Wind Farm (MATLAB)\n- Conducted large data analysis and generated summary graphics" },
  { id: "achievements", title: "Achievements", icon: Trophy, description: "Founder of Investments Club, Leadership Camp Graduate\n- Red Cross Officer\n- Broad Run Soccer (2 years JV, 2 years Varsity)\n- Club Boxing at Michigan" },
  { id: "quiz", title: "Quiz", icon: Puzzle, description: "Test your knowledge about Sebastian's experience!" },
  { id: "coding_challenge", title: "Coding Challenge", icon: Terminal, description: "Solve a C++ coding challenge!" }
];

const quizQuestions = [
  { question: "Where does Sebastian study?", options: ["MIT", "Stanford", "University of Michigan"], answer: "University of Michigan" },
  { question: "What project did Sebastian create?", options: ["CardSavvy", "BudgetMaster", "InvestEase"], answer: "CardSavvy" }
];

const codingChallenge = {
  prompt: "Write a C++ function to check if a given number is prime.",
  solution: `bool isPrime(int n) {
    if (n <= 1) return false;
    for (int i = 2; i * i <= n; i++) {
        if (n % i == 0) return false;
    }
    return true;
}`
};

export default function InteractiveResume() {
  const [selectedSection, setSelectedSection] = useState(null);
  const [userCode, setUserCode] = useState("");
  const [isCorrect, setIsCorrect] = useState(null);

  const handleCodeSubmission = () => {
    const cleanedUserCode = userCode.replace(/\s+/g, '');
    const cleanedSolution = codingChallenge.solution.replace(/\s+/g, '');
    setIsCorrect(cleanedUserCode === cleanedSolution);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-4xl font-bold mb-6">Hi I am Sebastian Chacon</h1>
      <div className="grid grid-cols-2 gap-6">
        {sections.map((section) => (
          <motion.div whileHover={{ scale: 1.1 }} key={section.id}>
            <Card className="p-6 cursor-pointer bg-gray-800 border-gray-700" onClick={() => setSelectedSection(section)}>
              <section.icon className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-center">{section.title}</h2>
            </Card>
          </motion.div>
        ))}
      </div>
      {selectedSection && selectedSection.id === "coding_challenge" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-8 p-6 bg-gray-800 rounded-xl shadow-lg w-full max-w-2xl">
          <h2 className="text-2xl font-bold mb-4">C++ Coding Challenge</h2>
          <p className="text-lg mb-4">{codingChallenge.prompt}</p>
          <textarea
            className="w-full p-2 bg-gray-700 text-white rounded-lg border border-gray-600"
            rows="6"
            placeholder="Write your C++ code here..."
            value={userCode}
            onChange={(e) => setUserCode(e.target.value)}
          ></textarea>
          <Button className="mt-4" onClick={handleCodeSubmission}>Submit Code</Button>
          {isCorrect !== null && (
            <p className={`mt-4 text-lg font-bold ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
              {isCorrect ? "Correct! Your solution matches." : "Incorrect. Try again!"}
            </p>
          )}
        </motion.div>
      )}
    </div>
  );
}
