// Code by Vicente K. Parmigiani 2021

// globalVariables

let currentPage = 0;
let cat = 0;
let cardsPerPage;
if (Math.floor((window.innerWidth - 220) / 352) - 1 > 0) {
  cardsPerPage = Math.floor((window.innerWidth - 220) / 352) - 1;
} else {
  cardsPerPage = 0;
}
const contentHolder = document.getElementById("content");
const infoPage = document.getElementById("info_page");
const infoPageBg = document.getElementById("info_page_bg");
let contentLength = 0;
let pageCount = 4;

// Firebase

const firebaseConfig = {
  apiKey: "AIzaSyCt2-ffauSCcT89GTb-vI1kumeHhfHw8fE",
  authDomain: "vicente-parmigiani.firebaseapp.com",
  projectId: "vicente-parmigiani",
  storageBucket: "vicente-parmigiani.appspot.com",
  messagingSenderId: "931230194601",
  appId: "1:931230194601:web:9816b5773761cd895482b8",
  measurementId: "G-4B7F7JZFTW"
};

// Initialize Firebase
//const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

// Nav menu

for (let i = 0; i <= pageCount; i++) {
  const nav = document.getElementById("nav" + i);
  nav.addEventListener("click", () => {
    setPagePos(i);
  });

  const navM = document.getElementById("navMob" + i);
  navM.addEventListener("click", () => {
    setPagePos(i);
  });
}

function setPagePos(pos) {
  const navBox = document.getElementById("selected_nav");
  navBox.style.top = 190 + pos * 40 + "px";
  cat = pos;

  // Mobile nav menu label
  document.getElementById("current_selection_text").textContent =
    content[cat].title;

  inflateContent(pos);
}

// Mobile nav menu

const navMobMain = document.getElementById("mobile-nav");
const navMobInput = document.getElementById("current_selection");
const navMob = document.getElementById("selection_menu");

let navMobOpen = false;

function openNavMob() {
  navMob.className = "selection_menu selection_menu_open";
  navMobOpen = true;

  // Add event listener to close nav menu when clicking outside of it
  document.addEventListener("click", (e) => {
    if (
      e.target.id != "selection_menu" &&
      e.target.id != "current_selection" &&
      e.target.id != "current_selection_text" &&
      e.target.id != "current_selection_arrow" &&
      e.target.id != "nav_mob_arrow"
    ) {
      closeNavMob();
    }
  });
}

function closeNavMob() {
  navMob.className = "selection_menu selection_menu_close";
  navMobOpen = false;
}

// Buid website

function inflateContent(pos) {
  contentLength =
    Math.floor(Object.keys(content[cat].content).length / (cardsPerPage + 1)) +
    1;
  const dots = document.getElementById("dots");
  dots.innerHTML = "";

  for (i = 0; i < contentLength; i++) {
    const dot = document.createElement("div");
    dot.className = "dot";
    dot.id = "dot" + i;
    dots.appendChild(dot);
  }

  setPagePosRow(0);
}

function setPagePosRow(page) {
  currentPage = page;
  contentHolder.innerHTML = "";

  contentHolder.preventDefault;
  contentHolder.classList.remove("contentAnimation");
  void contentHolder.offsetWidth;
  contentHolder.classList.add("contentAnimation");

  if (currentPage == 0) {
    inflateDiv(0, 0);
    for (let i = 1; i <= cardsPerPage; i++) {
      inflateDiv(content[cat].content[i - 1], i - 1);
    }
  } else {
    for (let i = 0; i < cardsPerPage + 1; i++) {
      try {
        inflateDiv(
          content[cat].content[cardsPerPage * page + page + i - 1],
          cardsPerPage * page + page + i - 1
        );
      } catch (e) {}
    }
  }

  for (i = 0; i < contentLength; i++) {
    document.getElementById("dot" + i).className = "dot";
  }

  document.getElementById("dot" + page).className = "dot selecteddot";
}

function inflateDiv(divSettings, id) {
  const div = document.createElement("div");
  const subdiv = document.createElement("div");
  const title = document.createElement("h2");
  const subtitle = document.createElement("p");

  if (divSettings == 0) {
    div.className = "titleDiv";
    subdiv.className = "titlesubdiv";
    title.innerHTML = content[cat].title;
    title.className = "titletitle";
    subtitle.innerHTML = content[cat].description;
  } else {
    div.className = "div";
    div.id = "div." + cat + "." + id;
    div.addEventListener("click", () => {
      openDialog(cat, id);
    });
    subdiv.className = "subdiv";
    title.className = "title";
    title.innerHTML = divSettings.card_title;
    subtitle.innerHTML = divSettings.card_subtitle;
    div.style.backgroundImage = "url(assets/" + divSettings.card_img + ".png)";
  }

  subdiv.appendChild(title);
  subdiv.appendChild(subtitle);
  div.appendChild(subdiv);
  contentHolder.appendChild(div);
}

inflateContent(0);

function openDialog(c, id) {
  infoPage.className = "infopageAnimation";
  infoPage.style.animationName = "infoIn";
  infoPage.style.display = "block";

  infoPageBg.style.display = "block";
  infoPageBg.style.opacity = 1;

  const title = document.getElementById("page_title");
  const subtitle = document.getElementById("page_subtitle");
  const text = document.getElementById("page_info");
  const img = document.getElementById("page_cover");

  title.innerHTML = content[c].content[id].card_title;
  subtitle.innerHTML = content[c].content[id].card_subtitle;
  text.innerHTML = content[c].content[id].page_info;
  img.style.backgroundImage =
    "url('assets/" + content[c].content[id].card_img + ".png')";

  // Handle link
  const link = document.getElementById("page_link");
  if (
    content[c].content[id].card_link == "" ||
    content[c].content[id].card_link == undefined
  ) {
    link.style.display = "none";
  } else {
    link.style.display = "block";
    link.href = content[c].content[id].card_link;
  }
}

function closeDialog() {
  infoPage.style.animationName = "infoOut";
  setTimeout(() => {
    infoPage.style.display = "none";
  }, 500);
  infoPageBg.style.opacity = 0;
  setTimeout(() => {
    infoPageBg.style.display = "none";
  }, 200);
}

document.getElementById("arrow_next").addEventListener("click", () => {
  if (currentPage < contentLength - 1) {
    currentPage++;
  } else {
    currentPage = 0;
  }

  setPagePosRow(currentPage);
});
