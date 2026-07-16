import { useEffect } from 'react';

function QuizRoute({ gameData, userId, getPlayerKey, submitAnswer }) {

  const playerKey = getPlayerKey();
  const curProgress = gameData[playerKey];
  const oppKey = playerKey === 'hostProgress' ? 'joinerProgress' : 'hostProgress';
  const oppProgress = gameData[oppKey];
  const questionObj = gameData.questions[curProgress.currentIndex];
  const totalQuestions = gameData.questions.length;

  const myPercent = Math.round((curProgress.correctCount / totalQuestions) * 100);
  const oppPercent = Math.round((oppProgress.correctCount / totalQuestions) * 100);

  const handleClick = (option) => {
    submitAnswer(option);
  }

  useEffect(() => {
    const handleKeyPress = (event) => {
      const index = Number(event.key) - 1;
      
      if (index >= 0 && index <= 3 && questionObj.options[index]) {
        event.preventDefault();
        handleClick(questionObj.options[index]);
      }
    };

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [questionObj.options]);

  return (
    <div className="h-screen w-screen flex flex-col justify-between bg-gray-200 text-white">
      {/* question */}
      <div className="bg-white text-black text-center py-6 px-4 shadow-md">
        <h1 className="text-3xl font-bold">Question {curProgress.currentIndex + 1}: {questionObj.question}</h1>
      </div>

      {/* answer buttons */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 grid-rows-2 gap-4 p-6">
        <button
          id="0"
          onClick={() => handleClick(questionObj.options[0])}
          className="bg-red-500 hover:bg-red-600 text-white text-3xl font-semibold rounded-xl flex items-center justify-center transition-transform transform hover:scale-105"
        >
          <div className="flex items-center w-full">
            <span className="bg-black/20 px-3 py-1 text-lg rounded mr-4">1</span>
            <span>{questionObj.options[0]}</span>
          </div>
        </button>
        <button
          id="1"
          onClick={() => handleClick(questionObj.options[1])}
          className="bg-orange-500 hover:bg-orange-600 text-white text-3xl font-semibold rounded-xl flex items-center justify-center transition-transform transform hover:scale-105"
        >
          <div className="flex items-center w-full">
            <span className="bg-black/20 px-3 py-1 text-lg rounded mr-4">2</span>
            <span>{questionObj.options[1]}</span>
          </div>
        </button>
        <button
          id="2"
          onClick={() => handleClick(questionObj.options[2])}
          className="bg-green-500 hover:bg-green-600 text-white text-3xl font-semibold rounded-xl flex items-center justify-center transition-transform transform hover:scale-105"
        >
          <div className="flex items-center w-full">
            <span className="bg-black/20 px-3 py-1 text-lg rounded mr-4">3</span>
            <span>{questionObj.options[2]}</span>
          </div>
        </button>
        <button
          id="3"
          onClick={() => handleClick(questionObj.options[3])}
          className="bg-blue-500 hover:bg-blue-600 text-white text-3xl font-semibold rounded-xl flex items-center justify-center transition-transform transform hover:scale-105"
        >
          <div className="flex items-center w-full">
            <span className="bg-black/20 px-3 py-1 text-lg rounded mr-4">4</span>
            <span>{questionObj.options[3]}</span>
          </div>
        </button>
      </div>

      {/* progress */}
      <div className="bg-white text-black p-6 text-lg">
        {/* your */}
        <p className="font-semibold mb-1">Your Progress: {myPercent}%</p>
        <div className="w-full h-5 bg-gray-300 rounded-full overflow-hidden mb-4">
          <div
            className="h-full bg-blue-500 transition-all duration-500"
            style={{ width: `${myPercent}%` }}
          ></div>
        </div>

        {/* opp */}
        <p className="font-semibold mb-1">Opponent Progress: {oppPercent}%</p>
        <div className="w-full h-5 bg-gray-300 rounded-full overflow-hidden">
          <div
            className="h-full bg-red-500 transition-all duration-500"
            style={{ width: `${oppPercent}%` }}
          ></div>
        </div>
      </div>

    </div>
  );
}

export default QuizRoute;