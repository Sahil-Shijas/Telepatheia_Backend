const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const dialogflow = require('@google-cloud/dialogflow');

const app = express();
app.use(bodyParser.json());
app.use(express.static(__dirname));

// Initialize Dialogflow Client using environment variables or key.json
let sessionClient;
if (process.env.GOOGLE_CREDENTIALS) {
  const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS);
  sessionClient = new dialogflow.SessionsClient({ credentials });
} else {
  sessionClient = new dialogflow.SessionsClient({
    keyFilename: path.join(__dirname, 'key.json')
  });
}

const PROJECT_ID = 'telepatheia-10d-awhu';

// Serve frontend page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Proxy endpoint for index.html chat frontend
app.post('/api/chat', async (req, res) => {
  const { message, sessionId } = req.body;
  const currentSessionId = sessionId || 'session-' + Date.now();

  const sessionPath = sessionClient.projectAgentSessionPath(PROJECT_ID, currentSessionId);

  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: message,
        languageCode: 'en',
      },
    },
  };

  // Trigger 'game_start' intent/event directly when user starts a game
  if (message.toLowerCase().includes('start')) {
    request.queryInput = {
      event: {
        name: 'game_start',
        languageCode: 'en',
      },
    };
  }

  try {
    const responses = await sessionClient.detectIntent(request);
    const result = responses[0].queryResult;

    res.json({
      fulfillmentText: result.fulfillmentText || 'No response received from agent.',
      outputContexts: result.outputContexts || []
    });
  } catch (error) {
    console.error('Dialogflow API Error:', error);
    res.status(500).json({ fulfillmentText: 'Error connecting to Dialogflow agent.' });
  }
});

// 1. Student Dataset
const STUDENTS = [
  { id: 1, name: "A. K. Dyuti", gender: "Girl", glasses: "Yes", house: "Y", commute_type: "W", sport_events: "N", hair_type: "Wavy", prefect: "N", stream: "NEET" },
  { id: 2, name: "Aarav Prem Kumar", gender: "Boy", glasses: "Yes", house: "B", commute_type: "W", sport_events: "N", hair_type: "Normal", prefect: "N", stream: "NEET"  },
  { id: 3, name: "Aarika Sarkar", gender: "Girl", glasses: "Yes", house: "G", commute_type: "B", sport_events: "N", hair_type: "Straight", prefect: "N", stream: "NEET"  },
  { id: 4, name: "Aarna Vijayvargia", gender: "Girl", glasses: "Yes", house: "B", commute_type: "B", sport_events: "N", hair_type: "Straight", prefect: "Y", stream: "JEE"  },
  { id: 5, name: "Aishi Dutta", gender: "Girl", glasses: "No", house: "Y", commute_type: "B", sport_events: "Y", hair_type: "Straight", prefect: "N", stream: "JEE"  },
  { id: 6, name: "Aniket Mishra", gender: "Boy", glasses: "No", house: "G", commute_type: "B", sport_events: "N", hair_type: "Straight", prefect: "N", stream: "JEE"  },
  { id: 7, name: "Anirudh Sreejith", gender: "Boy", glasses: "No", house: "Y", commute_type: "B", sport_events: "N", hair_type: "Curly", prefect: "N", stream: "JEE" },
  { id: 8, name: "Anmol Gupta", gender: "Boy", glasses: "Yes", house: "R", commute_type: "W", sport_events: "N", hair_type: "Curly", prefect: "N", stream: "JEE" },
  { id: 9, name: "Arsh Sachdeva", gender: "Boy", glasses: "Yes", house: "Y", commute_type: "B", sport_events: "N", hair_type: "Normal", prefect: "N", stream: "Commerce" },
  { id: 10, name: "Aryansh Bhadauria", gender: "Boy", glasses: "No", house: "G", commute_type: "B", sport_events: "Y", hair_type: "Straight", prefect: "N", stream: "JEE"  },
  { id: 11, name: "Avanika Raj", gender: "Girl", glasses: "Yes", house: "R", commute_type: "B", sport_events: "Y", hair_type: "Wavy", prefect: "Y", stream: "JEE" },
  { id: 12, name: "Avni Anoop", gender: "Girl", glasses: "No", house: "Y", commute_type: "B", sport_events: "N", hair_type: "Wavy", prefect: "N", stream: "Humanities" },
  { id: 13, name: "Deekshitaa Muthusamy", gender: "Girl", glasses: "Yes", house: "Y", commute_type: "B", sport_events: "Y", hair_type: "Wavy", prefect: "Y", stream: "NEET" },
  { id: 14, name: "Jayant Mathur", gender: "Boy", glasses: "Yes", house: "B", commute_type: "B", sport_events: "N", hair_type: "Normal", prefect: "N", stream: "JEE" },
  { id: 15, name: "Krisha Arunkumar", gender: "Girl", glasses: "No", house: "R", commute_type: "B", sport_events: "Y", hair_type: "Curly", prefect: "N", stream: "JEE" },
  { id: 16, name: "Mishka Bhargava", gender: "Girl", glasses: "No", house: "B", commute_type: "B", sport_events: "Y", hair_type: "Straight", prefect: "N", stream: "Architecture/Design" },
  { id: 17, name: "Md Areeb", gender: "Boy", glasses: "Yes", house: "G", commute_type: "W", sport_events: "N", hair_type: "Normal", prefect: "N", stream: "JEE" },
  { id: 18, name: "Rishaan", gender: "Boy", glasses: "No", house: "B", commute_type: "B", sport_events: "N", hair_type: "Normal", prefect: "N", stream: "NEET" },
  { id: 19, name: "Ronit Kapoor", gender: "Boy", glasses: "Yes", house: "G", commute_type: "B", sport_events: "Y", hair_type: "Normal", prefect: "N", stream: "Law/CLAT" },
  { id: 20, name: "Sahil", gender: "Boy", glasses: "No", house: "B", commute_type: "W", sport_events: "Y", hair_type: "Normal", prefect: "N", stream: "JEE" },
  { id: 21, name: "Sai Shreshta Dabbiru", gender: "Girl", glasses: "No", house: "G", commute_type: "W", sport_events: "N", hair_type: "Wavy", prefect: "N", stream: "NEET" },
  { id: 22, name: "Saksham Rastogi", gender: "Boy", glasses: "No", house: "Y", commute_type: "B", sport_events: "N", hair_type: "Normal", prefect: "N", stream: "JEE" },
  { id: 23, name: "Sattwik Sen", gender: "Boy", glasses: "Yes", house: "Y", commute_type: "W", sport_events: "N", hair_type: "Normal", prefect: "N", stream: "NEET" },
  { id: 24, name: "Shivika Sharma", gender: "Girl", glasses: "No", house: "G", commute_type: "B", sport_events: "N", hair_type: "Wavy", prefect: "N", stream: null },
  { id: 25, name: "Shlok Gupta", gender: "Boy", glasses: "No", house: "B", commute_type: "W", sport_events: "Y", hair_type: "Curly", prefect: "N", stream: "JEE" },
  { id: 26, name: "Sriram Alwala", gender: "Boy", glasses: "Yes", house: "R", commute_type: "B", sport_events: "N", hair_type: "Curly", prefect: "N", stream: "JEE" },
  { id: 27, name: "Tasmai Rajamanya", gender: "Girl", glasses: "Yes", house: "B", commute_type: "B", sport_events: "N", hair_type: "Wavy", prefect: "N", stream: "Law/CLAT" },
  { id: 28, name: "Toshani Mohapatra", gender: "Girl", glasses: "Yes", house: "B", commute_type: "B", sport_events: "N", hair_type: "Wavy", prefect: "N", stream: "NEET" },
  { id: 29, name: "Vidhip Singh", gender: "Boy", glasses: "Yes", house: "B", commute_type: "W", sport_events: "N", hair_type: "Normal", prefect: "N", stream: "JEE" },
  { id: 30, name: "Yashita Singh", gender: "Girl", glasses: "Yes", house: "G", commute_type: "B", sport_events: "N", hair_type: "Wavy", prefect: "N", stream: "Architecture/Design" }
];

// 2. Comprehensive Pool of Questions
const QUESTIONS = [
  { id: 0, key: "gender", value: "Boy", text: "Is your person a Boy?" },
  { id: 1, key: "glasses", value: "Yes", text: "Does this person wear glasses?" },
  { id: 2, key: "prefect", value: "Y", text: "Is this person a Prefect?" },
  { id: 3, key: "sport_events", value: "Y", text: "Does this person participate in school sports events?" },
  { id: 4, key: "commute_type", value: "W", text: "Is your person a walkie?" },
  { id: 5, key: "commute_type", value: "B", text: "Does this person take the school bus?" },
  { id: 6, key: "hair_type", value: "Straight", text: "Does this person have straight hair?" },
  { id: 7, key: "hair_type", value: "Curly", text: "Does this person have curly hair?" },
  { id: 8, key: "hair_type", value: "Wavy", text: "Does this person have wavy hair?" },
  { id: 9, key: "house", value: "Y", text: "Is this person in Yellow House?" },
  { id: 10, key: "house", value: "G", text: "Is this person in Green House?" },
  { id: 11, key: "house", value: "B", text: "Is this person in Blue House?" },
  { id: 12, key: "house", value: "R", text: "Is this person in Red House?" },
  { id: 13, key: "stream", value: "JEE", text: "Did this person opt for JEE?"},
  { id: 14, key: "stream", value: "NEET", text: "Did this person opt for NEET?"},
  { id: 15, key: "stream", value: "Law/CLAT", text: "Did this person opt for Law/CLAT?"},
  { id: 16, key: "stream", value: "Architecture/Design", text: "Did this person opt for Architecture or Design?"},
  { id: 17, key: "stream", value: "Commerce", text: "Did this person opt for Commerce?"},
  { id: 18, key: "stream", value: "Humanities", text: "Did this person opt for Humanities?"}
];

// Helper to find question that splits candidates best (50/50 split)
function getBestNextQuestion(candidates, askedIds) {
  const availableQuestions = QUESTIONS.filter(q => !askedIds.includes(q.id));
  if (availableQuestions.length === 0) return null;

  let bestQuestion = null;
  let bestDifference = Infinity;

  for (const q of availableQuestions) {
    const yesCount = candidates.filter(s => s[q.key] === q.value).length;
    if (yesCount === 0 || yesCount === candidates.length) continue;

    const difference = Math.abs(yesCount - (candidates.length / 2));
    if (difference < bestDifference) {
      bestDifference = difference;
      bestQuestion = q;
    }
  }

  return bestQuestion || availableQuestions[0];
}

// Helper to extract context
function getContext(req, contextName) {
  const contexts = req.body.queryResult?.outputContexts || [];
  return contexts.find(c => c.name.endsWith(`/contexts/${contextName}`));
}

// Dialogflow Fulfillment Webhook
app.post('/webhook', (req, res) => {
  const action = req.body.queryResult?.action;

  // 1. GAME START
  if (action === 'game_start') {
    const initialCandidates = STUDENTS;
    const firstQ = getBestNextQuestion(initialCandidates, []);

    return res.json({
      fulfillmentText: `Think of any student in 10D! I will try to guess who it is.\n\n${firstQ.text}`,
      outputContexts: [
        {
          name: `${req.body.session}/contexts/game_state`,
          lifespanCount: 15,
          parameters: {
            candidateIds: initialCandidates.map(s => s.id),
            askedQuestionIds: [firstQ.id],
            currentQId: firstQ.id
          }
        }
      ]
    });
  }

  // 2. PROCESS ANSWER
  if (action === 'process_answer') {
    const gameState = getContext(req, 'game_state');

    if (!gameState) {
      return res.json({
        fulfillmentText: "Let's start fresh! Say 'Start game' to begin."
      });
    }

    const params = gameState.parameters;

    const paramVal = req.body.queryResult?.parameters?.user_answer || '';
    const rawText = req.body.queryResult?.queryText || '';
    const combinedInput = `${paramVal} ${rawText}`.toLowerCase();
    const yesPattern = /\b(yes|yeah|yep|yup|y|true|correct|sure|indeed)\b/i;
    const isYes = yesPattern.test(combinedInput);

    const rawCandidateIds = params.candidateIds || params.candidateids;
    const candidateIds = Array.isArray(rawCandidateIds) ? rawCandidateIds : STUDENTS.map(s => s.id);

    const askedIds = params.askedQuestionIds || params.askedquestionids || [];
    const currentQId = params.currentQId !== undefined ? params.currentQId : (params.currentqid || 0);

    let candidates = STUDENTS.filter(s => candidateIds.includes(s.id));
    const currentQ = QUESTIONS.find(q => q.id === currentQId) || QUESTIONS[0];

    if (isYes) {
      candidates = candidates.filter(s => s[currentQ.key] === currentQ.value);
    } else {
      candidates = candidates.filter(s => s[currentQ.key] !== currentQ.value);
    }

    if (candidates.length === 1) {
      return res.json({
        fulfillmentText: `Is your person **${candidates[0].name}**?`,
        outputContexts: [
          {
            name: `${req.body.session}/contexts/awaiting_guess_confirmation`,
            lifespanCount: 2
          },
          {
            name: `${req.body.session}/contexts/game_state`,
            lifespanCount: 0
          }
        ]
      });
    }

    if (candidates.length === 0) {
      return res.json({
        fulfillmentText: "Hmm, I couldn't find anyone matching those answers! Are you sure about all the traits?",
        outputContexts: [{ name: `${req.body.session}/contexts/game_state`, lifespanCount: 0 }]
      });
    }

    const nextQuestion = getBestNextQuestion(candidates, askedIds);

    if (!nextQuestion) {
      const names = candidates.map(c => c.name).join(", ");
      return res.json({
        fulfillmentText: `I couldn't narrow it down to just one person, but is it one of these: ${names}?`,
        outputContexts: [
          {
            name: `${req.body.session}/contexts/awaiting_guess_confirmation`,
            lifespanCount: 2
          },
          {
            name: `${req.body.session}/contexts/game_state`,
            lifespanCount: 0
          }
        ]
      });
    }

    const newAskedIds = [...askedIds, nextQuestion.id];

    return res.json({
      fulfillmentText: `Got it! (${candidates.length} candidates remaining)\n\n${nextQuestion.text}`,
      outputContexts: [
        {
          name: `${req.body.session}/contexts/game_state`,
          lifespanCount: 15,
          parameters: {
            candidateIds: candidates.map(c => c.id),
            askedQuestionIds: newAskedIds,
            currentQId: nextQuestion.id
          }
        }
      ]
    });
  }

  // 3. GUESS WAS CORRECT
  if (action === 'guess_correct') {
    return res.json({
      fulfillmentText: "Woohoo! I knew it! 🎉 Thanks for playing with me. Say 'Start game' whenever you want to play again!",
      outputContexts: [
        { name: `${req.body.session}/contexts/awaiting_guess_confirmation`, lifespanCount: 0 }
      ]
    });
  }

  // 4. GUESS WAS WRONG
  if (action === 'guess_incorrect') {
    return res.json({
      fulfillmentText: "Ah snap! You beat me this time! 😅 Check if all trait answers were exact. Say 'Start game' for a rematch!",
      outputContexts: [
        { name: `${req.body.session}/contexts/awaiting_guess_confirmation`, lifespanCount: 0 }
      ]
    });
  }

  return res.json({ fulfillmentText: "I'm ready! Say 'Start game' to play." });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});