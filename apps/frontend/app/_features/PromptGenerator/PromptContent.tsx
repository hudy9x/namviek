import PromptTaskAllocation from './PromptTaskAllocation'
import PromptTaskEvaluation from './PromptTaskEvaluation'

export default function PromptContent({ type }: { type: string }) {
  if (type === 'TASK_ALLOCATION') {
    return <PromptTaskAllocation />
  }

  if (type === 'TASK_EVALUATION') {
    return <PromptTaskEvaluation />
  }
  return <div>No prompt template selected !</div>
}
