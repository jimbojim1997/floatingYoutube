var player;
var sidebar;
var isFloating = false;
var originalPlayerStyle;
var scrollTopThreshold = 10;
var playerFlaotTop = 50;

Load();

function Load() {
    player = document.getElementById("player-api");
    sidebar = document.getElementById("watch7-sidebar-contents");
    originalPlayerStyle = JSON.parse(JSON.stringify(player.style)); //clone player style to later revert to

    window.addEventListener("scroll", PageScroll, false);
    window.addEventListener("resize", PageResize, false);
    console.log("<Floating Youtube>: Loaded");

    PageScroll();
}

function PageScroll(e) {
    if (window.pageYOffset > scrollTopThreshold && !isFloating) {//make video float
        var playerScaleFactor = CalculatePlayerScale();

        player.style.position = "fixed";
        player.style.top = playerFlaotTop + "px";
        player.style.left = sidebar.getBoundingClientRect().left + "px";
        player.style.transformOrigin = "top left";
        player.style.transform = "scale(" + playerScaleFactor + ")";

        isFloating = true;
        console.log("<Floating Youtube>: Player floating:true");

    } else if (window.pageYOffset < scrollTopThreshold && isFloating) {//reset video
        player.style = originalPlayerStyle;

        isFloating = false;
        console.log("<Floating Youtube>: Player floating:false");
    }
}

function PageResize(e) {
    if (isFloating) {
        var playerScaleFactor = CalculatePlayerScale();
        player.style.left = sidebar.getBoundingClientRect().left + "px";
        player.style.transform = "scale(" + playerScaleFactor + ")";
    }
}

function CalculatePlayerScale() {
    var left = sidebar.clientLeft;
    var currentWidth = player.clientWidth;
    
    var availableWidth = sidebar.clientWidth;

    var scale = availableWidth / currentWidth;

    return scale;
}