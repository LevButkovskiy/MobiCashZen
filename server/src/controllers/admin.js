const AdminBro = require('admin-bro')
const AdminBroExpress = require('admin-bro-expressjs')
const AdminBroMongoose = require('admin-bro-mongoose')
const mongoose = require('mongoose')

AdminBro.registerAdapter(AdminBroMongoose)

const Articles = require('../models/articlesSchema');
const User = require('../models/userSchema');

const AdminBroOptions = {
    resources: [Articles, User],
}

const adminBro = new AdminBro({
  rootPath: '/admin',
  resources: [
    {
      resource: Articles,
    },
    {
      resource: User,
    }
  ],
  branding: {
    logo: 'https://sun9-24.userapi.com/c851024/v851024664/128cfb/y2aotWNcTZI.jpg',
    companyName: 'MobiCash Event Portal',
  }
})

module.exports = adminRouter = AdminBroExpress.buildRouter(adminBro)