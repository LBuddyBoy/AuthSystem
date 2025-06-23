import db from "#db/client";
import { Faker, es } from "@faker-js/faker";
import { updateRole } from "./query/roles.js";

const customFaker = new Faker({ locale: [es] });

await db.connect();
await seedRoles();
await seedAccounts();
await db.end();
console.log("🌱 Database seeded.");

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
    { username: "LBuddyBoy", email: "ethantoups05@gmail.com", password: "test123", role_id: 3 },
    { username: "Admin", email: "admin123@gmail.com", password: "password123", role_id: 3 },
  ];

  for (let index = 0; index < 500; index++) {
    const username = customFaker.internet.username();
    const email = customFaker.internet.email();
    const password = customFaker.internet.password();
    
    if (accounts.filter(account => account.username === username || account.email === email).length > 0) {
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
    { name: "Member", weight: 100, is_default: true, is_staff: false, icon: "Member" },
    { name: "Moderator", weight: 500, is_default: false, is_staff: true, icon: "Moderator" },
    { name: "Admin", weight: 750, is_default: false, is_staff: true, icon: "Admin" },
    { name: "Founder", weight: 1000, is_default: false, is_staff: true, icon: "Founder" },
  ];

  for (const index in roles) {
    const role = roles[index];

    await createRole(role);
  }

  await updateRole(3, {
    permissions: ["admin:panel"]
  });

  await updateRole(4, {
    permissions: ["admin:panel"]
  });
}
