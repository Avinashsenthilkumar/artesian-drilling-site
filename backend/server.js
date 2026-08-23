/**
 * Artesian Drilling — backend scaffold
 * ------------------------------------
 * Two endpoints for the two forms on the site:
 *   POST /api/quote     -> "Request a Quote" form (Home page)
 *   POST /api/contact   -> (reserved for a future Contact page form)
 *
 * Everything that actually DOES something (send an email, save to a
 * database, push to Slack, etc.) is left as a TODO stub inside
 * sendQuoteNotification() / sendContactNotification() below.
 * Wire those up to whatever you want later — nodemailer, Resend,
 * Twilio, a Google Sheet, a database — the request/response plumbing
 * around them is already done.
 */

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

/* ------------------------------------------------------------------ */
/* Very small in-memory rate limiter (per IP) so a bad actor can't     */
/* hammer the form endpoints. Fine for a small business site; swap for */
/* a real store (Redis) if you ever need multi-instance deployment.    */
/* ------------------------------------------------------------------ */
const hits = new Map();
function rateLimit(req, res, next) {
  const ip = req.ip;
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute
  const maxHits = 5;

  const record = hits.get(ip) || { count: 0, start: now };
  if (now - record.start > windowMs) {
    record.count = 0;
    record.start = now;
  }
  record.count += 1;
  hits.set(ip, record);

  if (record.count > maxHits) {
    return res.status(429).json({ ok: false, error: "Too many requests. Please try again in a minute." });
  }
  next();
}

/* ------------------------------------------------------------------ */
/* Validation helpers                                                  */
/* ------------------------------------------------------------------ */
function isValidEmail(email) {
  return typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateQuoteBody(body) {
  const errors = [];
  if (!body.name || typeof body.name !== "string" || body.name.trim().length < 2) {
    errors.push("Please enter your name.");
  }
  if (!isValidEmail(body.email)) {
    errors.push("Please enter a valid email address.");
  }
  if (body.message && typeof body.message !== "string") {
    errors.push("Message must be text.");
  }
  return errors;
}

/* ------------------------------------------------------------------ */
/* TODO: implement these. They currently just log to the console so    */
/* you can see the plumbing works end-to-end before wiring up email.   */
/* ------------------------------------------------------------------ */
async function sendQuoteNotification({ name, email, project, message }) {
  // TODO: send an email to artesiandrillingltd@gmail.com, e.g. with nodemailer:
  //
  // const nodemailer = require("nodemailer");
  // const transporter = nodemailer.createTransport({
  //   host: process.env.SMTP_HOST,
  //   port: process.env.SMTP_PORT,
  //   auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  // });
  // await transporter.sendMail({
  //   from: process.env.SMTP_FROM,
  //   to: "artesiandrillingltd@gmail.com",
  //   subject: `New quote request from ${name}`,
  //   text: `Name: ${name}\nEmail: ${email}\nProject: ${project}\n\n${message}`,
  // });
  //
  // Or persist it instead/also, e.g. to a database or Google Sheet.

  console.log("[quote] new request:", { name, email, project, message });
}

async function sendContactNotification({ name, email, message }) {
  // TODO: same idea as sendQuoteNotification — wire up email/DB/whatever.
  console.log("[contact] new message:", { name, email, message });
}

/* ------------------------------------------------------------------ */
/* Routes                                                              */
/* ------------------------------------------------------------------ */
app.post("/api/quote", rateLimit, async (req, res) => {
  const { name, email, project, message } = req.body || {};
  const errors = validateQuoteBody({ name, email, message });
  if (errors.length) {
    return res.status(400).json({ ok: false, errors });
  }

  try {
    await sendQuoteNotification({ name, email, project, message });
    res.json({ ok: true, message: "Thanks! Your request has been received." });
  } catch (err) {
    console.error("Failed to process quote request:", err);
    res.status(500).json({ ok: false, error: "Something went wrong. Please try again shortly." });
  }
});

app.post("/api/contact", rateLimit, async (req, res) => {
  const { name, email, message } = req.body || {};
  const errors = validateQuoteBody({ name, email, message });
  if (errors.length) {
    return res.status(400).json({ ok: false, errors });
  }

  try {
    await sendContactNotification({ name, email, message });
    res.json({ ok: true, message: "Thanks! We'll be in touch shortly." });
  } catch (err) {
    console.error("Failed to process contact message:", err);
    res.status(500).json({ ok: false, error: "Something went wrong. Please try again shortly." });
  }
});

app.get("/api/health", (req, res) => res.json({ ok: true }));

app.listen(PORT, () => {
  console.log(`Artesian Drilling backend listening on http://localhost:${PORT}`);
});
