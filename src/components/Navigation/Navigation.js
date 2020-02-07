import React from 'react';

const Navigation = ({onRouteChange , isSignedIn}) => {
	if (isSignedIn) {
		return (
			<nav style={{display: 'flex', justifyContent: 'flex-end'}}>
				<p onClick={() => onRouteChange('signout')} className="f3 mr5 mt5 dim underline black p3 pointer">Sign out</p>
			</nav>
	);
	}
	else {
		return (
			<nav style={{display: 'flex', justifyContent: 'flex-end'}}>
				<p onClick={() => onRouteChange('SignIn')} className="f3 mr5 mt5 dim underline black p3 pointer">Sign In</p>
				<p onClick={() => onRouteChange('SignUp')} className="f3 mr5 mt5 dim underline black p3 pointer">Register</p>
			</nav>
	);

	}	

	
}



export default Navigation;