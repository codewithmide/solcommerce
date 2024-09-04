import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="between w-full ">
      <div>
        <Link href="/">Home</Link>
      </div>
      <ul className="center gap-10">
        <li>
          <Link href="/products/list">View Products</Link>
        </li>
        <li>
          <Link href="/products/add">Add Product</Link>
        </li>
      </ul>
    </nav>
  );
}
