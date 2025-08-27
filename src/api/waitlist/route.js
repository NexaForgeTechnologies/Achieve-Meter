import db from "@/config/db";
import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    const body = await request.json();

    const {
      membership_type,
      name,
      job,
      company_name,
      email,
      linkedin,
      country,
      interests,
      membership_options,
      seniority,
      goals,
      benefits,
      source,
      source_other,
      invite_option,
    } = body;

    // ---- Insert into database ----
    const [result] = await db.execute(
      `INSERT INTO waitlist 
      (
        membership_type, 
        name, 
        job_title, 
        company_name, 
        email, 
        linkedin, 
        country, 
        interests, 
        membership_options,
        seniority,
        goals,
        benefits,
        source,
        source_other,
        invite_option
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        membership_type || null,
        name || null,
        job || null,
        company_name || null,
        email || null,
        linkedin || null,
        country || null,
        JSON.stringify(interests) || null,
        JSON.stringify(membership_options) || null,
        seniority || null,
        goals || null,
        benefits || null,
        JSON.stringify(source) || null,
        source_other || null,
        invite_option || null,
      ]
    );

    // ---- Nodemailer setup ----
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false, // use TLS (true) if port 465
      auth: {
        user: process.env.SMTP_XEC_USER, // should match SMTP credentials
        pass: process.env.SMTP_XEC_PASS,
      },
    });

    const adminEmail = process.env.SMTP_XEC_USER;

    // ---- Send admin email ----
    const adminEmailPromise = transporter.sendMail({
      from: `"Xec Plug Waitlist" <${process.env.SMTP_XEC_USER}>`,
      to: adminEmail,
      subject: "Hi Team, New Waitlist Signup",
      html: `
      <p>Name: ${name}</p>
      <p>Email: ${email}</p>
      <p>Job Title: ${job}</p>
      <p>Company: ${company_name}</p>
      <p>Country: ${country}</p>
      <p>Business type: ${membership_type}</p>
        <p>A new registration has just been submitted to the XecPlug waitlist.</p>
      `,
    });

    // ---- Build user confirmation email based on membership type ----
    let subject, userEmailHtml;

    if (membership_type === "individual") {
      // ✅ Individual template
      subject = "You're on the list — welcome to Xec Plug";
      userEmailHtml = `
      <p>Hi ${name},</p>
      <p>Thank you for joining the waitlist for <b>The Xec Plug</b> — our invitation-only platform preparing procurement leaders for enterprise transformation and boardroom influence.</p>
      <p>This is not just a membership. It’s a high-calibre leadership ecosystem designed to support your next leap — from CPO to COO, CEO, or board-level strategist.</p>
      <p>As part of the waitlist, you’ll be among the first to:</p>
      <ul>
        <li>Access our <b>proprietary XecEdge tools</b> including XecAchieve and the Decision-Making Impact Tracker</li>
        <li>Join <b>executive peer exchange</b> placements via XecXchange</li>
        <li>Explore our <b>concierge services</b> and <b>virtual masterclasses</b></li>
        <li>Receive an early invitation to The <b>Xec House membership</b> and our 2026 executive retreats</li>
      </ul>
      <p>📅 We’ll begin onboarding founding members from <b>Spring 2026</b>. Until then, you’ll receive exclusive updates and insights on how the platform is shaping up.</p>

      <p>Welcome aboard,</br>
      The Xec Plug Team</br>
      xecplug@theprocurementplug.com</p>
    `;
    } else {
      // ✅ Business template
      subject = "Your organisation is on the waitlist – Xec Plug Enterprise";
      userEmailHtml = `
      <p>Hi ${name},</br></p>
      <p>Thank you for registering your organisation’s interest in <b>The Xec Plug</b> — the first-of-its-kind leadership platform preparing procurement teams for enterprise transformation, C-suite progression, and boardroom influence.</br></p>
      <p>Your interest confirms a shared vision: that procurement is no longer just a function, but a force for strategic enterprise value.</br></p>
      <p>As an enterprise partner, you’ll soon gain priority access to:</p>
      <ul>
        <li>Our <b>XecEdge Leadership Suite — </b>including team diagnostics, AI benchmarking, and enterprise-level leadership analytics.</li>
        <li>Bespoke <b>CPO-to-COO capability programmes</b></li>
        <li>Access to our <b>strategic secondment model</b> via XecXchange</li>
        <li>Tailored team access to our <b>concierge service</b>, retreats, and masterclasses</li>
        <li>Enterprise onboarding to both <b>Digital</b> and <b>Xec House</b> tier pathways</br></li>
      </ul>
      <p>Enterprise onboarding will begin from <b>Spring 2026</b>, with strategic briefings and early partner discovery calls scheduled ahead of launch.</p>
      <p>We’ll be in touch shortly to schedule an optional intro call with our founder or partnerships team.</br></p>
      <p>Warm regards,</br>
      The Xec Plug Team</br>
      xecplug@theprocurementplug.com</p>
    `;
    }

    // ---- Send user confirmation email ----
    const userEmailPromise = transporter.sendMail({
      from: `"The Xec Plug Team" <${process.env.SMTP_XEC_USER}>`,
      to: email,
      subject,
      html: userEmailHtml,
    });

    // ---- Fire-and-forget (no await) ----
    adminEmailPromise.catch(err =>
      console.error("❌ Failed to send admin email:", err)
    );
    userEmailPromise.catch(err =>
      console.error("❌ Failed to send user email:", err)
    );

    // ✅ Respond immediately
    return Response.json(
      {
        success: true,
        message:
          "✅ Application submitted successfully. Emails are being sent in background.",
        applicationId: result.insertId,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Error inserting into database or sending email:", error);
    return Response.json(
      {
        success: false,
        message: "Something went wrong. Please try again later.",
      },
      { status: 500 }
    );
  }
}
