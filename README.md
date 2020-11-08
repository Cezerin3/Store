# Cezerin is React and Node.js based eCommerce platform. React Shopping Cart.

Cezerin - Ecommerce Progressive Web Apps. Complete Solution.

# Contributers are wanted!!! (Anyone are welcome!)

# And put a star above if you like this, it'll help us a lot...!

## Quick Start

1. Download from https://github.com/Cezerin3/Documentation/raw/main/src/cezerin3.zip
2. Extract file with zip extacter such as 7zip
3. You must have,

   - Nodejs: https://nodejs.org/en/download/
   - YarnPkg: https://yarnpkg.com/getting-started/install

4. You must have mongodb locally running https://docs.mongodb.com/manual/installation/
5. Double click on start.sh inside the folder, That's all folks.....

## Warning

- You need to have nodejs lts/v12 not higher or lower
- At least 3Gb of ram and dual core cpu
- 20Gb of space

## Cezerin Platform:

1. Cezerin API - Backend.
2. Cezerin Store - Frontend.
3. Cezerin Admin - Dashboard.
4. Cezerin Client - JavaScript client for Cezerin REST API.

## Built with:

- NodeJS
- ReactJs
- Redux
- ExpressJs
- Babel
- WebPack
- MongoDB

## Links

- [GitHub](https://github.com/cezerin2)
- [Community Site](https://cezerin.org)
- [Demo Store - Plusha Theme](https://plusha.cezerin.net)
- [Demo Store - Default Theme](https://cezerin.net)
- [Demo Dashboard](https://cezerin.net/admin)
- [Telegram Chat: Cezerin](https://t.me/cezerin)
- [Forum](https://groups.google.com/g/cezerin)
- [Docs](https://github.com/cezerin2/cezerin2/blob/master/docs)
- [Facebook](https://facebook.com/cezerin)
- [Twitter](https://twitter.com/cezerin2)

## Store

Single-Page Application with React server-side rendering.

SEO Friendly. Google Analytics eCommerce Tracking included.

[Online Demo Store - Plusha Theme](https://plusha.cezerin.net)

[![Cezerin Store Plusha Theme](https://cezerin.org/assets/images/cezerin-plusha-theme.png)](https://plusha.cezerin.net)

[Online Demo Store - Default Theme](https://cezerin.net)

[![Cezerin Store Default Theme](https://cezerin.org/assets/images/cezerin-default-theme.png)](https://cezerin.net)
[![Cezerin Store Default Theme](https://cezerin.org/assets/images/cezerin-mobile-order-summary.png)](https://cezerin.net)

## Dashboard

Client-side dashboard use JSON Web Token (JWT) to access REST API.

[Online Demo Dashboard](https://cezerin.net/admin)

![Cezerin Dashboard](https://cezerin.org/assets/images/cezerin-dashboard-products.png)

## Documentation

[Documentation](https://cezerin3.web.app/docs)

- Getting Started

  - [Overview](https://cezerin3.web.app/docs/overview)
  - [Quick Start](https://cezerin3.web.app/docs/quick-start)
  - [Online Demo](https://cezerin3.web.app/docs/online-demo)
  - [Application Structure](https://cezerin3.web.app/docs/application-structure)

- Installation Guides

  - [Prerequisites](./docs/prerequisites.md)
  - [Setup Database](./docs/setup-database.md)
  - [Using source code](./docs/using-source-code.md)
  - [Using docker](./docs/using-docker.md)

- Deploy on Web

  - [Hosting](./docs/deploy-on-web-hosting.md)
  - [Create droplet](./docs/deploy-on-web-droplet.md)
  - [Setup domain](./docs/deploy-on-web-domain.md)
  - [Install NGinx Web Server + MERN Stack](./docs/deploy-on-web-mern.md)
  - [Run MongoDB](./docs/deploy-on-web-mongodb.md)
  - [Run Cezerin](./docs/deploy-on-web-cezerin.md)
  - [Run NGinx](./docs/deploy-on-web-nginx.md)
  - [Cezerin configs changes](./docs/deploy-on-web-cezerin-configs.md)
  - [Final checks](./docs/deploy-on-web-final-checks.md)
  - [Setup Let's Encrypt SSL Certificate](./docs/deploy-on-web-lets-encrypt.md)
  - [Turn off Developer Mode](./docs/deploy-on-web-production-mode.md)

- API

  - [API Reference](https://cezerin3.web.app/docs/api)
  - [API Client](https://github.com/cezerin2/cezerin2-client)

- Help
  - [FAQ](https://cezerin3.web.app/docs/faq)
  - [HowTos](https://cezerin3.web.app/docs/howtos)
  - [Help and Support](https://cezerin3.web.app/docs/help-and-support)

### Requirements

- Node.js v12/lts
- Yarnpkg
- MongoDB

## Application Structure

```
.
├── config                   # Project and build configurations
├── dist                     # Distribution folder
├── locales                  # Text files
├── logs                     # Log files
├── public                   # Static public assets and uploads
│   ├── admin                # Dashboard index.html
│   ├── admin-assets         # Dashboard assets
│   └── content              # Store root folder
|
├── scripts                  # Shell scripts for theme install/export
├── src                      # Application source code
│   ├── admin                # Dashboard application
│   │   └── client           # Client side code
│   ├── api                  # REST API
│   │   └── server           # Server side code
│   └── store                # Store application
│       ├── client             # Client side code
│       ├── server             # Server side code
│       └── shared             # Universal code
│
├── theme                    # Theme as a local package
└── process.json             # pm2 process file
```

## Yarn Scripts

| `yarn <script>`      | Description                                                           |
| -------------------- | --------------------------------------------------------------------- |
| `clean`              | Delete store and admin asset bundles.                                 |
| `compile:dev`        | Compiles the application to disk **and watch** (`~/dist` by default). |
| `compile`            | Compiles the application to disk (`~/dist` by default).               |
| `webpack:admin:dev`  | Assemble admin bundles **and watch**.                                 |
| `webpack:store:dev`  | Assemble store bundles **and watch**.                                 |
| `webpack:admin:prod` | Assemble admin bundles.                                               |
| `webpack:store:prod` | Assemble store bundles.                                               |
| `theme:install`      | Install theme from /public/<file>.zip                                 |
| `theme:export`       | Zip current theme to /public/<file>.zip                               |
| `theme:copy`         | Compile theme and copy assets to /public/                             |
| `theme:build:dev`    | Refresh theme after modification **and watch**.                       |
| `theme:build:prod`   | Refresh theme after modification.                                     |
| `build:dev`          | Compile and assemble bundles **and watch**.                           |
| `build`              | Compile and assemble bundles.                                         |
| `start`              | Start node server.                                                    |

## Financial contributions

We also welcome financial contributions in full transparency on our [open collective](https://opencollective.com/cezerin3).
Anyone can file an expense. If the expense makes sense for the development of the community, it will be "merged" in the ledger of our open collective by the core contributors and the person who filed the expense will be reimbursed.

## Credits

### Contributors

Thank you to all the people who have already contributed to Cezerin/Cezerin2/Cezerin3!
<a href="https://github.com/Cezerin3/Store/graphs/contributors"><img src="https://opencollective.com/cezerin3/contributors.svg?width=890" /></a>

### Backers

Thank you to all our backers! [[Become a backer](https://opencollective.com/cezerin3#backer)]

<a href="https://opencollective.com/cezerin3#backers" target="_blank"><img src="https://opencollective.com/cezerin3/tiers/backer.svg?avatarHeight=36&width=600"></a>
<a href="https://opencollective.com/cezerin2#backers" target="_blank"><img src="https://opencollective.com/cezerin2/tiers/backer.svg?avatarHeight=36&width=600"></a>
<a href="https://opencollective.com/cezerin#backers" target="_blank"></a>

### Sponsors

Thank you to all our sponsors! (please ask your company to also support this open source project by [becoming a sponsor](https://opencollective.com/cezerin3#sponsor))
https://www.paypal.com/paypalme/himadu1
<a href="https://opencollective.com/cezerin3#sponsor" target="_blank"><img src="https://opencollective.com/cezerin3/tiers/sponsor.svg?avatarHeight=36&width=600"></a>

## Contributing

If you can, please contribute by reporting issues, discussing ideas, or submitting pull requests with patches and new features. We do our best to respond to all issues and pull requests within a day or two, and make patch releases to npm regularly.

## Licence

This software is provided free of charge and without restriction under the Unlicense
