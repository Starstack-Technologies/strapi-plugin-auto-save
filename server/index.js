"use strict";

const register = ({ strapi }) => {
  strapi.log.info("[auto-save] Plugin registered");
};

const bootstrap = ({ strapi }) => {
  strapi.log.info("[auto-save] Plugin bootstrapped");
};

const destroy = ({ strapi }) => {
  strapi.log.info("[auto-save] Plugin destroyed");
};

module.exports = {
  register,
  bootstrap,
  destroy,
  config: {
    default: {},
    validator() {},
  },
  routes: [],
  controllers: {},
  services: {},
  policies: {},
  middlewares: {},
  contentTypes: {},
};
