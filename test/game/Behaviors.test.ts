import { Behavior, GameObject } from '../../src'

describe('Behavior', () => {
  let behavior: Behavior

  beforeEach(() => {
    behavior = new Behavior()
  })

  it('Has an id', () => {
    expect(behavior.id).toBeTruthy()
  })

  it('Will create three unique ids', () => {
    // Act
    const behavior1 = new Behavior()
    const behavior2 = new Behavior()
    const behavior3 = new Behavior()

    // Assert
    expect(behavior1.id).toBeTruthy()
    expect(behavior2.id).toBeTruthy()
    expect(behavior3.id).toBeTruthy()

    expect(behavior1.id).not.toEqual(behavior2.id)
    expect(behavior2.id).not.toEqual(behavior3.id)
    expect(behavior3.id).not.toEqual(behavior1.id)
  })

  it('Takes a custom id in the constructor', () => {
    behavior = new Behavior('My Behavior')

    expect(behavior.id).toBe('My Behavior')
  })

  it('Has an update method that takes delta time', () => {
    behavior.update(100)
  })
  it('Has a preUpdate method that takes delta time', () => {
    behavior.preUpdate(100)
  })
  it('Has a postUpdate method that takes delta time', () => {
    behavior.postUpdate(100)
  })

  it('Has a render method', () => {
    behavior.render()
  })

  it('Has an onCollisionEnter method', () => {
    behavior.onCollisionEnter()
  })
  it('Has an onCollision method', () => {
    behavior.onCollision()
  })
  it('Has an onCollisionExit method', () => {
    behavior.onCollisionExit()
  })

  it('Has an onAdd method', () => {
    behavior.onAdd()
  })

  describe('parent', () => {
    it('getParent returns null before parent is set', () => {
      // Act
      const parent = behavior.getParent()

      // Assert
      expect(parent).toBe(null)
    })
    it('After parent is set, getParent returns the expected parent', () => {
      // Arrange
      const gameObject = new GameObject()
      behavior.setParent(gameObject)
      // Act
      const parent = behavior.getParent()
      // Assert
      expect(parent).toBe(gameObject)
    })
  })
})
