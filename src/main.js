var scrollTopThreshold = 10;
var playerFlaotTop = 50;
var playerTransitionTime = 0.5;

var isFloating = false;
var playerID = "player-api";
var sidebarID = "watch7-sidebar-contents";

window.addEventListener("load", Load, false);
CheckReadyState();

function CheckReadyState(){
	if(document.readyState == "complete"){
		Load();
	}
}

function Load() {

    window.addEventListener("scroll", PageScroll, false);
    window.addEventListener("resize", PageResize, false);
	
	SetPlayerInitial();
	PageScroll();
	
	Log("Loaded");
}

function PageScroll() {
    if (window.pageYOffset > scrollTopThreshold && !isFloating) {//make video float
		SetPlayerFloating(true);
        isFloating = true;
        Log("Player floating:true");

    } else if (window.pageYOffset < scrollTopThreshold && isFloating) {//reset video
		SetPlayerInitial(true);
        isFloating = false;
        Log("Player floating:false");
    }
}

function SetPlayerFloating(useTransition){
	var player = _(playerID);
	var sidebar = _(sidebarID);
		
	var playerScaleFactor = CalculateScale(player, sidebar);

	if (useTransition) {
	    player.style.transition = "left {0}s ease-in-out, transform {0}s ease-in-out, transformOrigin {0}s ease-in-out".format(playerTransitionTime);
	} else {
	    player.style.transition = "";
	}

    player.style.position = "fixed";
    player.style.top = playerFlaotTop + "px";
    player.style.left = sidebar.getBoundingClientRect().left + "px";
    player.style.transformOrigin = "top left";
    player.style.transform = "scale(" + playerScaleFactor + ")";
}

function SetPlayerInitial(useTransition) {
	var player = _(playerID);
	var sidebar = _(sidebarID);
	
	if (useTransition) {
	    player.style.transition = "left {0}s ease-in-out, transform {0}s ease-in-out, transformOrigin {0}s ease-in-out".format(playerTransitionTime);
	} else {
	    player.style.transition = "";
	}
	
	player.style.position = "absolute";
	player.style.top = "0px";
	player.style.left = "0px";
	player.style.transformOrigin = "top left";
	player.style.transform = "scale(1)";
}

function PageResize(e) {
    if (isFloating) {
        SetPlayerFloating(false);
    }
}

function CalculateScale(target, scaleTo) {
    var currentWidth = target.clientWidth;    
    var availableWidth = scaleTo.clientWidth;

    var scale = availableWidth / currentWidth;
	
    return scale;
}

function Log(message) {
	if(typeof(message) == typeof("")){
		console.log("<Floating Youtube>: " + message);	
	}else{
		console.group("<Floating Youtube>:");
		console.log(message);
		console.groupEnd();
	}
}

String.prototype.format = function () {
    var args = arguments;
    var str = this.toString();
    for (var i = 0; i < args.length; i++) {
        var regex = /({(\d+)})/
        while (str.search(regex) != -1) {
            var match = regex.exec(str);
            str = str.replace(match[1], args[match[2]]);
        }
    }

    return str;
}

function _(id){
	return document.getElementById(id);
}