import React, {useState} from "react";
import Link from "next/link";
import {PlusIcon, PencilIcon, TrashIcon} from "lucide-react";
import type {ProjectItem} from "~/server/api/routers/project";
import {Button, buttonVariants} from "~/components/ui/Button";
import {Heading} from "~/components/ui/Heading";
import {EmptySection} from "~/components/ui/EmptySection";
import {Dialog, DialogTrigger} from "~/components/ui/Dialog";
import {DeleteEntityDialog} from "~/components/dialogs/DeleteEntityDialog";
import {api} from "~/utils/api";
import {cn} from "~/utils/className";
import Image from "next/image";

const ProjectItems = () => {
  const {data: projectItems = [], isLoading} = api.project.getItems.useQuery();
  const deleteItemMutation = api.project.deleteItem.useMutation();
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const utils = api.useContext();

  async function handleDeleteItem() {
    if (selectedProject?.id) {
      await deleteItemMutation.mutateAsync(
        {id: selectedProject.id},
        {
          async onSuccess() {
            await utils.project.getItems.invalidate();
            setSelectedProject(null);
          }
        }
      );
    }
  }

  function displayItems() {
    return projectItems.map((item) => (
      <ProjectCard key={item.id} onDelete={() => setSelectedProject(item)} {...item} />
    ));
  }

  return (
    <Dialog>
      <Heading as="h2" size="sm">
        Project items
      </Heading>

      <div className="flex flex-col items-start">
        {isLoading ? null : projectItems.length ? displayItems() : <EmptySection heading="No project items found" />}

        <Link href="/dashboard/projects/new" className={cn(buttonVariants({variant: "primary"}), "mt-6")}>
          <PlusIcon size={16} className="mr-1" />
          Add new item
        </Link>
      </div>

      <DeleteEntityDialog
        title="Delete project"
        entityName={(selectedProject?.name || "Project").toLowerCase()}
        onClickDeleteBtn={() => handleDeleteItem()}
      />
    </Dialog>
  );
};

type ProjectCardProps = ProjectItem & {
  onDelete: (e: React.MouseEvent) => void;
};

const ProjectCard = ({id, name, shortDescription, description, coverImage, onDelete}: ProjectCardProps) => {
  const MAX_TEXT_LENGTH = 100;
  const descriptionLength = shortDescription?.length || description?.length;
  const itemDescription = (shortDescription || description).slice(0, MAX_TEXT_LENGTH);

  return (
    <article className="flex w-full items-center gap-1 border-b-[1px] border-solid border-slate-200 py-2 last-of-type:border-0">
      <div className="relative mr-4 h-16 w-24 shrink-0 overflow-hidden rounded-md bg-slate-50">
        {coverImage.url ? <Image src={coverImage.url} fill style={{objectFit: "cover"}} alt="" /> : null}
      </div>

      <div className="mr-4 flex flex-1 flex-col items-start">
        <p className="mr-2 font-poppins text-sm font-semibold leading-6 text-slate-600">{name}</p>
        <p className="text-xs leading-6">
          {itemDescription}
          {descriptionLength > MAX_TEXT_LENGTH && "..."}
        </p>
      </div>

      <Link href={`/dashboard/projects/${id}`} className={buttonVariants({variant: "ghost", size: "icon"})}>
        <PencilIcon size={16} />
        <span className="sr-only">Edit</span>
      </Link>

      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" onClick={onDelete}>
          <TrashIcon size={16} />
          <span className="sr-only">Delete</span>
        </Button>
      </DialogTrigger>
    </article>
  );
};

export {ProjectItems};
