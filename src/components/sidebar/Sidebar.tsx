import React from 'react';
import { consumerBuilder } from 'models/model';
import { ProfileConsumer } from './Profile';

const Sidebar = consumerBuilder(root => root.profile)(ProfileConsumer)

export default Sidebar;
