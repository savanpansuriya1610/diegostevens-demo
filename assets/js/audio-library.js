/**
 * audio-library.js
 * A simple utility class to manage and play sounds using the standard Web Audio API.
 * * Note: This replaces your custom 'initializeNewWebAudioContext' with a 
 * standard class constructor that creates a standard 'AudioContext'.
 */
class AudioPlayer {
    /**
     * Initializes the AudioPlayer with a new Web Audio Context.
     */
    constructor() {
        // Use the standard Web Audio API constructor
        this.context = new (window.AudioContext || window.webkitAudioContext)();
        this.bufferCache = {}; // Cache to store loaded audio buffers

        

        // Handle common browser restriction: context starts in 'suspended' state
        document.addEventListener('click', () => {
            if (this.context.state === 'suspended') {
                this.context.resume();
                
            }
        }, { once: true });
    }

    /**
     * Loads a sound file from a URL and stores it in the cache under a given name.
     * @param {string} url - The path to the audio file (e.g., 'audio/link-hover.mp3').
     * @param {string} name - The name to reference the sound by (e.g., 'beep').
     * @returns {Promise<void>}
     */
    async loadSound(url, name) {
        if (this.bufferCache[name]) {
            
            return;
        }

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const arrayBuffer = await response.arrayBuffer();

            // Decode the audio data into a usable buffer
            const audioBuffer = await this.context.decodeAudioData(arrayBuffer);
            this.bufferCache[name] = audioBuffer;

            
        } catch (error) {
            
        }
    }

    /**
     * Plays a cached sound by its name.
     * @param {string} name - The name of the sound to play (e.g., 'beep').
     */
    playSound(name) {
        const audioBuffer = this.bufferCache[name];

        if (!audioBuffer) {
            
            return;
        }

        // Create a new source node for playback
        const source = this.context.createBufferSource();
        source.buffer = audioBuffer;

        // Connect the source to the context's destination (speakers)
        source.connect(this.context.destination);

        // Start playback
        source.start(0); // Play immediately
    }
}