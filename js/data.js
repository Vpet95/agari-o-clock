
//client data, boundaries, initialization
var colorList = ["#66CCFF", "#66FF99", "#FFBD5C", "#FF6699", "#33CCCC", "#5200CC", "#E60000", "#006699"];
var imgPath = "assets/img/"
var skinPath = imgPath + "skins/";
var audPath = "assets/audio/";
var fileType = ".png";
var skins = [
	"doge", "earth", "origin", "pokerface", "reddit", "sir", "wojak", "yaranaika", "tumblr", "facebook1", "mars",
	"moon", "cia", "bait", "9gag", "ayy-lmao", "4chan", "8ch", "2ch.hk_", "facepunch", "matriarchy", "patriarchy",
	"sanik", "steam", "feminism1", "stussy", "hitler", "nasa", "pewdiepie", "piccolo", "poland", "obama", "putin", 
	"kim-jong-un", "palin", "bush", "stalin", "usa", "china", "russia", "canada", "australia", "spain", "brazil",
	"germany", "ukraine", "france", "sweden", "north-korea", "south-korea", "japan", "united-kingdom", "greece",
	"latvia", "lithuania", "estonia", "finland", "norway", "maldivas", "austria", "nigeria", "confederate", 
	"indiana", "italy", "ussr", "bulgaria", "hong-kong", "portugal", "jamaica", "german-empire", "mexico", 
	"switzerland", "receita-federal"
]
var playerSounds = [
	"bodil",
	"double",
	"pewdiepie",
	"mattshea",
	"markiplier"
]

var x = window.outerWidth, y = window.outerHeight;
var boundaries = {
	x_lower: -50,
	x_upper: x + 50,
	y_lower: -50, 
	y_upper: y + 50
}

var dot_min_size = 50;
var dot_max_size = ((x - (x / 2) > y - y/2) ? (x - x/2) : (y - y/2));

//mouse animation data 
var screen_center = {
	x: x/2,
	y: y/2
}

var screen_regions = {
	y_upper_bound: screen_center.y - 0.25 * y, //top edge of rectangle
	y_lower_bound: screen_center.y + 0.25 * y, //bottom edge of rectangle
	x_left_bound: screen_center.x - 0.25 * x,  //left edge of rectange 
	x_right_bound: screen_center.x + 0.25 * x  //right edge of rectangle 
}

//var moved, previously_moved = null, new_margin_top, new_margin_left, previous_margin_top = null, previous_margin_left = null;

var daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var monthsOfYear = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var audioBackgrounds = {
	play: "assets/img/play-button.png",
	pause: "assets/img/pause-button.png"
}