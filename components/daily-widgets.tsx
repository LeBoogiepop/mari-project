import QuestionOfTheDay from "./question-of-the-day"
import DailyChallengeGenerator from "./daily-challenge-generator"

export default function DailyWidgets() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <QuestionOfTheDay />
      <DailyChallengeGenerator />
    </div>
  )
}
