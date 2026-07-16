function Results({ gameData }) {
    const winnerName = gameData.winnerName;
    const questions = gameData.questions;
    const tie = winnerName ? false : true;
    const initial = winnerName ? winnerName.charAt(0) : "";
    return (
        <div className="min-h-screen w-screen flex flex-col items-center bg-gray-200 text-center">
            <div className="h-screen flex flex-col items-center justify-center">
                {tie ? (
                    <div className="flex flex-col items-center">
                        <h1 className="text-4xl font-bold text-gray-800 mb-2">It’s a Tie!</h1>
                        <p className="text-xl text-gray-800">Both players performed .</p>
                    </div>
                ) : (
                    <div className="flex flex-col items-center">
                        <div className="w-32 h-32 bg-blue-300 rounded-full flex items-center justify-center shadow-md mb-6">
                            <span className="text-5xl font-bold text-black">{initial}</span>
                        </div>
                        <h1 className="text-4xl font-bold text-gray-800 mb-1">{winnerName}</h1>
                        <p className="text-xl text-gray-800">has won the game!</p>
                    </div>
                )}
                <p className="text-md text-gray-500 pt-1">Scroll down for answers</p>
            </div>

            <div className="min-h-screen flex flex-col items-center justify-start pt-20">
                <h2 className="text-3xl font-semibold text-gray-800 mb-6">Answers</h2>
                {questions.map((q, qi) => (
                    <div key={qi}>
                        {Array.isArray(q.options)
                            ? q.options.map(
                                (opt, oi) =>
                                    opt === q.correct_answer && (
                                        <h3 key={oi} className="text-lg">
                                            {qi + 1}. {q.question} <span className="text-green-600 font-semibold">Answer: {opt}</span>
                                        </h3>
                                    )
                            )
                            : null}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Results;
