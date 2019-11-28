import { useHistory } from 'react-router-dom'
import shortId from 'short-uuid'
import React from 'react'
import get from 'lodash/get'
import { useStoreState, useStoreActions } from 'store/store'
import { QuizQuestion } from 'store/types'

interface UseQuiz {
  id?: string
}

export const useQuiz = ({ id }: UseQuiz = {}) => {
  const setAnswer = useStoreActions((store) => store.quizzes.setAnswer)

  const { questions, ongoingQuiz } = useStoreState((state) => ({
    questions: get(
      state,
      `quizzes.history.${id || state.ongoingQuiz}.data.questions`,
      []
    ) as QuizQuestion[],
    ongoingQuiz: (id || state.ongoingQuiz) as string,
  }))

  const currentQuestion = React.useMemo(() => {
    const index = questions.findIndex(
      (question) => question.answer === undefined
    )

    return {
      index,
      question: index === -1 ? '' : questions[index].question,
    }
  }, [questions])

  const totalQuestions = React.useMemo(() => questions.length, [questions])

  const progress =
    currentQuestion.index === -1
      ? 100
      : Math.floor(currentQuestion.index + 1 / totalQuestions) * totalQuestions

  const registerAnswer = React.useCallback(
    (answer: boolean) => {
      setAnswer({
        quizId: ongoingQuiz,
        questionId: currentQuestion.index,
        answer,
      })
    },
    [setAnswer, ongoingQuiz, currentQuestion.index]
  )

  const rightAnswers = React.useMemo(
    () =>
      questions.reduce((curr, next) => {
        if (next.answer === next.correctAnswer) {
          return curr + 1
        }

        return curr
      }, 0),
    [questions]
  )

  return {
    isValid: questions.length !== 0,
    isFinished: currentQuestion.index === -1,
    questions,
    ongoingQuiz,
    currentQuestion,
    totalQuestions,
    rightAnswers,
    registerAnswer,
    progress,
  }
}

export const useActionHandlers = () => {
  const ongoingQuiz = useStoreState((store) => store.ongoingQuiz)
  const setOngoingQuiz = useStoreActions((store) => store.setOngoingQuiz)
  const history = useHistory()

  const startQuiz = () => {
    const quiz = shortId.generate()
    setOngoingQuiz(quiz)
    history.push(`/quiz/${quiz}`)
  }

  const resumeQuiz = () => {
    history.push(`/quiz/${ongoingQuiz}`)
  }

  return {
    startQuiz,
    resumeQuiz,
  }
}
