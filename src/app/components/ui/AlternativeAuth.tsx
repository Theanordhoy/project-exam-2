import Link from "next/link";

interface AlternativeAuthProps {
  mode: "login" | "register";
}

export default function AlternativeAuth({ mode }: AlternativeAuthProps) {
  const isLogin = mode === "login";

  return (
    <p className="sm:text-end text-sm ">
      {isLogin ? "Don't have an account yet?" : "Already have an account?"}{" "}
      <Link
        href={isLogin ? "/register" : "/login"}
        className="text-primary font-bold hover:underline"
      >
        {isLogin ? "Sign up here!" : "Log in here!"}
      </Link>
    </p>
  );
}
