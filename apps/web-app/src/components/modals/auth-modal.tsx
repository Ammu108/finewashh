"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import LoginForm from "@/features/auth/components/login-form";
import SignUpForm from "@/features/auth/components/signup-form";
import { useModalStore } from "@/store/modal-store";
import { Dialog, DialogContent } from "../ui/dialog";

const AuthModal = () => {
  const { isOpen, closeModal } = useModalStore();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();

  const mode = searchParams.get("auth") === "signup" ? "signup" : "login";

  const setMode = (newMode: "login" | "signup") => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("auth", newMode);
    router.replace(`${pathName}?${params.toString()}`);
  };

  const handleOpenChange = (open: boolean) => {
    if (open) {
      return;
    }

    closeModal();

    const params = new URLSearchParams(searchParams.toString());
    params.delete("auth");
    const query = params.toString();
    router.replace(query ? `${pathName}?${query}` : pathName);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md ">
        {/* Header */}
        <div className="flex flex-col gap-2 text-center">
          <h2 className="text-2xl font-semibold">
            {mode === "login" ? "Welcome Back" : "Create an Account"}
          </h2>
          <p className="text-sm text-muted-foreground">
            {mode === "login" ? "Login to continue" : "Sign up to get started"}
          </p>
        </div>

        <div className="mt-4 flex items-center justify-center">
          {mode === "signup" ? <SignUpForm /> : <LoginForm />}
        </div>

        <div className="text-center text-sm mt-4">
          {mode === "login" ? (
            <>
              Don’t have an account?{" "}
              <button
                type="button"
                onClick={() => setMode("signup")}
                className="text-primary font-medium cursor-pointer"
              >
                Sign up
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => setMode("login")}
                className="text-primary font-medium cursor-pointer"
              >
                Login
              </button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
