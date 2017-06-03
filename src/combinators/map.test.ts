import { Test, describe, given, it } from '@typed/test'
import { eq } from '@briancavalier/assert'
import { only } from '../sources'
import { map } from './map'

export const test: Test = describe(
  'map',
  given(
    '(a -> b) -> Behavior a',
    it('returns Behavior b', () => {
      const { value } = map(String, only(1)).step()

      eq('1', value)
    })
  )
)
