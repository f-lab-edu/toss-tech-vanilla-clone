/**
 * 주어진 날짜 문자열을 "YYYY년 MM월 DD일" 형식으로 변환하는 함수
 * @param {string} dateString - 변환할 날짜 문자열 (예: "2023-10-18T09:00:00+09:00")
 * @returns {string} - 변환된 날짜 문자열 (예: "2023년 10월 18일")
 */
function formatDate(dateString: string) {
  // Date 객체로 변환
  const date = new Date(dateString);

  // 연도, 월, 일 추출
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // 월은 0부터 시작하므로 +1
  const day = date.getDate();

  // 원하는 형식으로 문자열 조합
  return `${year}년 ${month}월 ${day}일`;
}

export { formatDate };
