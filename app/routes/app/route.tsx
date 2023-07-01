import {
  Outlet,
  useLoaderData,
  useLocation,
  useNavigate,
  useNavigation,
  useSubmit,
} from "@remix-run/react";
import { useState, useEffect } from "react";
import BottomNav from "~/components/navigation/BottomNav";
import ErrorBoundaryLayout from "./ErrorBoundary";
import { redirect, type LoaderArgs } from "@remix-run/node";
import { getUser, requireUserId } from "~/utils/auth.server";
import { Toaster } from "~/components/ui/toaster";

import {
  ClipboardCheckIcon,
  CreditCard,
  FolderIcon,
  HelpCircle,
  List,
  LogOut,
  Newspaper,
  Settings,
  StickyNote,
  Users,
} from "lucide-react";
import BottomNavButton from "~/components/navigation/BottomNavButton";
import Spinner from "~/components/LoadingSpinner";
import { colorVariants } from "~/utils/staticLists";
import SideNav from "~/components/navigation/SideNav";

export function ErrorBoundary() {
  return <ErrorBoundaryLayout />;
}

export async function loader({ request }: LoaderArgs) {
  await requireUserId(request);

  const user = await getUser(request);
  if (!user) return redirect("/login");

  if (!user.approved) {
    if (user.teams.length && user.orgOwner) {
      console.log("redirecting to team setup");
      return redirect(`/setup/team/${user.teams[0].id}`);
    } else {
      if (user.teams.length === 0) return redirect(`/setup/${user.id}`);
      return redirect("/pending");
    }
  }

  return user;
}

const AppLayout = () => {
  const location = useLocation();
  const user = useLoaderData<Awaited<ReturnType<typeof getUser>>>();
  const [page, setPage] = useState(location.pathname.split("/")[2]);
  const navigate = useNavigate();
  const navigation = useNavigation();
  const submit = useSubmit();
  let active = true;
  const handleNav = (path: string) => {
    const pathString = `/app/${path}`;
    if (location.pathname === pathString) {
      setPage(path);
      return;
    }
    setPage(path);
    navigate(pathString);
  };

  useEffect(() => {
    setPage(location.pathname.split("/")[2]);
  }, [location]);

  return (
    <>
      <div className=" ">
        <div className="px-3 md:px-0 md:pr-1 md:pl-[5.5rem] scrollbar-thin   w-full lg:h-screen lg:overflow-y-scroll">
          {navigation.state === "loading" &&
          navigation.location.pathname.split("/")[2] !==
            location.pathname.split("/")[2] ? (
            <div className="flex justify-center items-center h-screen">
              <Spinner size={14} />
            </div>
          ) : (
            <Outlet />
          )}
        </div>
        {/* @ts-expect-error  date mismatch, not used*/}
        <SideNav handleNav={handleNav} page={page} user={user} />
        <div className="md:hidden">
          <BottomNav page={page} setPage={setPage} />
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default AppLayout;
