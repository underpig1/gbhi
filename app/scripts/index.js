const demo_data = [
    {
        "username": "Demo User",
        "id": 1000000,
        "stats": {
            "member_since": "10/6/16",
            "lifetime_points": "1.5K",
            "lifetime_campaigns": "10",
            "lifetime_badges": "6"
        },
        "badges": [
            "turtle-badge",
            "level-2-badge",
            "level-3-badge",
            "level-4-badge",
            "level-5-badge",
            "contender-badge"
        ],
        "points": 1000
    }
]

const user_id = 1000000;
const user_data = demo_data.filter((x) => x.id == user_id)[0];

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
        name: "insights",
        element: document.getElementById("insights"),
        icon: document.getElementById("insights-icon"),
        header: document.getElementById("insights-header"),
        content: document.getElementById("insights-main"),
        on_enter: () => { },
        on_leave: () => { },
        update: () => { }
    },
    {
        name: "campaign",
        element: document.getElementById("campaign"),
        icon: document.getElementById("campaign-icon"),
        header: document.getElementById("campaign-header"),
        content: document.getElementById("campaign-main"),
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
        on_enter: () => {
            corner.style.width = "160px";
            populate_points();
        },
        on_leave: () => corner.style.width = "115px",
        update: () => document.getElementById("point-count").innerText = ("000" + points).slice(-3 - parseInt(points / 1000))
    },
    {
        name: "profile",
        element: document.getElementById("profile"),
        icon: document.getElementById("profile-icon"),
        header: null,
        content: document.getElementById("profile-main"),
        on_enter: () => {},
        on_leave: () => {},
        update: () => {}
    }
];

const corner = document.getElementById("corner");
const nav = document.getElementById("nav");
const topbar = document.getElementById("topbar");
const nav_select = document.getElementById("nav-select");
const splash = document.getElementById("splash");

var tab_index = 0;
var new_tab_index = 0;
var points = 0;

function update_dom() {
    points = user_data.points;
    document.getElementById("lifetime-points-stat").innerText = user_data.stats.lifetime_points;
    document.getElementById("lifetime-campaigns-stat").innerText = user_data.stats.lifetime_campaigns;
    document.getElementById("lifetime-badges-stat").innerText = user_data.stats.lifetime_badges;
    document.getElementById("member-date").innerText = user_data.stats.member_since;
}

update_dom();

var si;
var p = parseInt("" + points);
var sc_prev = 0;

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

    tab.content.scrollTo(0, 0);
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
    new_tab_index = t;
    var new_tab = tabs[new_tab_index];

    if (t != tab_index) {
        tab_on_leave(old_tab);
        old_tab.on_leave();
        nav_on_enter(t);
        tab_on_enter(new_tab);
        new_tab.on_enter();
    }

    tab_index = t;
}

var populate_points = function() {
    clearInterval(si);
    points = p;
    p = parseInt("" + points);
    points = 0;
    si = setInterval((() => {
        if (points < p) points += p/50 + 1;
        else {
            points = p;
            clearInterval(si);
        }
    }), 10);
}

// setTimeout(() => splash.style.display = "none", 1000);

setInterval(update, 0);

function update() {
    var content = tabs[tab_index].content;
    var tab = tabs[tab_index];
    var scroll_y = content.scrollTop;

    if (sc_prev != scroll_y) {
        if (tab.header) {
            tab.header.style.transform = `translateY(${-scroll_y / 2}px)`;
            tab.header.style.opacity = (screen.height / 2 - scroll_y) / screen.height * 2;
        }
        corner.style.transform = `translateY(${-scroll_y / 2}px)`;
        nav.style.transform = `translateY(${scroll_y > 0 ? scroll_y * 2 / 3 : 0}px)`;
        topbar.style.transform = `translateY(${-scroll_y}px)`;
    }
    sc_prev = parseInt("" + scroll_y);

    tab.update();
}

document.body.addEventListener("touchend", (e) => {
    e.preventDefault();
}, false);