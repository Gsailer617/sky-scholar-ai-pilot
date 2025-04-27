
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();
  
  const handleGetStarted = () => {
    navigate('/auth');
  };

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-sky-50 py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 md:grid-cols-2 md:gap-10 items-center">
            <div className="space-y-6">
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
                Sky Scholar <span className="text-sky-600">AI</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Your personalized AI study companion for aviation certification. 
                Master regulations, pass exams, and fly with confidence.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button size="lg" onClick={handleGetStarted} className="bg-sky-600 hover:bg-sky-700">
                  Get Started
                </Button>
                <Button size="lg" variant="outline" onClick={() => navigate('/chat')}>
                  Try AI Chat
                </Button>
              </div>
            </div>
            
            <div className="relative hidden md:block">
              <div className="absolute inset-0 bg-gradient-to-r from-sky-500 to-indigo-500 rounded-lg opacity-20 blur-xl"></div>
              <img 
                src="https://images.unsplash.com/photo-1559060680-13416b2b2755?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                alt="Cockpit of an airplane"
                className="relative rounded-lg object-cover w-full aspect-[4/3]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Powered by AI, Built for Aviation</h2>
            <p className="text-xl text-muted-foreground mx-auto max-w-3xl">
              Sky Scholar combines advanced AI with FAA-approved materials to deliver personalized learning experiences.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>AI Chat Tutor</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Ask questions about aviation topics and get instant, accurate answers grounded in FAA materials with proper citations.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Adaptive Practice</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Take quizzes that adapt to your knowledge gaps, focusing on areas where you need the most improvement.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Study Materials</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Access a comprehensive library of FAA documents, organized and searchable for efficient studying.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="bg-sky-50 py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Trusted by Student Pilots</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="p-6">
                <p className="italic mb-4">
                  "Sky Scholar helped me pass my PPL written exam with a 92%. The AI tutor explained complex regulations in a way I could understand."
                </p>
                <div>
                  <p className="font-semibold">Alex T.</p>
                  <p className="text-sm text-muted-foreground">Private Pilot Student</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <p className="italic mb-4">
                  "As an A&P student, the focused quizzes on aircraft systems saved me hours of study time. The app knew exactly where I needed help."
                </p>
                <div>
                  <p className="font-semibold">Maria L.</p>
                  <p className="text-sm text-muted-foreground">A&P Mechanic Student</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl font-bold">Ready to accelerate your aviation studies?</h2>
            <p className="text-xl text-muted-foreground">
              Join thousands of student pilots and mechanics who are mastering aviation concepts faster with Sky Scholar AI.
            </p>
            <Button size="lg" onClick={handleGetStarted} className="mt-4 bg-sky-600 hover:bg-sky-700">
              Get Started Now
            </Button>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © 2025 Sky Scholar AI. All rights reserved.
            </p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="text-sm text-muted-foreground hover:text-sky-600">Terms</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-sky-600">Privacy</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-sky-600">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
