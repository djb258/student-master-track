import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/components/ui/use-toast";
import { 
  Brain, 
  MessageCircle, 
  TrendingDown, 
  Lightbulb, 
  BookOpen, 
  Target,
  AlertTriangle,
  Sparkles,
  MessageSquare,
  Send
} from "lucide-react";
import { AITutoringService } from '@/lib/services/aiTutoringService';

interface AITutorProps {
  studentId: string;
  studentData: {
    name: string;
    gpa: string;
    courses: any[];
    recentGrades: any[];
    assignmentCompletion: number;
    attendance: number;
    subjectPerformance: any[];
  };
}

const AITutor = ({ studentId, studentData }: AITutorProps) => {
  const { toast } = useToast();
  const [apiKey, setApiKey] = useState(AITutoringService.getApiKey() || '');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [subjectHelp, setSubjectHelp] = useState<any>(null);
  const [isGettingHelp, setIsGettingHelp] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<Array<{role: string, content: string}>>([]);
  const [isChatting, setIsChatting] = useState(false);

  const handleSaveApiKey = () => {
    if (apiKey.trim()) {
      AITutoringService.saveApiKey(apiKey.trim());
      toast({
        title: "Success",
        description: "OpenAI API key saved successfully",
      });
    }
  };

  const analyzeStudentPerformance = async () => {
    if (!AITutoringService.getApiKey()) {
      toast({
        title: "API Key Required",
        description: "Please enter your OpenAI API key first",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    try {
      const result = await AITutoringService.analyzeStudentStruggle(studentData);
      setAnalysis(result);
      toast({
        title: "Analysis Complete",
        description: "AI has analyzed the student's performance",
      });
    } catch (error) {
      console.error('Error analyzing student:', error);
      toast({
        title: "Analysis Failed",
        description: "Failed to analyze student performance. Please check your API key.",
        variant: "destructive",
      });
    }
    setIsAnalyzing(false);
  };

  const getSubjectHelp = async () => {
    if (!selectedSubject || !selectedTopic) {
      toast({
        title: "Missing Information",
        description: "Please select both subject and topic",
        variant: "destructive",
      });
      return;
    }

    setIsGettingHelp(true);
    try {
      const currentGrade = studentData.subjectPerformance.find(
        s => s.subject.toLowerCase().includes(selectedSubject.toLowerCase())
      )?.grade || 'B';
      
      const result = await AITutoringService.getSubjectHelp(selectedSubject, selectedTopic, currentGrade.toString());
      setSubjectHelp(result);
      toast({
        title: "Help Generated",
        description: "AI tutor has provided personalized help",
      });
    } catch (error) {
      console.error('Error getting subject help:', error);
      toast({
        title: "Help Failed",
        description: "Failed to get subject help. Please try again.",
        variant: "destructive",
      });
    }
    setIsGettingHelp(false);
  };

  const sendChatMessage = async () => {
    if (!chatMessage.trim()) return;

    const userMessage = chatMessage.trim();
    setChatMessage('');
    setChatHistory(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsChatting(true);

    try {
      const response = await AITutoringService.chatWithTutor(userMessage, {
        student: studentData.name,
        struggles: analysis?.strugglingAreas || [],
        currentCourses: studentData.courses
      });
      
      setChatHistory(prev => [...prev, { role: 'assistant', content: response }]);
    } catch (error) {
      console.error('Error chatting with tutor:', error);
      toast({
        title: "Chat Failed",
        description: "Failed to get response from AI tutor",
        variant: "destructive",
      });
    }
    setIsChatting(false);
  };

  return (
    <div className="space-y-6">
      {/* API Key Setup */}
      {!AITutoringService.getApiKey() && (
        <Alert>
          <Brain className="h-4 w-4" />
          <AlertDescription className="flex items-center gap-4">
            <span>Enter your OpenAI API key to enable AI tutoring features:</span>
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

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            AI Academic Assistant for {studentData.name}
          </CardTitle>
          <CardDescription>
            Powered by AI to identify learning challenges and provide personalized support
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="analysis" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="analysis">Performance Analysis</TabsTrigger>
          <TabsTrigger value="help">Subject Help</TabsTrigger>
          <TabsTrigger value="chat">AI Tutor Chat</TabsTrigger>
        </TabsList>

        <TabsContent value="analysis" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingDown className="h-5 w-5" />
                Academic Performance Analysis
              </CardTitle>
              <CardDescription>
                AI-powered analysis to identify areas where the student may be struggling
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={analyzeStudentPerformance}
                disabled={isAnalyzing || !AITutoringService.getApiKey()}
                className="mb-6"
              >
                {isAnalyzing ? (
                  <>
                    <Sparkles className="h-4 w-4 mr-2 animate-spin" />
                    Analyzing Performance...
                  </>
                ) : (
                  <>
                    <Brain className="h-4 w-4 mr-2" />
                    Analyze Student Performance
                  </>
                )}
              </Button>

              {analysis && (
                <div className="space-y-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Badge variant="secondary">
                      Confidence: {analysis.confidenceScore}%
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="border-orange-200 bg-orange-50">
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <AlertTriangle className="h-5 w-5 text-orange-600" />
                          Struggling Areas
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {analysis.strugglingAreas.map((area: string, index: number) => (
                            <li key={index} className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-orange-500" />
                              <span className="text-sm">{area}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="border-green-200 bg-green-50">
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Lightbulb className="h-5 w-5 text-green-600" />
                          Recommendations
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {analysis.recommendations.map((rec: string, index: number) => (
                            <li key={index} className="flex items-start gap-2">
                              <div className="w-2 h-2 rounded-full bg-green-500 mt-2" />
                              <span className="text-sm">{rec}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>

                  <Card className="border-blue-200 bg-blue-50">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Target className="h-5 w-5 text-blue-600" />
                        Personalized Study Plan
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm whitespace-pre-wrap">{analysis.personalizedPlan}</p>
                    </CardContent>
                  </Card>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="help" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Subject-Specific Help
              </CardTitle>
              <CardDescription>
                Get targeted assistance for specific subjects and topics
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Subject</label>
                  <Input
                    placeholder="e.g. Mathematics, Physics, English"
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Topic</label>
                  <Input
                    placeholder="e.g. Quadratic Equations, Newton's Laws"
                    value={selectedTopic}
                    onChange={(e) => setSelectedTopic(e.target.value)}
                  />
                </div>
              </div>
              
              <Button 
                onClick={getSubjectHelp}
                disabled={isGettingHelp || !AITutoringService.getApiKey()}
              >
                {isGettingHelp ? (
                  <>
                    <Sparkles className="h-4 w-4 mr-2 animate-spin" />
                    Getting Help...
                  </>
                ) : (
                  <>
                    <Lightbulb className="h-4 w-4 mr-2" />
                    Get AI Help
                  </>
                )}
              </Button>

              {subjectHelp && (
                <div className="space-y-4 mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Concept Explanation</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm whitespace-pre-wrap">{subjectHelp.explanation}</p>
                    </CardContent>
                  </Card>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Practice Problems</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {subjectHelp.practiceProblems.map((problem: string, index: number) => (
                            <li key={index} className="text-sm p-2 bg-secondary rounded">
                              {problem}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Study Tips</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {subjectHelp.studyTips.map((tip: string, index: number) => (
                            <li key={index} className="flex items-start gap-2">
                              <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                              <span className="text-sm">{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Recommended Resources</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-1">
                        {subjectHelp.resources.map((resource: string, index: number) => (
                          <li key={index} className="text-sm text-blue-600">
                            • {resource}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="chat" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                Chat with AI Tutor
              </CardTitle>
              <CardDescription>
                Ask questions and get personalized academic support
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="h-96 border rounded-lg p-4 overflow-y-auto bg-secondary/20">
                  {chatHistory.length === 0 ? (
                    <div className="text-center text-muted-foreground py-8">
                      <MessageSquare className="h-8 w-8 mx-auto mb-2" />
                      <p>Start a conversation with your AI tutor!</p>
                      <p className="text-sm">Ask about assignments, concepts, or study strategies.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {chatHistory.map((message, index) => (
                        <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-[80%] p-3 rounded-lg ${
                            message.role === 'user' 
                              ? 'bg-primary text-primary-foreground' 
                              : 'bg-secondary text-secondary-foreground'
                          }`}>
                            <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                          </div>
                        </div>
                      ))}
                      {isChatting && (
                        <div className="flex justify-start">
                          <div className="bg-secondary p-3 rounded-lg">
                            <div className="flex items-center gap-2">
                              <Sparkles className="h-4 w-4 animate-spin" />
                              <span className="text-sm">AI tutor is thinking...</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                
                <div className="flex gap-2">
                  <Textarea
                    placeholder="Ask your AI tutor a question..."
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        sendChatMessage();
                      }
                    }}
                    className="min-h-[60px]"
                  />
                  <Button 
                    onClick={sendChatMessage}
                    disabled={isChatting || !chatMessage.trim() || !AITutoringService.getApiKey()}
                    size="lg"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AITutor;