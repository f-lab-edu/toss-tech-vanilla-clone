import { createComponent, createElement } from '../../core/createComponent';
import { getRouter } from '../../init';
import Page from '../../components/Page';

function ErrorPage() {
  const ErrorImg = createComponent({
    render: () => {
      return createElement({
        type: 'img',
        classnames: ['error-img'],
        attributes: {
          alt: 'error image',
          src: 'https://resources-fe.toss.im/image-optimize/width=256,quality=75/https%3A%2F%2Fstatic.toss.im%2F3d-common%2Fcoin-question-rotate-apng.png',
        },
      });
    },
  });

  // h2 요소 생성
  const Heading = createComponent({
    render: () => {
      return createElement({
        type: 'h2',
        classnames: ['error-page-title'],
        children: ['앗, 페이지를 찾지 못했어요'],
      });
    },
  });

  // 안내 메시지 div 생성
  const Message = createComponent({
    render: () => {
      return createElement({
        type: 'div',
        classnames: ['error-page-message'],
        children: ['페이지 주소가 정확한지 확인해주세요.'],
      });
    },
  });

  // 버튼 생성
  const Button = createComponent({
    render: () => {
      return createElement({
        type: 'button',
        classnames: ['go-home-btn'],
        children: ['홈으로 가기'],
        event: {
          type: 'click' as keyof HTMLElementTagNameMap,
          listener: () => {
            const router = getRouter();
            router.push('/');
          },
        },
      });
    },
  });

  const ErrorPageContent = createComponent({
    render: () => {
      return createElement({
        type: 'div',
        classnames: ['error-page-content'],
        children: [ErrorImg, Heading, Message, Button],
      });
    },
  });

  const ErrorPage = Page({
    classnames: ['error-page'],
    children: [ErrorPageContent],
  });

  return ErrorPage;
}

export default ErrorPage;
