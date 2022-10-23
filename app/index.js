const tabs = [
    {
        name: "feed",
        element: document.getElementById("feed"),
        icon: document.getElementById("feed-icon"),
        header: document.getElementById("feed-header"),
        content: document.getElementById("feed-main"),
        on_enter: () => { },
        on_leave: () => { },
        update: () => { }
    },
    {
        name: "rewards",
        element: document.getElementById("rewards"),
        icon: document.getElementById("rewards-icon"),
        header: document.getElementById("rewards-header"),
        content: document.getElementById("rewards-main"),
        on_enter: () => corner.style.width = "160px",
        on_leave: () => corner.style.width = "115px",
        update: () => document.getElementById("point-count").innerText = ("000" + points).slice(-3 - Math.round(points / 1000))
    }
];

const corner = document.getElementById("corner");
const nav = document.getElementById("nav");
const topbar = document.getElementById("topbar");
const nav_select = document.getElementById("nav-select");

var tab_index = 0;
var new_tab_index = 0;
var points = 5;

var tab_on_enter = function (tab) {
    tab.element.classList.add("tab-active");
    tab.icon.style.opacity = "1";
    var prev_transition = tab.element.style.transition;
    tab.element.style.transition = "transform 0s ease";
    tab.element.style.transform = tab_index > new_tab_index ? "translateX(-100%)" : "translateX(100%)";

    setTimeout(() => {
        tab.element.style.transition = prev_transition;
        tab.element.style.transform = "translateX(0)";
    }, 1);
}

var nav_on_enter = function (t) {
    var tab_box = [...nav.childNodes].filter((n) => n.nodeType == Node.ELEMENT_NODE)[t + 1].getBoundingClientRect();
    nav_select.style.left = `${tab_box.x + tab_box.width / 2 - 30}px`;
}

var tab_on_leave = function (tab) {
    tab.element.classList.remove("tab-active");
    tab.element.style.transform = tab_index > new_tab_index ? "translateX(100%)" : "translateX(-100%)";
    tab.icon.style.opacity = "0";
}

var set_tab = (t) => {
    var old_tab = tabs[tab_index];
    var new_tab = tabs[t];

    if (t != tab_index) {
        tab_on_leave(old_tab);
        old_tab.on_leave();
        nav_on_enter(t);
        tab_on_enter(new_tab);
        new_tab.on_enter();
    }

    tab_index = t;
}

setInterval(update, 0);

function update() {
    var content = tabs[tab_index].content;
    var tab = tabs[tab_index];

    tab.header.style.transform = `translateY(${-content.scrollTop / 2}px)`;
    tab.header.style.opacity = (screen.height / 2 - content.scrollTop) / screen.height * 2;
    corner.style.transform = `translateY(${-content.scrollTop / 2}px)`;
    nav.style.transform = `translateY(${content.scrollTop > 0 ? content.scrollTop * 2 / 3 : 0}px)`;
    topbar.style.transform = `translateY(${-content.scrollTop}px)`;

    tab.update();
}

document.body.addEventListener("touchend", (e) => {
    e.preventDefault();
}, false);