// OpenAI Study Mode Implementation - Socratic Method Tutoring
class StudyModeService {
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

  static async initializeStudySession(
    subject: string, 
    topic: string, 
    gradeLevel: string, 
    studentName: string
  ): Promise<{
    welcomeMessage: string;
    firstQuestion: string;
    sessionId: string;
  }> {
    const apiKey = this.getApiKey();
    if (!apiKey) {
      throw new Error('OpenAI API key not found');
    }

    const prompt = `
You are ChatGPT Study Mode - a Socratic tutor that guides students through learning WITHOUT giving direct answers.

Student Context:
- Name: ${studentName}
- Grade Level: ${gradeLevel}
- Subject: ${subject}
- Topic: ${topic}

Your role:
1. Start with a warm welcome and assess their prior knowledge
2. Ask thought-provoking questions to guide discovery
3. Provide hints, not answers
4. Create interactive learning loops
5. Adapt to their skill level in real-time

Begin the session with:
1. A welcoming message that explains how Study Mode works
2. An initial question to assess their current understanding of ${topic}

Respond in JSON format with keys: welcomeMessage, firstQuestion, sessionId
Generate a unique sessionId for tracking.
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
              content: 'You are ChatGPT Study Mode - a Socratic tutor. Never give direct answers. Always guide through questioning and hints. Respond only in valid JSON.'
            },
            {
              role: 'user',
              content: prompt
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
      const content = data.choices[0].message.content;
      
      try {
        const result = JSON.parse(content);
        return {
          ...result,
          sessionId: result.sessionId || `session_${Date.now()}`
        };
      } catch (parseError) {
        return {
          welcomeMessage: 'Welcome to Study Mode! I\'m here to guide your learning through questions and discovery.',
          firstQuestion: `Let\'s start with ${topic}. What do you already know about this topic?`,
          sessionId: `session_${Date.now()}`
        };
      }
    } catch (error) {
      console.error('Error initializing study session:', error);
      throw error;
    }
  }

  static async processStudentResponse(
    studentResponse: string,
    context: {
      sessionId: string;
      subject: string;
      topic: string;
      gradeLevel: string;
      conversationHistory: Array<{role: string, content: string}>;
      currentDifficulty: 'beginner' | 'intermediate' | 'advanced';
    }
  ): Promise<{
    response: string;
    questionType: 'guiding' | 'hint' | 'practice' | 'assessment' | 'encouragement';
    nextDifficulty: 'beginner' | 'intermediate' | 'advanced';
    progressIndicator: number; // 0-100
    shouldOfferPractice: boolean;
  }> {
    const apiKey = this.getApiKey();
    if (!apiKey) {
      throw new Error('OpenAI API key not found');
    }

    const conversationContext = context.conversationHistory
      .map(msg => `${msg.role}: ${msg.content}`)
      .join('\n');

    const prompt = `
You are ChatGPT Study Mode for ${context.subject} - ${context.topic} (Grade: ${context.gradeLevel}).

Current Difficulty Level: ${context.currentDifficulty}
Session ID: ${context.sessionId}

Conversation History:
${conversationContext}

Student's Latest Response: "${studentResponse}"

Study Mode Rules:
1. NEVER give direct answers
2. Use Socratic questioning to guide discovery
3. Provide hints when students are stuck
4. Ask follow-up questions to deepen understanding
5. Adapt difficulty based on student performance
6. Offer practice problems when appropriate
7. Encourage critical thinking

Analyze the student's response and provide:
1. A guiding response (question, hint, or encouragement)
2. Classify your response type
3. Adjust difficulty if needed
4. Estimate learning progress (0-100)
5. Decide if practice problems should be offered

Respond in JSON format with keys: response, questionType, nextDifficulty, progressIndicator, shouldOfferPractice
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
              content: 'You are ChatGPT Study Mode. Guide through Socratic questioning. Never give direct answers. Always respond in valid JSON.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.6,
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
        return {
          response: "That's an interesting thought! Can you tell me more about how you arrived at that conclusion?",
          questionType: 'guiding' as const,
          nextDifficulty: context.currentDifficulty,
          progressIndicator: 50,
          shouldOfferPractice: false
        };
      }
    } catch (error) {
      console.error('Error processing student response:', error);
      throw error;
    }
  }

  static async generatePracticeProblems(
    subject: string,
    topic: string,
    difficulty: string,
    count: number = 3
  ): Promise<Array<{
    question: string;
    hints: string[];
    guidingQuestions: string[];
  }>> {
    const apiKey = this.getApiKey();
    if (!apiKey) {
      throw new Error('OpenAI API key not found');
    }

    const prompt = `
Generate ${count} practice problems for ${subject} - ${topic} at ${difficulty} level.

For each problem, provide:
1. The question/scenario
2. 3 progressive hints (without giving the answer)
3. 2-3 guiding questions to help students think through the solution

Remember: This is Study Mode - we guide discovery, not provide answers.

Respond in JSON format as an array of objects with keys: question, hints, guidingQuestions
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
              content: 'You are an educational content creator for Study Mode. Create practice problems that guide discovery through hints and questions. Respond only in valid JSON.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.8,
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
        return [{
          question: `Let's explore ${topic}. Can you think of a real-world example where this concept applies?`,
          hints: [
            "Think about situations you encounter daily",
            "Consider how this concept might solve a problem",
            "What examples have you seen in class or textbooks?"
          ],
          guidingQuestions: [
            "What makes this example relevant to the concept?",
            "How would you explain this to a friend?"
          ]
        }];
      }
    } catch (error) {
      console.error('Error generating practice problems:', error);
      throw error;
    }
  }
}

export { StudyModeService };