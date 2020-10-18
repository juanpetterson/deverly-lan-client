import { promises as fs } from 'fs';

interface IMedia {
  path: string;
  fileName: string;
}

export const getMediasFromPath = async (
  path = 'e:\\medias'
): Promise<IMedia[]> => {
  const pathMedias = await fs.readdir(path);

  const medias: IMedia[] = pathMedias.map((file) => {
    const media = {
      fileName: file,
      path: `${path}\\${file}`,
    } as IMedia;

    return media;
  });

  return medias;
};
