import shortId from 'short-uuid'
import axios, { CancelTokenSource } from 'axios'

export enum QuizDifficulty {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
}

interface FetchQuiz {
  difficulty: QuizDifficulty
  cancellationToken: CancelTokenSource
}

interface APIResponseQuestion {
  correct_answer: 'False' | 'True'
  question: string
}

interface APIResponse {
  response_code: number
  results: APIResponseQuestion[]
}

export const transformQuizQuestion = ({
  question,
  correct_answer,
}: APIResponseQuestion) => ({
  id: shortId.generate(),
  question,
  correctAnswer: correct_answer === 'True',
})

export const fetchQuiz = async ({
  difficulty,
  cancellationToken,
}: FetchQuiz) => {
  const url = `${process.env.REACT_APP_API_URL}?amount=10&difficulty=${difficulty}&type=boolean`
  const { data } = await axios.get<APIResponse>(url, {
    cancelToken: cancellationToken.token,
  })

  return data
}
