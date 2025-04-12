import React from "react";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Dashboard: React.FC = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold">Dashboard</h1>
      </div>
      
      <Card>
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold mb-4">Welcome to WhatBytes</h2>
          <p className="mb-4">This is your dashboard where you can see an overview of your performance.</p>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="bg-blue-50">
              <CardContent className="p-4">
                <h3 className="font-medium mb-2">Skill Tests</h3>
                <p className="text-sm mb-4">View your skill test results and performance metrics</p>
                <Link href="/skill-test">
                  <Button>View Skill Tests</Button>
                </Link>
              </CardContent>
            </Card>
            
            <Card className="bg-yellow-50">
              <CardContent className="p-4">
                <h3 className="font-medium mb-2">Internships</h3>
                <p className="text-sm mb-4">Browse available internship opportunities</p>
                <Link href="/internship">
                  <Button variant="outline">Browse Internships</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
