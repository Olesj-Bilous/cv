import React from 'react';
import Section from './Section';
import Title from '../Title';

const Main = () => {
  const sections = [] as any[];
  return (
    <main>
      <Title mainTitle='' subTitle=''></Title>
        {
          sections.map(section => <Section />)
        }
    </main>
  );
}

export default Main;
