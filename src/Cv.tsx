import React from 'react';
import logo from './logo.svg';

import { ModelProvider } from 'models/context';
import { model } from 'models/model';
import { Sidebar } from 'models/selectors';
import './Cv.css';
import Main from './components/main/Main'

const Cv = () => (
    <ModelProvider model={model}>
      <div style={{display:'none'}}>test hook</div>
      <Sidebar />
      <Main />
    </ModelProvider>
);

export default Cv;
