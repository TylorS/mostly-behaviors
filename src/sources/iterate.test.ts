import { Test, describe, given, it } from '@typed/test'
import { iterate } from './iterate'
import { assertBehavior } from '../../test-helpers'

export const test: Test = describe(
  `iterate`,
  given(
    `a stepper function and a seed`,
    it(`returns a Behavior that iterates values`, () => {
      const behavior = iterate((x: number) => x + 1, 0)

      assertBehavior([0, 1, 2, 3], behavior)
    })
  )
)
