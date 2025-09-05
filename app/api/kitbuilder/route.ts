import { NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"

export const runtime = "nodejs"

export async function POST(req: Request) {
  try {
    const form = await req.formData()
    const file = form.get("design") as File | null
    if (!file) {
      return NextResponse.json({ error: "Missing design file" }, { status: 400 })
    }

    const name = String(form.get("name") || "")
    const email = String(form.get("email") || "")
    const phone = String(form.get("phone") || "")
    const address1 = String(form.get("address1") || "")
    const address2 = String(form.get("address2") || "")
    const city = String(form.get("city") || "")
    const state = String(form.get("state") || "")
    const zip = String(form.get("zip") || "")
    const country = String(form.get("country") || "")
    const notes = String(form.get("notes") || "")

    if (!name || !email || !address1 || !city || !state || !zip || !country) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Prepare upload path
    const uploadsDir = path.join(process.cwd(), "public", "kit_uploads")
    await fs.mkdir(uploadsDir, { recursive: true })

    // Generate a reference and filename
    const ts = Date.now()
    const safeName = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
    const ext = file.type === "image/png" ? ".png" : file.type === "image/jpeg" ? ".jpg" : path.extname(file.name) || ".img"
    const reference = `KB-${ts.toString(36).toUpperCase()}`
    const filename = `${reference}-${safeName}${ext}`

    // Convert File to Buffer
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Save file
    const filePath = path.join(uploadsDir, filename)
    await fs.writeFile(filePath, buffer)

    // Persist submission metadata (simple append to a log file)
    const logPath = path.join(uploadsDir, "submissions.ndjson")
    const record = {
      reference,
      filename,
      name,
      email,
      phone,
      address1,
      address2,
      city,
      state,
      zip,
      country,
      notes,
      createdAt: new Date().toISOString(),
    }
    await fs.appendFile(logPath, JSON.stringify(record) + "\n")

    // Return public URL for preview if needed
    const publicUrl = `/kit_uploads/${filename}`
    return NextResponse.json({ ok: true, reference, fileUrl: publicUrl })
  } catch (err: any) {
    console.error("kitbuilder POST error", err)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
