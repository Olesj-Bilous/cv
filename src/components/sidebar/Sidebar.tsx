import React from 'react';
import { selectorProvider } from 'models/model';
import { ProfileConsumer } from './Profile';

const Sidebar = selectorProvider(root => root.profile)(ProfileConsumer)

export default Sidebar;
