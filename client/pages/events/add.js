import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Layout from "../../components/layout/layout";
import { API_URL } from "../../config";
import classes from "../../styles/add.module.css";

export default function AddEventPage() {

    const router = useRouter();

    return (
        <Layout title="Add an event">
            <h2>Add Event Page</h2>
        </Layout>
    );
}
