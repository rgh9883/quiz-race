import { useState } from 'react';

function LobbyScreen({ gameId, gameData, isHost, startGame, setUploadedFile, handleGenerateQuiz, quizGen }) {
  if (!gameData) return;

  const isReady = gameData.joinerId !== null;

  const hostName = gameData.hostName;
  const joinerName = gameData.joinerName || 'Waiting for Opponent...';

  const [file, setFile] = useState(null);
  
  const handleFileChange = (e) => {
    const f = e.target.files[0];
    setFile(f);
    if (typeof setUploadedFile === 'function') setUploadedFile(f);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      
      <div className="flex flex-col">
      
      <h2 className='font-bold   text-4xl pb-3 text-center'>Game Code: {gameId}</h2>
      
      <div className='bg-blue-500 flex flex-col rounded-3xl'>
        <p className='text-2xl text-white font-semibold flex p-3 pl-6'>
          Host{isHost ? ' (You)' : ''}: {hostName}
        </p>
      </div>

      <div className='pb-2'></div>
      
      <div className='bg-red-500 flex flex-col rounded-3xl'>
        <p className='text-2xl text-white font-semibold font-normal flex p-3 pl-6'>
          Opponent{isHost ? '' : '(You)'}: {joinerName}
        </p>
      </div>

      <div className='p-8'></div>

      {isHost ? (
        <>
        <form onSubmit={(e) => e.preventDefault()}>
              <label className='text-2xl pr-5'htmlFor="documentUpload">Select a document:</label>
              <input
                type="file"
                id="documentUpload"
                name="document"
                accept=".pdf,.doc,.docx,.txt"
                onChange={handleFileChange}
              />
            </form>
          {!file ? (
            <div>
              <p className='text-l scale-100 text-gray-600'>Please upload a file</p>
            </div>
          ) : (
            <div>
              <p>File uploaded: {file.name}</p>
              <button className='bg-gray-300 hover:bg-gray-400' onClick={handleGenerateQuiz}>Generate Quiz from File (Gemini)</button>
            </div>
          )}
          <div class="pt-10">
            <button onClick={startGame} disabled={!isReady || !file || !quizGen} className='bg-gray-200 hover:bg-gray-400 text-2xl'>
              {isReady && file ? 'Start Game!' : 'Opponent has not Joined Yet or Quiz is not Generated'}
            </button>
          </div>
        </>
      ) : (
        <button disabled={!true} className='bg-gray-300 text-2xl border-0'>
                      Waiting on Host to start game
            </button>
      )}
      
      </div>
    
    </div>
  );
}

export default LobbyScreen;
