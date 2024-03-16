"use client";
import { useAuthStore } from "@/utils/store";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Image from "next/image";
import userrPic from "@/assets/userimg.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, LogOut, IndianRupee } from "lucide-react";
import { useRouter } from "next/navigation";

const UserProfile = () => {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuthStore();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <Avatar>
          <AvatarImage src={user.picture} />
          <AvatarFallback>
            <Image src={userrPic} alt="u" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => router.push("/profile")}>
          <div className="flex flex-row gap-2 items-center">
            <User size={16} />
            <h1>Profile</h1>
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem disabled>
          <div className="flex flex-row gap-2 items-center">
            <IndianRupee size={16} />
            <h1>Billing</h1>
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />

        {isAuthenticated && (
          <DropdownMenuItem onClick={logout}>
            <div className="flex flex-row gap-2 items-center">
              <LogOut size={16} />
              <h1>Logout</h1>
            </div>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserProfile;
