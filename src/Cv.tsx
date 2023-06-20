import React from 'react';
import logo from './logo.svg';

import { ModelProvider, model } from 'models/model';
import './Cv.css';
import Sidebar from './components/sidebar/Sidebar';
import Main from './components/main/Main'

const Cv = () => (
    <ModelProvider model={model}>
      <div>test hook</div>
      <Sidebar />
      <Main />
    </ModelProvider>
  );

export default Cv;
