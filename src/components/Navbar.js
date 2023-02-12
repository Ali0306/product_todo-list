import React from 'react'

function Navbar() {
  return (
    <div>
        <nav className="navbar  bg bg-d navbar-dark navbar-expand-lg ">
  <div className="container-fluid">
    <a className="navbar-brand mx-5" href="/">Product Managment</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse " id="navbarSupportedContent">
      
      <form className="d-flex  ms-auto mx-5" role="search" >
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button className="btn btn-outline-primary" type="submit">Search</button>
      </form>
    </div>
  </div>
</nav>
    </div>
  )
}

export default Navbar