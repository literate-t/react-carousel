import styled from '@emotion/styled';
import { ReactNode, useState } from 'react';

const CarouselContainer = styled.div`
  width: 500px;
  height: 500px;
  background-color: #efe;
  display: flex;
  overflow: hidden;
  position: relative;
`;

const CarouselItem = styled.div<{
  offset: number;
}>`
  width: 500px;
  height: 500px;
  min-width: 500px;
  transition: transform 0.5s;
  transform: translateX(${({ offset }) => -offset * 100}%);
`;

const CarouselButton = styled.div<{
  position: 'left' | 'right';
}>`
  cursor: pointer;
  width: 50px;
  height: 50px;
  background-color: #555;
  color: white;
  position: absolute;
  font-size: 24px;
  bottom: calc(50% - 25px);
  display: flex;
  ${({ position }) => position === 'left' && 'left:0'};
  ${({ position }) => position === 'right' && 'right:0'};
  justify-content: center;
  align-items: center;
  z-index: 999; // 버튼이 묻힘
`;

interface CarouselProps {
  children: ReactNode[] | ReactNode;
}

export default function Carousel(props: CarouselProps) {
  const children = Array.isArray(props.children)
    ? props.children
    : [props.children];

  const [index, setIndex] = useState(0);
  const onRightClick = () => {
    index < children.length - 1 && setIndex((prev) => prev + 1);
  };

  const onLeftClick = () => {
    index > 0 && setIndex((prev) => prev - 1);
  };
  return (
    <CarouselContainer>
      <CarouselButton onClick={onLeftClick} position="left">
        {'<'}
      </CarouselButton>
      {children.map((child) => (
        <CarouselItem offset={index}>{child}</CarouselItem>
      ))}
      <CarouselButton onClick={onRightClick} position="right">
        {'>'}
      </CarouselButton>
    </CarouselContainer>
  );
}
