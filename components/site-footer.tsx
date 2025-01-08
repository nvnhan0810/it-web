import { siteConfig } from "@/config/site";
import Link from "next/link";

const SiteFooter = () => {
    return (
        <div className="border-t py-3">
            <p className="text-center">	&copy; <Link href={siteConfig.links.personalSite} className="text-blue-700" target="_blank">nvnhan0810</Link> it-blogs - {(new Date).getFullYear()}</p>
        </div>
    );
};

export default SiteFooter;