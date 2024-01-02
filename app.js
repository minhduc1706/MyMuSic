const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const listSongs = $(".list-songs");
const playBtn = $(".toggle-play-btn");
const audio = $("#audio");
const player = $(".player");
const cdThumb = $(".cd-thumb");
const imgThumb = $(".img-thumb");
const nameCd = $(".namesong");
const text = $(".text");
const time = $(".time");
const names = $$(".namesong");
const author = $(".author");
const imageContainer = $(".image-container");
const playBtnCd = $(".play-btn");
const nextBtn = $(".next-btn");
const backBtn = $(".backward-btn");
const rewindBtn = $(".rewind-btn");
const forwardBtn = $(".forward-btn");
const repeatBtn = $(".repeat-btn");
const shuffleBtn = $(".shuffle-btn");
const volumeSlider = $(".volume-slider");
const volumeMax = $(".full-volume");
const volumeMin = $(".outed-volume");
const seekSlider = $(".longVolume");
const currentTime = $(".currentTime");
const endTime = $(".endTime");
const addBtn = $(".add");
const closeBtn = $("#closeButton");
const addForm = $(".songFormContainer");
const songFormContainer = $(".songFormContainer");
const submitSong = $(".submitSong");
const songForm = $("#songForm");
const moonToggle = $(".moon-toggle");
const videoBackground = $(".video-background");
const wrapper = $(".wrapper");
const PLAYLIST_STORAGE_KEY = 'my_music_playlist';
const songs = JSON.parse(localStorage.getItem(PLAYLIST_STORAGE_KEY)) || [];
const apiKey = 'AIzaSyCEe3EO_VAho-amWcVtTEq1Ej2BojANC84';


const app = {
  currentIndex: 0,
  isRepeat: false,
  isPlaying: false,
  isShuffle: false,
  songs: [
    {
      name: 'Tai Vi Sao',
      singer: 'MCK',
      path: 'assets/music/TaiViSao.mp3',
      image: 'assets/images/AnhDaOnHon.jpg'
    },
    {
      name: 'Muon roi ma sao con',
      singer: 'Son Tung',
      path: 'assets/music/MuonRoiMaSaoCon.mp3',
      image: 'assets/images/MuonRoiMaSaoCon.jpg'
    },
    {
      name: 'Anh da on hon',
      singer: 'MCK',
      path: 'assets/music/AnhDaOnHon.mp3',
      image: 'assets/images/AnhDaOnHon.jpg'
    },
    {
      name: 'Anh van luon nhu vay',
      singer: 'Bray',
      path: 'assets/music/AnhVanLuonNhuVay.mp3',
      image: 'assets/images/AnhVanLuonNhuVay.jpg'
    },
    {
      name: 'Du tien',
      singer: 'Bray',
      path: 'assets/music/DuTien.mp3',
      image: 'assets/images/DuTien.jpg'
    },
    {
      name: 'Con trai cung',
      singer: 'Bray',
      path: 'assets/music/ConTraiCung.mp3',
      image: 'assets/images/ConTraiCung.jpg'
    },
    {
      name: 'Do for love',
      singer: 'Bray',
      path: 'assets/music/DoForLove.mp3',
      image: 'assets/images/DoForLove.jpg'
    },
    {
      name: 'Ex Hate Me 2',
      singer: 'Bray',
      path: 'assets/music/ExHateMePart2.mp3',
      image: 'assets/images/ExHateMe2.jpg'
    },
    {
      name: 'Con gai ruou',
      singer: 'Bray',
      path: 'assets/music/ConGaiRuou.mp3',
      image: 'assets/images/ConGaiRuou.jpg'
    },
    {
      name: 'Way back home',
      singer: 'Bray',
      path: 'assets/music/WayBackHome.mp3',
      image: 'assets/images/WayBackHome.jpg'
    },
    {
      name: 'Anh nha o dau the',
      singer: 'Bray',
      path: 'assets/music/AnhNhaODauThe.mp3',
      image: 'assets/images/AnhNhaODauThe.jpg'
    },
    {
      name: 'Ex Hate Me',
      singer: 'Bray',
      path: 'assets/music/ExHateMe.mp3',
      image: 'assets/images/ExHateMe.jpg'
    },
  ],
  render: function () {
    const htmls = this.songs.map((song, index) => {
      return `<div class="song ${index === this.currentIndex ? 'active' : ''}" data-index="${index}">
                <div class="song-info">
                    <div class="img-thumb" style="background-image: url('${song.image}');"></div>
                    <div class="info">
                        <div class="author">${song.singer}</div>
                        <div class="namesong">${song.name}</div>
                    </div>
                </div>
                <div class="time duration-${index}"></div>
            </div>
            `
    })
    listSongs.innerHTML = htmls.join("");
  },
  //define current song
  defineProperties: function () {
    Object.defineProperty(this, "currentSong", {
      get: function () {
        return this.songs[this.currentIndex];
      }
    })
  },
  handleEvents: function () {
    //change background
    moonToggle.onclick = function () {
      if (videoBackground.classList.contains("active")) {
        videoBackground.classList.remove("active");
        wrapper.classList.add("active");
        document.documentElement.style.setProperty('--primary-color', '#00bfff');
      } else {
        wrapper.classList.remove("active");
        videoBackground.classList.add("active");
        document.documentElement.style.setProperty('--primary-color', '#59cc33');
      }
    }
    // submit new song 
    submitSong.onclick = function () {
      const songName = $('#songName').value;
      const songLink = $('#songLink').value;
      const songImage = $('#songImage').value;
      const singerName = $('#singerName').value;
      if (songName.trim() !== '' && songLink.trim() !== '' && songImage.trim() !== '' && singerName.trim() !== '') {
        app.getYouTubeVideoInfo(songLink, function (songLink) {
          const newSong = {
            name: songName,
            singer: singerName,
            path: songLink,
            image: songImage
          };
          app.addSongToPlaylist(newSong);
          addForm.classList.remove("open");
        });
      } else {
        alert("please enter all the infomation of the song!");
      }
    }
    // form add song
    addBtn.onclick = function () {
      addForm.classList.add("open");
    }
    closeBtn.onclick = function () {
      addForm.classList.remove("open");
    }
    songFormContainer.onclick = function () {
      addForm.classList.remove("open");
    }
    songForm.onclick = function (event) {
      event.stopPropagation();
    }
    //rotate CD
    const cdThumbAnimate = cdThumb.animate([
      {
        transform: "rotate(360deg)"
      }
    ], {
      duration: 10000,
      iterations: Infinity
    })
    cdThumbAnimate.pause();
    //click play
    playBtn.onclick = function () {
      if (app.isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
    }

    playBtnCd.onclick = function () {
      if (app.isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
    }
    //play
    audio.onplay = function () {
      app.isPlaying = true;
      text.innerHTML = "PLAYING";
      imageContainer.classList.add("playing");
      player.classList.add("playing");
      cdThumbAnimate.play();
    }
    //pause
    audio.onpause = function () {
      app.isPlaying = false;
      text.innerHTML = "PLAY";
      imageContainer.classList.remove("playing");
      player.classList.remove("playing");
      cdThumbAnimate.pause();
    }
    //next song
    nextBtn.onclick = function () {
      if (app.isShuffle) {
        app.shuffleSong();
      } else {
        app.nextSong();
      }
      audio.play();
      app.render();
      app.highlightCurrentSong();
    }
    //rewind song
    rewindBtn.onclick = function () {
      audio.currentTime -= 3;
    }
    //forward song
    forwardBtn.onclick = function () {
      audio.currentTime += 3;
    }
    //prevous song
    backBtn.onclick = function () {
      if (app.isShuffle) {
        app.shuffleSong();
      } else {
        app.previousSong();
      }
      audio.play();
      app.render();
      app.highlightCurrentSong();
    }
    //auto go on next song
    audio.onended = function () {
      if (app.isRepeat) {
      } else if (app.isShuffle) {
        app.shuffleSong();
      } else {
        nextBtn.click();
      }
      audio.play();
      app.render();
      app.highlightCurrentSong();
    }
    // volume up/down & when volume is 0
    volumeSlider.oninput = function (e) {
      audio.volume = e.target.value / 100;
      if (audio.volume > 0) {
        volumeMax.classList.add("active");
        volumeMin.classList.remove("active");
      } else {
        volumeMin.classList.add("active");
        volumeMax.classList.remove("active");

      }
    };
    // turn on/off volume
    volumeMax.onclick = function () {
      if (audio.volume !== 0) {
        audio.volume = 0;
        volumeMax.classList.remove("active");
        volumeMin.classList.add("active");
        volumeSlider.value = 0;
      }
    }

    let previousVolume = audio.volume;
    volumeMin.onclick = function () {
      if (audio.volume === 0) {
        audio.volume = previousVolume;
        volumeMin.classList.remove("active");
        volumeMax.classList.add("active");
      }
    }
    //choose the song
    listSongs.onclick = function (e) {
      if (e.target.closest('.song:not(.active)')) {
        app.currentIndex = Number(e.target.closest('.song:not(.active)').dataset.index);
        app.loadCurrentSong();
        app.render();
        audio.play();
      }
    }
    //seeking time
    seekSlider.onmousedown = function (e) {
      const boundingRect = seekSlider.getBoundingClientRect();
      const percent = (e.clientX - boundingRect.left) / boundingRect.width;
      const seekTime = audio.duration * percent;
      audio.currentTime = seekTime;
    };
    //increasing progress bar
    audio.ontimeupdate = function () {
      seekSlider.value = (audio.currentTime / audio.duration) * 100;
    };
    //repeat
    repeatBtn.onclick = function () {
      app.isRepeat = !app.isRepeat;
      repeatBtn.classList.toggle('active', app.isRepeat);
    }
    //shuffle
    shuffleBtn.onclick = function () {
      app.isShuffle = !app.isShuffle;
      shuffleBtn.classList.toggle('active', app.isRandom);
    }
    //update running time
    audio.ontimeupdate = function () {
      const current = app.formatTime(audio.currentTime)
      currentTime.textContent = current;
      const end = app.formatTime(audio.duration);

      if (audio.duration) {
        const progressPercent = Math.floor(audio.currentTime / audio.duration * 100);
        seekSlider.value = progressPercent;

      }
      if (end != 'NaN:NaN') {
        endTime.textContent = end;
      }

    }

  },
  loadCurrentSong: function () {
    nameCd.textContent = app.currentSong.name;
    cdThumb.style.backgroundImage = `url('${app.currentSong.image}')`;
    imgThumb.style.backgroundImage = `url('${app.currentSong.image}')`;
    names.forEach(name => {
      name.textContent = app.currentSong.name;
    });
    author.textContent = app.currentSong.singer;
    audio.src = app.currentSong.path;
    app.durationOfSong();
  },
  nextSong: function () {
    this.currentIndex++;
    if (this.currentIndex > this.songs.length) {
      this.currentIndex = 0;
    }

    this.loadCurrentSong();
  },
  previousSong: function () {
    this.currentIndex--;
    if (this.currentIndex < 0) {
      this.currentIndex = this.songs.length - 1;
    }

    this.loadCurrentSong();
  },
  shuffleSong: function () {
    let remainingSongs = this.songs.filter((song, index) => index !== this.currentIndex);
    if (remainingSongs.length > 0) {
      const newIndex = Math.floor(Math.random() * remainingSongs.length);
      this.currentIndex = this.songs.indexOf(remainingSongs[newIndex]);
    } else {
      this.currentIndex = 0;
    }
    this.loadCurrentSong();
  },
  highlightCurrentSong: function () {
    setTimeout(() => {
      $(".song.active").scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      })
    }, 300)
  },
  durationOfSong: function () {
    this.songs.map(function (song, index) {
      const timeMusic = $(".duration-" + index)
      var pathMusic = song.path;
      var audio = new Audio(pathMusic);

      audio.addEventListener('loadedmetadata', function () {
        timeMusic.innerHTML = app.formatTime(audio.duration);
      })
    })
  },
  formatTime: function (number) {
    const minutes = Math.floor(number / 60);
    const seconds = Math.floor(number % 60);
    const fomattedTime = (minutes < 10 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
    return fomattedTime;
  },
  addSongToPlaylist: function (newSong) {
    const isSongExist = app.songs.some(song => song.name === newSong.name);
    if (!isSongExist) {
      app.songs.push(newSong);
      alert("The song has been added to the list!");
      app.loadCurrentSong();
      app.render();
    } else {
      alert("the song existed!");
    }
  },
  getYouTubeVideoInfo: function (videoUrl, callback) {
    const videoId = videoUrl.split('v=')[1];
    const apiUrl = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=snippet&key=${apiKey}`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const videoInfo = data.items[0].snippet;
        callback(videoInfo);
      })
      .catch(error => console.error('Error fetching video info:', error));
  },
  start: function () {
    this.defineProperties();
    this.render();
    this.handleEvents();
    this.loadCurrentSong();
    this.durationOfSong();


    function getYouTubeVideoId(url) {
      const match = url.match(/[?&]v=([^?&]+)/);
      return match && match[1] ? match[1] : '';
    }

    document.addEventListener('DOMContentLoaded', function () {
      const test = $('.test');
      const videoUrl = 'https://www.youtube.com/watch?v=79iRoyNhlTQ';

      // Lấy thông tin video từ YouTube API
      fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${getYouTubeVideoId(videoUrl)}&key=${apiKey}`)
        .then(response => response.json())
        .then(data => {
          const videoTitle = data.items[0].snippet.title;
        })
        .catch(error => console.error('Error fetching YouTube video info:', error));

      // Cập nhật nguồn audio với link YouTube
      test.src = `https://www.youtube.com/embed/${getYouTubeVideoId(videoUrl)}`;
    });


  }
}
app.start();