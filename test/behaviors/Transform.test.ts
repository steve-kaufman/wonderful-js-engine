import { Transform } from '../../src/behaviors'
import { Box } from '../../src/game'

describe('Transform', () => {
  describe('detectCollision()', () => {
    it("doesn't detect on left/right edge", () => {
      const box1 = [0, 10, 10, 20] as Box
      const box2 = [10, 10, 20, 20] as Box

      const isColliding = Transform.DetectCollision(box1, box2)

      expect(isColliding).toBe(false)
    })
    it("doesn't detect on top/bottom edge", () => {
      const box1 = [0, 0, 10, 10] as Box
      const box2 = [0, 10, 10, 20] as Box

      const isColliding = Transform.DetectCollision(box1, box2)

      expect(isColliding).toBe(false)
    })
    it('does detect when corners overlap', () => {
      const box1 = [0, 0, 10, 10] as Box
      const box2 = [8, 8, 18, 18] as Box

      const isColliding = Transform.DetectCollision(box1, box2)

      expect(isColliding).toBe(true)
    })
  })
})
