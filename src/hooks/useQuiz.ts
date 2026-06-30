'use client'

import { useState, useCallback } from 'react'

/**
 * Hook para gerenciar o estado do quiz
 * Centraliza toda a lógica de estado em um lugar
 */

export type QuizState = 'opening' | 'quiz' | 'form' | 'result'
export type AlternativeKey = 'A' | 'B' | 'C' | 'D'

interface UseQuizReturn {
  // Estado
  quizState: QuizState
  currentQuestion: number
  answers: Record<number, AlternativeKey>
  score: number

  // Ações
  startQuiz: () => void
  selectOption: (questionId: number, key: AlternativeKey) => void
  nextQuestion: (totalQuestions: number, onFinish: () => void) => void
  previousQuestion: () => void
  submitForm: (score: number) => void
  showResult: () => void
  resetQuiz: () => void
}

export function useQuiz(): UseQuizReturn {
  const [quizState, setQuizState] = useState<QuizState>('opening')
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, AlternativeKey>>({})
  const [score, setScore] = useState(0)

  const startQuiz = useCallback(() => {
    setQuizState('quiz')
    setCurrentQuestion(0)
    setAnswers({})
    setScore(0)
  }, [])

  const selectOption = useCallback((questionId: number, key: AlternativeKey) => {
    setAnswers((prev) => ({ ...prev, [questionId]: key }))
  }, [])

  const nextQuestion = useCallback((
    totalQuestions: number,
    onFinish: () => void
  ) => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion((prev) => prev + 1)
    } else {
      onFinish()
    }
  }, [currentQuestion])

  const previousQuestion = useCallback(() => {
    setCurrentQuestion((prev) => Math.max(0, prev - 1))
  }, [])

  const submitForm = useCallback((finalScore: number) => {
    setScore(finalScore)
  }, [])

  const showResult = useCallback(() => {
    setQuizState('result')
  }, [])

  const resetQuiz = useCallback(() => {
    setQuizState('opening')
    setCurrentQuestion(0)
    setAnswers({})
    setScore(0)
  }, [])

  return {
    quizState,
    currentQuestion,
    answers,
    score,
    startQuiz,
    selectOption,
    nextQuestion,
    previousQuestion,
    submitForm,
    showResult,
    resetQuiz,
  }
}
