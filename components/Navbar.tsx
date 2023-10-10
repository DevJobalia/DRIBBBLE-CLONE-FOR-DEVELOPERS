import Link from "next/link";
import Image from "next/image";
import { NavLinks } from "@/constants";
import AuthProvider from "./AuthProvider";
import { getCurrentUser } from "@/lib/session";
import { signOut } from "next-auth/react";
import ProfileMenu from "./ProfileMenu";

const Navbar = async () => {
  const session = await getCurrentUser();

  return (
    <nav className="flexBetween navbar">
      <div className="flex-1 flexStart gap-10">
        <Link href="/">
          <Image src="/logo.svg" width={115} height={43} alt="Flexibble" />
        </Link>
        <ul className="xl:flex hidden text-small gap-7">
          {NavLinks.map((link) => (
            <Link href={link.href} key={link.key}>
              {link.text}
            </Link>
          ))}
        </ul>
      </div>
      <div className="flexCenter gap-4">
        {session?.user ? (
          <>
            {/* BELOW COMPONET IS CLIENT SIDE RENDERED AND REST IS SERVER SIDE RENDERED */}
            <ProfileMenu session={session} />
            <Link href="/create-project">Share Work</Link>
          </>
        ) : (
          <AuthProvider />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
