import 'reflect-metadata'
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import "web3/dist/web3.min"
import 'bootstrap/dist/css/bootstrap.min.css';
import {ServiceContainer} from "react-service-locator";

ReactDOM.render(
    <ServiceContainer>
        <App/>
    </ServiceContainer>

    , document.getElementById('root'));
