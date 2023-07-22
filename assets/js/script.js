var btnSearch = document.querySelector('#btnSearch');
var meaningArea = document.querySelector('#meaningContainer');
var wordArea = document.querySelector('#word');
var phoneticsArea = document.querySelector('#phonetics');
var partofspeechArea = document.querySelector('#partofspeech');
var soundContainer = document.querySelector('.soundContainer');
var audioHidden = document.querySelector('#audioHidden');


btnSearch.addEventListener("click", async () => {

    var inputWord = document.querySelector('#inputWord').value.toLowerCase();

    var apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${inputWord}`;

    var apiCall = await fetch(apiUrl);
    var data = await apiCall.json();

    dataShow(data);

});


const dataShow = (data) => {

    var partOfSpeech = data[0].meanings[0].partOfSpeech;
    var meanings = data[0].meanings[0].definitions;
    var meaningList = ``;

    meanings.forEach(meaning => {
        meaningList += `<p class="meaning" id="meaning">${meaning.definition}</p>`
    });

    if (meaningList.length > 300) {
        meaningArea.style.overflowY = "scroll";
    }
    else {
        meaningArea.style.overflowY = "hidden";
    }
    console.log(meaningList.length);
    var phonetics = data[0].phonetics[0].text || data[0].phonetics[1].text;
    var audio = data[0].phonetics[0].audio;
    meaningArea.innerHTML = meaningList;
    audioHidden.src = audio;
    soundContainer.addEventListener("click", () => {
        audioHidden.play();
    });
    wordArea.innerHTML = inputWord.value;
    phoneticsArea.innerHTML = phonetics;
    partofspeechArea.innerHTML = partOfSpeech;
    console.log(data);
};