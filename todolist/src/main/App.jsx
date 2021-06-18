import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'

import './App.css'
import React from 'react'

import Header from '../components/templates/Header'
import RegisterField from '../components/templates/RegisterField'
import Main from '../components/templates/Main'

export default props => 
    <div>
        <Header />
        <Main />
    </div>