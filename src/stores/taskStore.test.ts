import { describe, beforeEach, it, expect, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useTaskStore } from '@/stores/taskStore'
import { generateLetters } from '@/services/generateLetters'
import { Syllable } from '@/services/Syllable'
import { generateWords } from '@/services/generateWords'
import type { ExerciseScore } from '@/types/Task'

vi.mock('@/services/generateLetters', () => {
	return {
		generateLetters: vi.fn().mockReturnValue(['a', 'b', 'c']),
	}
})
vi.mock('@/services/generateWords', () => {
	return {
		generateWords: vi.fn().mockReturnValue(['aa', 'bb']),
	}
})
vi.mock('@/services/Syllable', () => {
	return {
		Syllable: vi.fn().mockReturnValue({
			generateSyllables: vi.fn().mockReturnValue(['aa', 'bb']),
		}),
	}
})
vi.mock('@/stores/wordStore', () => {
	return {
		useWordStore: vi.fn().mockReturnValue({ words: 'mockWords' }),
	}
})

describe('#TaskStore', () => {
	beforeEach(() => {
		setActivePinia(createPinia())
		vi.clearAllMocks()
	})

	it('should set the task type correctly', () => {
		const store = useTaskStore()

		store.taskType = 'words'

		expect(store.taskType).toBe('words')
	})

	it('should set the exercise type correctly', () => {
		const store = useTaskStore()

		store.setExerciseType('vowels')

		expect(store.exerciseType).toBe('vowels')
	})
	it('should start a task for the "letters" task type with exercise "vowels"', () => {
		const store = useTaskStore()

		store.taskType = 'letters'
		store.selectedExercise.letters = 'vowels'
		// start task
		store.startTask()

		expect(store.exerciseScore.result).toBe(0)
		expect(store.exerciseScore.index).toBe(0)
		expect(store.exerciseScore.action).toBe('add')
		expect(generateLetters).toBeCalledTimes(1)
		expect(generateLetters).toBeCalledWith('vowels')
		expect(store.showTask).toBe(true)
		expect(store.exerciseScore.exercises.length).toBeGreaterThan(0)
	})
	it('should start a task for the "letters" task type with exercise "mix"', () => {
		const store = useTaskStore()

		store.taskType = 'letters'
		store.selectedExercise.letters = 'mix'
		store.startTask()

		expect(generateLetters).toBeCalledTimes(1)
		expect(generateLetters).toBeCalledWith('mix')
	})
	it('should generate syllables for the "syllables" task type with exercise "consonantFirst"', () => {
		const store = useTaskStore()

		store.taskType = 'syllables'
		store.selectedExercise.syllables = 'consonantFirst'
		// start task
		store.startTask()

		expect(store.exerciseScore.result).toBe(0)
		expect(store.exerciseScore.index).toBe(0)
		expect(store.exerciseScore.action).toBe('add')
		expect(Syllable).toBeCalledTimes(1)
		expect(Syllable).toBeCalledWith('consonantFirst')
		expect(generateLetters).not.toBeCalled()
		expect(store.showTask).toBe(true)
		expect(store.exerciseScore.exercises.length).toBeGreaterThan(0)
	})

	it('should generate words for the "words" task type with exercise "three"', () => {
		const store = useTaskStore()

		store.taskType = 'words'
		store.selectedExercise.words = 'three'
		// start task
		store.startTask()

		expect(store.exerciseScore.result).toBe(0)
		expect(store.exerciseScore.index).toBe(0)
		expect(store.exerciseScore.action).toBe('add')
		expect(generateLetters).not.toBeCalled()
		expect(Syllable).not.toBeCalled()
		expect(generateWords).toBeCalledTimes(1)
		expect(generateWords).toBeCalledWith('mockWords', 'three')
		expect(store.showTask).toBe(true)
		expect(store.exerciseScore.exercises.length).toBeGreaterThan(0)
	})

	it('should go to the next round', () => {
		const store = useTaskStore()
		store.taskType = 'letters'
		store.setExerciseType('mix')
		// start task
		store.startTask()

		// increase the result of the exercise score
		store.exerciseScore.result = 1
		store.exerciseScore.index = 10

		// go to the next round
		store.nextRound()

		expect(store.exerciseScore.index).toBe(0)
		expect(store.tasksScore.letters.mix?.result).toBe(1)
	})
	it('should set new exercise score', () => {
		const store = useTaskStore()
		const mockScore: ExerciseScore = {
			action: 'add',
			exercises: ['test'],
			index: 0,
			result: 0,
		}

		expect(store.exerciseScore).toEqual({})

		store.exerciseScore = mockScore

		expect(store.exerciseScore).toEqual(mockScore)
	})
	it('should return exercise text', () => {
		const store = useTaskStore()
		store.exerciseScore.exercises = ['first', 'second']
		store.exerciseScore.index = 0
		expect(store.exerciseText).toBe('first')

		store.exerciseScore.index = 1
		expect(store.exerciseText).toBe('second')
	})
})
