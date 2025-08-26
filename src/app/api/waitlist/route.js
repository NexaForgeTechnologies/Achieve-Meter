import db from "@/config/db";
import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    const body = await request.json();

    const {
      membership_type, // "individual" | "business"

      // Individual
      name,
      email,
      linkedin,
      hopes,
      early_access,

      // Business
      contact_name,
      company_name,
      company_size,
      business_email,
      company_industry,
      interests,

      // Shared
      source,
      source_other,
      invite_option,
    } = body;

    // ---- Validation ----
    if (!membership_type) {
      return Response.json(
        { message: "Membership type is required." },
        { status: 400 }
      );
    }

    if (membership_type === "individual") {
      if (!name?.trim() || !email?.trim()) {
        return Response.json(
          { message: "Name and email are required for individuals." },
          { status: 400 }
        );
      }
    }

    if (membership_type === "business") {
      if (!contact_name?.trim() || !company_name?.trim() || !business_email?.trim()) {
        return Response.json(
          { message: "Contact name, company name, and business email are required for businesses." },
          { status: 400 }
        );
      }
    }

    // ---- Insert into database (conditionally set unused fields to NULL) ----
    const [result] = await db.execute(
      `INSERT INTO waitlist (
        membership_type,
        name,
        email,
        linkedin,
        hopes,
        early_access,
        contact_name,
        company_name,
        company_size,
        business_email,
        company_industry,
        interests,
        source,
        source_other,
        invite_option
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        membership_type,
        membership_type === "individual" ? name : null,
        membership_type === "individual" ? email : null,
        membership_type === "individual" ? linkedin : null,
        membership_type === "individual" ? JSON.stringify(hopes || null) : null,
        membership_type === "individual" ? early_access : null,
        membership_type === "business" ? contact_name : null,
        membership_type === "business" ? company_name : null,
        membership_type === "business" ? company_size : null,
        membership_type === "business" ? business_email : null,
        membership_type === "business" ? JSON.stringify(company_industry || null) : null,
        membership_type === "business" ? JSON.stringify(interests || null) : null,
        source ? JSON.stringify(source) : null,
        source_other || null,
        invite_option || null,
      ]
    );

    console.log("✅ Insert Result:", result);

    // ---- Nodemailer setup ----
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false, // true if port 465
      auth: {
        user: process.env.SMTP_XEC_USER,
        pass: process.env.SMTP_XEC_PASS,
      },
    });

    const adminEmail = process.env.SMTP_XEC_USER;

    // ---- Admin email ----
    const adminEmailPromise = transporter.sendMail({
      from: `"Xec Plug Waitlist" <${process.env.SMTP_XEC_USER}>`,
      to: adminEmail,
      subject: "Hi Team, New Waitlist Signup",
      html: `
        <p>Membership Type: ${membership_type}</p>
        ${
          membership_type === "individual"
            ? `
              <p>Name: ${name}</p>
              <p>Email: ${email}</p>
            `
            : `
              <p>Contact Name: ${contact_name}</p>
              <p>Company: ${company_name}</p>
              <p>Business Email: ${business_email}</p>
              <p>Company Size: ${company_size}</p>
            `
        }
        <p>A new registration has just been submitted to the XecPlug waitlist.</p>
      `,
    });

    // ---- User confirmation email ----
    let subject, userEmailHtml, userRecipient;

    if (membership_type === "individual") {
      subject = "You're on the list — welcome to Xec Plug";
      userRecipient = email;
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
        <p>Welcome aboard,<br/>The Xec Plug Team<br/>xecplug@theprocurementplug.com</p>
      `;
    } else {
      subject = "Your organisation is on the waitlist – Xec Plug Enterprise";
      userRecipient = business_email;
      userEmailHtml = `
        <p>Hi ${contact_name},</p>
        <p>Thank you for registering your organisation’s interest in <b>The Xec Plug</b> — the first-of-its-kind leadership platform preparing procurement teams for enterprise transformation, C-suite progression, and boardroom influence.</p>
        <p>Your interest confirms a shared vision: that procurement is no longer just a function, but a force for strategic enterprise value.</p>
        <p>As an enterprise partner, you’ll soon gain priority access to:</p>
        <ul>
          <li>Our <b>XecEdge Leadership Suite</b> — including team diagnostics, AI benchmarking, and enterprise-level leadership analytics.</li>
          <li>Bespoke <b>CPO-to-COO capability programmes</b></li>
          <li>Access to our <b>strategic secondment model</b> via XecXchange</li>
          <li>Tailored team access to our <b>concierge service</b>, retreats, and masterclasses</li>
          <li>Enterprise onboarding to both <b>Digital</b> and <b>Xec House</b> tier pathways</li>
        </ul>
        <p>Enterprise onboarding will begin from <b>Spring 2026</b>, with strategic briefings and early partner discovery calls scheduled ahead of launch.</p>
        <p>We’ll be in touch shortly to schedule an optional intro call with our founder or partnerships team.</p>
        <p>Warm regards,<br/>The Xec Plug Team<br/>xecplug@theprocurementplug.com</p>
      `;
    }

    const userEmailPromise = transporter.sendMail({
      from: `"The Xec Plug Team" <${process.env.SMTP_XEC_USER}>`,
      to: userRecipient,
      subject,
      html: userEmailHtml,
    });

    // Fire and forget
    adminEmailPromise.catch(err => console.error("❌ Failed to send admin email:", err));
    userEmailPromise.catch(err => console.error("❌ Failed to send user email:", err));

    return Response.json(
      {
        success: true,
        message: "✅ Application submitted successfully. Thank you for joining the waitlist!",
        applicationId: result.insertId,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Error inserting into database:", error);
    return Response.json(
      {
        success: false,
        message: "Something went wrong. Please try again later.",
      },
      { status: 500 }
    );
  }
}
