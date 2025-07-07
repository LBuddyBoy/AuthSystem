import db from "#db/client";
import { updateRole } from "./query/roles.js";
import { base, de, de_CH, en, Faker } from "@faker-js/faker";

const customLocale = {
  title: "My custom locale",
  internet: {
    domainSuffix: ["test"],
  },
};

export const customFaker = new Faker({
  locale: [customLocale, de_CH, de, en, base],
});

await db.connect();
await seedRoles();
await seedAccounts();
await seedForums();
await seedPosts();
await db.end();
console.log("🌱 Database seeded.");

async function createForum({ name, description }) {
  const SQL = `
  INSERT INTO forums(name, description) 
  VALUES($1, $2)
  RETURNING *
  `;
  const params = [name, description];

  const {
    rows: [forum],
  } = await db.query(SQL, params);

  return forum;
}

async function createPost({ forum_id, account_id, title, body }) {
  const SQL = `
  INSERT INTO posts(forum_id, account_id, title, body) 
  VALUES($1, $2, $3, $4)
  RETURNING *
  `;
  const params = [forum_id, account_id, title, body];

  const {
    rows: [post],
  } = await db.query(SQL, params);

  return post;
}

async function createReply({ post_id, forum_id, account_id, message }) {
  const SQL = `
  INSERT INTO replies(post_id, forum_id, account_id, message) 
  VALUES($1, $2, $3, $4)
  RETURNING *
  `;
  const params = [post_id, forum_id, account_id, message];

  const {
    rows: [reply],
  } = await db.query(SQL, params);

  return reply;
}

async function createAccount({ username, email, password, role_id }) {
  const SQL = `
  INSERT INTO accounts(username, email, password, role_id) 
  VALUES($1, $2, crypt($3, gen_salt('bf')), $4)
  RETURNING *
  `;
  const params = [username, email, password, role_id];

  const {
    rows: [account],
  } = await db.query(SQL, params);

  console.log(account);

  return account;
}

async function createRole({ name, weight, is_default, is_staff, icon }) {
  const SQL = `
  INSERT INTO roles(name, weight, is_default, is_staff, icon) 
  VALUES($1, $2, $3, $4, $5)
  RETURNING *
  `;
  const params = [name, weight, is_default, is_staff, icon];

  const {
    rows: [role],
  } = await db.query(SQL, params);

  console.log(role);

  return role;
}

async function seedAccounts() {
  const accounts = [
    {
      username: "LBuddyBoy",
      email: "ethantoups05@gmail.com",
      password: "test123",
      role_id: 3,
    },
    {
      username: "Admin",
      email: "admin123@gmail.com",
      password: "password123",
      role_id: 3,
    },
  ];

  for (let index = 0; index < 500; index++) {
    const username = customFaker.internet.username();
    const email = customFaker.internet.email();
    const password = customFaker.internet.password();

    if (
      accounts.filter(
        (account) => account.username === username || account.email === email
      ).length > 0
    ) {
      continue;
    }

    const account = {
      username: username,
      email: email,
      password: password,
      role_id: 1,
    };

    accounts.push(account);
  }

  for (const index in accounts) {
    const account = accounts[index];

    await createAccount(account);
  }
}

async function seedRoles() {
  const roles = [
    {
      name: "Member",
      weight: 100,
      is_default: true,
      is_staff: false,
      icon: "Member",
    },
    {
      name: "Moderator",
      weight: 500,
      is_default: false,
      is_staff: true,
      icon: "Moderator",
    },
    {
      name: "Admin",
      weight: 750,
      is_default: false,
      is_staff: true,
      icon: "Admin",
    },
    {
      name: "Founder",
      weight: 1000,
      is_default: false,
      is_staff: true,
      icon: "Founder",
    },
  ];

  for (const index in roles) {
    const role = roles[index];

    await createRole(role);
  }

  await updateRole(3, {
    permissions: ["admin:panel"],
  });

  await updateRole(4, {
    permissions: ["admin:panel"],
  });
}

async function seedForums() {
  const forums = [
    {
      name: "Announcements",
      description: "This will show you all important announcements.",
    },
    { name: "Updates", description: "This will show all of the updates." },
    { name: "Games", description: "This will show you all the games." },
  ];

  for (const index in forums) {
    const forum = forums[index];

    await createForum(forum);
  }
}

async function seedPosts() {
  const posts = [];
  const newPosts = [];

  for (let index = 0; index < 20; index++) {
    const post = {
      forum_id: getRandomInt(1, 3),
      account_id: 1,
      title: customFaker.book.title(),
      body: customFaker.lorem.paragraph(),
    };

    posts.push(post);
  }

  for (const index in posts) {
    const post = posts[index];

    newPosts.push(await createPost(post));
  }

  await seedReplies(newPosts);
}

async function seedReplies(newPosts) {
  const replies = [];

  for (let index = 0; index < 100; index++) {
    const post = newPosts[getRandomInt(0, newPosts.length - 1)];
    const reply = {
      post_id: post.id,
      forum_id: post.forum_id,
      account_id: 1,
      message: customFaker.lorem.text(),
    };

    replies.push(reply);
  }

  for (const index in replies) {
    const reply = replies[index];

    await createReply(reply);
  }
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
