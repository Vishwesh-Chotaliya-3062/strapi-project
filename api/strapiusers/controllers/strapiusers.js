const { parseMultipartData, sanitizeEntity } = require('strapi-utils');

module.exports = {
  /**
   * Create a record.
   *
   * @return {Object}
   */

  async create(ctx) {
    let entity;
    if (ctx.is('multipart')) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services.strapiusers.create(data, { files });
    } else {
      entity = await strapi.services.strapiusers.create(ctx.request.body);
    }

    strapi.services.strapiusers.send('batchmanager619@gmail.com', entity.email, 'Welcome', entity.username);

    ctx.send({
        ok: true
    })

    return sanitizeEntity(entity, { model: strapi.models.strapiusers });
  },
};