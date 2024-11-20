let progressBar = document.getElementById('progressBar');
let backwardButton = document.getElementById('backwardButton');
let forwardButton = document.getElementById('forwardButton');
let playButton = document.getElementById('playButton');
let musicBar = document.getElementById('musicBar');
let audio = new Audio("./music/song1.mp3")
let songList = document.getElementsByClassName("songList")[0];
let nameContainer = document.getElementById('nameContainer');
let songIndex = 0;

let songsDetails = [
    { title: "just-chill", image: "./images/music1.jpeg", songPath: "./music/song1.mp3" },
    { title: "night-sky", image: "./images/music3.jpg", songPath: "./music/song2.mp3" },
    { title: "summer-fun", image: "./images/music2.jpg", songPath: "./music/song3.mp3" },
    { title: "hollidays", image: "./images/music4.jpg", songPath: "./music/song4.mp3" },
    { title: "kodama-night", image: "./images/music1.jpeg", songPath: "./music/song5.mp3" },
    { title: "just-kidding", image: "./images/music3.jpg", songPath: "./music/song6.mp3" },
    { title: "playground-fun", image: "./images/music2.jpg", songPath: "./music/song7.mp3" },
]
for (let i = 0; i < songsDetails.length; i++) {
    songList.innerHTML += `
    <div class="song">
    <img class="musicImage" src="${songsDetails[i].image}" alt="">
    <span >${songsDetails[i].title}</span>
    <i id="${songsDetails[i].songPath}" class="fa-regular fa-circle-play" src="${songsDetails[i].songPath}"></i>
    </div>
    `
}

let allSongElements = Array.from(document.getElementsByClassName("song"));
const makeAllButtonsPlay = () => {
    allSongElements.forEach((element) => {
        let iTags = Array.from(element.getElementsByTagName('i'));
        iTags.forEach((e) => {
            e.classList.add("fa-circle-play");
            e.classList.remove("fa-circle-pause");
        })
    })
}

const nameChange = () => {
    if (songIndex == 0) {
        nameContainer.innerHTML = songsDetails[songIndex].title
    } else {
        nameContainer.innerHTML = songsDetails[songIndex - 1].title
    }
}

// let play = 1;
let lastClickedSong = '';
allSongElements.forEach((element) => {
    let iTags = Array.from(element.getElementsByTagName('i'));
    iTags.forEach((e) => {
        e.addEventListener("click", (event) => {

            if (!lastClickedSong || lastClickedSong != event.target) {
                lastClickedSong = event.target;
                audio.src = event.target.id;
                songIndex = +(event.target.id).slice(12, 13)
                console.log(songIndex)
                nameChange();
                makeAllButtonsPlay();
                playButton.classList.remove("fa-circle-play");
                playButton.classList.add("fa-circle-pause");
                event.target.classList.remove("fa-circle-play");
                event.target.classList.add("fa-circle-pause");
                musicBar.classList.remove("opacity0")
                audio.play();
            } else {
                if (audio.paused) {
                    makeAllButtonsPlay();
                    playButton.classList.remove("fa-circle-play");
                    playButton.classList.add("fa-circle-pause");
                    event.target.classList.remove("fa-circle-play");
                    event.target.classList.add("fa-circle-pause");
                    musicBar.classList.remove("opacity0")
                    audio.play()
                } else {
                    songIndex = +(event.target.id).slice(12, 13)
                    nameChange();
                    makeAllButtonsPlay();
                    playButton.classList.add("fa-circle-play");
                    playButton.classList.remove("fa-circle-pause");
                    event.target.classList.add("fa-circle-play");
                    event.target.classList.remove("fa-circle-pause");
                    musicBar.classList.add("opacity0")
                    audio.pause();
                }
            }

            // if (play == 1) {
            //     lastClickedSong = event.target;
            //     songIndex = +(event.target.id).slice(12, 13)
            //     audio.src = event.target.id;
            //     nameChange();
            //     makeAllButtonsPlay();
            //     playButton.classList.remove("fa-circle-play");
            //     playButton.classList.add("fa-circle-pause");
            //     event.target.classList.remove("fa-circle-play");
            //     event.target.classList.add("fa-circle-pause");
            //     musicBar.classList.remove("opacity0")
            //     audio.play();
            //     play++
            //     console.log(songIndex)
            // } else if (play % 2 == 0) {
            //     makeAllButtonsPlay();
            //     playButton.classList.add("fa-circle-play");
            //     playButton.classList.remove("fa-circle-pause");
            //     event.target.classList.add("fa-circle-play");
            //     event.target.classList.remove("fa-circle-pause");
            //     musicBar.classList.add("opacity0")
            //     audio.pause();
            //     play++
            // } else {
            //     if (lastClickedSong == event.target) {
            //         makeAllButtonsPlay();
            //         playButton.classList.remove("fa-circle-play");
            //         playButton.classList.add("fa-circle-pause");
            //         event.target.classList.remove("fa-circle-play");
            //         event.target.classList.add("fa-circle-pause");
            //         musicBar.classList.remove("opacity0")
            //         audio.play();
            //         play++
            //     } else {
            //         lastClickedSong = event.target
            //         makeAllButtonsPlay();
            //         playButton.classList.remove("fa-circle-play");
            //         playButton.classList.add("fa-circle-pause");
            //         event.target.classList.remove("fa-circle-play");
            //         event.target.classList.add("fa-circle-pause");
            //         musicBar.classList.remove("opacity0")
            //         audio.src = event.target.id;
            //         songIndex = +(event.target.id).slice(12, 13)
            //         currentElemet = event.target;
            //         nameChange();
            //         console.log(songIndex)
            //         audio.play();
            //         play--
            //     }

            // }

        })
    })
})

playButton.addEventListener("click", () => {
    if (audio.paused || audio.currentTime <= 0) {
        songIndex == 1;
        playButton.classList.remove("fa-circle-play");
        playButton.classList.add("fa-circle-pause");
        musicBar.classList.remove("opacity0");
        audio.play();
        nameChange();
        if (lastClickedSong == '') {
            let firstElement = document.getElementById(`${songsDetails[0].songPath}`);
            firstElement.classList.remove('fa-circle-play');
            firstElement.classList.add('fa-circle-pause');
        } else {
            lastClickedSong.classList.remove('fa-circle-play')
            lastClickedSong.classList.add('fa-circle-pause')
        }
    }
    else {
        makeAllButtonsPlay();
        if (lastClickedSong == '') {
            let firstElement = document.getElementById(`${songsDetails[0].songPath}`);
            firstElement.classList.add('fa-circle-play');
            firstElement.classList.remove('fa-circle-pause');
        } else {
            lastClickedSong.classList.add('fa-circle-play')
            lastClickedSong.classList.remove('fa-circle-pause')
        }
        playButton.classList.add("fa-circle-play");
        playButton.classList.remove("fa-circle-pause");
        musicBar.classList.add("opacity0")
        audio.pause();
    }
})

const changeIconForForwordAndBackward=()=>{
    let iTag=Array.from(songList.getElementsByTagName('i')).filter((element)=>{
        return element.id==`./music/song${songIndex}.mp3`;
    })
    iTag[0].classList.remove("fa-circle-play");
    iTag[0].classList.add("fa-circle-pause");
}

forwardButton.addEventListener('click', () => {
    if (songIndex >= 1 && songIndex <= 6) {
        songIndex += 1
        audio.src = `./music/song${songIndex}.mp3`;
        playButton.classList.remove("fa-circle-play");
        playButton.classList.add("fa-circle-pause");
        musicBar.classList.remove("opacity0");
        nameChange();
        makeAllButtonsPlay();
        changeIconForForwordAndBackward();
        audio.play();
    } else {
        if (songIndex == 0) {
            songIndex = 1;
            audio.src = `./music/song${songIndex}.mp3`;
            playButton.classList.remove("fa-circle-play");
            playButton.classList.add("fa-circle-pause");
            musicBar.classList.remove("opacity0");
            nameChange();
            makeAllButtonsPlay();
            changeIconForForwordAndBackward();
            audio.play();
        } else {
            songIndex = 1;
            audio.src = `./music/song${songIndex}.mp3`;
            playButton.classList.remove("fa-circle-play");
            playButton.classList.add("fa-circle-pause");
            musicBar.classList.remove("opacity0");
            nameChange();
            makeAllButtonsPlay();
            changeIconForForwordAndBackward();
            audio.play();
        }
    }
})

backwardButton.addEventListener('click', () => {
    if (songIndex <= 7 && songIndex >= 2) {
        songIndex -= 1;
        audio.src = `./music/song${songIndex}.mp3`;
        playButton.classList.remove("fa-circle-play");
        playButton.classList.add("fa-circle-pause");
        musicBar.classList.remove("opacity0");
        nameChange();
        makeAllButtonsPlay();
        changeIconForForwordAndBackward();
        audio.play();
    } else {
        songIndex = 7;
        audio.src = `./music/song${songIndex}.mp3`;
        playButton.classList.remove("fa-circle-play");
        playButton.classList.add("fa-circle-pause");
        musicBar.classList.remove("opacity0");
        nameChange();
        makeAllButtonsPlay();
        changeIconForForwordAndBackward();
        audio.play();
    }
})

audio.addEventListener("timeupdate", () => {
    progressBar.value = parseInt((audio.currentTime / audio.duration) * 100);
    if (audio.currentTime == audio.duration) {
        playButton.classList.add("fa-circle-play");
        playButton.classList.remove("fa-circle-pause");
        musicBar.classList.add("opacity0")
        audio.pause();
    }
})

progressBar.addEventListener("click", () => {
    audio.currentTime = parseInt((progressBar.value * audio.duration) / 100)
    console.log(audio.currentTime)
})