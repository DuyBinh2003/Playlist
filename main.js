const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const heading = $('.dashboard header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const playList = $('.playlist')
const playBtn = $('.btn-toggle-play')
const player = $('.player')
const progress = $('#progress')
const prevBtn = $('.fa-backward-step')
const nextBtn = $('.fa-forward-step')
const randomBtn = $('.btn-random')
const repeatBtn = $('.btn-repeat')

app = {
    currentIndex: 0,
    isPlaying: false,
    song: [
        {
            name: 'Despacito', 
            singer: 'Luis Fonsi',
            img: './assets/img/song1.jpg',
            audio: './assets/audio/song1.mp3',
        },
        {
            name: 'Save me', 
            singer: 'Deamn',
            img: './assets/img/song2.jpg',
            audio: './assets/audio/song2.mp3',
        },
        {
            name: 'Send it', 
            singer: 'Austin Mahone',
            img: './assets/img/song3.jpg',
            audio: './assets/audio/song3.mp3',
        },
        {
            name: 'Shape of you', 
            singer: 'Ed Sheeran',
            img: './assets/img/song4.jpg',
            audio: './assets/audio/song4.mp3',
        },
        {
            name: 'Memories', 
            singer: 'Maroon5',
            img: './assets/img/song5.jpg',
            audio: './assets/audio/song5.mp3',
        },
        {
            name: 'Waiting for love', 
            singer: 'Avicii',
            img: './assets/img/song6.jpg',
            audio: './assets/audio/song6.mp3',
        },
        {
            name: 'See you again', 
            singer: 'Wiz Khalifa',
            img: './assets/img/song7.jpg',
            audio: './assets/audio/song7.mp3',
        },
        {
            name: 'Monsters', 
            singer: 'Katie Sky',
            img: './assets/img/song8.jpg',
            audio: './assets/audio/song8.mp3',
        },
        {
            name: 'I do', 
            singer: '911',
            img: './assets/img/song9.jpg',
            audio: './assets/audio/song9.mp3',
        },
        {
            name: 'Baby', 
            singer: 'Justin Bieber',
            img: './assets/img/song10.jpg',
            audio: './assets/audio/song10.mp3',
        },
        {
            name: 'Attention', 
            singer: 'Charlie Puth',
            img: './assets/img/song11.jpg',
            audio: './assets/audio/song11.mp3',
        },
        {
            name: 'Hymn for the weekend', 
            singer: 'Coldplay',
            img: './assets/img/song12.jpg',
            audio: './assets/audio/song12.mp3',
        },
        {
            name: 'Perfect', 
            singer: 'Ed Sheeran',
            img: './assets/img/song13.jpg',
            audio: './assets/audio/song13.mp3',
        },
        {
            name: 'Cheating on you', 
            singer: 'Charlie Puth',
            img: './assets/img/song14.jpg',
            audio: './assets/audio/song14.mp3',
        },
        {
            name: 'Sweet but psycho', 
            singer: 'Ava Max',
            img: './assets/img/song15.jpg',
            audio: './assets/audio/song15.mp3',
        },
        {
            name: 'So far away', 
            singer: 'David Guetta & Martin Garrix',
            img: './assets/img/song16.jpg',
            audio: './assets/audio/song16.mp3',
        },
        {
            name: 'Bad liar', 
            singer: 'Imagine Dragons',
            img: './assets/img/song17.jpg',
            audio: './assets/audio/song17.mp3',
        },
        {
            name: 'Something just like this', 
            singer: 'Coldplay & The Chainsmokers',
            img: './assets/img/song18.jpg',
            audio: './assets/audio/song18.mp3',
        },
        {
            name: 'Love yourself', 
            singer: 'Justin Bieber',
            img: './assets/img/song19.jpg',
            audio: './assets/audio/song19.mp3',
        },
        {
            name: 'Love is gone', 
            singer: 'Slander',
            img: './assets/img/song20.jpg',
            audio: './assets/audio/song20.mp3',
        },
    ],
    defineProperties: function() {
        Object.defineProperty(this, 'currentSong', {
            get: function(){
                return this.song[this.currentIndex]
            }
        })
    },   
    // xử lý tất cả các sự kiện
    handleEvents: function() {
        _this = this
        // scroll
        const cdThumbAnimation = cdThumb.animate ([
            {transform: 'rotate(360deg)'}
        ],{
            duration: 10000,
            iterations: Infinity
        })

        cdThumbAnimation.pause()
        // play song

        playBtn.onclick = function() {
            if(_this.isPlaying) {
                audio.pause()
            }else {
                audio.play()
            }
        }

        // audio play
        audio.onplay = function() {
            _this.isPlaying = true
            player.classList.add('playing')
            cdThumbAnimation.play()
        }
        // audio pause
        audio.onpause = function() {
            _this.isPlaying = false
            player.classList.remove('playing')
            cdThumbAnimation.pause()
        }
        
        // seek audio
        audio.ontimeupdate = function() {
            if(audio.duration) {
                const progressPercent = Math.floor(audio.currentTime / audio.duration * 100)
                progress.value = progressPercent
            }
        }
        // Xử lý tua
        progress.onchange = function(e) {
            const seekTime = e.target.value * audio.duration / 100
            audio.currentTime = seekTime
            audio.play()
        }


        // xử lý chuyển bài hát
        prevBtn.onclick = function() {
            _this.prevSong()
            audio.play()
            progress.value = 0
        }

        nextBtn.onclick = function() {
            _this.nextSong()
            audio.play()
            progress.value = 0
        }
        
        randomBtn.onclick = function() {
            _this.randomSong()
            progress.value = 0
            audio.play()
        }

        repeatBtn.onclick = function() {           
            progress.value = 0
            audio.currentTime = 0
            audio.play()
        }

        // khi bài hát kết thúc
        audio.onended = function() {
            nextBtn.onclick()
        }

        // lắng nghe onclick vào playlist
        playList.onclick = function(e) {
            // Xử lý thanh option
            if(e.target.closest('.option')){
                
            }else if(e.target.closest('.song:not(.active)')){
                var term = _this.currentIndex
                _this.currentIndex = e.target.closest('.song').getAttribute('data-index')
                _this.loadCurrentSong()
                _this.handleClassActive(term, _this.currentIndex)
                audio.play()
            }
        }
    },
    loadCurrentSong: function() {
        heading.textContent = this.currentSong.name
        cdThumb.style.backgroundImage = `url('${this.currentSong.img}')`
        audio.src = this.currentSong.audio
    },
    handleClassActive: function(remove, add) {
        $(`.song__${remove}`).classList.remove('active')
        $(`.song__${add}`).classList.add('active')
    },
    nextSong: function() {
        var term = this.currentIndex
        if(this.currentIndex === this.song.length - 1) {
            this.currentIndex = -1
        }
        this.currentIndex++
        this.loadCurrentSong()
        this.handleClassActive(term, this.currentIndex)
    },
    prevSong: function() {
        var term = this.currentIndex
        if(this.currentIndex === 0) {
            this.currentIndex = this.song.length
        }
        this.currentIndex--
        this.loadCurrentSong()
        this.handleClassActive(term, this.currentIndex)

    },
    randomSong: function(){
        var current = this.currentIndex
        while(this.currentIndex === current){ 
            this.currentIndex = Math.floor(Math.random() * this.song.length)
        }
        this.loadCurrentSong()
        this.handleClassActive(current, this.currentIndex)
    },
    moveSong: function(index) {
        console.log(index)
    },
    renderListSong: function() {
        const htmls = this.song.map(function(song, index) {
            return`
                <div class="song song__${index}" data-index="${index}">
                    <div class="thumb" 
                        style="background-image: url('${song.img}')">
                    </div>
                    <div class="body">
                        <h3 class="title">${song.name}</h3>
                        <p class="author">${song.singer}</p>
                    </div>
                    <div class="option">
                        <i class="fas fa-ellipsis-h"></i>
                    </div>
                </div>   
            `
        })
        playList.innerHTML = htmls.join('')
        $(`.song__${this.currentIndex}`).classList.add('active')
    },
    start: function() {
        // Định nghĩa các thuộc tính cho object 
        this.defineProperties()

        // xử lý tất cả sự kiện
        this.handleEvents()

        // load bài hát hiện tại
        this.loadCurrentSong()

        // render list song
        this.renderListSong()
    }
}
app.start()