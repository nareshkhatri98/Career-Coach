
import { checkUser } from "@/lib/inngest/checkUser";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { ChevronDown, FileText, GraduationCap, LayoutDashboard, PenBox, StarsIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";

const Header = async () => {
  await checkUser();
  return (
    <header className="fixed top-0 w-full border-b bg-background/80 backdrop-blur-md z-50 supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href={'/'}>
          <h1 className="text-2xl font-bold"> Career- <span className="text-pink-700">Coach </span></h1>
        </Link>
        <div className="flex items-center space-x-2 md:space-x-4" >
          {/* if user in login */}
          <SignedIn>
            <Link href={'/dashboard'}>
              <Button variant={"outline"}>
                <LayoutDashboard className="h-4 w-4" />
                <span className="hidden md:block">Industry Insights </span>
              </Button>
            </Link>


            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button>
                  <StarsIcon className="h-4 w-4" />
                  <span className="hidden md:block">Growth Tools </span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Link href={'/resume'} className="flex items-center gap-2">

                    <FileText className="h-4 w-4" />

                    <span >Build Resume </span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href={'/cover-letter'} className="flex items-center gap-2">
                    <PenBox className="h-4 w-4" />
                    <span>Cover letter</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href={'/interview'} className=" flex items-center gap-2">
                    <GraduationCap className="h-4 w-4" />
                    Interview Prepare
                  </Link>
                </DropdownMenuItem>

              </DropdownMenuContent>
            </DropdownMenu>
          </SignedIn>

          {/* if user is not login */}
          <SignedOut>
            <SignInButton >
              <Button variant={"outline"}>Sign In</Button>
            </SignInButton>
          </SignedOut>
          {/* if user in login then show profile */}
          <SignedIn>
            <UserButton appearance={{
              elements: {
                avatarBox: "w-10 h-10",
                userButtonPopoverCard: "shadow-xl",
                userPreviewMainIdentifier: "font-semibold",
              },
            }}
              afterSignOutUrl="/"
            />

          </SignedIn>


        </div>
      </nav>

    </header>
  )
}

export default Header