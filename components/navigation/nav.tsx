import { auth } from "@/auth";
import Image from "next/image";
import UserButton from "./user-button";
import { Button } from "../ui/button";
import Link from "next/link";
import { LogIn } from "lucide-react";

export default async function Nav() {
  const session = await auth();

  console.log("session", session);
  return (
    <header className="py-8">
      <nav>
        <ul className="flex justify-between ">
          <li>
            <Link href={"/"}>
              <Image
                src="/logo.svg"
                width={110}
                height={50}
                priority
                alt="logo"
              />
            </Link>
          </li>

          {!session ? (
            <li>
              <Button asChild>
                <Link href={"/auth/login"} className="flex gap-2">
                  <LogIn />
                  <span>Login</span>
                </Link>
              </Button>
            </li>
          ) : (
            <li>
              <UserButton user={session?.user} expires={session?.expires} />
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
