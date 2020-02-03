SmartBrainApp - An Image recognition app
Buiit with- 
FrontEnd - React JS and Tachyons (Functional CSS framework) 

Step 1:
Logo, Navigation, rank, ImageLinkForm, FaceRecogntion were created and The home page was first built with them. Upon achieving the image recognition functionalities which required the using of the css box model to connect the coordinates given by the clarifai API (treated by the calculateFaceLocation function.) After that the signin and register pages were then created.

Logo component
- this simply imported the logo and displayed it with styles.

Step 2:
Navigation component
- At first this only displayed the signout p tag. onRouteChange function was then created to link the homepage with sign in and register page. Step # detailed how those navigation links were affected with the 2 functions recieved by the navigation component. 
N.B that in App.js, a tenary if else was created to switch the displayed state i.e which components will display when route is home and 
additonal nested ternary to switch between signin and sign out.  

Step 3:
ImageLinkForm has onInputChange={this.onInputChange} and onButtonSubmit={this.onButtonSubmit} as passed functions. 
FaceRecognition component recieves box={this.state.box} and imageUrl={this.state.imageUrl} functions

Step #: SignIn Page
- The route helps us keep track of where we are. An if and else is then created making the sign page the original route. A onSignInROute function is then passed to SignIn tag to route it to the home page upon signin.

- The signin component then recieves the onRouteChange function and the signin input onclick event directs it to the recieved function. 
- This however makes no change since route has been set to 'home' <!-- and 'signin' --> . So we have to change that and make the function recieve route and route = route. We then give the onclick part of signin component an onroutechange function that is set to home.
The navigation page too puts it on onrouteChange function to signin. N.B it has to be function () => onRouteChange(route) or else the passed route runs when it renders.

- The signup function is the same as SignIn and SignIn's signup tag is updated to route to the signup component
- But the signout navigation shows on all pages. This shouldnt be so as the navigation should chnge based on the page we are. And if else statement will fix this both on the navigation and on the routechange function.
N.B isSignedIn has to come before onRouteChange when calling <Navigation /> or else it wont run the isSignedIn


Write simple blog post like https://blog.prototypr.io/tachyons-the-css-framework-you-never-knew-you-needed-8361955a16f1. 

Connecting Front End and BackEnd

We ran different route address for front end and backend because we should treat them as 2 different computers communicating.


Connecting Signin Page
Because we created the signin functionality as a component. It would be better to make run all the back end connections inside it. Thus we have to make it accept state. We have to insert class and extend React.Component and thereafter giving props to functions called from App.js


//setState below shouldn't be changing the user everytime as its only the entries that need updating. Object.assign fix this by taking a target and source















