

window.onload = function() {	
	var music = document.getElementsByClassName('audio')[0];

	if(x >= 401) {
		music.volume = 0.2;

		var audioPlayer = document.getElementsByClassName('audioPlayer')[0];
		audioPlayer.onclick = function() {
			if(music.paused) {
				music.play();
				audioPlayer.style.backgroundImage = "url('" + audioBackgrounds.pause + "')";
			} else {
				music.pause();
				audioPlayer.style.backgroundImage = "url('" + audioBackgrounds.play + "')";
			}
		}
		var time = document.getElementsByClassName('time')[0];
		var date = document.getElementsByClassName('date')[0];
		
		updateTimeDisplay(time, date);

		//DOM data
		field = document.getElementById('field'); //global scope 
		document.body.style.backgroundPosition = -(0.1 * x) + "px " + -(0.1) * y + "px";

		document.body.onmousemove = function(event) {
			//console.log(event.clientX + ", " + event.clientY);
			var new_background_x, new_background_y;

			if(event.clientX < screen_regions.x_left_bound) {
				field.style.marginLeft = (0.1 * x) + "px"; //move left 
				new_background_x = 0; //new_margin_left = (0.005 * x); moved = "left";
			} else if(event.clientX > screen_regions.x_right_bound) {
				field.style.marginLeft = -(0.1 * x) + "px"; //move right
				new_background_x = -(0.2 * x); //new_margin_left = -(0.005 * x); moved = "right";
			} else if(event.clientX < screen_regions.x_right_bound && event.clientX > screen_regions.x_left_bound) {
				field.style.marginLeft = 0 + "px"; //return to center
				new_background_x = -(0.1 * x); //new_margin_left = 0; moved = "x"; //special case, need to remove mouse movement margin, but keep original margin 
			} 

			if(event.clientY < screen_regions.y_upper_bound) {
				field.style.marginTop = (0.1 * y) + "px"; //move up
				new_background_y = 0; //new_margin_top = (0.005 * y); moved = "up";
			} else if(event.clientY > screen_regions.y_lower_bound) {
				field.style.marginTop = -(0.1 * y) + "px"; //move down
				new_background_y = -(0.18 * y); //new_margin_top = -(0.005 * y); moved = "down";
			} else if(event.clientY < screen_regions.y_lower_bound && event.clientY > screen_regions.y_upper_bound) {
				field.style.marginTop = 0 + "px"; //return to center
				new_background_y = -(0.1 * y); //new_margin_top = 0; moved = "y";
			}

			//console.log(document.getElementById('field').childNodes);
			backgroundAnimate(new_background_x, new_background_y);
			//dotAnimate();
			//previously_moved = moved; //lag previously moved behind one
			//previous_margin_top = new_margin_top; 
			//previous_margin_left = new_margin_left;
		};

		//here's where the fun starts
		var regenerate = 4000;
		setInterval(function() {
			var numDots = getBetween(3, 5); //both inclusive
			
			//create dot randomization
			var dotData = generateDotMetadata(numDots);

			generateDots(dotData);

			//console.log(dotData);
		}, regenerate);
	} else {
		music.volume = 0;
	}
}

