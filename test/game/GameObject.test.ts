import { GameObject, Behavior } from '../../src'

describe('GameObject', () => {
  let gameObject: GameObject

  beforeEach(() => {
    gameObject = new GameObject()
  })

  it('Has an id', () => {
    expect(gameObject.id).toBeTruthy()
  })

  it('Will create three unique ids', () => {
    // Act
    const gameObject1 = new GameObject()
    const gameObject2 = new GameObject()
    const gameObject3 = new GameObject()

    // Assert
    expect(gameObject1.id).toBeTruthy()
    expect(gameObject2.id).toBeTruthy()
    expect(gameObject3.id).toBeTruthy()

    expect(gameObject1.id).not.toEqual(gameObject2.id)
    expect(gameObject2.id).not.toEqual(gameObject3.id)
    expect(gameObject3.id).not.toEqual(gameObject1.id)
  })

  it('Can get behavior by id after behavior is added', () => {
    // Arrange
    const behavior = new Behavior('My Behavior')

    // Act
    gameObject.addBehavior(behavior)

    // Assert
    expect(gameObject.getBehavior(behavior.id)).toBe(behavior)
  })

  it('Can get multiple behaviors by id after behaviors are added', () => {
    // Arrange
    const behaviors: Behavior[] = []

    // Act
    for (let i = 0; i < 10; i++) {
      const behavior = new Behavior()
      behaviors.push(behavior)
      gameObject.addBehavior(behavior)
    }

    // Assert
    for (const behavior of behaviors) {
      expect(gameObject.getBehavior(behavior.id)).toBe(behavior)
    }
  })

  it('Updates all of its behaviors', () => {
    // Arrange
    const behaviors: Behavior[] = []

    for (let i = 0; i < 10; i++) {
      const behavior = new Behavior()
      behavior.update = jest.fn()
      behaviors.push(behavior)
      gameObject.addBehavior(behavior)
    }

    // Act
    gameObject.update()

    // Assert
    for (const behavior of behaviors) {
      expect(behavior.update).toHaveBeenCalledTimes(1)
    }
  })

  it('Renders all of its behaviors', () => {
    // Arrange
    const behaviors: Behavior[] = []

    for (let i = 0; i < 10; i++) {
      const behavior = new Behavior()
      behavior.render = jest.fn()
      behaviors.push(behavior)
      gameObject.addBehavior(behavior)
    }

    // Act
    gameObject.render()

    // Assert
    for (const behavior of behaviors) {
      expect(behavior.render).toHaveBeenCalledTimes(1)
    }
  })
})
