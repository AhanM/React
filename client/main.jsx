import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import Home from '../imports/ui/Home.jsx';
import '../imports/startup/accounts-config.js';

// Meteor.startup( () => {
// 	render(<Home />, document.getElementById("render-target"));
// });