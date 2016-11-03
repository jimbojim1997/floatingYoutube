var scrollTopThreshold = 10;
var playerFlaotTop = 50;

var isFloating = false;
var playerID = "player-api";
var sidebarID = "watch7-sidebar-contents";

window.addEventListener("load", Load, false);

function Load() {
    //originalPlayerStyle = JSON.parse(JSON.stringify(player.style)); //clone player style to later revert to

    window.addEventListener("scroll", PageScroll, false);
    window.addEventListener("resize", PageResize, false);
	
	SetPlayerInitial();
	PageScroll();
	
	Log("Loaded");
}

function PageScroll() {
    if (window.pageYOffset > scrollTopThreshold && !isFloating) {//make video float
		SetPlayerFloating();
        isFloating = true;
        Log("Player floating:true");

    } else if (window.pageYOffset < scrollTopThreshold && isFloating) {//reset video
		SetPlayerInitial();
        isFloating = false;
        Log("Player floating:false");
    }
}

function SetPlayerFloating(){
	var player = _(playerID);
		var sidebar = _(sidebarID);
		
		var playerScaleFactor = CalculateScale(player, sidebar);

		player.style.transition = "left 0.5s ease-in-out, transform 0.5s ease-in-out, transformOrigin 0.5s ease-in-out";
        player.style.position = "fixed";
        player.style.top = playerFlaotTop + "px";
        player.style.left = sidebar.getBoundingClientRect().left + "px";
        player.style.transformOrigin = "top left";
        player.style.transform = "scale(" + playerScaleFactor + ")";
}

function SetPlayerInitial(){
	var player = _(playerID);
	var sidebar = _(sidebarID);
	
	player.style.position = "absolute";
	player.style.top = "0px";
	player.style.left = "0px";
	player.style.transformOrigin = "top left";
	player.style.transform = "scale(1)";
}

function PageResize(e) {
    if (isFloating) {
		var player = _(playerID);
		var sidebar = _(sidebarID);
		
        var playerScaleFactor = CalculatePlayerScale(player, sidebar);
        player.style.left = sidebar.getBoundingClientRect().left + "px";
        player.style.transform = "scale(" + playerScaleFactor + ")";
    }
}

function CalculateScale(target, scaleTo) {
    var currentWidth = target.clientWidth;    
    var availableWidth = scaleTo.clientWidth;

    var scale = availableWidth / currentWidth;
	
    return scale;
}

function Log(message){
	if(typeof(message) == typeof("")){
		console.log("<Floating Youtube>: " + message);	
	}else{
		console.group("<Floating Youtube>:");
		console.log(message);
		console.groupEnd();
	}
}

function _(id){
	return document.getElementById(id);
}