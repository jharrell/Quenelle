import {
  ArrowUturnLeftIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";

import { useNavigate, useNavigation } from "@remix-run/react";
import React from "react";
import Spinner from "~/components/LoadingSpinner";
import IconButton from "~/components/buttons/IconButton";
import AppBar from "~/components/navigation/AppBar";
import { useMenu } from "../app.menus_.$id/route";
import ListCard from "~/components/display/ListCard";

function MenuIndex() {
  const menu = useMenu();
  const navigate = useNavigate();
  const navigation = useNavigation();

  if (navigation.state === "loading")
    return (
      <div className=" mx-auto h-screen  flex items-center justify-center">
        <Spinner size={14} />
      </div>
    );
  if (!menu) return <span>Menu not found</span>;

  return (
    <div className=" mb-28 container mx-auto ">
      <AppBar page={""}>
        <IconButton
          name="Edit"
          onClick={() => navigate("edit", { replace: true })}
          Icon={PencilSquareIcon}
        />
        <IconButton
          name="goBack"
          onClick={() => navigate(-1)}
          Icon={ArrowUturnLeftIcon}
        />
      </AppBar>
      <div className="text-4xl border border-neutral-300 dark:border-neutral-700 gap-3 bg-neutral-200 dark:bg-neutral-800 px-4 w-full items-center flex justify-between dark:text-neutral-200 p-4 mb-2 text-neutral-600 rounded-xl font-light ">
        <div>{menu!.name}</div>
      </div>
      <div className="w-full grid lg:grid-cols-2 gap-2 ">
        <div className="flex flex-col gap-2">
          {menu.sections
            .slice(0, Math.ceil(menu!.sections.length / 2))
            .map((s) => (
              <div
                key={s.id}
                className="flex flex-col gap-2 bg-neutral-100 dark:bg-neutral-900 rounded-2xl p-2 border border-neutral-300 dark:border-neutral-700 "
              >
                <div className="text-2xl border border-neutral-300 dark:border-neutral-700 dark:bg-neutral-800 gap-3 bg-opacity-75 bg-neutral-200  px-4 w-full items-center flex justify-between dark:text-neutral-200 p-4  text-neutral-600 rounded-xl font-light ">
                  <div>{s.name}</div>
                </div>
                {s.dishes.map((d) => (
                  <ListCard
                    name={d.name}
                    key={d.id}
                    to={`/app/menus/dishes/${d.id}`}
                    subHeading={`${d._count.ingredients} Component${
                      d._count.ingredients !== 1 ? "s" : ""
                    } `}
                    user={d.author!.firstName[0] + d.author!.lastName[0]}
                  />
                ))}
              </div>
            ))}
        </div>
        <div className="flex flex-col gap-2">
          {menu.sections
            .slice(Math.ceil(menu!.sections.length / 2))
            .map((s) => (
              <div
                key={s.id}
                className="flex flex-col gap-2 bg-neutral-100 dark:bg-neutral-900 rounded-2xl p-2 border border-neutral-300 dark:border-neutral-700 "
              >
                <div className="text-2xl border border-neutral-300 dark:border-neutral-700 dark:bg-neutral-800 gap-3 bg-opacity-75 bg-neutral-200  px-4 w-full items-center flex justify-between dark:text-neutral-200 p-4  text-neutral-600 rounded-xl font-light ">
                  <div>{s.name}</div>
                </div>
                {s.dishes.map((d) => (
                  <ListCard
                    name={d.name}
                    key={d.id}
                    to={`/app/menus/dishes/${d.id}`}
                    subHeading={`${d._count.ingredients} Component${
                      d._count.ingredients !== 1 ? "s" : ""
                    } `}
                    user={d.author!.firstName[0] + d.author!.lastName[0]}
                  />
                ))}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default MenuIndex;
