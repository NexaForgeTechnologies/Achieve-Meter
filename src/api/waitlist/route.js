import db from "@/config/db";

export async function POST(request) {
  try {
    const body = await request.json();

    const {
      membership_type,   // "individual" | "business"
      name,              // Full Name
      email,             // Email Address
      linkedin,          // LinkedIn Profile (optional)
      hopes,
      early_access,      // Yes or NO
      contact_name,      // Contact Name
      company_name,      // Company Name
      company_size,      // Company Size
      business_email,    // Business Email
      company_industry,
      interests,
      source,
      source_other,
      invite_option,
    } = body;

    // ---- Validation ----
    if (!membership_type || !name || !job || !email || !country) {
      return Response.json(
        {
          message:
            "Please fill in all required fields (name, job, email, country, membership type).",
        },
        { status: 400 }
      );
    }

    if (!Array.isArray(interests) || interests.length === 0) {
      return Response.json(
        { message: "Please select at least one interest." },
        { status: 400 }
      );
    }

    if (!Array.isArray(membership_options) || membership_options.length === 0) {
      return Response.json(
        { message: "Please select at least one membership option." },
        { status: 400 }
      );
    }

    if (!Array.isArray(source)) {
      return Response.json(
        { message: "Source must be an array." },
        { status: 400 }
      );
    }

    // ---- Insert into database ----
    const [result] = await db.execute(
      `INSERT INTO waitlist 
      (
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
      invite_option,
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        membership_type || null,
        name || null,
        email || null,
        linkedin || null,
        JSON.stringify(hopes) || null,
        early_access || null,
        contact_name || null,
        company_name || null,
        company_size || null,
        business_email || null,
        early_access || null,
        JSON.stringify(company_industry) || null,
        JSON.stringify(interests) || null,
        JSON.stringify(source) || null,
        JSON.stringify(source_other) || null,
        invite_option || null,
      ]
    );

    return Response.json(
      {
        success: true,
        message:
          "✅ Application submitted successfully. Thank you for joining the waitlist!",
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
