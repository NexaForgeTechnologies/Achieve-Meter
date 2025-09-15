"use server";
import db from "@/config/db";
import nodemailer from "nodemailer";
import 'dotenv/config';
import cron from "node-cron";

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
      `INSERT INTO achieve_meter (
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
            <p>✅ Early access to MyAchieve</p>
            <p>✅ Priority invites to our AI-led bootcamps</p>
            <p>✅ A front-row seat as we build a new standard for career growth</p>
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
            <p>✅ We'll review your submission</p>
            <p>✅ You’ll receive the Enterprise Pack PDF shortly</p>
            <p>✅ Our team may reach out for a discovery call</p>
          </ul>
          <p>We’re excited to explore how we can support your organisation.</p>
          <p><b>Team AchieveMeter</b></p>
        `,
        text: `Hi ${contact_name},\nThanks for registering your interest in AchieveMeter for Enterprise.\n\nYou’re on our priority list for pilot access and partnership opportunities.\n\nNext steps:\n- We'll review your submission\n- You’ll receive the Enterprise Pack PDF shortly\n- Our team may reach out for a discovery call\n\nWe’re excited to explore how we can support your organisation.\n\nTeam AchieveMeter`,
      };
    }

    try {
      console.log("📨 Preparing to send Business first email...");
      console.log("To:", email);
      console.log("From:", adminEmail);
      console.log("Membership Type:", membership_type);
      console.log("Email HTML length:", userEmailOptions.html?.length);

      await transporter.sendMail(userEmailOptions);
      console.log("✅ Business First email sent.");
    } catch (err) {
      console.error("❌ First email failed:", err.message, err.stack);
    }


    // ... inside your POST handler after sending the first "Welcome" email:

    if (membership_type === "individual") {
      // Email 2 details
      const email2Options = {
        from: `"AchieveMeter Team" <${adminEmail}>`,
        to: email,
        subject: "What is MyAchieve – and why it's made for you",
        html: `
      <p>Hi ${name},</p>
      <p>While we’re getting ready to launch, we wanted to give you a deeper look at <b>MyAchieve</b> – your personal career operating system.</p>
      <p>With MyAchieve, you’ll be able to:</p>
      <ul>
        <li>✅ Track milestones and goals</li>
        <li>✅ Align your growth with your values</li>
        <li>✅ Get peer endorsements on your progress</li>
        <li>✅ Receive AI-powered guidance for your next career step</li>
      </ul>
      <p>Stay tuned – you’ll be one of the first to experience it.</p>
      <p>Cheers,<br>Team AchieveMeter</p>
    `,
        text: `Hi ${name},\n\nWhile we’re getting ready to launch, we wanted to give you a deeper look at MyAchieve – your personal career operating system.\n\nWith MyAchieve, you’ll be able to:\n✅ Track milestones and goals\n✅ Align your growth with your values\n✅ Get peer endorsements on your progress\n✅ Receive AI-powered guidance for your next career step\n\nStay tuned – you’ll be one of the first to experience it.\n\nCheers,\nTeam AchieveMeter`,
      };

      // --- Schedule for 3 days later ---
      const delayMs = 3 * 24 * 60 * 60 * 1000;
      const fireAt = Date.now() + delayMs;

      //checks updates every 5 minutes
      const reminderJob = cron.schedule("*/5 * * * *", async () => {
        // runs every day at 9am server time
        if (Date.now() >= fireAt) {
          try {
            await transporter.sendMail(email2Options);
            console.log(`✅ Email 2 (Meet MyAchieve) sent to ${email}`);
            reminderJob.stop();
          } catch (error) {
            console.error("❌ Failed to send Email 2:", error);
          }
        }
      });

      console.log("⏳ Email 2 scheduled for", new Date(fireAt).toISOString());
    }

    if (membership_type === "business") {
      // Path to your PDF
      const path = require("path"); // at the top of your file if not already

      const pdfPath = path.join(process.cwd(), "public", "AchieveMeter-Brochure.pdf");


      const email2Options = {
        from: `AchieveMeter Partnerships Team <${adminEmail}>`,
        to: business_email,
        subject: "Here’s Your Enterprise Overview Pack",
        html: `
      <p>Hi ${contact_name},</p>
      <p>As promised, here’s your AchieveMeter Enterprise Overview Pack – a complete breakdown of how our platform accelerates workforce development across performance, wellbeing, and purpose.</p>
      <p>If you'd like to schedule a strategy call, contact us via this very email.</p>
      <p>Thanks again,<br><b>The AchieveMeter Partnerships Team</b></p>
    `,
        text: `
      Hi ${contact_name},

      As promised, here’s your AchieveMeter Enterprise Overview Pack – a complete breakdown of how our platform accelerates workforce development across performance, wellbeing, and purpose.

      If you'd like to schedule a strategy call, contact us via this very email.

      Thanks again,
      The AchieveMeter Partnerships Team
    `,
        attachments: [
          {
            filename: "AchieveMeter-Brochure.pdf",
            path: pdfPath, // local path or URL
          },
        ],
      };

      try {
        const info = await transporter.sendMail(email2Options);
        console.log(`✅ Email 2 (Enterprise Pack) sent immediately to ${business_email}`);
        console.log("📧 Email 2 send info:", info);
      } catch (err) {
        console.error("❌ Failed to send Email 2 (Enterprise Pack):", err.message, err.stack);
      }

    }


    // ---- Final Response ----
    return Response.json(
      {
        success: true,
        message: `🎉 You're on the Founding Waitlist!

        Thanks for signing up. You’ve officially joined the AchieveMeter movement — where career velocity meets clarity, purpose, and measurable progress.

        We’ll keep you updated on:
        - Early access opportunities
        - Behind-the-scenes updates
        - Your invitation to experience the platform before anyone else

        Next Steps:
        Keep an eye on your inbox — and follow us on LinkedIn to stay connected.

        Welcome to the future of growth.

        – The AchieveMeter Team`,
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
