import { IMedia } from '../models/media.interface';
import service from './service';

export default {
  async getAvailableMedias(): Promise<{ data: IMedia[] }> {
    return service.get('/v1/medias');
  },
};
