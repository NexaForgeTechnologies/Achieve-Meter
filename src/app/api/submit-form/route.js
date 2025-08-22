import db from "@/config/db";

export async function POST(req) {
  try {
    const body = await req.json();

    const {
      membership_type = "",
      name = "",
      job = "",
      company_name = "",
      email = "",
      linkedin = "",
      country = "",
      interests = [],
      membership_options = [],
      seniority = "",
      goals = "",
      benefits = "",
      source = [],
      source_other = "",
      invite_option = "",
    } = body;

    const query = `
      INSERT INTO waitlist_applications 
      (membership_type, name, job, company_name, email, linkedin, country, interests, membership_options, seniority, goals, benefits, source, source_other, invite_option) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      membership_type,
      name,
      job,
      company_name,
      email,
      linkedin,
      country,
      JSON.stringify(interests),
      JSON.stringify(membership_options),
      seniority,
      goals,
      benefits,
      JSON.stringify(source),
      source_other,
      invite_option,
    ];

    console.log("📥 Inserting values into DB:", values); // Log values being inserted

    const [result] = await db.execute(query, values);

    console.log("✅ Insert successful:", result);

    return new Response(
      JSON.stringify({ success: true, id: result.insertId }),
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Error inserting into DB:", error); // full error log
    return new Response(
      JSON.stringify({
        success: false,
        message: "Database insert failed",
        error: error.message,
      }),
      { status: 500 }
    );
  }
}
