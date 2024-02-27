// grid.tsx
import React from 'react';

interface GridProps {
  children?: React.ReactNode;
  xl?: number;
  md?: number;
  xs?: number;
  gap?: number;
  id?: string;
  paddingBottom?: string;
  paddingTop?: string;
}

const Grid: React.FC<GridProps> = ({ children, xl, md, xs, gap, paddingTop, paddingBottom, id }) => {

  const gridClass = `grid col-xl-${xl} col-md-${md} col-xs-${xs} gap-${gap}`;
  const paddingdTopClass = paddingTop ? `padding-top-${paddingTop}` : 'padding-top-0';
  const paddingdBottomClass = paddingBottom ? `padding-bottom-${paddingBottom}` : 'padding-bottom-0';
  const customId = id ? `${id}` : '';

  return (
    <div id={customId} className={`${gridClass} ${paddingdTopClass} ${paddingdBottomClass}`}>
      {children}
    </div>
  );
};

export default Grid;
