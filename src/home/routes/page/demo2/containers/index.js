import React, { Component, PropTypes } from 'react'
import * as tool from 'publicJs'
import Image from 'image'
import GetPage from 'getPage'
class Main extends Component {
  componentDidMount(){
  }
  btnClick = () => {
    window.location.href = '#/';
  }
  render() {
    return (
      <div className='demo2'>
        <Image src ='image/home/1.jpg' className='img'></Image>
        <Image src ='image/home/1.jpg' className='img'></Image>
        <Image src ='image/home/1.jpg' className='img'></Image>
        <Image src ='image/home/1.jpg' className='img'></Image>
        <Image src ='image/home/1.jpg' className='img'></Image>
        <Image src ='image/home/2.jpg' className='img'></Image>
        <Image src ='image/home/3.jpg' className='img'></Image>
        <Image src ='image/home/3.jpg' className='img'></Image>
      </div>
    )
  }
}


module.exports = GetPage({
  id:"home",
  component: Main
})
