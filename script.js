const confettiCount = 100
    const sequinCount = 20

    // variáveis de "física"
    const gravityConfetti = 0.3
    const gravitySequins = 0.55
    const dragConfetti = 0.075
    const dragSequins = 0.02
    const terminalVelocity = 3

    var disabled = false
    var canvas,ctx;
    var button;

function renderPage(letterIndex){
  switch(letterIndex){
    case 0:{
      document.body.innerHTML += `
      <header>
        <img src="heart.svg" class="heartPulse">
        <img src="heart.svg" class="heart">
        <button>À <span class="titleLabel">Fulana</span></button>

        <audio id="music" src="music.mp3" style="display:none"></audio>
      </header>

      <section id="cover">
        <button class="openInvite">Clique para abrir o convite</button>
        <button class="author">@tgnael</button>
      </section>

      <canvas id="waterCanvas"></canvas>
      <h1 class="titleCanvas">Você aceita sair comigo?</h1>
      <p class="textCanvas">Data:&nbsp;&nbsp;Na que der para você<br>Horário: No que você quiser</p>

      <canvas id="confetti"></canvas>

      <section class="mainButtonsContainer">
        <section class="buttonsContainer">
          <button class="liquidButton" onclick="yes()">
            <span>Sim</span>
            <div class="liquid"/></div>
          </button>
          <button class="negativeButton">
            <span><s>Não</s></span>
          </button>
          <div class="liquidButtonShadow"></div>
        </section>
      </section>

      <div class="BibleContainer">
        <h2 class="BibleText">O amor <span class="typed-text"></span><span class="cursor">&nbsp;</span></h2>
        <h3 class="BibleBook">1 Coríntios 13:7</h3>
      </div>    `;

      document.querySelector("#cover").addEventListener("click",function(event){
        document.querySelector("#cover").innerHTML = "";
        initMusic();
      })

    const canvas1 = document.getElementById('waterCanvas');
    const ctx1 = canvas1.getContext('2d');
    canvas1.width = canvas1.offsetWidth;
    canvas1.height = canvas1.offsetHeight;

    const waves = [];
    const waveCount = 30;

    function getRandom(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    for (let i = 0; i < waveCount; i++) {
        waves.push({
            y: (canvas1.height / 2), // 中央付近に分布
            length: 0.015,
            amplitude: (canvas1.height / 3),
            frequency: getRandom(10,20) / 1000,
            phase: Math.PI * 2
        });
      }

    let alpha = "0.01";
    let ticks = 0;

    function animate() {
        requestAnimationFrame(animate);

        ticks++;

        if(ticks >= 500){
          alpha = alpha === "0.01" ? "0.05" : "0.01";
          ticks = 0;
        }

        ctx1.fillStyle = `rgb(0,0,0,${alpha})`;
        ctx1.fillRect(0, 0, canvas1.width, canvas1.height);

        // Desenhar ondas atuais
        waves.forEach((wave, index) => {
          ctx1.beginPath();
          ctx1.moveTo(0, wave.y);
          for (let i = 0; i < canvas1.width; i++) {
              const yOffset = Math.sin(i * wave.length + wave.phase) * wave.amplitude * Math.sin(wave.phase);
              ctx1.lineTo(i, wave.y + yOffset);
          }
          ctx1.strokeStyle = `hsl(${index / 2 + 220}, 100%, 50%)`;
          ctx1.stroke();

          wave.phase += wave.frequency;
      });    
    }

    animate();

    window.addEventListener('resize', () => {
        canvas1.width = window.innerWidth;
        canvas1.height = window.innerHeight;
        waves.forEach((wave) => {
           wave.y = (canvas1.height / 2);
           wave.amplitude = (canvas1.height / 3);
        });
    });

    ////////////////////////////////////////////////////////////////////////////////////

    const typedTextSpan = document.querySelector(".typed-text");
    const cursorSpan = document.querySelector(".cursor");

    const textArray = ["tudo sofre","tudo crê","tudo espera","tudo suporta"];
    const typingDelay = 200;
    const erasingDelay = 100;
    const newTextDelay = 2000; // Delay between current and next text
    let textArrayIndex = 0;
    let charIndex = 0;

    function type() {
      if (charIndex < textArray[textArrayIndex].length) {
        if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
      } 
      else {
        cursorSpan.classList.remove("typing");
        setTimeout(erase, newTextDelay);
      }
    }

    function erase() {
      if (charIndex > 0) {
        if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex-1);
        charIndex--;
        setTimeout(erase, erasingDelay);
      } 
      else {
        cursorSpan.classList.remove("typing");
        textArrayIndex++;
        if(textArrayIndex>=textArray.length) textArrayIndex=0;
        setTimeout(type, typingDelay + 1100);
      }
    }

    document.addEventListener("DOMContentLoaded", function() { // On DOM Load initiate the effect
      if(textArray.length) setTimeout(type, newTextDelay + 250);
    });
    
    canvas = document.getElementById('confetti')
    ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    button = document.querySelector(".liquidButton > span")

    }
  }
}

let confetti = [];
let sequins = [];

const colors = [
  { front: '#0077FF', back: '#0066FF' },
  { front: '#0055FF', back: '#0044FF' },
  { front: '#0022CC', back: '#0011BB' },
  { front: '#FFFFFF', back: '#AAAAAA' }
];

randomRange = (min, max) => Math.random() * (max - min) + min;

initConfettoVelocity = (xRange, yRange) => {
  const x = randomRange(xRange[0], xRange[1]);
  const range = yRange[1] - yRange[0] + 1;
  let y = yRange[1] - Math.abs(randomRange(0, range) + randomRange(0, range) - range);
  if (y >= yRange[1] - 1) {
    y += (Math.random() < .25) ? randomRange(1, 3) : 0;
  }
  return { x: x, y: -y };
};

function Confetto() {
  this.randomModifier = randomRange(0, 99);
  this.color = colors[Math.floor(randomRange(0, colors.length))];
  this.dimensions = {
    x: randomRange(5, 9),
    y: randomRange(8, 15),
  };
  let btncoords = button.getBoundingClientRect();
  this.position = {
    x: randomRange(btncoords.left, btncoords.right),
    y: randomRange(btncoords.top, btncoords.bottom),
  };
  this.rotation = randomRange(0, 2 * Math.PI);
  this.scale = {
    x: 1,
    y: 1,
  };
  this.velocity = initConfettoVelocity([-9, 9], [6, 11]);
}
Confetto.prototype.update = function() {
  this.velocity.x -= this.velocity.x * dragConfetti;
  this.velocity.y = Math.min(this.velocity.y + gravityConfetti, terminalVelocity);
  this.velocity.x += Math.random() > 0.5 ? Math.random() : -Math.random();
  this.position.x += this.velocity.x;
  this.position.y += this.velocity.y;
  this.scale.y = Math.cos((this.position.y + this.randomModifier) * 0.09);
};

function Sequin() {
  this.color = colors[Math.floor(randomRange(0, colors.length))].back;
  this.radius = randomRange(1, 2);
  let btncoords = button.getBoundingClientRect();
  this.position = {
    x: randomRange(btncoords.left, btncoords.right),
    y: randomRange(btncoords.top, btncoords.bottom),
  };
  this.velocity = {
    x: randomRange(-6, 6),
    y: randomRange(-8, -12)
  };
}
Sequin.prototype.update = function() {
  this.velocity.x -= this.velocity.x * dragSequins;
  this.velocity.y = this.velocity.y + gravitySequins;
  this.position.x += this.velocity.x;
  this.position.y += this.velocity.y;
};

initBurst = () => {
  confetti = [];
  sequins = [];
  
  for (let i = 0; i < confettiCount; i++) {
    confetti.push(new Confetto());
  }
  for (let i = 0; i < sequinCount; i++) {
    sequins.push(new Sequin());
  }
};

render = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  confetti.forEach((confetto, index) => {
    let width = (confetto.dimensions.x * confetto.scale.x);
    let height = (confetto.dimensions.y * confetto.scale.y);
    ctx.translate(confetto.position.x, confetto.position.y);
    ctx.rotate(confetto.rotation);
    confetto.update();
    ctx.fillStyle = confetto.scale.y > 0 ? confetto.color.front : confetto.color.back;
    ctx.fillRect(-width / 2, -height / 2, width, height);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  });

  sequins.forEach((sequin, index) => {
    ctx.translate(sequin.position.x, sequin.position.y);
    sequin.update();
    ctx.fillStyle = sequin.color;
    ctx.beginPath();
    ctx.arc(0, 0, sequin.radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  });

  confetti.forEach((confetto, index) => {
    if (confetto.position.y >= canvas.height) confetti.splice(index, 1);
  });
  sequins.forEach((sequin, index) => {
    if (sequin.position.y >= canvas.height) sequins.splice(index, 1);
  });

  window.requestAnimationFrame(render);
};

function yes(){
  if (!disabled) {
  disabled = true
  // Loading stage
    setTimeout(() => {
      window.initBurst()
      render()
      navigator.vibrate([100,50,100,200,1000]);
      setTimeout(() => {
        // Reset button so user can select it again
        disabled = false;

        window.location.href = `instagram://user?username=${encodeURIComponent("tgnael")}`;
      }, 3000)
    }, 300)
}
}

function getLetterParam(){
  const urlParams = new URLSearchParams(window.location.search);
  let letter = urlParams.get("letter");

  letter = letter ? parseInt(letter, 10) : 0;
  return isNaN(letter) ? 0 : letter;
}

const letter = getLetterParam();
renderPage(letter);

function initMusic() {
    const audio = document.querySelector("#music");

    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = audioCtx.createAnalyser();
    analyser.fftSize = 2048;

    const source = audioCtx.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(audioCtx.destination);

    let coverCanvas = document.createElement("canvas");
    coverCanvas.id = "coverCanvas";
    coverCanvas.width = window.innerWidth;
    coverCanvas.height = window.innerHeight;
    document.querySelector("#cover").appendChild(coverCanvas);

    let cctx = coverCanvas.getContext("2d");

    const VELOCITY = 15; // Velocidade da animação

    // 🔥 Lista de frases com tempos de início (start) e fim (end)
    let lyrics = [
        { text: "Seu veneno", start: 0, end: 6, y: 90 },
        { text: "acabou com a", start: 1, end: 6, y: 130 },
        { text: "minha calmaria", start: 2, end: 6, y: 170 },
        { text: "Deixe que", start: 3, end:6, y: 230 },
        { text: "minhas", start: 3.5, end: 6, y: 270 },
        { text: "ondas te guiem", start: 4, end: 6, y: 310 },
        { text: "Em minha vida", start: 5, end: 6, y: 350 },

        { text: "Segue a", start: 6, end: 11, y: 90 },
        { text: "Correnteza", start: 6.5, end: 11, y: 130 },
        { text: "Senão me", start: 7, end: 11, y: 170 },
        { text: "complica", start: 7.5, end: 11, y: 210 },
        { text: "Menina veneno", start: 9, end: 11, y: 270 },
        { text: "Você já sabia", start: 10, end: 11, y: 310 },
    ];

    // 🔵 Palavras que devem ser destacadas em azul
    const highlightedWords = ["veneno", "calmaria", "ondas","vida","Correnteza","Menina"];

    let revealedLetters = lyrics.map(() => 0);

    function drawLyrics() {
        cctx.clearRect(0, 0, coverCanvas.width, coverCanvas.height);
        cctx.font = "bold 35px monospace";

        let currentTime = audio.currentTime;

        lyrics.forEach((line, index) => {
            if (currentTime >= line.start && currentTime <= line.end) {
                let totalLetters = line.text.length;
                let visibleLetters = Math.min(
                    totalLetters,
                    Math.floor((currentTime - line.start) * VELOCITY)
                );
                revealedLetters[index] = visibleLetters;

                let words = line.text.split(" ");
                let x = 15;
                let lettersRendered = 0;

                words.forEach(word => {
                    let isHighlighted = highlightedWords.includes(word);

                    for (let i = 0; i < word.length; i++) {
                        if (lettersRendered >= revealedLetters[index]) {
                            return;
                        }

                        cctx.fillStyle = isHighlighted ? "#0055FF" : "#FFFFFF";
                        cctx.fillText(word[i], x, line.y);
                        x += cctx.measureText(word[i]).width;
                        lettersRendered++;
                    }

                    x += cctx.measureText(" ").width; // Adiciona espaço entre as palavras
                });
            }
        });

        requestAnimationFrame(drawLyrics);
    }

    audio.addEventListener("play", () => {
        if (audioCtx.state === "suspended") {
            audioCtx.resume();
        }
        drawLyrics();
    });

    audio.play();
}