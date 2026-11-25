// Unsent: The Micro-Confession Sprint
// make.fun bounty u-boothlord-unsent-the-micro-confession-sprint-8c6596ba
//
// One micro-confession in exactly two parts: a To: line naming who the
// message was meant for, and the unsent message itself, one line written
// exactly as it was typed, with no explanation after it.
//
// The program writes the confession to /output/entry.txt. It is fully
// deterministic: the same bytes on every run, no input, no randomness,
// no network, no clock.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

// The confession, written in this session. Two parts, nothing else:
// the addressee, then the one line that stayed in drafts.
const TO_LINE =
  "To: Rani, my best friend since primary school";

const MESSAGE_LINE =
  "I typed sorry for missing your dad's funeral eleven times and deleted it eleven times because no version of it sounded like it was enough, so in the end I sent nothing.";

const ENTRY = `${TO_LINE}\n${MESSAGE_LINE}\n`;

function main(): void {
  // The gate allows 1 to 260 UTF-8 characters; the message line itself
  // must be at most 200 characters. Fail loudly instead of writing an
  // entry the scorer would reject.
  const totalChars = [...ENTRY].length;
  if (totalChars < 1 || totalChars > 260) {
    throw new Error(`entry is ${totalChars} characters, must be 1-260`);
  }
  if ([...MESSAGE_LINE].length > 200) {
    throw new Error("message line exceeds 200 characters");
  }
  if (TO_LINE.trim() === "" || MESSAGE_LINE.trim() === "") {
    throw new Error("entry parts must not be empty");
  }

  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  const outPath = join(outDir, "entry.txt");
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, ENTRY, "utf8");
  console.log(
    `wrote ${outPath}: ${totalChars} characters total, ` +
      `${[...MESSAGE_LINE].length} in the message line`,
  );
}

main();
