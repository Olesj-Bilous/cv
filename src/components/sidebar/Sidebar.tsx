import React from 'react';
import { selectorChainer } from 'models/model';
import { ProfileConsumer } from './Profile';

const Sidebar = selectorChainer(root => root.profile)(ProfileConsumer)

export default Sidebar;
