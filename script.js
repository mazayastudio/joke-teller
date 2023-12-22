const button = document.getElementById("button");
const audioElement = document.getElementById("audio");

// disable/enable button
function toggleButton() {
	button.disabled = !button.disabled;

}

// Passing jokes to VoiceRSS API
function tellMe(joke) {
	console.log("tell me:", joke);
	VoiceRSS.speech({
    key: 'abe10739aa3a4048836a794e60a149d3',
    src: joke,
    hl: 'en-us',
    v: 'Linda',
    r: 0,
    c: 'mp3',
    f: '44khz_16bit_stereo',
    ssml: false
	});
}

// Get Jokes from Joke API
async function getJokes() {
	let joke = "";
	const apiUrl = "https://v2.jokeapi.dev/joke/Programming,Miscellaneous,Dark";
	try {
		const response = await fetch(apiUrl);
		const data = await response.json();
		data.setup ? (joke = `${data.setup} ... ${data.delivery}`) : (joke = data.joke);
		// Text-to-speech
		tellMe(joke);
		// Disable button
		toggleButton();
	} catch (error) {
		console.error(error);
	}
}

//Event listener
button.addEventListener("click", getJokes);
audioElement.addEventListener("ended", toggleButton);

