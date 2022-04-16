import * as Speech from 'expo-speech';

// wrapper class of using expo-speech
class SpeechWrapper {
    constructor() {
        this.requester = -1
        this.canRepeat = true
        this.timer = null
    }

    // speak out content
    // if requester changes, speak immediately
    // if requester remains the same, only repeat after repeatTime
    speak = async (content, requester = -1, repeatTime = 0) => {
        let speaking = await Speech.isSpeakingAsync();
        if (requester != this.requester) {
            clearTimeout(this.timer)
            this.requester = requester
            this.canRepeat = false
            this.timer = setTimeout(() => {
                this.canRepeat = true
            }, repeatTime)
            Speech.stop()
            Speech.speak(content, { language: 'en' })
        }
        else if (!speaking && this.canRepeat) {
            clearTimeout(this.timer)
            this.canRepeat = false
            this.timer = setTimeout(() => { this.canRepeat = true }, repeatTime)
            Speech.speak(content, { language: 'en' })
        }
    }
}

export default SpeechWrapper