import React, { ReactNode } from 'react';
import { useInView } from 'react-intersection-observer';

interface RichTextProps {
  children?: ReactNode;
  paddingBottom?: string;
  paddingTop?: string;
}

const RichText: React.FC<RichTextProps> = ({ children, paddingTop, paddingBottom }) => {
  const { ref, inView } = useInView({
    threshold: 0,
  });

  const paddingTopClass = paddingTop ? `padding-top-${paddingTop}` : 'padding-top-0';
  const paddingBottomClass = paddingBottom ? `padding-bottom-${paddingBottom}` : 'padding-bottom-0';

  return (
    <div ref={ref} className={`rich-text ${paddingTopClass} ${paddingBottomClass} ${inView ? 'visible' : 'not-visible'}`}>
      {children}
    </div>
  );
};

export default RichText;
