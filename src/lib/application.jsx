import React from 'react';
import ReactDOM from 'react-dom';

import { AppComponent } from './components/app.jsx';

document.addEventListener('deviceready', () => {
  ReactDOM.render(
    <AppComponent />,
    document.getElementById('app')
  );
});
