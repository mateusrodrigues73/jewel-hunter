const loadAudio = async (path) => 
  new Promise(resolve => {
    const audio = new Audio(path);
    console.log('loading audio');
    return audio.addEventListener("canplaythrough", () => {
        console.log('Audio loaded: '+path);
        return resolve(audio);
    });
  }
);

export { loadAudio };