import { createComponent } from '../../core/createComponent';
import { router } from '../../core/router';
function ErrorPage(): HTMLElement {
  // h2 요소 생성
  const heading = createComponent({
    type: 'h2',
    textContent: '앗, 페이지를 찾지 못했어요',
  });

  // 안내 메시지 div 생성
  const message = createComponent({
    type: 'div',
    textContent: '페이지 주소가 정확한지 확인해주세요.',
  });

  // 버튼 생성
  const button = createComponent({
    type: 'button',
    textContent: '홈으로 가기',
    event: {
      type: 'click',
      listener: () => {
        router.push('/');
      },
    },
  });

  const errorPage = createComponent({
    type: 'div',
    classnames: ['page', 'error-page'],
    children: [heading, message, button],
  });

  return errorPage;
}

export default ErrorPage;
