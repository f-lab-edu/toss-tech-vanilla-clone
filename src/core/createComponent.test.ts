import '@testing-library/jest-dom';
import { screen, fireEvent } from '@testing-library/dom';
import { createComponent } from './createComponent';
import { ICreateComponentProps } from '../types/core';

describe('createComponent', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });
  it('생성된 요소에 올바른 태그와 텍스트가 설정된다.', () => {
    const props: ICreateComponentProps = {
      type: 'button',
      textContent: 'Click Me',
    };
    const element = createComponent(props);
    document.body.appendChild(element);

    const button = screen.getByText('Click Me');
    expect(button).toBeInTheDocument();
    expect(button.tagName).toBe('BUTTON');
  });

  it('생성된 요소에 올바른 속성이 설정된다.', () => {
    const props: ICreateComponentProps = {
      type: 'input',
      attributes: {
        type: 'text',
        placeholder: 'Enter text',
      },
    };
    const element = createComponent(props);
    document.body.appendChild(element);

    const input = screen.getByPlaceholderText('Enter text');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'text');
  });

  it('생성된 요소에 올바른 클래스명이 설정된다.', () => {
    const props: ICreateComponentProps = {
      type: 'div',
      classnames: ['class1', 'class2'],
    };
    const element = createComponent(props);
    document.body.appendChild(element);

    const div = screen.getByRole('generic'); // div는 기본적으로 role이 generic입니다.
    expect(div).toBeInTheDocument();
    expect(div).toHaveClass('class1');
    expect(div).toHaveClass('class2');
  });

  it('생성된 요소에 올바른 자식 요소들이 추가된다.', () => {
    const child1 = document.createElement('span');
    child1.textContent = 'Child 1';
    const child2 = document.createElement('span');
    child2.textContent = 'Child 2';

    const props: ICreateComponentProps = {
      type: 'div',
      children: [child1, child2],
    };
    const element = createComponent(props);
    document.body.appendChild(element);

    const child1Element = screen.getByText('Child 1');
    const child2Element = screen.getByText('Child 2');

    expect(child1Element).toBeInTheDocument();
    expect(child2Element).toBeInTheDocument();
  });

  it('생성된 요소에 이벤트가 올바르게 바인딩된다.', () => {
    const handleClick = jest.fn();
    const props: ICreateComponentProps = {
      type: 'button',
      textContent: 'Click Me',
      event: {
        type: 'click',
        listener: handleClick,
      },
    };
    const element = createComponent(props);
    document.body.appendChild(element);

    const button = screen.getByText('Click Me');
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
