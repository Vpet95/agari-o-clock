function getRandom() {
	return Math.random();
}

function getBetween(min, max) {
	if(min === max) return min;
	return Math.floor(getRandom() * (max - min + 1)) + min;
}

function generateDotMetadata(num) {
	var data = [];
	for(var i = 0; i < num; i++) {
		data[i] = new (function() {
			this.background = ((getBetween(0, 1) === 0) ? null : skins[getBetween(0, skins.length - 1)]);
			this.color = colorList[getBetween(0, colorList.length - 1)];
			this.top = getBetween(boundaries.y_lower, boundaries.y_upper) + "px";
			this.left = getBetween(boundaries.x_lower, boundaries.x_upper) + "px";
			this.width = getBetween(dot_min_size, dot_max_size);
			this.height = this.width; 												  			   //to keep dots round
			this.margin = -Math.round((this.height - dot_min_size) / 2);						   //margin is added to animate expansion of dot from center
			this.zIndex = this.height; 															   //in agar.io, z-index is based off of the size of the blob
			this.delay = getBetween(0, 700); 										  			   //creation delay 
			this.decay = getBetween(500, 3500);										  			   //decay in ms 
			this.animationTime = Math.round(((this.decay - 0.75 * this.decay) / 1000) * 10) / 10 ; //time in seconds, rounded to 1 decimal
		})();
	}

	return data;
}

function generateDots(dotData) {
	for(var i = 0; i < dotData.length; i++) {
		createDot(i, dotData);
	}
}

function createDot(i, dotData) {
	setTimeout(function() {
		var dot = document.createElement('div');
		dot.className = 'dot'; //applies border-radius and opacity of 0, animates

		if(dotData[i].background != null) {
			dot.style.backgroundImage = "url('" + skinPath + dotData[i].background + fileType + "')";
			dot.style.backgroundSize = "100% 100%";
			dot.style.backgroundRepeat = "no-repeat";
			dot.style.backgroundPosition = "center";
		} else {
			if(dotData[i].width > 250) {
				var playerName = document.createElement('p');
				var playerPhrase = document.createElement('audio');
				var ran = getBetween(1, 100); var created = false;
				if(ran > 8 && ran <= 14) { //we want the player name to display if player is not a special type like 'doge'
					var theSound = audPath + playerSounds[0] + getBetween(1, 21) + ".wav";
					var theName = document.createTextNode("Bodil40"); //tribute to my favorite agar.io player! ;)
					created = true;
					var theLink = "https://www.youtube.com/user/Bodil40";
				} else if(ran > 28 && ran <= 34) {
					var theSound = audPath + playerSounds[1] + getBetween(1, 12) + ".wav";
					var theName = document.createTextNode("Double"); //tribute to another one of my favorite agar.io players ;D 
					created = true;
					var theLink = "https://www.youtube.com/user/Mr360Games";
				} else if(ran > 48 && ran <= 54) {
					var theSound = audPath + playerSounds[2] + getBetween(1, 14) + ".wav";
					var theName = document.createTextNode("pewdiepie"); //tribute to the legend, pewdiepie
					created = true;
					var theLink = "https://www.youtube.com/user/PewDiePie";
				} else if(ran > 68 && ran <= 74) {
					var theSound = audPath + playerSounds[3] + getBetween(1, 15) + ".wav";
					var theName = document.createTextNode("MattShea"); //tribute to MattShea
					created = true;
					var theLink = "https://www.youtube.com/user/MattShea369";
				} else if(ran > 88 && ran <= 94) {
					var theSound = audPath + playerSounds[4] + getBetween(1, 16) + ".wav";
					var theName = document.createTextNode("Markiplier"); //tribute to Markiplier
					created = true;
					var theLink = "https://www.youtube.com/channel/UC7_YxT-KID8kRbqZo7MyscQ";
				} else if(ran > 0 && ran <= 8) {
					var theName = document.createTextNode("W=Team"); //Because LOL 
					created = true;
				}
				if(created) {
					if(theSound != null && theSound != 'undefined') {
						playerPhrase.setAttribute("src", theSound);
						playerPhrase.setAttribute("autoplay", true);
					}
					var playerLink = document.createElement('a');
					playerLink.href = theLink;
					playerLink.setAttribute('target', '_blank');
					playerName.appendChild(theName);
					dot.appendChild(playerName);
					dot.appendChild(playerPhrase);
					playerName.className = "playerName";

					created = false;
				}
			}
		}
		dot.style.opacity = 0; //default opacity, animates
		dot.style.backgroundColor = dotData[i].color;
		dot.style.marginTop = "0px"; //default margin, animates
		dot.style.marginLeft = "0px"; //default margin, animates
		dot.style.top = dotData[i].top;
		dot.style.left = dotData[i].left;
		dot.style.width = dot_min_size + "px"; //default width, animates
		dot.style.height = dot_min_size + "px";	//default height, animates
		dot.style.zIndex = dotData[i].zIndex;

		//calculated animation time
		dot.style.webkitTransition = "all " + dotData[i].animationTime + "s ease"; 

		//actually adds dot to the dom and displays 
		if(playerLink != null && typeof(playerLink) != 'undefined') {
			field.appendChild(playerLink);
			playerLink.appendChild(dot);
		} else {
			field.appendChild(dot); 
		}

		//changing values after appending to trigger CSS3 animations
		setTimeout(function() {
			dot.style.opacity = 1;
			dot.style.width = dotData[i].width + "px";
			dot.style.height = dotData[i].height + "px";
			dot.style.marginTop = dotData[i].margin + "px";
			dot.style.marginLeft = dotData[i].margin + "px";
		}, 100);

		//fades out dot and removes from DOM
		setTimeout(function() {
			dot.style.webkitTransition = "all 1s ease"; //consistent fadeout
			setTimeout(function() {
				dot.style.opacity = 0;
			}, 100) 
			
			setTimeout(function() {
				if(playerLink != null && typeof(playerLink) != 'undefined') {
					field.removeChild(playerLink);
				} else {
					field.removeChild(dot);	
				}
			}, 1000);
		}, dotData[i].decay);
	}, dotData[i].delay);
}

function backgroundAnimate(x_val, y_val) {
	document.body.style.backgroundPositionX = x_val + "px";
	document.body.style.backgroundPositionY = y_val + "px";
}

/*the tricky part is moving mouse back to center; the previous margin added from the mouse movement needs to be removed, but the margins from the dot 
  expansion need to stay*/
function dotAnimate() {
	var dotList = document.getElementsByClassName('dot');
	for(var i = 0; i < dotList.length; i++) {
		if(moved == "x") {
			if(previously_moved == "left" || previously_moved == "right") {
				dotList[i].style.marginLeft = parseFloat(dotList[i].style.marginLeft.substr(0, dotList[i].style.marginLeft.length - 2)) - previous_margin_left + "px";
			}
		} else if(moved == "left" || moved == "right") {
			dotList[i].style.marginLeft = parseFloat(dotList[i].style.marginLeft.substr(0, dotList[i].style.marginLeft.length - 2)) + new_margin_left + "px";
		} else if(moved == "y") {
			if(previously_moved == "up" || previously_moved == "down") {
				dotList[i].style.marginTop = parseFloat(dotList[i].style.marginTop.substr(0, dotList[i].style.marginTop.length - 2)) - previous_margin_top + "px";
			}
		} else if(moved == "up" || moved == "down") {
			dotList[i].style.marginTop = parseFloat(dotList[i].style.marginTop.substr(0, dotList[i].style.marginTop.length - 2)) + new_margin_top + "px";
		}
	}
}

function setUpDay(day) {
	var dig = day % 10;
	if(dig == 1 && day != 11) {
		return day + "st";
	} else if(dig == 2 && day != 12) {
		return day + "nd";
	} else if(dig == 3 && day != 13) {
		return day + "rd";
	} else {
		return day + "th";
	}
}

function update(time, date) {
	today = new Date();
	if(today.getHours() > 12) {
		if(today.getMinutes() < 10) {
			time.innerHTML = (today.getHours() - 12) + ":0" + today.getMinutes() + " PM";
		} else {
			time.innerHTML = (today.getHours() - 12) + ":" + today.getMinutes() + " PM";
		}

		if(today.getHours() == 23 && today.getMinutes() == 59 && today.getSeconds() == 59) {
			//update date
			date.innerHTML = daysOfWeek[today.getDay()] + ", " + monthsOfYear[today.getMonth()] + " " + setUpDay(today.getDate()) + ", " + today.getFullYear();
		}
	} else {
		if(today.getMinutes() < 10) {
			time.innerHTML = today.getHours() + ":0" + today.getMinutes() + " AM";
		} else {
			time.innerHTML = today.getHours() + ":" + today.getMinutes() + " AM";
		}
	}
}

function updateTimeDisplay(time, date) {
	var today = new Date();
	date.innerHTML = daysOfWeek[today.getDay()] + ", " + monthsOfYear[today.getMonth()] + " " + setUpDay(today.getDate()) + ", " + today.getFullYear();

	update(time, date);

	setInterval(function() {
		update(time, date);
	}, 1000)
}