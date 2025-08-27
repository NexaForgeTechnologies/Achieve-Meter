"use server";
import db from "@/config/db";
import nodemailer from "nodemailer";
import 'dotenv/config';

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
      return Response.json({ message: "Membership type is required." }, { status: 400 });
    }

    if (membership_type === "individual") {
      if (!name?.trim() || !email?.trim()) {
        return Response.json(
          { message: "Name and email are required for individuals." },
          { status: 400 }
        );
      }
    } else if (membership_type === "business") {
      if (!contact_name?.trim() || !company_name?.trim() || !business_email?.trim()) {
        return Response.json(
          { message: "Contact name, company name, and business email are required for businesses." },
          { status: 400 }
        );
      }
    }

    // ---- Insert into database ----
    const [result] = await db.execute(
      `INSERT INTO waitlist (
        membership_type, name, email, linkedin, hopes, early_access,
        contact_name, company_name, company_size, business_email,
        company_industry, interests, source, source_other, invite_option
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
      secure: false,
      auth: {
        user: process.env.SMTP_XEC_USER,
        pass: process.env.SMTP_XEC_PASS,
      },
      tls: { rejectUnauthorized: false },
    });

    // Debug SMTP env
    console.log("SMTP user:", process.env.SMTP_XEC_USER);
    console.log("SMTP pass:", process.env.SMTP_XEC_PASS ? "✓ exists" : "✗ missing");

    // ---- Admin Email ----
    const adminEmail = process.env.SMTP_XEC_USER;
    const adminEmailTemplate = `
      <!DOCTYPE html>
      <html>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2>New XecPlug Waitlist Registration</h2>
        <p><strong>Membership Type:</strong> ${membership_type}</p>
        <p><strong>Individual Name:</strong> ${name || '-'}</p>
        <p><strong>Individual Email:</strong> ${email || '-'}</p>
        <p><strong>Company Name:</strong> ${company_name || '-'}</p>
        <p><strong>Contact Name:</strong> ${contact_name || '-'}</p>
      </body>
      </html>
    `;

    try {
      await transporter.sendMail({
        from: `"Achieve Meter" <${adminEmail}>`,
        to: adminEmail,
        subject: "New Waitlist Signup - Achieve Meter",
        html: adminEmailTemplate,
      });
      console.log("✅ Admin email sent.");
    } catch (err) {
      console.error("❌ Admin email failed:", err.message, err.stack);
    }

    // ---- User Email ----
    let userEmailOptions;
    if (membership_type === "individual") {
      userEmailOptions = {
        from: `"AchieveMeter Team" <${adminEmail}>`,
        to: email,
        subject: "Welcome to AchieveMeter – You're On the List!",
        html: `
          <p>Hi ${name},</p>
          <p>You're officially on the AchieveMeter waitlist – welcome to the future of career acceleration.</p>
          <p>Here’s what you can expect:</p>
          <ul>
            <li>✅ Early access to MyAchieve</li>
            <li>✅ Priority invites to our AI-led bootcamps</li>
            <li>✅ A front-row seat as we build a new standard for career growth</li>
          </ul>
          <p>Follow us on LinkedIn for sneak peeks and updates.</p>
          <p>Thanks for joining the movement,<br><b>The AchieveMeter Team</b></p>
        `,
        text: `Hi ${name},\nYou're officially on the AchieveMeter waitlist – welcome to the future of career acceleration.\n\nHere’s what you can expect:\n- Early access to MyAchieve\n- Priority invites to our AI-led bootcamps\n- A front-row seat as we build a new standard for career growth\n\nFollow us on LinkedIn for sneak peeks and updates.\n\nThanks for joining the movement,\nThe AchieveMeter Team`,
      };
      
    } else if (membership_type === "business") {
      userEmailOptions = {
        from: `"AchieveMeter Team" <${adminEmail}>`,
        to: business_email,
        subject: "You're in – Let's Transform Workforce Development",
        html: `
          <p>Hi ${contact_name},</p>
          <p>Thanks for registering your interest in AchieveMeter for Enterprise.</p>
          <p>You’re on our priority list for pilot access and partnership opportunities.</p>
          <p>Next steps:</p>
          <ul>
            <li>✔️ We'll review your submission</li>
            <li>✔️ You’ll receive the Enterprise Pack PDF shortly</li>
            <li>✔️ Our team may reach out for a discovery call</li>
          </ul>
          <p>We’re excited to explore how we can support your organisation.</p>
          <p><b>Team AchieveMeter</b></p>
        `,
        text: `Hi ${contact_name},\nThanks for registering your interest in AchieveMeter for Enterprise.\n\nYou’re on our priority list for pilot access and partnership opportunities.\n\nNext steps:\n- We'll review your submission\n- You’ll receive the Enterprise Pack PDF shortly\n- Our team may reach out for a discovery call\n\nWe’re excited to explore how we can support your organisation.\n\nTeam AchieveMeter`,
      };
    }

    try {
      console.log("📨 Sending user email to:", userEmailOptions.to);
      await transporter.sendMail(userEmailOptions);
      console.log("✅ User email sent.");
    } catch (err) {
      console.error("❌ User email failed:", err.message, err.stack);
    }

    // ---- Final Response ----
    return Response.json(
      {
        success: true,
        message: "🎉 You're in! Confirmation email sent.",
        applicationId: result.insertId,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Internal Server Error:", error.stack || error);

    return Response.json(
      {
        success: false,
        message: "Something went wrong. Please try again later.",
      },
      { status: 500 }
    );
  }
}
