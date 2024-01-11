import { Image as ImageType } from '@prisma/client';

export default async function Page(image: ImageType) {
  return <div>here for image {image.id} </div>;
}
