import styled from '@emotion/styled';
import { ReactNode, useCallback, useEffect, useState } from 'react';

const CarouselContainer = styled.div<{
  direction: 'row' | 'column';
}>`
  width: 500px;
  height: 500px;
  background-color: #efe;
  display: flex;
  overflow: hidden;
  position: relative;
  flex-direction: ${({ direction }) => direction};
`;

const CarouselItem = styled.div<{
  offset: number;
  transitionTime: number;
  direction: 'row' | 'column';
}>`
  width: 500px;
  height: 500px;
  min-width: 500px;
  min-height: 500px;
  transition: transform ${({ transitionTime }) => transitionTime}ms
    cubic-bezier(0.05, 1.04, 1, 1);

  /* prettier-ignore */
  transform: ${({ direction }) =>
    direction === 'row' ? 'translateX' : 'translateY'}(${({ offset }) =>
    -offset * 100}%);
`;

const CarouselButton = styled.div<{
  position: 'left' | 'right';
  direction: 'row' | 'column';
}>`
  cursor: pointer;
  width: 50px;
  height: 50px;
  background-color: #555;
  color: white;
  position: absolute;
  font-size: 24px;
  /* prettier-ignore */
  bottom: calc(${({ direction, position }) =>
    direction === 'row'
      ? '50% - 25px'
      : position === 'left'
      ? '100% - 50px'
      : '0px'});
  display: flex;
  ${({ position, direction }) =>
    position === 'left' &&
    `left:${direction === 'row' ? '0px' : 'calc(50% - 25px)'}`};
  ${({ position, direction }) =>
    position === 'right' &&
    `right:${direction === 'row' ? '0px' : 'calc(50% - 25px)'}`};

  transform: rotate(${({ direction }) => direction === 'column' && '90deg'});

  justify-content: center;
  align-items: center;
  z-index: 999; // 버튼이 묻힘
`;

interface CarouselProps {
  children: ReactNode[] | ReactNode;
  loop?: boolean;
  autoLoop?: boolean;
  autoTime?: number;
  transitionTime?: number;
  direction?: 'row' | 'column';
}

export default function Carousel({
  children: propsChildren,
  loop,
  autoLoop,
  autoTime = 1000,
  transitionTime = 500,
  direction = 'row',
}: CarouselProps) {
  const children = Array.isArray(propsChildren)
    ? propsChildren
    : [propsChildren];
  const { length } = children;

  const [index, setIndex] = useState(0);
  const onRightClick = useCallback(() => {
    if (index < length - 1) {
      setIndex((prev) => prev + 1);
    } else if (loop) {
      setIndex(0);
    }
  }, [index, length, loop]);

  useEffect(() => {
    if (autoLoop) {
      const id = setInterval(() => {
        onRightClick();
      }, autoTime);
      return () => clearInterval(id);
    }
  }, [autoLoop, autoTime, index, onRightClick]);

  const onLeftClick = () => {
    if (0 < index) {
      setIndex((prev) => prev - 1);
    } else if (loop) {
      setIndex(length - 1);
    }
  };
  return (
    <CarouselContainer direction={direction}>
      <CarouselButton
        onClick={onLeftClick}
        position="left"
        direction={direction}
      >
        {'<'}
      </CarouselButton>
      {children.map((child, i) => (
        <CarouselItem
          key={i}
          offset={index}
          transitionTime={transitionTime}
          direction={direction}
        >
          {child}
        </CarouselItem>
      ))}
      <CarouselButton
        onClick={onRightClick}
        position="right"
        direction={direction}
      >
        {'>'}
      </CarouselButton>
    </CarouselContainer>
  );
}
