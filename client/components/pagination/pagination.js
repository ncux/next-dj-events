import Link from "next/link";
import { PER_PAGE } from "../../config";

export default function Pagination({ currentPage, total }) {

    const lastPage = Math.ceil(total / PER_PAGE);

    return (
        <>

            {
                currentPage > 1 && (
                    <Link href={`/events?page=${currentPage - 1}`}>
                        <a className="btn-secondary">Previous</a>
                    </Link>
                )
            }

            {
                currentPage < lastPage && (
                    <Link href={`/events?page=${currentPage + 1}`}>
                        <a className="btn-secondary">Next</a>
                    </Link>
                )
            }

        </>
    );
}
