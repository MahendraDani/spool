"use client";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useUser } from "@/swr/use-user";
import { Skeleton } from "./skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const UserHoverCard = ({
  userId,
  username,
}: {
  username: string;
  userId: string;
}) => {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <span className="font-medium hover:underline cursor-pointer">
          {username}
        </span>
      </HoverCardTrigger>
      <HoverCardContent className="text-sm min-w-54">
        <UserHoverCardContent userId={userId} />
      </HoverCardContent>
    </HoverCard>
  );
};

const UserHoverCardContent = ({ userId }: { userId: string }) => {
  const { isLoading, error, data } = useUser({ userId });

  if (isLoading) {
    return <UserHoverCardSkeleton />;
  }

  if (!data?.data) {
    return (
      <div>
        <p>{"Oops, user details not found"}</p>
      </div>
    );
  }

  if (error) {
    throw new Error("Error fetching user details");
  }

  const user = data.data;
  return (
    <div className="grid grid-cols-1 gap-2">
      <div className="flex items-center space-x-2">
        <Avatar className="size-12">
          <AvatarImage src={user.image ?? ""} />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
      </div>
      <div>
        <div className="flex justify-start items-center gap-1">
          <h3 className="font-semibold">{user.name}</h3>
          <p className="text-muted-foreground text-sm">{`@${user.displayUsername}`}</p>
        </div>
        <div className="text-muted-foreground">{user.email}</div>
      </div>
    </div>
  );
};

function UserHoverCardSkeleton() {
  return (
    <div className="space-y-2">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-20" />
      </div>
    </div>
  );
}
