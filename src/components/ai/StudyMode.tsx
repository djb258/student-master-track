import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { 
  Brain, 
  MessageCircle, 
  Lightbulb, 
  Target,
  Play,
  Pause,
  RotateCcw,
  Send,
  BookOpen,
  Zap,
  TrendingUp
} from "lucide-react";
import { StudyModeService } from '@/lib/services/studyModeService';

interface StudyModeProps {
  studentName: string;
  studentGrade: string;
}

interface StudySession {
  sessionId: string;
  subject: string;
  topic: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  progress: number;
  conversationHistory: Array<{role: string, content: string, timestamp: Date}>;
  isActive: boolean;
}

interface PracticeProblem {
  question: string;
  hints: string[];
  guidingQuestions: string[];
  currentHint: number;
}

const StudyMode = ({ studentName, studentGrade }: StudyModeProps) => {
  const { toast } = useToast();
  const [apiKey, setApiKey] = useState(StudyModeService.getApiKey() || '');
  const [currentSession, setCurrentSession] = useState<StudySession | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [studentMessage, setStudentMessage] = useState('');
  const [practiceProblems, setPracticeProblems] = useState<PracticeProblem[]>([]);
  const [showPractice, setShowPractice] = useState(false);
  
  // Session setup
  const [setupSubject, setSetupSubject] = useState('');
  const [setupTopic, setSetupTopic] = useState('');

  const handleSaveApiKey = () => {
    if (apiKey.trim()) {
      StudyModeService.saveApiKey(apiKey.trim());
      toast({
        title: "Success",
        description: "OpenAI API key saved successfully",
      });
    }
  };

  const startStudySession = async () => {
    if (!setupSubject || !setupTopic) {
      toast({
        title: "Missing Information",
        description: "Please enter both subject and topic",
        variant: "destructive",
      });
      return;
    }

    if (!StudyModeService.getApiKey()) {
      toast({
        title: "API Key Required",
        description: "Please enter your OpenAI API key first",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const initData = await StudyModeService.initializeStudySession(
        setupSubject,
        setupTopic,
        studentGrade,
        studentName
      );

      const newSession: StudySession = {
        sessionId: initData.sessionId,
        subject: setupSubject,
        topic: setupTopic,
        difficulty: 'beginner',
        progress: 0,
        conversationHistory: [
          {
            role: 'assistant',
            content: initData.welcomeMessage,
            timestamp: new Date()
          },
          {
            role: 'assistant',
            content: initData.firstQuestion,
            timestamp: new Date()
          }
        ],
        isActive: true
      };

      setCurrentSession(newSession);
      toast({
        title: "Study Session Started!",
        description: "Your AI tutor is ready to guide your learning",
      });
    } catch (error) {
      console.error('Error starting study session:', error);
      toast({
        title: "Session Failed",
        description: "Failed to start study session. Please check your API key.",
        variant: "destructive",
      });
    }
    setIsLoading(false);
  };

  const sendMessage = async () => {
    if (!studentMessage.trim() || !currentSession) return;

    const userMessage = studentMessage.trim();
    setStudentMessage('');
    
    // Add user message to history
    const updatedHistory = [
      ...currentSession.conversationHistory,
      { role: 'user', content: userMessage, timestamp: new Date() }
    ];

    setCurrentSession(prev => prev ? {
      ...prev,
      conversationHistory: updatedHistory
    } : null);

    setIsLoading(true);
    try {
      const response = await StudyModeService.processStudentResponse(
        userMessage,
        {
          sessionId: currentSession.sessionId,
          subject: currentSession.subject,
          topic: currentSession.topic,
          gradeLevel: studentGrade,
          conversationHistory: updatedHistory.map(msg => ({
            role: msg.role,
            content: msg.content
          })),
          currentDifficulty: currentSession.difficulty
        }
      );

      // Add AI response to history
      const finalHistory = [
        ...updatedHistory,
        { role: 'assistant', content: response.response, timestamp: new Date() }
      ];

      setCurrentSession(prev => prev ? {
        ...prev,
        conversationHistory: finalHistory,
        difficulty: response.nextDifficulty,
        progress: response.progressIndicator
      } : null);

      // Show practice problems if suggested
      if (response.shouldOfferPractice && !showPractice) {
        generatePracticeProblems();
      }

    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Message Failed",
        description: "Failed to get response from Study Mode",
        variant: "destructive",
      });
    }
    setIsLoading(false);
  };

  const generatePracticeProblems = async () => {
    if (!currentSession) return;

    setIsLoading(true);
    try {
      const problems = await StudyModeService.generatePracticeProblems(
        currentSession.subject,
        currentSession.topic,
        currentSession.difficulty,
        3
      );

      setPracticeProblems(problems.map(p => ({ ...p, currentHint: -1 })));
      setShowPractice(true);
      
      toast({
        title: "Practice Problems Ready!",
        description: "Try these guided practice problems",
      });
    } catch (error) {
      console.error('Error generating practice problems:', error);
      toast({
        title: "Practice Generation Failed",
        description: "Failed to generate practice problems",
        variant: "destructive",
      });
    }
    setIsLoading(false);
  };

  const showNextHint = (problemIndex: number) => {
    setPracticeProblems(prev => 
      prev.map((problem, index) => 
        index === problemIndex 
          ? { ...problem, currentHint: Math.min(problem.currentHint + 1, problem.hints.length - 1) }
          : problem
      )
    );
  };

  const endSession = () => {
    setCurrentSession(null);
    setShowPractice(false);
    setPracticeProblems([]);
    setSetupSubject('');
    setSetupTopic('');
  };

  const getQuestionTypeIcon = (type: string) => {
    switch (type) {
      case 'guiding': return <MessageCircle className="h-4 w-4" />;
      case 'hint': return <Lightbulb className="h-4 w-4" />;
      case 'practice': return <Target className="h-4 w-4" />;
      case 'encouragement': return <TrendingUp className="h-4 w-4" />;
      default: return <Brain className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* API Key Setup */}
      {!StudyModeService.getApiKey() && (
        <Alert>
          <Brain className="h-4 w-4" />
          <AlertDescription className="flex items-center gap-4">
            <span>Enter your OpenAI API key to enable Study Mode:</span>
            <div className="flex gap-2 flex-1">
              <Input
                type="password"
                placeholder="sk-..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="max-w-xs"
              />
              <Button onClick={handleSaveApiKey} size="sm">
                Save Key
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* Study Mode Header */}
      <Card className="border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-secondary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-6 w-6 text-primary" />
            ChatGPT Study Mode
            <Badge variant="secondary" className="ml-2">New July 2025</Badge>
          </CardTitle>
          <CardDescription>
            🎯 <strong>How Study Mode Works:</strong> Instead of giving direct answers, I guide you through discovery using:
            <br />• Thought-provoking questions • Step-by-step hints • Practice problems • Interactive learning loops
            <br />🧠 <strong>Purpose:</strong> Help you actually learn, not just copy answers!
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Session Setup */}
      {!currentSession && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Play className="h-5 w-5" />
              Start New Study Session
            </CardTitle>
            <CardDescription>
              Tell me what you'd like to learn, and I'll guide you through it step by step
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Subject</label>
                <Input
                  placeholder="e.g. Mathematics, Physics, History"
                  value={setupSubject}
                  onChange={(e) => setSetupSubject(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Topic</label>
                <Input
                  placeholder="e.g. Quadratic Equations, Newton's Laws"
                  value={setupTopic}
                  onChange={(e) => setSetupTopic(e.target.value)}
                />
              </div>
            </div>
            
            <Button 
              onClick={startStudySession}
              disabled={isLoading || !StudyModeService.getApiKey()}
              className="w-full"
            >
              {isLoading ? (
                <>
                  <Brain className="h-4 w-4 mr-2 animate-spin" />
                  Initializing Study Mode...
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 mr-2" />
                  Start Learning with AI Tutor
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Active Study Session */}
      {currentSession && (
        <div className="space-y-6">
          {/* Session Info */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    {currentSession.subject} - {currentSession.topic}
                  </CardTitle>
                  <CardDescription>
                    Session: {currentSession.sessionId} | Difficulty: {currentSession.difficulty}
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={generatePracticeProblems}
                    disabled={isLoading}
                  >
                    <Target className="h-4 w-4 mr-1" />
                    Practice
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={endSession}
                  >
                    <RotateCcw className="h-4 w-4 mr-1" />
                    End Session
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Learning Progress</span>
                  <span>{currentSession.progress}%</span>
                </div>
                <Progress value={currentSession.progress} className="h-2" />
              </div>
            </CardHeader>
          </Card>

          {/* Conversation */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                Study Conversation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="h-96 border rounded-lg p-4 overflow-y-auto bg-secondary/10">
                  <div className="space-y-4">
                    {currentSession.conversationHistory.map((message, index) => (
                      <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] p-3 rounded-lg ${
                          message.role === 'user' 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-secondary text-secondary-foreground border border-border'
                        }`}>
                          {message.role === 'assistant' && (
                            <div className="flex items-center gap-2 mb-2">
                              <Brain className="h-4 w-4" />
                              <span className="text-xs font-medium">Study Mode Tutor</span>
                            </div>
                          )}
                          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                          <p className="text-xs opacity-70 mt-1">
                            {message.timestamp.toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="bg-secondary p-3 rounded-lg border border-border">
                          <div className="flex items-center gap-2">
                            <Brain className="h-4 w-4 animate-pulse" />
                            <span className="text-sm">Thinking of the right question to guide you...</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Textarea
                    placeholder="Share your thoughts, ask questions, or try to work through the problem..."
                    value={studentMessage}
                    onChange={(e) => setStudentMessage(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        sendMessage();
                      }
                    }}
                    className="min-h-[60px]"
                  />
                  <Button 
                    onClick={sendMessage}
                    disabled={isLoading || !studentMessage.trim()}
                    size="lg"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Practice Problems */}
          {showPractice && practiceProblems.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Guided Practice Problems
                </CardTitle>
                <CardDescription>
                  Work through these problems. I'll provide hints to guide you, not give you answers!
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {practiceProblems.map((problem, index) => (
                    <Card key={index} className="border-2 border-dashed border-primary/30">
                      <CardContent className="p-4">
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold text-primary mb-2">Problem {index + 1}:</h4>
                            <p className="text-sm">{problem.question}</p>
                          </div>

                          {problem.currentHint >= 0 && (
                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                              <div className="flex items-center gap-2 mb-2">
                                <Lightbulb className="h-4 w-4 text-yellow-600" />
                                <span className="text-sm font-medium text-yellow-800">
                                  Hint {problem.currentHint + 1}:
                                </span>
                              </div>
                              <p className="text-sm text-yellow-700">
                                {problem.hints[problem.currentHint]}
                              </p>
                            </div>
                          )}

                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => showNextHint(index)}
                              disabled={problem.currentHint >= problem.hints.length - 1}
                            >
                              <Lightbulb className="h-4 w-4 mr-1" />
                              {problem.currentHint < 0 ? 'Get First Hint' : 'Next Hint'}
                            </Button>
                          </div>

                          {problem.guidingQuestions.length > 0 && (
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                              <h5 className="text-sm font-medium text-blue-800 mb-2">
                                Questions to help you think:
                              </h5>
                              <ul className="space-y-1">
                                {problem.guidingQuestions.map((question, qIndex) => (
                                  <li key={qIndex} className="text-sm text-blue-700">
                                    • {question}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};

export default StudyMode;