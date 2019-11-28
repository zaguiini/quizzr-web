import shortId from 'short-uuid'
import axios, { CancelTokenSource } from 'axios'

interface FetchQuiz {
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

export const fetchQuiz = async ({ cancellationToken }: FetchQuiz) => {
  const url = `${process.env.REACT_APP_API_URL}?amount=10&difficulty=easy&type=boolean`
  const { data } = await axios.get<APIResponse>(url, {
    cancelToken: cancellationToken.token,
  })

  return data
}
