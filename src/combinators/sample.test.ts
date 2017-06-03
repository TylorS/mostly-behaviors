import { Test, describe, given, it } from '@typed/test'
import { sample } from './sample'
import { iterate } from '../sources'
import { periodic } from '@most/core'
import { assertStream } from '../../test-helpers'

export const test: Test = describe(
  `sample`,
  given(
    `a function, a stream, and a behavior`,
    it(`returns a stream`, () => {
      const behavior = iterate((x: number) => x + 1, 0)
      const stream = periodic(10)

      const f = (_: any, x: number) => x

      return assertStream([0, 1, 2, 3], sample(f, stream, behavior))
    })
  )
)
