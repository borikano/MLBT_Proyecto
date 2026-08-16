import { PrismaClient } from "@prisma/client";

const databaseUrl = process.env.MLBT_PROBE_DATABASE_URL;

if (!databaseUrl) {
  throw new Error("MLBT_PROBE_DATABASE_URL ausente");
}

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: databaseUrl,
    },
  },
});

function classifyGrant(grant) {
  const normalized = grant.toUpperCase();

  return {
    createDatabase:
      normalized.includes("ALL PRIVILEGES ON *.*") ||
      normalized.includes("CREATE ON *.*"),
    grantOption:
      normalized.includes("WITH GRANT OPTION"),
  };
}

try {
  const grants = await prisma.$queryRawUnsafe("SHOW GRANTS FOR CURRENT_USER()");
  const versionRows = await prisma.$queryRawUnsafe("SELECT VERSION() AS version");
  const databaseRows = await prisma.$queryRawUnsafe("SELECT DATABASE() AS db");

  let canCreateDatabase = false;
  let hasGrantOption = false;

  for (const row of grants) {
    for (const value of Object.values(row)) {
      if (typeof value !== "string") continue;
      const classification = classifyGrant(value);
      canCreateDatabase ||= classification.createDatabase;
      hasGrantOption ||= classification.grantOption;
    }
  }

  console.log(
    JSON.stringify({
      mysqlReachable: true,
      mysqlVersionPresent: Boolean(versionRows?.[0]?.version),
      databaseSelected: Boolean(databaseRows?.[0]?.db),
      grantsCount: grants.length,
      canCreateDatabase,
      hasGrantOption,
    })
  );
} finally {
  await prisma.$disconnect();
}