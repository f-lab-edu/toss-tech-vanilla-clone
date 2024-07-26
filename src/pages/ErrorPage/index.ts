import { createComponent, createElement } from '../../core/createComponent';
import { router } from '../../init';
import Page from '../../components/Page';

function ErrorPage() {
  // h2 요소 생성
  const Heading = createComponent({
    render: () => {
      return createElement({
        type: 'h2',
        children: ['앗, 페이지를 찾지 못했어요'],
      });
    },
  });

  // 안내 메시지 div 생성
  const Message = createComponent({
    render: () => {
      return createElement({
        type: 'div',
        children: ['페이지 주소가 정확한지 확인해주세요.'],
      });
    },
  });

  // 버튼 생성
  const Button = createComponent({
    render: () => {
      return createElement({
        type: 'button',
        children: ['홈으로 가기'],
        event: {
          type: 'click' as keyof HTMLElementTagNameMap,
          listener: () => {
            router.push('/');
          },
        },
      });
    },
  });

  const ErrorPage = Page({
    classnames: ['error-page'],
    children: [Heading, Message, Button],
  });

  return ErrorPage;
}

export default ErrorPage;
