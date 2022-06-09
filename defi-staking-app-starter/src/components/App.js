import React, {Component} from 'react'
import Navbar from './Navbar';
import Web3 from 'web3';
import Tether from '../truffle_abis/Tether.json'
import RWD from '../truffle_abis/RWD.json'
import DecentralBank from '../truffle_abis/DecentralBank.json'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      account: '0x00',
      tether: {},
      rwd: {},
      decentralBank: {},
      tetherBalance: '0',
      rwdBalance: '0',
      stakingBalance: '0',
      loading: true
    }
  }

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadBlockchainData() {
    const web3 = window.web3
    const account = await web3.eth.getAccounts()
    this.setState({account: account[0]})
    const networkId = await web3.eth.net.getId()

    // Load Tether Contract
    const tetherData = Tether.networks[networkId]
    if(tetherData) {
      const tether = new web3.eth.Contract(Tether.abi, tetherData.address)
      this.setState({tether})
      let tetherBalance = await tether.methods.balanceOf(this.state.account).call()
      this.setState({tetherBalance: tetherBalance.toString()})
      console.log('Tether balance: ', tetherBalance)
    } else {
      window.alert('Error! Tether contract not deployed - no detected network!')
    }

    // Load RWD Contract
    const rwdData = RWD.networks[networkId]
    if(rwdData) {
      const rwd = new web3.eth.Contract(RWD.abi, rwdData.address)
      this.setState({rwd})
      let rwdBalance = await rwd.methods.balanceOf(this.state.account).call()
      this.setState({rwdBalance: rwdBalance.toString()})
      console.log('RWD balance: ', rwdBalance)
    } else {
      window.alert('Error! RWD contract not deployed - no detected network!')
    }

    // Load DecentralBank Contract
    const decentralBankData = DecentralBank.networks[networkId]
    if(decentralBankData) {
      const decentralBank = new web3.eth.Contract(DecentralBank.abi, decentralBankData.address)
      this.setState({decentralBank})
      let stakingBalance = await decentralBank.methods.stakingBalance(this.state.account).call()
      this.setState({stakingBalance: stakingBalance.toString()})
      console.log('Staking balance: ', stakingBalance)
    } else {
      window.alert('Error! DecentralBank contract not deployed - no detected network!')
    }


    console.log(networkId)
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