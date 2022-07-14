import React, { Component } from 'react'
import loading from './ajax-loader.gif'

const Loader = ()=>{
        return (
            <div className = "text-center">
                <img src = {loading} alt = "loading"></img>
            </div>
        )
}

export default Loader
