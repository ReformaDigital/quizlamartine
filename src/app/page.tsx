'use client'

import { useState, useEffect, Suspense } from 'react'
import {
  OpeningScreen,
  QuizLayout,
  ConversationPanel,
  LeadForm,
  ResultScreen,
  AssessmentShell,
  LiveReportPanel,
  LoadingScreen,
} from '@/components'
import { quizData, type AlternativeKey, calculateScore, getResultByScore } from '@/data/quiz'

// Estados do quiz
type QuizState = 'opening' | 'quiz' | 'form' | 'result'

function QuizPage() {
  // Estado principal
  const [quizState, setQuizState] = useState<QuizState>('opening')
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, AlternativeKey>>({})
  const [committedAnswers, setCommittedAnswers] = useState<Record<number, AlternativeKey>>({})
  const [score, setScore] = useState(0)
  const [userName, setUserName] = useState('')

  const totalQuestions = quizData.questions.length
  const selectedOption = answers[quizData.questions[currentQuestion]?.id] || null

  // Calcular score parcial apenas com respostas já confirmadas (após "Próxima")
  const partialScore = calculateScore(committedAnswers)
  const resultLevel = getResultByScore(partialScore)

  // Scroll to top nas mudanças de estado
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [quizState, currentQuestion])

  // Handlers
  const handleStart = (name: string = '') => {
    if (name) setUserName(name)
    setQuizState('quiz')
  }

  const handleSelectOption = (key: AlternativeKey) => {
    const questionId = quizData.questions[currentQuestion].id
    setAnswers((prev: Record<number, AlternativeKey>) => ({ ...prev, [questionId]: key }))
  }

  const handleNext = () => {
    // Confirma a resposta atual antes de avançar (score só conta após "Próxima")
    const currentQuestionId = quizData.questions[currentQuestion].id
    const currentSelected = answers[currentQuestionId]
    if (currentSelected) {
      setCommittedAnswers((prev: Record<number, AlternativeKey>) => ({ ...prev, [currentQuestionId]: currentSelected }))
    }

    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion((prev: number) => prev + 1)
    } else {
      // Finalizar quiz - calcular pontuação com base nas respostas confirmadas
      const finalAnswers = currentSelected
        ? { ...committedAnswers, [currentQuestionId]: currentSelected }
        : committedAnswers
      const finalScore = calculateScore(finalAnswers)
      setScore(finalScore)
      setQuizState('form')
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev: number) => Math.max(0, prev - 1))
    }
  }

  const handleFormSubmitSuccess = () => {
    setQuizState('result')
  }

  const handleNameChange = (name: string) => {
    setUserName(name)
  }

  // Renderização condicional
  const renderContent = () => {
    switch (quizState) {
      case 'opening':
        return <OpeningScreen onStart={handleStart} />

      case 'quiz':
        return (
          <AssessmentShell
            leftContent={
              <ConversationPanel
                currentQuestion={currentQuestion}
                totalQuestions={totalQuestions}
                selectedOption={selectedOption}
                userName={userName}
                onSelectOption={handleSelectOption}
                onNext={handleNext}
                onPrevious={handlePrevious}
              />
            }
            rightContent={
              <LiveReportPanel
                currentQuestion={currentQuestion + 1}
                totalQuestions={totalQuestions}
                score={partialScore}
                level={currentQuestion === totalQuestions - 1 && selectedOption ? resultLevel.title : ''}
                userName={userName}
                answers={answers}
                isComplete={false}
              />
            }
          />
        )

      case 'form':
        return (
          <div className="animate-fade-in">
            <LeadGate
              score={score}
              onSubmitSuccess={handleFormSubmitSuccess}
              userName={userName}
              onNameChange={handleNameChange}
            />
          </div>
        )

      case 'result':
        return (
          <div className="space-y-10 animate-slide-up">
            <ResultScreen score={score} userName={userName} />
          </div>
        )

      default:
        return null
    }
  }

  return <QuizLayout>{renderContent()}</QuizLayout>
}

// Componente LeadGate para manter compatibilidade com imports
function LeadGate(props: {
  score: number
  onSubmitSuccess: () => void
  userName: string
  onNameChange: (name: string) => void
}) {
  return <LeadForm {...props} />
}

// Componente com Suspense para permitir streaming
export default function Page() {
  return (
    <Suspense fallback={<LoadingScreen text="Preparando seu teste..." />}>
      <QuizPage />
    </Suspense>
  )
}
