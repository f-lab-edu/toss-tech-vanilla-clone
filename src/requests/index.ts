import allList from '../assets/data/all-articles.json';
import techList from '../assets/data/tech-articles.json';
import designList from '../assets/data/design-articles.json';
import { Article } from '../types/index';
/**
 * 네트워크로 API 통신 모킹
 * */

const dataMap: Record<string, Article[]> = {
  '/': allList,
  '/tech': techList,
  '/design': designList,
};

async function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export async function fetchList(path: string) {
  await delay(200);
  return dataMap[path];
}
