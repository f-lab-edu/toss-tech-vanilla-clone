export interface Blog {
  id: number;
  updatedTime: string;
  createdTime: string;
  category: string;
  categories: Category[];
  series: any;
  seriesSlug: any;
  title: string;
  subtitle: string;
  bottomButtonConfig: BottomButtonConfig;
  coverConfig: CoverConfig;
  thumbnailConfig: ThumbnailConfig;
  key: string;
  minAge: number;
  isDisplaying: boolean;
  isDisplayingPublishedTime: boolean;
  workspaceId: number;
  isPublished: boolean;
  publishedTime: string;
  likeCount: number;
  commentBoard: any;
  relatedPostTitle: any;
  relatedPosts: any[];
  disclaimer: any;
  seoConfig: SeoConfig;
  openGraph: OpenGraph;
  relatedPostConfig?: RelatedPostConfig;
  editor: Editor;
  disclaimerConfig: any;
  shortDescription: string;
  fullDescription: string;
  isDisplayingFeedback: boolean;
  quizzes: any[];
  opinionForm: any;
}

export interface Category {
  name: string;
  id: number;
  slug?: string;
  parentId?: number;
  iconUrl?: string;
  categoryGroup: any;
}

export interface BottomButtonConfig {
  ctaType: string;
  imageUrl?: string;
  imageAlt?: string;
  title?: string;
  description?: string;
  ctaName?: string;
  landingUrl?: string;
  isSearchBottomCta: boolean;
  serviceId: any;
  stockConfig: any;
  landingScheme?: string;
  landingExternal?: string;
}

export interface CoverConfig {
  coverType: string;
  imageUrl?: string;
  videoUrl: any;
  backgroundColor?: string;
  isFill: boolean;
  imageAlt?: string;
}

export interface ThumbnailConfig {
  imageUrl: string;
  backgroundColor?: string;
  isFill: boolean;
  imageAlt?: string;
}

export interface SeoConfig {
  post: number;
  title: any;
  description: string;
  urlSlug: string;
  primaryKeyword?: PrimaryKeyword;
  relatedKeywords: RelatedKeyword[];
  tags: Tag[];
}

export interface PrimaryKeyword {
  id: number;
  content: string;
  wordType: string;
}

export interface RelatedKeyword {
  id: number;
  content: string;
  wordType: string;
}

export interface Tag {
  id: number;
  content: string;
  wordType: string;
}

export interface OpenGraph {
  title: string;
  description: string;
  backgroundColor: string;
  imageAlt?: string;
  imageUrl: string;
  imageType: string;
}

export interface RelatedPostConfig {
  id: number;
  relatedPosts: RelatedPost[];
  title: string;
}

export interface RelatedPost {
  id: number;
  updatedTime: string;
  createdTime: string;
  categories: Category2[];
  series: any;
  title: string;
  subtitle: string;
  bottomButtonConfig: BottomButtonConfig2;
  coverConfig: CoverConfig2;
  thumbnailConfig: ThumbnailConfig2;
  key: string;
  minAge: number;
  isDisplaying: boolean;
  isDisplayingPublishedTime: boolean;
  workspaceId: number;
  isPublished: boolean;
  publishedTime: string;
  commentBoard: any;
  disclaimer: any;
}

export interface Category2 {
  name: string;
  id: number;
  slug?: string;
  parentId?: number;
  iconUrl?: string;
  categoryGroup: any;
}

export interface BottomButtonConfig2 {
  ctaType: string;
  imageUrl?: string;
  imageAlt: any;
  title?: string;
  description?: string;
  ctaName?: string;
  landingUrl?: string;
  isSearchBottomCta: boolean;
  serviceId: any;
  stockConfig: any;
  landingScheme?: string;
  landingExternal?: string;
}

export interface CoverConfig2 {
  coverType: string;
  imageUrl?: string;
  videoUrl: any;
  backgroundColor?: string;
  isFill: boolean;
  imageAlt?: string;
}

export interface ThumbnailConfig2 {
  imageUrl: string;
  backgroundColor: any;
  isFill: boolean;
  imageAlt?: string;
}

export interface Editor {
  id: number;
  name: string;
  slug?: string;
  shortDescription?: string;
  description?: string;
  imageUrl?: string;
  url?: string;
  facebook: any;
  twitter: any;
  instagram: any;
  postCount: number;
  ogConfig: any;
  seoConfig: any;
  priority: number;
  isDisplaying: boolean;
  isHomeRecommendation: boolean;
}

/**
 *  fullDescription
 *  editor {
 *    name,
 *    short
 *  }
 */

interface Article {
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
