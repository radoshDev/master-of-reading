import { ref, onMounted, type Ref } from 'vue'

type SpeakOptions = {
	pitch?: number
	rate?: number
	text: string
	voiceLang?: 'ru-RU'
	volume?: number
	isMute?: boolean
	onEnd?: () => void
}

type UseSpeechSynthesis = () => {
	speak: (args: SpeakOptions) => void
	speaking: Ref<boolean>
	cancel: () => void
}

const useSpeechSynthesis: UseSpeechSynthesis = () => {
	const voices = ref<SpeechSynthesisVoice[]>([])
	const speaking = ref(false)
	const supported = ref(false)

	const getVoices = (): void => {
		// Firefox seems to have voices upfront and never calls the
		// voiceschanged event
		const voiceOptions = window.speechSynthesis.getVoices()
		if (voiceOptions.length > 0) {
			voices.value = voiceOptions
			return
		}

		window.speechSynthesis.onvoiceschanged = event => {
			voices.value = (event.target as SpeechSynthesis).getVoices()
		}
	}

	onMounted(() => {
		if (typeof window !== 'undefined' && window.speechSynthesis) {
			supported.value = true
			getVoices()
		}
	})

	const speak = (args: SpeakOptions): void => {
		const {
			voiceLang,
			text,
			isMute = false,
			rate = 1,
			pitch = 1,
			volume = 1,
			onEnd,
		} = args

		speaking.value = true

		const handleEnd = (): void => {
			speaking.value = false
			onEnd?.()
		}

		if (isMute || !supported.value || !text) {
			handleEnd()
			return
		}

		const voice = voices.value.find(({ lang }) => voiceLang === lang)

		const utterance = new window.SpeechSynthesisUtterance()
		utterance.voice = voice || null
		utterance.text = text
		utterance.onend = handleEnd
		utterance.rate = rate
		utterance.pitch = pitch
		utterance.volume = volume
		utterance.onerror = () => {
			setTimeout(handleEnd, 500)
		}
		window.speechSynthesis.speak(utterance)
	}

	const cancel = (): void => {
		if (!supported.value) return
		speaking.value = false
		window.speechSynthesis.cancel()
	}

	return {
		speak,
		speaking,
		cancel,
	}
}

export default useSpeechSynthesis
