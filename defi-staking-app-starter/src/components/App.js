import React, {Component} from 'react'
import Navbar from './Navbar';
import Web3 from 'web3';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      account: '0x00'
    }
  }

  async componentWillUnmount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadBlockchainData() {
    const web3 = window.web3
    const account = web3.eth.getAccounts()
    console.log(account)
  }

  async loadWeb3() {
    if(window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    } else if(window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    } else {
      window.alert('No ethereum browser detected! Check out Metamask!')
    }
  }

  render() {
    return (
      <div>
        <Navbar account={this.state.account} />
        <div className='text-center'>
          <h1>Hello, world!</h1>
        </div>
      </div>
    )
  }
}

export default App;