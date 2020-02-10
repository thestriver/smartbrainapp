import React, { Component } from 'react'
import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Rank from './components/Rank/Rank'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import SignIn from './components/SignIn/SignIn'
import SignUp from './components/SignUp/SignUp'
import Particles from 'react-particles-js'
// import Clarifai from 'clarifai'
import './App.css'


// const app = new Clarifai.App({
//  apiKey: '046a74a0bc114f0fa14a73cc0baa9859'
// });


const particlesOption = {
  particles: {
      number: {
        value: 150,
        density: {
          enable:true,
          value_area: 1500
        }
      }
  }
}

const initialState = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'SignIn',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''

}

}

class App extends Component {
  constructor() {
    super();
    this.state = initialState ;
    
}
  //just for checking if its been connected
  // componentDidMount() {. 
  //   fetch('http://localhost:3001').then(response => response.json())
  //   .then(data => console.log(data))
  // }



  loadUser = (data) => {
    this.setState({user: {
          id: data.id,
          name: data.name,
          email: data.email,
          entries: data.entries,
          joined: data.joined
    
        }})
  }
  
  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow : clarifaiFace.top_row * height ,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height),
    }
  }

  displayBox = (box) => {
    // console.log(box)
    this.setState({box : box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => { //better word would have been onPictureSubmit
    this.setState({imageUrl : this.state.input});
    // app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
     fetch('https://stark-river-72091.herokuapp.com/imageurl' , { 
          method: 'post',
          headers: {'Content-Type' : 'application/json'},
          body: JSON.stringify({
            input: this.state.input
          })
      }).then(response => response.json())


    .then(response => {
      if(response) {
      fetch('https://stark-river-72091.herokuapp.com/image' , { 
          method: 'put',
          headers: {'Content-Type' : 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id
          })

      })
        .then(response => response.json())
        .then(count => { //setState below shouldn't be changing the user everytime as its only the entries that need updating. Object.assign fix this
          this.setState(Object.assign(this.state.user, { entries: count}))
        })
        .catch(console.log)
      }
      this.displayBox(this.calculateFaceLocation(response))

    })
    .catch(err => console.log(err));
    
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState)
    }
    else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});

  }

  render() {
    return (
      <div className="App">
        <Particles className="particles" params={particlesOption}/>
        <Navigation isSignedIn={this.state.isSignedIn}  onRouteChange={this.onRouteChange}  /> 
        {this.state.route === 'home'                    //an if else statement and you have to wrap the else in a tag cos of JSX
                ? 
                  <div>
                    <Logo />
                    <Rank 
                      name={this.state.user.name}
                      entries={this.state.user.entries}
                    />
                    <ImageLinkForm 
                      onInputChange={this.onInputChange} 
                      onButtonSubmit={this.onButtonSubmit} 
                    />
                   
                    <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} /> 
                  </div>
                 :
                  (this.state.route === 'SignIn'
                    ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
                    : <SignUp loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
                  ) 
      }
      </div>
    );
}
}

export default App;


