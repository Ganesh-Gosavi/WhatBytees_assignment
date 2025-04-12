import React, { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import QuickStats from "@/components/QuickStats";
import SyllabusAnalysis from "@/components/SyllabusAnalysis";
import QuestionAnalysis from "@/components/QuestionAnalysis";
import ComparisonGraph from "@/components/ComparisonGraph";
import UpdateScoreModal from "@/components/UpdateScoreModal";
import { format } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";

interface SkillTest {
  id: number;
  title: string;
  icon: string;
  questions: number;
  duration: number;
  submittedAt: string;
}

interface TestResult {
  id: number;
  rank: number;
  percentile: number;
  score: number;
  maxScore: number;
}

interface SyllabusResult {
  id: number;
  title: string;
  percentage: number;
  color: string;
}

interface TestResultResponse {
  test: SkillTest;
  result: TestResult;
  syllabusResults: SyllabusResult[];
}

const SkillTest: React.FC = () => {
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  
  // Fetch test result data
  const { data, isLoading } = useQuery<TestResultResponse>({
    queryKey: ['/api/test-results/1'],
  });
  
  // Update score mutation
  const updateMutation = useMutation({
    mutationFn: async (updateData: { rank: number; percentile: number; score: number }) => {
      if (!data?.result.id) return null;
      const res = await apiRequest('PUT', `/api/test-results/${data.result.id}`, updateData);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/test-results/1'] });
    },
  });
  
  const handleUpdateScore = (values: { rank: number; percentile: number; score: number }) => {
    updateMutation.mutate(values);
    setIsUpdateModalOpen(false);
  };
  
  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="h-8 w-40 bg-gray-200 rounded animate-pulse"></div>
        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="h-12 w-full bg-gray-200 rounded animate-pulse"></div>
            <div className="h-40 w-full bg-gray-200 rounded animate-pulse"></div>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  if (!data) {
    return <div>No test results found.</div>;
  }
  
  const { test, result, syllabusResults } = data;
  const submittedDate = new Date(test.submittedAt);
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold">Skill Test</h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2/3 width on large screens) */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-white rounded-lg shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-start">
                  <div className="bg-red-100 p-2 rounded mr-4">
                    <img 
                      src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" 
                      alt="HTML5" 
                      className="w-12 h-12"
                    />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold">{test.title}</h2>
                    <p className="text-sm text-gray-600">
                      Questions: {test.questions.toString().padStart(2, '0')} | 
                      Duration: {test.duration} mins | 
                      Submitted on {format(submittedDate, 'd MMMM yyyy')}
                    </p>
                  </div>
                </div>
                <Button 
                  onClick={() => setIsUpdateModalOpen(true)}
                  className="bg-primary text-white"
                >
                  Update
                </Button>
              </div>
              
              <QuickStats 
                rank={result.rank} 
                percentile={result.percentile} 
                score={result.score} 
                maxScore={result.maxScore} 
              />
              
              <ComparisonGraph percentile={result.percentile} />
            </CardContent>
          </Card>
        </div>
        
        {/* Right Column (1/3 width on large screens) */}
        <div className="space-y-6">
          <SyllabusAnalysis syllabusResults={syllabusResults} />
          
          <QuestionAnalysis score={result.score} maxScore={result.maxScore} />
        </div>
      </div>
      
      <UpdateScoreModal 
        isOpen={isUpdateModalOpen} 
        onClose={() => setIsUpdateModalOpen(false)}
        onSave={handleUpdateScore}
        initialValues={{
          rank: result.rank,
          percentile: result.percentile,
          score: result.score
        }}
      />
    </div>
  );
};

export default SkillTest;
