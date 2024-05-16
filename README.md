# Features:

- Secure Cookie Authentication for User Communication
- Simple Admin-User Role System
- Simple User Reference System
- Media Upload through File System
- Scalable Code Architecture to Add-On

# Prerequisites

- Linux distro
- redis service
- mongodb service
- smtp email account

# Installation

```bash
# Linux package installations
$ sudo apt install redis
$ sudo apt install mongodb (you can use mongo atlas cloud as an alternative to mongodb package)

$ # sudo apt install nginx (optional but recommended)
$ # sudo npm install -g pm2 (optional but recommended)

# Project installation
$ git clone https://github.com/panpadev/panpa-api.git
$ cd ./panpa-api
$ npm install
$ npm run build
$ npm run start
```

Then create a .env file in the root of the project and enter your environment values.

```.env
PORT=3000
HOST=127.0.0.1

NODE_ENV=prod

SESSION_SECRET=
SESSION_NAME=domain_sid

DB_CONN_STR=
DB_NAME=domain

PERM_ADMIN=123
PERM_USER=123

EMAIL_HOST=smtp.gmail.com
EMAIL_USERNAME=no-reply@domain.com
EMAIL_PASSWORD=

URL_API=api.domain.com
URL_UI=domain.com

SECRET_KEY_CAPTCHA=0x123

```

Run start first to create the db collections then run your tests.

```bash
$ npm run build
$ npm run start
```

# Documentation

All the pipelines are documented from entry point to exit of the program.
Numbers in the titles represents the order of the pipelines and it goes in order.

## 1. Config Object

### Path: src/config/index.ts

```javascript
'use strict';
```
