let slideIndex = 1;
let slideIndexAuto = 0;
showSlidesAuto();
showSlides(slideIndex);
const audio = document.getElementById('player');

// Next/previous controls
function plusSlides(n) {
    showSlides(slideIndex += n);
}
// Thumbnail image controls

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex-1].style.display = "block";
}

function showSlidesAuto(){
    let i;
    let slides = document.getElementsByClassName("mySlidesAuto");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
        slides[i].style.display = "none";
    }
    slideIndexAuto++;
    if (slideIndexAuto > slides.length) {slideIndexAuto = 1}
    slides[slideIndexAuto-1].style.display = "block";
    let interval = document.getElementById("interval").value;
    console.log(interval);
    if(interval !== 0){
        setTimeout(showSlidesAuto,  interval * 1000);
    } else
        setTimeout(showSlidesAuto,  2000);
}

let playlist = {
    1 : 'asset/audio.mp3',
    2 : 'asset/audio2.mp3',
    3 : 'asset/audio3.mp3'
}

let namesong = {
    1 : 'Goo Goo Muck',
    2 : 'Paint it black',
    3 : 'Nothing else matter'
}

let playing = false;

let currentIndex = 0;
let newIndex = 1;

function play(){

    update();
    if(!context){
        preparation();
    }
    if(playing === false || currentIndex !== newIndex){
        audio.play();
        currentIndex = newIndex;
        playing = true;
        loop();
    } else {
        audio.pause();
        playing = false;
    }
}

function update(){
    const radios = document.getElementsByName('song');
    for (var i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
            updateAudio(radios[i].value);
            newIndex = radios[i].value;
            break;
        }
    }
}

function updateAudio(index){
    audio.src = playlist[index];
    audio.load();
    var name = document.getElementById('song_name');
    name.innerText = 'Song: ' + namesong[index];
}

var context, analyser,array,logo;

logo = document.getElementById("logo-play").style;

function preparation(){
    context = new AudioContext();
    analyser = context.createAnalyser();
    let src = context.createMediaElementSource(audio);
    src.connect(analyser);
    analyser.connect(context.destination);
    loop();
}

function loop(){
    if(playing){
        window.requestAnimationFrame(loop);
    }
    array = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(array);
    logo.height = (array[40])+"px";
    logo.width = (array[40])+"px";
}
