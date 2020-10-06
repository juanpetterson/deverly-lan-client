import service from './service';

export default {
  async getAvailableMedias() {
    return service.get('/v1/medias');
  },
};
