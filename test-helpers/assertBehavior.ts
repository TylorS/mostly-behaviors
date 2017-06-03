import { eq } from '@briancavalier/assert'
import { Behavior } from '../src/types'

export function assertBehavior<A>(expectedValues: Array<A>, behavior: Behavior<A>) {
  const length = expectedValues.length
  const actualValues: Array<A> = []
  let currentBehavior = behavior

  for (let i = 0; i < length; ++i) {
    const { value, nextBehavior } = currentBehavior.step()

    actualValues.push(value)
    currentBehavior = nextBehavior
  }

  eq(expectedValues, actualValues)
}
