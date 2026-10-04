const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// 1. Student Dataset
const STUDENTS = [
  { id: 1, name: "A. K. Dyuti", gender: "Girl", glasses: "Yes", house: "Y", commute_type: "W", sport_events: "N", hair_type: "Wavy", prefect: "N" },
  { id: 2, name: "Aarav Prem Kumar", gender: "Boy", glasses: "Yes", house: "B", commute_type: "W", sport_events: "N", hair_type: "Normal", prefect: "N" },
  { id: 3, name: "Aarika Sarkar", gender: "Girl", glasses: "Yes", house: "G", commute_type: "B", sport_events: "N", hair_type: "Straight", prefect: "N" },
  { id: 4, name: "Aarna Vijayvargia", gender: "Girl", glasses: "Yes", house: "B", commute_type: "B", sport_events: "N", hair_type: "Straight", prefect: "Y" },
  { id: 5, name: "Aishi Dutta", gender: "Girl", glasses: "No", house: "Y", commute_type: "B", sport_events: "Y", hair_type: "Straight", prefect: "N" },
  { id: 6, name: "Aniket Mishra", gender: "Boy", glasses: "No", house: "G", commute_type: "B", sport_events: "N", hair_type: "Straight", prefect: "N" },
  { id: 7, name: "Anirudh Sreejith", gender: "Boy", glasses: "No", house: "Y", commute_type: "W", sport_events: "N", hair_type: "Curly", prefect: "N" },
  { id: 8, name: "Anmol Gupta", gender: "Boy", glasses: "Yes", house: "R", commute_type: "B", sport_events: "N", hair_type: "Curly", prefect: "N" },
  { id: 9, name: "Arsh Sachdeva", gender: "Boy", glasses: "Yes", house: "Y", commute_type: "B", sport_events: "N", hair_type: "Normal", prefect: "N" },
  { id: 10, name: "Aryansh Bhadauria", gender: "Boy", glasses: "No", house: "G", commute_type: null, sport_events: "Y", hair_type: "Straight", prefect: "N" },
  { id: 11, name: "Avanika Raj", gender: "Girl", glasses: "Yes", house: "R", commute_type: null, sport_events: "Y", hair_type: "Wavy", prefect: "Y" },
  { id: 12, name: "Avni Anoop", gender: "Girl", glasses: "No", house: "Y", commute_type: null, sport_events: "N", hair_type: "Wavy", prefect: "N" },
  { id: 13, name: "Deekshitaa Muthusamy", gender: "Girl", glasses: "Yes", house: "Y", commute_type: null, sport_events: "Y", hair_type: "Wavy", prefect: "Y" },
  { id: 14, name: "Jayant Mathur", gender: "Boy", glasses: "Yes", house: "B", commute_type: null, sport_events: "N", hair_type: "Normal", prefect: "N" },
  { id: 15, name: "Krisha Arunkumar", gender: "Girl", glasses: "No", house: "R", commute_type: null, sport_events: "Y", hair_type: "Curly", prefect: "N" },
  { id: 16, name: "Mishka Bhargava", gender: "Girl", glasses: "No", house: "B", commute_type: null, sport_events: "Y", hair_type: "Straight", prefect: "N" },
  { id: 17, name: "Md Areeb", gender: "Boy", glasses: "Yes", house: "G", commute_type: "W", sport_events: "N", hair_type: "Normal", prefect: "N" },
  { id: 18, name: "Rishaan", gender: "Boy", glasses: "No", house: "B", commute_type: "B", sport_events: "N", hair_type: "Normal", prefect: "N" },
  { id: 19, name: "Ronit Kapoor", gender: "Boy", glasses: "Yes", house: "G", commute_type: null, sport_events: "Y", hair_type: "Normal", prefect: "N" },
  { id: 20, name: "Sahil", gender: "Boy", glasses: "No", house: "B", commute_type: "W", sport_events: "Y", hair_type: "Normal", prefect: "N" },
  { id: 21, name: "Sai Shreshta Dabbiru", gender: "Girl", glasses: "No", house: "G", commute_type: "W", sport_events: "N", hair_type: "Wavy", prefect: "N" },
  { id: 22, name: "Saksham Rastogi", gender: "Boy", glasses: "No", house: "Y", commute_type: "B", sport_events: "N", hair_type: "Normal", prefect: "N" },
  { id: 23, name: "Sattwik Sen", gender: "Boy", glasses: "Yes", house: "Y", commute_type: "W", sport_events: "N", hair_type: "Normal", prefect: "N" },
  { id: 24, name: "Shivika Sharma", gender: "Girl", glasses: "No", house: "G", commute_type: null, sport_events: "N", hair_type: "Wavy", prefect: "N" },
  { id: 25, name: "Shlok Gupta", gender: "Boy", glasses: "No", house: "B", commute_type: "W", sport_events: "Y", hair_type: "Curly", prefect: "N" },
  { id: 26, name: "Sriram Alwala", gender: "Boy", glasses: "Yes", house: "R", commute_type: null, sport_events: "N", hair_type: "Curly", prefect: "N" },
  { id: 27, name: "Tasmai Rajamanya", gender: "Girl", glasses: "Yes", house: "B", commute_type: null, sport_events: "N", hair_type: "Wavy", prefect: "N" },
  { id: 28, name: "Toshani Mohapatra", gender: "Girl", glasses: "Yes", house: "B", commute_type: null, sport_events: "N", hair_type: "Wavy", prefect: "N" },
  { id: 29, name: "Vidhip Singh", gender: "Boy", glasses: "Yes", house: "B", commute_type: "W", sport_events: "N", hair_type: "Normal", prefect: "N" },
  { id: 30, name: "Yashita Singh", gender: "Girl", glasses: "Yes", house: "G", commute_type: null, sport_events: "N", hair_type: "Wavy", prefect: "N" }
];

// 2. Questions Mapping
const QUESTIONS = [
  { id: 0, key: "gender", value: "Boy", text: "Is your person a Boy?" },
  { id: 1, key: "glasses", value: "Yes", text: "Does this person wear glasses?" },
  { id: 2, key: "prefect", value: "Y", text: "Is this person a Prefect?" },
  { id: 3, key: "sport_events", value: "Y", text: "Does this person participate in school sports events?" },
  { id: 4, key: "commute_type", value: "W", text: "Does this person walk to school?" },
  { id: 5, key: "hair_type", value: "Straight", text: "Does this person have straight hair?" },
  { id: 6, key: "house", value: "Y", text: "Is this person in Yellow House?" },
  { id: 7, key: "house", value: "G", text: "Is this person in Green House?" },
  { id: 8, key: "house", value: "B", text: "Is this person in Blue House?" }
];

// Context Extraction Helper
function getContext(req, contextName) {
  const contexts = req.body.queryResult?.outputContexts || [];
  return contexts.find(c => c.name.endsWith(`/contexts/${contextName}`));
}

app.post('/webhook', (req, res) => {
  const action = req.body.queryResult.action;

  // 1. GAME START
  if (action === 'game_start') {
    return res.json({
      fulfillmentText: `Think of any student in 10D! I will try to guess who it is.\n\n${QUESTIONS[0].text}`,
      outputContexts: [
        {
          name: `${req.body.session}/contexts/game_state`,
          lifespanCount: 15,
          parameters: {
            candidateIds: STUDENTS.map(s => s.id),
            askedQuestionIds: [0], // Track questions already asked
            currentQId: 0
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
    const rawUserAnswer = (req.body.queryResult.parameters.user_answer || '').toLowerCase().trim();
    const isYes = ['yes', 'y', 'yeah', 'true'].includes(rawUserAnswer);

    // Extract Context Data securely
    const rawCandidateIds = params.candidateIds || params.candidateids;
    const candidateIds = Array.isArray(rawCandidateIds) ? rawCandidateIds : STUDENTS.map(s => s.id);

    const askedIds = params.askedQuestionIds || params.askedquestionids || [0];
    const currentQId = params.currentQId !== undefined ? params.currentQId : (params.currentqid || 0);

    let candidates = STUDENTS.filter(s => candidateIds.includes(s.id));
    const currentQ = QUESTIONS.find(q => q.id === currentQId) || QUESTIONS[0];

    // Filter Candidates Based on Exact Current Question
    if (isYes) {
      candidates = candidates.filter(s => s[currentQ.key] === currentQ.value);
    } else {
      candidates = candidates.filter(s => s[currentQ.key] !== currentQ.value);
    }

    // --- GAME END CONDITIONS ---

    // 1 candidate remaining -> WIN
    if (candidates.length === 1) {
      return res.json({
        fulfillmentText: `Is your person **${candidates[0].name}**?`,
        outputContexts: [{ name: `${req.body.session}/contexts/game_state`, lifespanCount: 0 }]
      });
    }

    // 0 candidates remaining -> NO MATCH
    if (candidates.length === 0) {
      return res.json({
        fulfillmentText: "Hmm, I couldn't find anyone matching those answers! Are you sure about all the traits?",
        outputContexts: [{ name: `${req.body.session}/contexts/game_state`, lifespanCount: 0 }]
      });
    }

    // --- SELECT NEXT BEST QUESTION ---
    // Pick unasked question that best splits the remaining candidates
    const availableQuestions = QUESTIONS.filter(q => !askedIds.includes(q.id));

    if (availableQuestions.length === 0) {
      const names = candidates.map(c => c.name).join(", ");
      return res.json({
        fulfillmentText: `I couldn't narrow it down to just one person, but is it one of these: ${names}?`,
        outputContexts: [{ name: `${req.body.session}/contexts/game_state`, lifespanCount: 0 }]
      });
    }

    // Find question closest to 50/50 split of remaining candidates
    let nextQuestion = availableQuestions[0];
    let bestDiff = candidates.length;

    for (const q of availableQuestions) {
      const yesCount = candidates.filter(s => s[q.key] === q.value).length;
      const diff = Math.abs(yesCount - (candidates.length / 2));
      if (diff < bestDiff) {
        bestDiff = diff;
        nextQuestion = q;
      }
    }

    // Update asked list
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

  return res.json({ fulfillmentText: "I'm ready! Say 'Start game' to play." });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});