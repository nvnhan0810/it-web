import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { UserCircle } from "lucide-react";
import Link from "next/link";
import { Icons } from "./icons";
import { MobileNav } from "./mobile-nav";
import { buttonVariants } from "./ui/button";

const SiteHeader = async () => {
    return (
        <header className="z-10 sticky top-0 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-2">
            <div className="container flex h-14 max-w-4xl items-center mx-auto">
                <nav className="flex items-center space-x-4 lg:space-x-6">
                    <Link href="/" className="mr-6 flex items-center space-x-2">
                        <span className="font-bold">{siteConfig.name}</span>
                    </Link>
                </nav>

                <div className="flex flex-1 items-center justify-end space-x-2">
                    <nav className="flex items-center">
                        <Link
                            href={siteConfig.links.personalSite}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <div
                                className={cn(
                                    buttonVariants({ variant: "ghost" }),
                                    "w-10 px-0 hidden sm:inline-flex"
                                )}
                            >
                                <UserCircle className="w-4 h-4" />
                                <span className="sr-only">Portfolio</span>
                            </div>
                        </Link>
                        <Link
                            href={siteConfig.links.linkedin}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <div
                                className={cn(
                                    buttonVariants({ variant: "ghost" }),
                                    "w-10 px-0 hidden sm:inline-flex"
                                )}
                            >
                                <Icons.linkedin className="w-4 h-4" />
                                <span className="sr-only">Linkedin</span>
                            </div>
                        </Link>
                        <Link
                            href={siteConfig.links.github}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <div
                                className={cn(
                                    buttonVariants({ variant: "ghost" }),
                                    "w-10 px-0 hidden sm:inline-flex"
                                )}
                            >
                                <Icons.gitHub className="h-4 w-4" />
                                <span className="sr-only">GitHub</span>
                            </div>
                        </Link>
                        {/* <ModeToggle />*/}
                        <MobileNav /> 
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default SiteHeader;