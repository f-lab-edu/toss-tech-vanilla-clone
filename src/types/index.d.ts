export interface Article {
  key: string;
  title: string;
  subtitle: string;
  publishedTime: string;
  category: string;
  thumbnailConfig: {
    imageUrl: string;
  };
  coverConfig: {
    imageUrl: string | null;
  };
  editor: {
    name: string;
    shortDescription: string | null;
  };
  shortDescription: string | null;
  fullDescription: string;
  seoConfig: {
    tags: {
      content: string;
    }[];
  };
}
