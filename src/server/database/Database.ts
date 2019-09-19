import sqlite from "sqlite";
import path from "path";

async function OpenDatabase() {
  const database = await sqlite.open(
    path.join(__dirname, "database", "1788238.sqlite")
  );
  return database;
}

export async function GetOne(
  table: string,
  columns: string[],
  values: string[]
) {
  const database = await OpenDatabase();
  let reserved = "";
  for (let i = 0; i < columns.length; i++) {
    const e = columns[i];
    if (i < columns.length - 1) {
      reserved += `${e} = ? AND `;
    } else reserved += `${e} = ?`;
  }

  const data = await database.get(
    `
    SELECT * 
    FROM ${table}
    WHERE ${reserved}
  `,
    values
  );
  return data;
}

export async function GetMany(
  table: string,
  columns: string[],
  values: string[]
) {
  const database = await OpenDatabase();
  let reserved = "";
  for (let i = 0; i < columns.length; i++) {
    const e = columns[i];
    if (i < columns.length - 1) {
      reserved += `${e} = ? AND `;
    } else reserved += `${e} = ?`;
  }

  const data = await database.all(
    `
    SELECT * 
    FROM ${table}
    WHERE ${reserved}
  `,
    values
  );
  return data;
}

export async function GetAll(table: string) {
  const database = await OpenDatabase();
  const data = database.all(
    `
    SELECT * 
    FROM ${table}    
  `
  );
  return data;
}

export async function InsertToTable(
  columns: string[],
  table: string,
  values: string[]
) {
  const database = await OpenDatabase();
  await database.run(
    `
        INSERT 
        INTO ${table} (${columns.join(",")}) 
        VALUES (${columns.map(p => "?").join(",")})
    `,
    values
  );
  await database.close();
}

export async function InsertManyToTable(
  columns: string[],
  table: string,
  values: object[]
) {
  const database = await OpenDatabase();
  const stmp = await database.prepare(`
    INSERT 
    INTO ${table} (${columns.join(",")}) 
    VALUES (${columns.map(p => "?").join(",")})
  `);
  values.forEach(value => stmp.run(Object.values(value)));
  await stmp.finalize();
  await database.close();
}

export async function UpdateOne(
  table: string,
  updateColumn: string,
  value: string,
  queryColumn: string[],
  queryValues: string[]
) {
  const database = await OpenDatabase();
  let reserved = "";
  for (let i = 0; i < queryColumn.length; i++) {
    const e = queryColumn[i];
    if (i < queryColumn.length - 1) {
      reserved += `${e} = ? AND `;
    } else reserved += `${e} = ?`;
  }

  await database.run(
    `
    UPDATE ${table}
    SET ${updateColumn} = ${value}
    WHERE ${reserved}
  `,
    queryValues
  );
  await database.close();
}

export async function UpdateMany(
  table: string,
  updateColumn: string[],
  values: string[],
  queryColumn: string[],
  queryValues: string[]
) {
  const database = await OpenDatabase();
  let queryReserved = "";
  for (let i = 0; i < queryColumn.length; i++) {
    const e = queryColumn[i];
    if (i < queryColumn.length - 1) {
      queryReserved += `${e} = ? AND `;
    } else queryReserved += `${e} = ?`;
  }
  let updateReserved = "";
  for (let i = 0; i < updateColumn.length; i++) {
    if (i < updateColumn.length - 1) {
      updateReserved += `${updateColumn[i]} = "${values[i].toString()}", `;
    } else updateReserved += `${updateColumn[i]} = "${values[i]}" `;
  }

  await database.run(
    `
    UPDATE ${table}
    SET ${updateReserved}
    WHERE ${queryReserved}
  `,
    queryValues
  );
  await database.close();
}
