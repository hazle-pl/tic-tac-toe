import React from 'react';

interface ContentContainerProps {
  children: React.ReactNode;
  background?: string;
  paddingBottom?: string;
  paddingTop?: string;
  id?: string;
}

const Section: React.FC<ContentContainerProps> = ({ children, background, paddingTop, paddingBottom, id }) => {4

  const backgroundClass = background ? `bg-${background}` : 'bg-transparent';
  const paddingdTopClass = paddingTop ? `padding-top-${paddingTop}` : 'padding-top-0';
  const paddingdBottomClass = paddingBottom ? `padding-bottom-${paddingBottom}` : 'padding-bottom-0';

  return(
    <section id={id} className={`${backgroundClass} ${paddingdTopClass} ${paddingdBottomClass}`} >
      {children}
    </section>
  )
};

export default Section;
