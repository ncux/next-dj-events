'use strict';

const { sanitizeEntity } = require('strapi-utils');

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {

  // get logged in user's events
  async me(ctx) {
    const user = ctx.state.user;

    if(!user) {
      return ctx.badRequest(null, [ { messages: [ { id: 'Not authorized' } ] } ]);
    }

    const data = await strapi.services.events.find({ user: user.id });

    if(!data) {
      return ctx.notFound(null, [ { messages: [ { id: 'Not events' } ] } ]);
    }

    return sanitizeEntity(data, { model: strapi.models.events });

  }

};
