import { Test, describe, given, it } from '@typed/test'
import { only } from './only'
import { eq } from '@briancavalier/assert'

export const test: Test = describe(
  `only`,
  given(
    `a value`,
    it(`creates a Behavior`, () => {
      const behavior = only(1)

      const { value } = behavior.step()

      eq(1, value)
    })
  )
)
