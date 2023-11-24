const BASE_URL = 'http://localhost:5001';

// Function to fetch the high score from the backend
export const fetchHighScore = async () => {
  try {
    const response = await fetch(`${BASE_URL}/scores/highscore`);
    const data = await response.json();
    return data.highscore;
  } catch (error) {
    console.error('Error fetching high score:', error);
    throw error;
  }
};

export const saveScore = async (score) => {
  try {
    const response = await fetch(`${BASE_URL}/scores`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ score }),
    });

    const data = await response.json();
    if (!data.success) {
      console.error('Error saving score:', data.error);
      throw new Error(data.error);
    }
  } catch (error) {
    console.error('Error saving score:', error);
    throw error;
  }
};
