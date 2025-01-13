import { cn } from "@/lib/utils";
import { Tag } from "@/types/tag.type";
import Link from "next/link";

const TagBadge = ({ tag, classes = '', useLink = true }: { tag: Tag, classes?: string, useLink?: boolean,}) => {
    return useLink ? (
        <Link href={`/tags/${tag.slug}`}>
            <span className={cn(
                "inline-block border rounded-full px-3 py-1 text-sm hover:bg-gray-300",
                classes
            )}>
                {tag.name.replace(/([A-Z])/g, ' $1').trim()}
            </span>
        </Link>
    ) : (
        <span className={cn(
            "inline-block border rounded-full px-3 py-1 text-sm",
            classes
        )}>
            {tag.name.replace(/([A-Z])/g, ' $1').trim()}
        </span>
    );
};

export default TagBadge;