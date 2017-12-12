import React, {PropTypes} from 'react';

import {
	Framework7App, Statusbar,  View, Pages, Page, 
	//ListView, ListItem, List,Panel,
	Views, 	LoginScreenTitle
} from 'framework7-react';

import axios from 'axios';

class MainViews extends React.Component{
	constructor(){
		super()
		MainViews.contextTypes = {
			framework7AppContext: PropTypes.object
		};
		axios.interceptors.request.use(request => {
			console.log('Starting Request', request)
			return request
		})
		  
		axios.interceptors.response.use(response => {
			console.log('Response:', response)
			return response
		})
	}
	register = (e) =>{
		console.log("register")
	}	
	signon = (e) =>{
		console.log("signon")
		var me = this;
		var ctx = this.refs.canvas.getContext('2d');
		var url = '/images/Tulips.jpg';
		var img = new Image();
		//console.log('start onload')
		img.onload = function () {    
			//console.log('drawing')			
			ctx.drawImage(img, 0, 0, 600, 600,
				 0, 0, 200, 200);    
			var dataImg = me.refs.canvas.toDataURL();	
			//console.log(dataImg)
/*
			axios.post('https://reqres.in/api/login', {
				"email": "peter@klaven",
				"password": "cityslicka"
				})
*/
/*
			axios.post('http://localhost:5000/isWellKnownUser', {
				"imageId": "test",
				"imageData": dataImg,
				"random": Math.random()
			})
			.then(function (response) {
				console.log(">>>success>>>")
				console.log(response.data);
			})
			.catch(function (error) {
				console.log(">>>error>>>")
				console.log(error);
			}); 	
*/

			const form = new FormData();
			// Second argument  can take Buffer or Stream (lazily read during the request) too.
			// Third argument is filename if you want to simulate a file upload. Otherwise omit.
			form.append('selfie', dataImg);
			form.append('random', Math.random())
			axios.post('http://localhost:5000/isWellKnownUserForm', form)
			.then(result => {
			// Handle result…
			console.log(result.data);
			});

		}
		img.src = url;
	
		/*
		const fs = require('fs')
			 fs.readFile('images/Tulips.jpg', 'utf8', function(err, contents){
			 console.log(contents)
		 })
		axios.post('https://reqres.in/api/login', {
			"email": "peter@klaven",
			"password": "cityslicka"
		})
		.then(function (response) {
			console.log(response.data);
		})
		.catch(function (error) {
			console.log(error);
		}); 	
		console.log("Signon")
	*/
	}
	render(){
		return <Views>
		<View id="main-view" navbarThrough main url="/">
			<Pages >
				<Page >
				<LoginScreenTitle>
					Sky App
				</LoginScreenTitle>
				<div className="row">
					<div className="col-30"></div>
					<div className="col-40">
						<div className="center">
						<a onClick={this.signon} className="button button-big button-green">Sign On</a>
						<a onClick={this.register} className="button button-big button-red">Register</a>
						<canvas ref="canvas" width="{200}" height="{200}" className='sky-hidden'></canvas>
						</div>
					</div>
					<div className="col-30"></div>
				</div>      				
				<div className="row">
				<div className="center">
						
				</div>
				</div>
				</Page>
			</Pages>
		</View>
	</Views>

	}
}

//MainViews.contextTypes = {	framework7AppContext: PropTypes.object};

export const App = (props) => (	
	//Change themeType to "material" to use the Material theme
	<Framework7App themeType="material" >		
		<Statusbar />		
		<MainViews props/>
	</Framework7App>  
);

/*
navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
    destinationType: Camera.DestinationType.FILE_URI });

function onSuccess(imageURI) {
    var image = document.getElementById('myImage');
    image.src = imageURI;
}

function onFail(message) {
    alert('Failed because: ' + message);
}
*/