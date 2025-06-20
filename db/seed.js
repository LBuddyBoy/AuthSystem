import db from "#db/client";
import { Faker, es } from "@faker-js/faker";

const customFaker = new Faker({ locale: [es] });

await db.connect();
await seedAccounts();
await db.end();
console.log("🌱 Database seeded.");

async function createAccount({ username, email, password }) {
  const SQL = `
  INSERT INTO accounts(username, email, password) 
  VALUES($1, $2, crypt($3, gen_salt('bf')))
  RETURNING *
  `;
  const params = [username, email, password];

  const {
    rows: [account],
  } = await db.query(SQL, params);

  console.log(account);

  return account;
}

async function seedAccounts() {
  const accounts = [
    { username: "Ethan Toups", email: "ethantoups05@gmail.com", password: "test123" },
  ];

  for (let index = 0; index < 9; index++) {
    const account = {
      username: customFaker.person.firstName(),
      email: customFaker.internet.email(),
      password: customFaker.internet.password(),
    };

    accounts.push(account);
  }

  for (const index in accounts) {
    const account = accounts[index];

    await createAccount(account);
  }
}
