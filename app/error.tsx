"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Error = ({ error }: { error: Error }) => {
  const router = useRouter();

  useEffect(() => {
    console.error(error);
    router.push("/");
  }, [error, router]);

  return <></>;
};

export default Error;
