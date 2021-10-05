const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PlAYER_STORAGE_KEY = "F8_PLAYER";

const player = $(".player");
const cd = $(".cd");
const heading = $("header h2");
const cdThumb = $(".cd-thumb");
const audio = $("#audio");
const playBtn = $(".btn-toggle-play");
const progress = $("#progress");
const prevBtn = $(".btn-prev");
const nextBtn = $(".btn-next");
const randomBtn = $(".btn-random");
const repeatBtn = $(".btn-repeat");
const playlist = $(".playlist");

const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    config: {},
    config: JSON.parse(localStorage.getItem(PlAYER_STORAGE_KEY)) || {},

    songs: [{
            name: "PHÙ DUNG",
            singer: "JIN TUẤN NAM X SIN THIỆN TÂM X RYO T",
            path: "./mp3/phudung.mp3",
            image: "./logomp3.png"
        },
        {
            name: "TÂM TƯ TRONG LÒNG",
            singer: "KHẢ HIỆP",
            path: "./mp3/tamtutronglong.mp3",
            image: "./logomp3.png"
        },
        {
            name: "THÊ LƯƠNG ",
            singer: "PHÚC CHINH",
            path: "./mp3/theluong.mp3",
            image: "./logomp3.png"
        },
        {
            name: "THIÊN ĐỊA",
            singer: "LEE KEN x NAL",
            path: "./mp3/thiendia.mp3",
            image: "./logomp3.png"
        },
        {
            name: "TIẾNG TƠ LÒNG",
            singer: "H-KRAY X TRUZG",
            path: "./mp3/tiengtolong.mp3",
            image: "./logomp3.png"
        },
        {
            name: "TÌNH PHAI",
            singer: "KIỀU PHONG ft RYOT | TỦN CÙI BẮP x KEYZT",
            path: "./mp3/tinhphai.mp3",
            image: "./logomp3.png"
        },
        {
            name: "TÌNH PHU THÊ",
            singer: "CHÍ HƯỚNG",
            path: "./mp3/tinhphuthe.mp3",
            image: "./logomp3.png"
        },
        {
            name: "KHUYÊ MỘC LAN",
            singer: "Hương Ly & Jombie (G5R)",
            path: "./mp3/khuyemoclan.mp3",
            image: "./logomp3.png"
        },
        {
            name: "TYLER NGÔ",
            singer: "XAVI",
            path: "./mp3/tylerngo.mp3",
            image: "./logomp3.png"
        },
        {
            name: "ĐẸP TRAI",
            singer: "MAX ft KAYDEE",
            path: "./mp3/deptrai.mp3",
            image: "./logomp3.png"
        },
        {
            name: "CÔ BA DIVA",
            singer: "XAVI",
            path: "./mp3/cobadiva.mp3",
            image: "./logomp3.png"
        },
            {
            name: "CÔ ĐƠN DÀNH CHO AI ĐÂY",
            singer: "LEE KEN x NAL",
            path: "./mp3/codondanhchoaiday.mp3",
            image: "./logomp3.png"
        },
        {
            name: "CON ĐÒ LỠ HẸN",
            singer: "H2K x Kunzing",
            path: "./mp3/condolohen.mp3",
            image: "./logomp3.png"
        },
        {
            name: "ÉP DUYÊN",
            singer: "YUNIBOO ft NAM ANH",
            path: "./mp3/epduyen.mp3",
            image: "./logomp3.png"
        },
        {
            name: "HOA BẰNG LĂNG",
            singer: "Kidz",
            path: "./mp3/hoabanglang.mp3",
            image: "./logomp3.png"
        },
        {
            name: "HOA BỈ NGẠN",
            singer: "GAVIN X LIGHTA",
            path: "./mp3/hoabingan.mp3",
            image: "./logomp3.png"
        },
        {
            name: "MỸ NHÂN",
            singer: "Đinh Đại Vũ",
            path: "./mp3/mynhan.mp3",
            image: "./logomp3.png"
        },
        {
            name: "VỀ QUÊ ANH LO",
            singer: "The Night x Sinkra",
            path: "./mp3/vequeanhlo.mp3",
            image: "./logomp3.png"
        },
            {
            name: "THAY LÒNG",
            singer: "NAL x VTK",
            path: "./mp3/thaylong.mp3",
            image: "./logomp3.png"
        },
            {
            name: "ĐẾ QUÂN",
            singer: "Việt Quất x Phạm Triệu Viễn x DNH",
            path: "./mp3/dequan.mp3",
            image: "./logomp3.png"
        },
        {
            name: "HOÀNG HOA KÝ",
            singer: "LONG NÓN LÁ",
            path: "./mp3/hoanghoaky.mp3",
            image: "./logomp3.png"
        },
        {
            name: "THÌ THÔI",
            singer: "TVk x Nal x T-Passion",
            path: "./mp3/thithoi.mp3",
            image: "./logomp3.png"
        },
        {
            name: "TUÝ KHUYNH THÀNH",
            singer: "TIỂU A PHONG",
            path: "./mp3/tuykhuynhthanh.mp3",
            image: "./logomp3.png"
        },
    ],
    setConfig: function(key, value) {
        this.config[key] = value;
        // (2/2) Uncomment the line below to use localStorage
        localStorage.setItem(PlAYER_STORAGE_KEY, JSON.stringify(this.config));
    },

    render: function() {
        const htmls = this.songs.map((song, index) => {
            return `
                <div class="song ${
                    index === this.currentIndex ? "active" : ""
                }" data-index="${index}">
                    <div class="thumb"
                        style="background-image: url('${song.image}')">
                    </div>
                    <div class="body">
                        <h3 class="title">${song.name}</h3>
                        <p class="author">${song.singer}</p>
                    </div>
                    <div class="option">
                        <i class="fas fa-ellipsis-h"></i>
                    </div>
                </div>
            `;
        });
        playlist.innerHTML = htmls.join("");
    },

    defineProperties: function() {
        Object.defineProperty(this, "currentSong", {
            get: function() {
                return this.songs[this.currentIndex];
            }
        });
    },
    handleEvents: function() {
        const _this = this;
        const cdWidth = cd.offsetWidth;

        // Xử lý CD quay / dừng
        // Handle CD spins / stops
        const cdThumbAnimate = cdThumb.animate([{ transform: "rotate(360deg)" }], {
            duration: 10000, // 10 seconds
            iterations: Infinity
        });
        cdThumbAnimate.pause();

        // Xử lý phóng to / thu nhỏ CD
        // Handles CD enlargement / reduction
        document.onscroll = function() {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const newCdWidth = cdWidth - scrollTop;

            cd.style.width = newCdWidth > 0 ? newCdWidth + "px" : 0;
            cd.style.opacity = newCdWidth / cdWidth;
        };

        // Xử lý khi click play
        // Handle when click play
        playBtn.onclick = function() {
            if (_this.isPlaying) {
                audio.pause();
            } else {
                audio.play();
            }
        };

        // Khi song được play
        // When the song is played
        audio.onplay = function() {
            _this.isPlaying = true;
            player.classList.add("playing");
            cdThumbAnimate.play();
        };

        // Khi song bị pause
        // When the song is pause
        audio.onpause = function() {
            _this.isPlaying = false;
            player.classList.remove("playing");
            cdThumbAnimate.pause();
        };

        // Khi tiến độ bài hát thay đổi
        // When the song progress changes
        audio.ontimeupdate = function() {
            if (audio.duration) {
                const progressPercent = Math.floor(
                    (audio.currentTime / audio.duration) * 100
                );
                progress.value = progressPercent;
            }
        };

        // Xử lý khi tua song
        // Handling when seek
        progress.onchange = function(e) {
            const seekTime = (audio.duration / 100) * e.target.value;
            audio.currentTime = seekTime;
        };

        // Khi next song
        // When next song
        nextBtn.onclick = function() {
            if (_this.isRandom) {
                _this.playRandomSong();
            } else {
                _this.nextSong();
            }
            audio.play();
            _this.render();
            _this.scrollToActiveSong();
        };

        // Khi prev song
        // When prev song
        prevBtn.onclick = function() {
            if (_this.isRandom) {
                _this.playRandomSong();
            } else {
                _this.prevSong();
            }
            audio.play();
            _this.render();
            _this.scrollToActiveSong();
        };

        // Xử lý bật / tắt random song
        // Handling on / off random song
        randomBtn.onclick = function(e) {
            _this.isRandom = !_this.isRandom;
            _this.setConfig("isRandom", _this.isRandom);
            randomBtn.classList.toggle("active", _this.isRandom);
        };

        // Xử lý lặp lại một song
        // Single-parallel repeat processing
        repeatBtn.onclick = function(e) {
            _this.isRepeat = !_this.isRepeat;
            _this.setConfig("isRepeat", _this.isRepeat);
            repeatBtn.classList.toggle("active", _this.isRepeat);
        };

        // Xử lý next song khi audio ended
        // Handle next song when audio ended
        audio.onended = function() {
            if (_this.isRepeat) {
                audio.play();
            } else {
                nextBtn.click();
            }
        };

        // Lắng nghe hành vi click vào playlist
        // Listen to playlist clicks
        playlist.onclick = function(e) {
            const songNode = e.target.closest(".song:not(.active)");

            if (songNode || e.target.closest(".option")) {
                // Xử lý khi click vào song
                // Handle when clicking on the song
                if (songNode) {
                    _this.currentIndex = Number(songNode.dataset.index);
                    _this.loadCurrentSong();
                    _this.render();
                    audio.play();
                }

                // Xử lý khi click vào song option
                // Handle when clicking on the song option
                if (e.target.closest(".option")) {}
            }
        };
    },
    scrollToActiveSong: function() {
        setTimeout(() => {
            $(".song.active").scrollIntoView({
                behavior: "smooth",
                block: "nearest"
            });
        }, 300);
    },
    loadCurrentSong: function() {
        heading.textContent = this.currentSong.name;
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
        audio.src = this.currentSong.path;
    },
    loadConfig: function() {
        this.isRandom = this.config.isRandom;
        this.isRepeat = this.config.isRepeat;
    },
    nextSong: function() {
        this.currentIndex++;
        if (this.currentIndex >= this.songs.length) {
            this.currentIndex = 0;
        }
        this.loadCurrentSong();
    },
    prevSong: function() {
        this.currentIndex--;
        if (this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1;
        }
        this.loadCurrentSong();
    },
    playRandomSong: function() {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * this.songs.length);
        } while (newIndex === this.currentIndex);

        this.currentIndex = newIndex;
        this.loadCurrentSong();
    },
    start: function() {
        // Gán cấu hình từ config vào ứng dụng
        // Assign configuration from config to application
        this.loadConfig();

        // Định nghĩa các thuộc tính cho object
        // Defines properties for the object
        this.defineProperties();

        // Lắng nghe / xử lý các sự kiện (DOM events)
        // Listening / handling events (DOM events)
        this.handleEvents();

        // Tải thông tin bài hát đầu tiên vào UI khi chạy ứng dụng
        // Load the first song information into the UI when running the app
        this.loadCurrentSong();

        // Render playlist
        this.render();

        // Hiển thị trạng thái ban đầu của button repeat & random
        // Display the initial state of the repeat & random button
        randomBtn.classList.toggle("active", this.isRandom);
        repeatBtn.classList.toggle("active", this.isRepeat);
    }
};

app.start();
