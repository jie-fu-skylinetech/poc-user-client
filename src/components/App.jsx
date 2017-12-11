import React, {PropTypes} from 'react';

import {
	Framework7App, Statusbar, Panel, View, Navbar, Pages, Page, ContentBlock, ContentBlockTitle, 
	Button, Views,
	LoginScreen, LoginScreenTitle
} from 'framework7-react';

import { Tabs } from 'framework7-react/dist/commonjs/framework7-react/Tabs';

import {axios} from 'axios';

const signon = (e) =>{

	const fs = require('fs')
		 fs.readFile('package.json', 'utf8', function(err, contents){
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
}

const register = (e) =>{
	console.log("register")
}

const MainViews = (props, context) => {
	return (
		<Views>
			<View id="main-view" navbarThrough dynamicNavbar={true} main url="/">
				{/* Pages */}
				<Pages navbarThrough >
					<Page >
					<LoginScreenTitle>
						Sky App
						<Button onClick={signon}> Sign On</Button>
						<Button onClick={register}>Register</Button>
					</LoginScreenTitle>
					</Page>
				</Pages>
			</View>
		</Views>
	);
};

MainViews.contextTypes = {
	framework7AppContext: PropTypes.object
};

export const App = (props) => (	
	//Change themeType to "material" to use the Material theme
	<Framework7App themeType="material">		
		<Statusbar />		
		<MainViews props/>
	</Framework7App>  
);
