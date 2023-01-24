export interface PhotosT {
  _createdAt: Date;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: Date;
  image: SanityImageSource[];
  name: string;
  slug: Slug;
  type: string;
}
