const express = require('express')
const app = express()

// Mock trivia questions
const triviaQuestions = [
    { id: 1, question: 'What is the capital of France?', options: ['Paris', 'London', 'Rome', 'New York'], answer: 'Paris' },
    { id: 2, question: 'What is the largest planet in our Solar System?', options: ['Mars', 'Jupiter', 'Saturn', 'Earth'], answer: 'Jupiter' },
    { id: 3, question: 'Who wrote Romeo and Juliet?', options: ['William Shakespeare', 'Charles Dickens', 'J.K. Rowling', 'Mark Twain'], answer: 'William Shakespeare' },
    { id: 4, question: 'On his talk show “Maury,” host Maury Povich famously says to some of his guests “you are NOT” what?', options: ['Him', 'The father', 'old enough', 'cute'], answer: 'The father' },
    { id: 5, question: 'Paleontologists believe that which of these prehistoric animals were likely covered in feathers?', options: ['VELOCIRAPTOR', 'T-REX ', 'Shark', 'Alligator'], answer: 'VELOCIRAPTOR' },
    { id: 6, question: 'What is the highest-grossing film of all time, not adjusted for inflation?', options: ['Avengers: Endgame', 'Harry Potter the Deathly Hallows', 'Star Wars; Revenge of the Sith', 'Batman'], answer: 'Avengers: Endgame' },
    { id: 7, question: 'A blacksmith works primarily with what metal?', options: ['Iron', 'Gold ', 'Coal', 'Ruby'], answer: 'Iron' },
    { id: 8, question: 'On the children’s TV “Dora the Explorer,” Dora’s best friend Boots is what kind of animal?', options: ['Dog', 'Cat ', 'monkey', 'bird'], answer: 'monkey' },
    { id: 9, question: '7-Eleven stores were temporarily converted into Kwik E-marts to promote the release of what movie?', options: ['Simpsons', 'Star Wars ', 'James Bond', 'Lost in Paris'], answer: 'Simpsons' },
    { id: 10, question: 'In the classic animated movie “The Little Mermaid,” Ariel’s best friend is a fish named what?', options: ['Kermit', 'Crabby ', 'Susie', 'flounder'], answer: 'flounder' },
    { id: 11, question: 'In the board game Risk,what continent has the most territories for a player to occupy?', options: ['Asia', 'North America ', 'South America', 'Europe'], answer: 'Asia' },
    { id: 12, question: 'In the U.S. military, a “Black Hawk: refers to what type of vehicle?', options: ['Helicopter', 'Plane ', 'Truck', 'Car'], answer: 'Helicopter' },
    { id: 13, question: 'On the classic TV series “The Brady Bunch,”what is the name of the Brady family dog?', options: ['Tiger', 'Bear ', 'Buddy', 'Martin'], answer: 'Tiger' },
    { id: 14, question: 'On December 21, 1864, General Sherman’s famous “March to the Sea” concluded with the capture of what Southern city?', options: ['Little Rock', 'ATLANTA ', 'SAVANNAH', 'NEW ORLEANS'], answer: 'SAVANNAH' },
    { id: 15, question: 'Who is awesome?', options: ['Will', 'Charles ', 'Phil', 'Dan'], answer: 'Phil' },

    //https://opentdb.com/api.php?amount=5&category=21&difficulty=medium&type=multiple alternative option for importing questions but working through bugs
];

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
  }


// Route to get trivia questions
app.get('/api/questions', (req, res) => {
    shuffleArray(triviaQuestions);
    res.json(triviaQuestions.slice(0, 25));
});

app.listen(5000, () => {
    console.log("Server started on port 5000")
});
