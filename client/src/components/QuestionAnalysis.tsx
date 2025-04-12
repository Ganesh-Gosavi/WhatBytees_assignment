import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface QuestionAnalysisProps {
  score: number;
  maxScore: number;
}

const QuestionAnalysis: React.FC<QuestionAnalysisProps> = ({ score, maxScore }) => {
  // Calculate percentage for the progress circle
  const percentage = (score / maxScore) * 100;
  // Calculate stroke-dashoffset (circumference - percentage of circumference)
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  
  return (
    <Card className="bg-white rounded-lg shadow">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-base font-semibold">Question Analysis</h3>
          <span className="text-primary font-medium">{score}/{maxScore}</span>
        </div>
        
        <div className="text-sm text-gray-600 mb-6">
          You scored {score} question correct out of {maxScore}. However it still needs some improvements
        </div>
        
        {/* Circular Progress */}
        <div className="flex justify-center">
          <div className="relative w-36 h-36">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              {/* Background circle */}
              <circle 
                cx="50" 
                cy="50" 
                r="45" 
                fill="none" 
                stroke="#E6EFFF" 
                strokeWidth="10" 
              />
              
              {/* Progress circle */}
              <circle 
                cx="50" 
                cy="50" 
                r="45" 
                fill="none" 
                stroke="#3D5FFF" 
                strokeWidth="10" 
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
              />
            </svg>
            
            {/* Target icon in center */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white rounded-full p-2">
                <svg className="h-10 w-10" viewBox="0 0 20 20">
                  <circle cx="10" cy="10" r="10" fill="#FF3B3B" />
                  <circle cx="10" cy="10" r="6" fill="white" />
                  <circle cx="10" cy="10" r="3" fill="#FF3B3B" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuestionAnalysis;
