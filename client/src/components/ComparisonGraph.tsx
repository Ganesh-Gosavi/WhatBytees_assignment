import React from "react";

interface ComparisonGraphProps {
  percentile: number;
}

const ComparisonGraph: React.FC<ComparisonGraphProps> = ({ percentile }) => {
  return (
    <div>
      <h3 className="text-base font-semibold mb-2">Comparison Graph</h3>
      <p className="text-sm text-gray-600 mb-4">
        You scored {percentile}% percentile which is lower than the 
        average percentile 72% of all the engineers who took this assessment
      </p>
      
      <div className="h-52 border rounded p-4 relative bg-white">
        {/* SVG Graph */}
        <div className="absolute inset-0 p-4">
          <svg width="100%" height="100%" viewBox="0 0 800 200" preserveAspectRatio="none">
            {/* Horizontal lines */}
            <line x1="0" y1="0" x2="800" y2="0" stroke="#f0f0f0" strokeWidth="1" />
            <line x1="0" y1="100" x2="800" y2="100" stroke="#f0f0f0" strokeWidth="1" />
            <line x1="0" y1="200" x2="800" y2="200" stroke="#f0f0f0" strokeWidth="1" />
            
            {/* Vertical lines (25, 50, 75, 100 percentile) */}
            <line x1="200" y1="0" x2="200" y2="200" stroke="#f0f0f0" strokeWidth="1" />
            <line x1="400" y1="0" x2="400" y2="200" stroke="#f0f0f0" strokeWidth="1" />
            <line x1="600" y1="0" x2="600" y2="200" stroke="#f0f0f0" strokeWidth="1" />
            <line x1="800" y1="0" x2="800" y2="200" stroke="#f0f0f0" strokeWidth="1" />
            
            {/* Graph line */}
            <path 
              d="M0,180 C50,170 100,160 150,140 S200,100 250,90 S300,80 350,50 S400,30 450,20 S500,10 550,30 S600,70 650,110 S700,130 750,140 S800,145 800,145" 
              fill="none" 
              stroke="#d0d0d0" 
              strokeWidth="2" 
              strokeDasharray="5,5" 
            />
            
            {/* Your percentile marker */}
            <circle 
              cx={`${(percentile / 100) * 800}`} 
              cy="150" 
              r="5" 
              fill="#d0d0d0" 
            />
            
            {/* Top percentile marker */}
            <circle cx="720" cy="130" r="5" fill="#5364ff" />
          </svg>
          
          {/* Labels */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-500">
            <span>0</span>
            <span>25</span>
            <span>50</span>
            <span>75</span>
            <span>100</span>
          </div>
          
          {/* Top marker label */}
          <div className="absolute top-1/4 right-8 text-xs p-1 bg-white border rounded shadow">
            <div className="text-purple-600 font-medium">90</div>
            <div className="text-gray-500">numberOfStudent : 4</div>
          </div>
          
          {/* Your percentile label */}
          <div className="absolute bottom-1/3 left-1/4 text-xs text-gray-500">
            your percentile
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonGraph;
