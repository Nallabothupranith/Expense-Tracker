import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full py-8 text-center text-xs text-gray-500 bg-transparent">
      <div className="flex flex-wrap justify-center gap-4 mb-2">
        <Link href="#">About</Link>
        <Link href="#">Press</Link>
        <Link href="#">Blog</Link>
        <Link href="#">Jobs</Link>
        <Link href="#">Contact us</Link>
        <Link href="#">FAQ</Link>
      </div>
      <div>Made with ❤️ for expense tracking</div>
    </footer>
  );
}
