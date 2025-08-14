import React from 'react'

const Header = () => {
  return (
    <div className="flex items-center justify-center mb-4">
        <img
          src="https://logodix.com/logo/2027935.jpg" // Replace with actual logo link
          alt="NIMS Logo"
          className="w-20 h-100 mr-4"
        />
        <div className="text-center">
          <h1 className="text-lg font-bold uppercase">
            NIZAM’S INSTITUTE OF MEDICAL SCIENCES
          </h1>
          <p className="text-sm font-bold">
            (A University Established Under State Act) <br />
            Punjagutta, Hyderabad 500 082
          </p>
        </div>
      </div>
  )
}

export default Header