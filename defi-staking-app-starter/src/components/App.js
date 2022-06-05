import React, {Component} from 'react'
import Navbar from './Navbar';

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <div className='text-center'>
          <h>Hello, world!</h>
        </div>
      </div>
    )
  }
}

export default App;