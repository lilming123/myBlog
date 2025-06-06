import * as React from "react";



import Link from "next/link";



import { Calendar } from "lucide-react";



import { PATHS } from "@/constants";
import { TagPrefixIcon } from "@/features/tag";
import { cn, prettyDate } from "@/lib/utils";



import { PostItemHoverOverlay } from "./PostItemHoverOverlay";



import { type Blog } from "../types";


interface BlogListItemProps {
  blog: Blog;
}

export const BlogListItem = ({ blog }: BlogListItemProps) => {
  return (
    <Link
      href={`${PATHS.SITE_BLOG}/${blog.slug}`}
      className={cn(
        "flex flex-col justify-between h-full text-primary px-6 py-4 transition-colors rounded-lg",
        "bg-transparent hover:bg-black/[0.03] dark:hover:bg-white/10  hover:backdrop-blur-md ",
      )}
    >
      {/*<PostItemHoverOverlay />*/}
      <ul className="mb-1 flex space-x-4 text-xs font-medium text-muted-foreground">
        {blog.tags.map((tag) => (
          <li key={tag.id} className="flex items-center">
            <span className="mr-1">#&nbsp;{tag.name}</span>
            <TagPrefixIcon tag={tag} />
          </li>
        ))}
      </ul>
      <h4 className="mb-2 line-clamp-1 text-xl font-medium">{blog.title}</h4>
      <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">
        {blog.description}
      </p>
      <div className="flex space-x-2 text-xs text-muted-foreground">
        <div className="flex h-5 items-center space-x-1">
          <Calendar className="size-3" />
          <time dateTime={blog.createdAt.toISOString()}>
            {prettyDate(blog.createdAt)}
          </time>
        </div>
      </div>
    </Link>
  );
};
