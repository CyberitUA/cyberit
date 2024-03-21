$(function () {
  // This prevents the page from scrolling down to where it was previously.
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }
  // This is needed if the user scrolls down during page load and you want to make sure the page is scrolled to the top once it's fully loaded. This has Cross-browser support.
  window.scrollTo(0, 0);
});

$(document).ready(function () {
  $(".black-screen").hide();
  $(".page-wrapper").show();

  // COOKIE CONSENT WINDOW

  //Selectors
  const popup = document.querySelector(".cookie-popup"), // Cookie window
    btnConfirm = document.querySelector("[cookie-confirm]"), // Accept button
    btnDecline = document.querySelector("[cookie-decline]"); // Decline button

  const cookieStorage = {
    getItem: (key) => {
      const cookies = document.cookie
        .split(";")
        .map((cookie) => cookie.split("="))
        .reduce((acc, [key, value]) => ({ ...acc, [key.trim()]: value }), {});

      return cookies[key];
    },
    setItem: (key, value) => {
      document.cookie = `${key}=${value};expires=Wed, 1 Jan 3000 00:00:01 GMT`;
    },
  };

  // INTEGRATIONS & COOKIES
  const cookieLoading = () => {
    // 1. Live chat
    function add_chatinline() {
      var hccid = 16725879;
      var nt = document.createElement("script");
      nt.async = true;
      nt.src = "https://mylivechat.com/chatinline.aspx?hccid=" + hccid;
      var ct = document.getElementsByTagName("script")[0];
      ct.parentNode.insertBefore(nt, ct);
    }
    add_chatinline();

    // 2. GA4 Granted
    consentGrantedGA4();

    // 3. Hotjar Consent function
    consentHotjar();
  };

  const storageType = cookieStorage;
  const consentPropertyType = "site_consent";

  const hasConsented = () =>
    storageType.getItem(consentPropertyType) === "true" ? true : false;
  const toggleStorage = (prop) =>
    storageType.setItem(consentPropertyType, prop);

  if (hasConsented()) {
    console.log("Loading...");
    cookieLoading();
  } else {
    setTimeout(function () {
      //Popup display
      popup.classList.add("cookie-popup_active");
    }, 11000); // Popup appearance timeout in milliseconds
  }

  btnConfirm.addEventListener("click", () => {
    toggleStorage(true);
    popup.classList.remove("cookie-popup_active");
    console.log("Loading...");
    // Starting cookies and integrations
    cookieLoading();
  });

  btnDecline.addEventListener("click", () => {
    toggleStorage(false);
    popup.classList.remove("cookie-popup_active");
  });

  // Chat activation buttons
  $("[chat-button]").each(function (index) {
    $(this).on("click", function () {
      if (hasConsented()) {
        $(".mylivechat_collapsed").click();
      } else {
        popup.classList.add("cookie-popup_active");
      }
    });
  });

  // Policy open button
  $("[policy-open]").each(function (index) {
    $(this).on("click", function () {
      $(".policy").removeClass("hidden");
    });
  });

  // Policy close button
  $("[policy-close]").each(function (index) {
    $(this).on("click", function () {
      $(".policy").addClass("hidden");
    });
  });

  // LOADER
  let counter = { value: 0 };
  loaderDuration = 2;
  let loaderEase =
    "M0,0 C0.126,0.382 0.383,0.17 0.544,0.545 0.705,0.92 0.818,1.001 1,1 ";
  let heroEase =
    "M0,0 C0.083,0.294 0.191,0.801 0.465,0.981 0.664,1.111 0.848,1.035 1,1 ";
  let cardsEase = "M0,0 C0.104,0.204 0.387,1.118 1,1 ";
  let logoEase =
    "M0,0 C0.11,0.494 0.208,0.784 0.297,0.94 0.473,1.249 0.504,1 1,1 ";

  // If not a first time visit in this tab
  if (sessionStorage.getItem("visited") !== null) {
    loaderDuration = 1;
    counter = {
      value: 1,
    };
  }
  sessionStorage.setItem("visited", "true");

  function updateLoaderText() {
    let progress = Math.round(counter.value);
    $(".loader_percent-number").text(progress);
  }

  function endLoaderAnimation() {
    $(".trigger").click();
  }

  let tl = gsap.timeline({ onComplete: endLoaderAnimation });
  tl.to(counter, {
    onUpdate: updateLoaderText,
    value: 100,
    duration: loaderDuration,
    ease: CustomEase.create("custom", loaderEase),
  });
  tl.to(
    ".loader_progress",
    {
      width: "100%",
      duration: loaderDuration,
      ease: CustomEase.create("custom", loaderEase),
    },
    0
  );

  // WELCOME TEXT
  // Only types strings one time
  var typed = new Typed(".typedjs-simple", {
    strings: ["Welcome to // Digital Laboratory!..."],
    typeSpeed: 100, // typing speed
    backSpeed: 100, // erasing speed
    startDelay: 9200,
  });

  // HERO SLOGAN TEXT ANIMATION

  //Hero slogan split type
  let heroText = new SplitType(".hero_slogan");
  gsap.from(
    heroText.chars,
    {
      y: "100%",
      opacity: 0,
      ease: CustomEase.create("custom", heroEase),
      stagger: 0.04,
    },
    1
  );

  let subText = new SplitType(".hero_description");
  gsap.from(
    subText.lines,
    {
      y: "100%",
      opacity: 0,
      ease: CustomEase.create("custom", heroEase),
      stagger: 0.4,
    },
    4
  );

  //Scroll heading text animation
  $("[section]").each(function () {
    let headerText1 = new SplitType($(this).find("[header-text]")[0]);
    let headerText2 = new SplitType($(this).find("[header-text]")[1]);

    let scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: $(this),
      },
    });

    scrollTl.from(
      headerText1.chars,
      {
        y: "100%",
        opacity: 0,
        ease: CustomEase.create("custom", heroEase),
        stagger: 0.02,
      },
      0.5
    );

    scrollTl.from(
      headerText2.chars,
      {
        y: "100%",
        opacity: 0,
        ease: CustomEase.create("custom", heroEase),
        stagger: 0.01,
      },
      "<0.2"
    );
  });

  //Nav bar emergence
  gsap.from(
    ".navbar_container",
    {
      y: "-100%",
      opacity: 0,
      duration: 0.5,
      ease: CustomEase.create("custom", cardsEase),
    },
    6.5
  );

  // Hero text scrumble
  setTimeout(function () {
    class TextScramble {
      constructor(el) {
        this.el = el;
        this.chars = "!<>-_\\/[]{}—=+*^?#________";
        this.update = this.update.bind(this);
      }
      setText(newText) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise((resolve) => (this.resolve = resolve));
        this.queue = [];
        for (let i = 0; i < length; i++) {
          const from = oldText[i] || "";
          const to = newText[i] || "";
          const start = Math.floor(Math.random() * 40);
          const end = start + Math.floor(Math.random() * 40);
          this.queue.push({ from, to, start, end });
        }
        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
      }
      update() {
        let output = "";
        let complete = 0;
        for (let i = 0, n = this.queue.length; i < n; i++) {
          let { from, to, start, end, char } = this.queue[i];
          if (this.frame >= end) {
            complete++;
            output += to;
          } else if (this.frame >= start) {
            if (!char || Math.random() < 0.28) {
              char = this.randomChar();
              this.queue[i].char = char;
            }
            output += `<span class="dud">${char}</span>`;
          } else {
            output += from;
          }
        }
        this.el.innerHTML = output;
        if (complete === this.queue.length) {
          this.resolve();
        } else {
          this.frameRequest = requestAnimationFrame(this.update);
          this.frame++;
        }
      }
      randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
      }
    }

    //Here is where you can change the words
    const phrases = [
      "tools",
      "magic",
      "reality",
      "spell",
      "product",
      "solution",
    ];

    const el = document.querySelector(".scramble-text");
    const fx = new TextScramble(el);

    let counter = 0;
    const next = () => {
      fx.setText(phrases[counter]).then(() => {
        setTimeout(next, 1600); // timing between animations
      });
      counter = (counter + 1) % phrases.length;
    };

    next();
  }, 7200);

  // COUNTER ANIMATION
  // Metrics emerging animation

  gsap.from(
    ".hero_metrics-item",
    {
      opacity: 0,
      y: "20rem",
      ease: CustomEase.create("custom", heroEase),
      duration: 0.2,
      stagger: { each: 0.3 },
    },
    4.5
  );

  setTimeout(function () {
    new PureCounter({
      // Setting that can't' be overriden on pre-element
      selector: ".counter-1", // HTML query selector for spesific element

      // Settings that can be overridden on per-element basis, by `data-purecounter-*` attributes:
      start: 0, // Starting number [unit]
      end: 400, // End number [unit]
      duration: 1.5, // The time in seconds for the animation to complete [seconds]
      delay: 10,
    });
  }, 5000);

  setTimeout(function () {
    new PureCounter({
      selector: ".counter-2",

      start: 0,
      end: 80,
      duration: 1.3,
      delay: 10,
    });
  }, 5300);

  setTimeout(function () {
    new PureCounter({
      selector: ".counter-3",

      start: 0,
      end: 15,
      duration: 0.7,
      delay: 10,
    });
  }, 5900);

  setTimeout(function () {
    // Decimal counter
    function countUp() {
      var numbers = 4.8, // final value
        i = 0,
        interval = setInterval(function () {
          i = +(i + 0.1).toFixed(1);
          document.getElementById("counter-decimal").innerHTML = i;
          if (i >= +numbers) {
            clearInterval(interval);
          }
        }, 18);
    }
    countUp();
  }, 6100);

  // MARQUEE
  $(".marquee_offset").marquee({
    //duration in milliseconds of the marquee
    duration: 20000,
    //gap in pixels between the tickers
    gap: 0,
    //time in milliseconds before the marquee will start animating
    delayBeforeStart: 0,
    //'left' or 'right'
    direction: "right",
    //true or false - should the marquee be duplicated to show an effect of continues flow
    duplicated: true,
    startVisible: true,
  });

  // CARDS ANIMATION

  // Service cards emergence
  let scrollTl2 = gsap.timeline({
    scrollTrigger: {
      trigger: $(".section_services"),
    },
  });

  scrollTl2.from(
    ".services_card",
    {
      opacity: 0,
      y: "100%",
      ease: CustomEase.create("custom", cardsEase),
      duration: 0.8,
      stagger: { each: 0.2 },
    },
    1
  );

  // Testimonial cards emergence
  let scrollTl3 = gsap.timeline({
    scrollTrigger: {
      trigger: $(".splide"),
    },
  });

  scrollTl3.from(
    ".splide__slide",
    {
      x: "30rem",
      scale: 0.6,
      opacity: 0,
      ease: CustomEase.create("custom", cardsEase),
      duration: 0.4,
      stagger: { each: 0.4 },
    },
    0.2
  );

  // Logos sroll animation
  let scrollTl4 = gsap.timeline({
    scrollTrigger: {
      trigger: $(".partners_logos-row"),
    },
  });

  scrollTl4.from(
    ".partners_logo",
    {
      scale: 0.8,
      opacity: 0,
      /*       ease: "power4.out", */
      ease: CustomEase.create("custom", logoEase),
      /*       duration: 0.5, */
      stagger: { from: "random", each: 0.12 },
    },
    0.12
  );

  // Card rotation
  $(".card_button-front").on("click", function () {
    var parentCard = $(this).closest(".services_card_wrapper");

    // Rotate the clicked card
    parentCard.toggleClass("is-rotated");

    // Rotate back other cards
    setTimeout(function () {
      $(".services_card_wrapper").not(parentCard).removeClass("is-rotated");
    }, 1000);
  });

  // Back button
  $(".card_button-back").on("click", function () {
    var parentCard = $(this).closest(".services_card_wrapper");
    parentCard.removeClass("is-rotated");
  });

  //SPLIDE SLIDER
  var splide = new Splide(".splide", {
    type: "slide",
    drag: "free",
    /*     perPage: 2, */
    start: 0,
    autoWidth: true,
    /*     gap: "1.25rem", */
    breakpoints: {
      480: {
        perPage: 1,
        /*         fixedWidth: "80rem",
        fixedHeight: "80rem",
        gap: "4rem", */
      },
    },
  });

  splide.mount();
});

window.onbeforeunload = function () {
  window.scrollTo(0, 0);
  $(".page-wrapper").hide();
  $(".black-screen").show();
};
