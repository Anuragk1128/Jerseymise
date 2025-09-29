import Image from "next/image"

export default function Instagram() {
  return (
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4 text-center">
        <h3 className="text-xl md:text-2xl font-extrabold tracking-wide font-gotham">EXPLORE OUR INSTAGRAM</h3>
        <div className="mt-8 mx-auto relative w-56 h-56 md:w-64 md:h-64">
          <Image src="/scanner_.png" alt="Instagram QR" fill className="object-contain" />
        </div>
        <p className="mt-3 text-sm text-muted-foreground">@JERSEYMISE</p>
      </div>
    </section>
  )
}
