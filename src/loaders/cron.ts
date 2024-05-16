'use strict';

// MODULES
import { CronJob } from 'cron';
import axios from 'axios';
import nodemailer, { Transporter } from 'nodemailer';

// INTERFACES
import options_i from 'interfaces/common';
import { Document } from 'mongodb';

// CONFIG
import config from '../config';

// UTILS

async function admins_inspect(
  transporter: Transporter,
  options: options_i
): Promise<void> {
  const squery: object = { role: config.roles.admin };

  const admins: Document[] = await options.db.users.find(squery).toArray();

  if (admins.length > 1) {
    const users_data = admins.map((curr: Document, index: number) => {
      return (
        '<br>_id: ' +
        curr._id.toString() +
        '<br>username: ' +
        curr.username +
        '<br>============'
      );
    });

    const data: any = {
      from: config.env.EMAIL_USERNAME,
      to: 'ruzgarataozkan@gmail.com', // to property represents the emails that will be sent emails to.
      subject: 'ADMIN ROLE BREACH!!!',
      html:
        config.env.DB_NAME +
        ' backend has been shutdown due to admin role breach. There are currently more than 1 admin in the system and requires immediate attention.<br><br> The users who have admin role are listed below.<br><br>' +
        users_data,
    };

    transporter.sendMail(data);

    setTimeout(async () => {
      //await options.server.close();
    }, 3000);
  }
}

async function sessions_clear(options: options_i): Promise<void> {
  const sessions = await options.redis.hGetAll('sessions');

  for (const key in sessions) {
    const session: string[] = sessions[key].split('_');
    const session_user_id: string = session[0];
    const session_ip: string = session[1];
    const session_created_at: string = session[2];

    const expire_at: number =
      Number(session_created_at) + Number(config.env.SESSION_LIFETIME_MS);

    if (expire_at < Date.now()) {
      await options.redis.hDel('sessions', key);
    }
  }
}

async function load_cron(options: any): Promise<void> {
  const mail_transporter = nodemailer.createTransport({
    host: config.env.EMAIL_HOST,
    port: 465,
    secure: true,
    auth: {
      user: config.env.EMAIL_USERNAME,
      pass: config.env.EMAIL_PASSWORD,
    },
  });

  // Every minute
  new CronJob('59 * * * * *', function () {
    admins_inspect(mail_transporter, options);
  }).start();

  // Every hour
  new CronJob('00 59 * * * *', function () {}).start();

  // Every midnight
  new CronJob('00 00 00 * * *', function () {
    sessions_clear(options);
  }).start();
}

export default load_cron;
