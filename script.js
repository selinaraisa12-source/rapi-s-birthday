document.addEventListener("DOMContentLoaded", () => {

  const startBtn = document.getElementById("startBtn");
  const blowBtn = document.getElementById("blowBtn");
  const music = document.getElementById("music");
  const scenes = document.querySelectorAll(".scene");
  const progressBar = document.getElementById("progressBar");
  const searchText = document.getElementById("searchText");
  const wishes = document.querySelectorAll(".wish");
  const background = document.getElementById("stars");
  const cakeInstruction = document.getElementById("cakeInstruction");
  const cakeFlame = document.getElementById("cakeFlame");

  // ===== PARALLAX BACKGROUND EFFECT =====
  window.addEventListener("mousemove", (e) => {
    const moveX = (e.clientX - window.innerWidth / 2) * 0.03;
    const moveY = (e.clientY - window.innerHeight / 2) * 0.03;
    gsap.to(background, { x: -moveX, y: -moveY, duration: 1, ease: "power1.out" });
  });

  window.addEventListener("touchmove", (e) => {
    const touch = e.touches[0];
    const moveX = (touch.clientX - window.innerWidth / 2) * 0.02;
    const moveY = (touch.clientY - window.innerHeight / 2) * 0.02;
    gsap.to(background, { x: -moveX, y: -moveY, duration: 1, ease: "power1.out" });
  });

  function createStarParticles() {
    for (let i = 0; i < 20; i++) {
      let star = document.createElement("div");
      star.className = "star";
      star.style.left = Math.random() * 100 + "vw";
      star.style.animationDelay = Math.random() * 8 + "s";
      background.appendChild(star);
    }
  }
  createStarParticles();

  // Transisi Hordeng Love Biru
  function showScene(id){
    gsap.to("#loveCurtain", {
      top: "0vh",
      duration: 0.5,
      ease: "power2.inOut",
      onComplete: () => {
        scenes.forEach(s => s.classList.remove("active"));
        id.classList.add("active");
        
        gsap.to("#loveCurtain", {
          top: "-100vh",
          duration: 0.5,
          ease: "power2.inOut",
          onComplete: () => {
            gsap.set("#loveCurtain", { top: "100vh" });
          }
        });
      }
    });
  }

  startBtn.addEventListener("click", () => {
    music.play().catch(()=>{});
    runUpdate();
  });

  function runUpdate(){
    showScene(document.getElementById("updateScene"));
    let w = 0;
    let int = setInterval(()=>{
      w++;
      progressBar.style.width = w+"%";
      if(w>=100){
        clearInterval(int);
        setTimeout(runError,1000);
      }
    },30);
  }

  function runError(){
    showScene(document.getElementById("errorScene"));
    let i = 0;
    let txt = ["Searching.","Searching..","Searching..."];
    let int = setInterval(()=>{
      searchText.innerText = txt[i%3];
      i++;
    },500);
    setTimeout(()=>{
      clearInterval(int);
      runReveal();
    },4000);
  }

  function runReveal(){
    showScene(document.getElementById("revealScene"));
    gsap.from(".rapi",{scale:.5,opacity:0,duration:1.5});
    setTimeout(runCake,3000);
  }

  function runCake(){
    showScene(document.getElementById("cakeScene"));

    gsap.to(".layer1",{opacity:1,duration:1});
    gsap.to(".layer2",{opacity:1,duration:1,delay:1});
    gsap.to(".layer3",{opacity:1,duration:1,delay:2, onComplete: () => {
      document.querySelector(".strawberry-left").style.opacity = "1";
      document.querySelector(".strawberry-right").style.opacity = "1";
    }});
    gsap.to(".frosting",{opacity:1,duration:1,delay:3});
    gsap.to(".candle",{opacity:1,duration:1,delay:4});
    gsap.to(".age",{opacity:1,duration:1,delay:5, onComplete: () => {
      cakeInstruction.innerText = "Make a wish and blow the candle!";
      blowBtn.style.display = "block";
      gsap.from(blowBtn, {scale: 0, opacity: 0, duration: 0.5});
    }});
  }

  // ===== FITUR TIUP LILIN INTERAKTIF =====
  blowBtn.addEventListener("click", () => {
    gsap.to(cakeFlame, {opacity: 0, scale: 0, duration: 0.6, ease: "power1.out"});
    cakeInstruction.innerText = "Wish granted! ✨";
    blowBtn.style.disabled = true;
    
    setTimeout(() => {
      runWish();
    }, 2000);
  });

  function runWish(){
    showScene(document.getElementById("wishScene"));
    let i = 0;
    function next(){
      if(i >= wishes.length){
        runFinal();
        return;
      }
      if(i > 0){
        wishes[i-1].classList.remove("show");
      }
      wishes[i].classList.add("show");
      i++;
      setTimeout(next, 3500);
    }
    next();
  }

  function startHeartRain(){
    const heartsContainer = document.getElementById("hearts");
    setInterval(() => {
      const heart = document.createElement("div");
      heart.className = "heart";
      heart.innerHTML = "💙"; 
      heart.style.left = Math.random() * 100 + "vw";
      heart.style.fontSize = Math.random() * 20 + 10 + "px";
      heart.style.animationDuration = Math.random() * 3 + 2 + "s";
      heartsContainer.appendChild(heart);
      setTimeout(() => heart.remove(), 5000);
    }, 300);
  }

  function runFinal(){
    if(wishes.length > 0) {
      wishes[wishes.length - 1].classList.remove("show");
    }
    showScene(document.getElementById("finalScene"));
    startHeartRain();

    gsap.from(".finalTitle",{opacity:0,y:30,duration:1});
    gsap.from(".finalName",{opacity:0,scale:.5,duration:1,delay:.5});
    gsap.from(".signature",{opacity:0,y:20,duration:1,delay:1});
  }
});