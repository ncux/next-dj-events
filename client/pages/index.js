import Link from "next/link";
import Layout from "../components/layout/layout";

export default function Home() {

  return (
    <Layout title="DJ Events | Home">
        <div >
            <h2>Home</h2>
            <Link href="/about">About</Link>

        </div>
    </Layout>
  )
}
