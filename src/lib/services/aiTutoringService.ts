// AI Tutoring Service using OpenAI
class AITutoringService {
  private static API_KEY_STORAGE_KEY = 'openai_api_key';
  private static apiKey: string | null = null;

  static saveApiKey(apiKey: string): void {
    localStorage.setItem(this.API_KEY_STORAGE_KEY, apiKey);
    this.apiKey = apiKey;
    console.log('OpenAI API key saved successfully');
  }

  static getApiKey(): string | null {
    if (!this.apiKey) {
      this.apiKey = localStorage.getItem(this.API_KEY_STORAGE_KEY);
    }
    return this.apiKey;
  }

  static async analyzeStudentStruggle(studentData: any): Promise<{
    strugglingAreas: string[];
    recommendations: string[];
    personalizedPlan: string;
    confidenceScore: number;
  }> {
    const apiKey = this.getApiKey();
    if (!apiKey) {
      throw new Error('OpenAI API key not found');
    }

    const prompt = `
Analyze this student's academic performance and identify areas where they're struggling:

Student Data:
- Name: ${studentData.name}
- GPA: ${studentData.gpa}
- Current Courses: ${JSON.stringify(studentData.courses)}
- Recent Grades: ${JSON.stringify(studentData.recentGrades)}
- Assignment Completion: ${studentData.assignmentCompletion}%
- Attendance: ${studentData.attendance}%
- Subject Performance: ${JSON.stringify(studentData.subjectPerformance)}

Please provide:
1. Top 3 struggling areas
2. Specific recommendations for improvement
3. A personalized study plan
4. Confidence score (0-100) for the analysis

Respond in JSON format with keys: strugglingAreas, recommendations, personalizedPlan, confidenceScore
`;

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4.1-2025-04-14',
          messages: [
            {
              role: 'system',
              content: 'You are an expert educational AI tutor specializing in identifying student learning challenges and creating personalized improvement plans. Always respond with valid JSON.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.3,
          max_tokens: 1000,
        }),
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status}`);
      }

      const data = await response.json();
      const content = data.choices[0].message.content;
      
      try {
        return JSON.parse(content);
      } catch (parseError) {
        // Fallback if JSON parsing fails
        return {
          strugglingAreas: ['Unable to parse AI response'],
          recommendations: ['Please try again or contact support'],
          personalizedPlan: 'Analysis could not be completed at this time.',
          confidenceScore: 0
        };
      }
    } catch (error) {
      console.error('Error analyzing student struggle:', error);
      throw error;
    }
  }

  static async getSubjectHelp(subject: string, topic: string, currentGrade: string): Promise<{
    explanation: string;
    practiceProblems: string[];
    resources: string[];
    studyTips: string[];
  }> {
    const apiKey = this.getApiKey();
    if (!apiKey) {
      throw new Error('OpenAI API key not found');
    }

    const prompt = `
Provide tutoring help for a student struggling with:
Subject: ${subject}
Topic: ${topic}
Current Grade: ${currentGrade}

Please provide:
1. A clear explanation of the concept
2. 3 practice problems with solutions
3. Recommended study resources
4. Specific study tips for this topic

Respond in JSON format with keys: explanation, practiceProblems, resources, studyTips
`;

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4.1-2025-04-14',
          messages: [
            {
              role: 'system',
              content: 'You are a helpful tutor providing clear explanations and practical help for students. Always respond with valid JSON.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.4,
          max_tokens: 1500,
        }),
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status}`);
      }

      const data = await response.json();
      const content = data.choices[0].message.content;
      
      try {
        return JSON.parse(content);
      } catch (parseError) {
        return {
          explanation: 'Unable to generate explanation at this time.',
          practiceProblems: [],
          resources: [],
          studyTips: []
        };
      }
    } catch (error) {
      console.error('Error getting subject help:', error);
      throw error;
    }
  }

  static async chatWithTutor(message: string, context: any): Promise<string> {
    const apiKey = this.getApiKey();
    if (!apiKey) {
      throw new Error('OpenAI API key not found');
    }

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4.1-2025-04-14',
          messages: [
            {
              role: 'system',
              content: `You are a helpful AI tutor. Student context: ${JSON.stringify(context)}. Provide encouraging, educational responses that help the student learn.`
            },
            {
              role: 'user',
              content: message
            }
          ],
          temperature: 0.7,
          max_tokens: 800,
        }),
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('Error chatting with tutor:', error);
      throw error;
    }
  }
}

export { AITutoringService };