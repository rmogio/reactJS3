import React from 'react'
import LinkWrapper from '../../Utils/LinkWrapper'

const Header = ()=>{
  return(
    <nav>
    <div className="nav-wrapper indigo lighten-2b">
      <LinkWrapper to='/' className='brand-logo' activeStyle={{fontWeight:'normal'}}>Casa do código</LinkWrapper>
      <ul className="right">
        <li><LinkWrapper to='/autores'>Autores</LinkWrapper></li>
        <li><LinkWrapper to='/livros'>Livros</LinkWrapper></li>
        <li><LinkWrapper to='/sobre'>Sobre</LinkWrapper></li>
      </ul>
    </div>
  </nav>
  )
}

export default Header