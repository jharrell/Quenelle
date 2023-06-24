import { SunIcon } from "@heroicons/react/24/outline";
import type { LoaderArgs } from "@remix-run/node";
import { useLoaderData, useNavigation } from "@remix-run/react";
import { BadgePlusIcon, DeleteIcon, FileEdit } from "lucide-react";

import Spinner from "~/components/LoadingSpinner";
import Avatar from "~/components/display/Avatar";
import RecipeCard from "~/components/display/RecipesCard";
import NewAppBar from "~/components/navigation/NewAppBar";

import { getUser } from "~/utils/auth.server";
import { prisma } from "~/utils/prisma.server";
import { colorVariants } from "~/utils/staticLists";

export const loader = async ({ request }: LoaderArgs) => {
  console.log("hello");
  const user = await getUser(request);
  const feedMessages = await prisma.feedMessage.findMany({
    where: {
      teams: {
        some: {
          members: {
            some: {
              id: user!.id,
            },
          },
        },
      },
    },
    take: 50,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      linkRecipe: {
        include: {
          author: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
            },
          },
        },
      },
      linkMenu: true,
      author: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
        },
      },
    },
  });
  return { user, feedMessages };
};

function HomeRoute() {
  const { user, feedMessages } = useLoaderData<typeof loader>();
  console.log({ user, feedMessages });

  const navigation = useNavigation();

  if (navigation.state === "loading")
    return (
      <div className=" mx-auto h-screen  flex items-center justify-center">
        <Spinner size={14} />
      </div>
    );
  if (!user) return null;
  return (
    <div className=" container mx-auto  max-w-4xl flex flex-col  mb-28">
      <NewAppBar page="Feed" bottomPadding="0">
        <div className=" px-3 py-2 bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-200 rounded-full flex gap-2 items-center justify-between">
          <span className="font-bold">79°F</span>
          <SunIcon className="w-7 h-7 inline-block" />
        </div>
      </NewAppBar>
      <div className="text-[3rem] md:text-4xl   items-center  w-full    dark:text-neutral-200  font-bold text-neutral-600 rounded-2xl  ">
        <h1>Hi {user.firstName}!</h1>
      </div>
      <div className="w-full flex flex-col gap-2 mb-2">
        <div className="text-lg text-indigo-500 font-semibold ">
          Your prep list for today.
        </div>
        <RecipeCard
          to="/"
          subHeading="Created by Erik J."
          user={"ej"}
          name="PM Grill"
        />
      </div>
      <div className="flex flex-col gap-2 rounded-xl bg-zinc-200 dark:bg-zinc-800 p-2">
        {feedMessages.map((m) => (
          <div
            key={m.id}
            className="flex flex-col gap-2 rounded-xl bg-zinc-100 dark:bg-zinc-900 p-2 text-zinc-700"
          >
            <div className="flex gap-2 items-center">
              <Avatar
                content={(
                  m.author.firstName[0] + m.author.lastName[0]
                ).toLowerCase()}
                color={
                  colorVariants[
                    Math.floor(Math.random() * (colorVariants.length - 1))
                  ]
                }
              />

              <h3 className=" dark:text-zinc-200 text-zinc-700 text-sm md:text-base">
                {m.content}
              </h3>
              {m.content.includes("updated") ? (
                <FileEdit className="w-5 h-5 text-yellow-500 ml-auto flex-none" />
              ) : m.content.includes("created") ? (
                <BadgePlusIcon className="w-5 h-5 text-green-500 ml-auto flex-none" />
              ) : m.content.includes("deleted") ? (
                <DeleteIcon className="w-5 h-5 text-red-500 ml-auto flex-none" />
              ) : (
                ""
              )}
            </div>
            {m.linkRecipe && (
              <RecipeCard
                to={`/app/recipes/${m.linkRecipe.id}`}
                subHeading={m.linkRecipe.category}
                user={(
                  m.linkRecipe.author.firstName[0] +
                  m.linkRecipe.author.lastName[0]
                ).toLowerCase()}
                name={m.linkRecipe.name}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomeRoute;
