import { ProjectInterface, UserProfile } from "@/common.types";
import { getUserProjects } from "@/lib/actions";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  userId: string;
  projectId: string;
}

const RelatedProjects = async ({ userId, projectId }: Props) => {
  const result = (await getUserProjects(userId)) as { user?: UserProfile };

  //   console.log(result.user.projects.edges);
  const filteredProjects = result?.user?.projects?.edges.filter(
    ({ node }: { node: ProjectInterface }) => node?.id !== projectId
  );
  console.log(filteredProjects);
  if (filteredProjects?.length === 0) {
    return null;
  }
  return (
    <section className="flex flex-col mt-32 w-full">
      <div className="flexBetween">
        <p>More by {result?.user?.name}</p>
        <Link
          href={`/profile/${result?.user?.id}`}
          className="text-primary-purple text-base"
        >
          View All
        </Link>
      </div>
      <div className="related_projects-grid">
        {filteredProjects?.map(({ node }: { node: ProjectInterface }) => (
          <div className="flexCenter related_project-card drop-shadow-card">
            <Link
              href={`/project/${node?.id}`}
              className="flexCenter group relative w-full h-full"
            >
              <Image
                src={node?.image}
                width={414}
                height={314}
                className="w-full h-full object-cover rounded-2xl"
                alt="project image"
              />
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RelatedProjects;
