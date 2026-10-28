import { config } from "dotenv";
import { connectDB } from "../config/database.js";
import { Events } from "../models/events.js";

config();

const args = process.argv.slice(2);
const getArgument = (name) => {
  const index = args.indexOf(name);
  return index === -1 ? undefined : args[index + 1];
};

const eventIds = getArgument("--events")?.split(",").filter(Boolean);
const open = getArgument("--open");
const until = getArgument("--until");

if (!eventIds?.length || !["true", "false"].includes(open)) {
  console.error(
    "Usage: npm run registration:status -- --events 1,2 --open true [--until 2026-12-31]"
  );
  process.exit(1);
}

const update = { registrations_open: open === "true" };
if (until) {
  const deadline = new Date(`${until}T23:59:59.999Z`);
  if (Number.isNaN(deadline.getTime())) {
    console.error("--until must be a valid YYYY-MM-DD date");
    process.exit(1);
  }
  update.eventDeadline = deadline;
}

try {
  await connectDB();
  const result = await Events.updateMany(
    { eventId: { $in: eventIds } },
    update
  );
  console.log(`Updated ${result.modifiedCount} event(s).`);
  process.exit(0);
} catch (error) {
  console.error("Unable to update registrations:", error.message);
  process.exit(1);
}
