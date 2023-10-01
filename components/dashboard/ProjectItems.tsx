import React, {useState} from "react";
import Link from "next/link";
import {ProjectItem} from "@prisma/client";
import {PlusIcon, PencilIcon, TrashIcon} from "lucide-react";
import {Button, buttonVariants} from "~/components/ui/Button";
import {Heading} from "~/components/ui/Heading";
import {Dialog, DialogTrigger} from "~/components/ui/Dialog";
import {DeleteEntityDialog} from "~/components/dialogs/DeleteEntityDialog";
import {api} from "~/utils/api";
import {cn} from "~/utils/className";

const ProjectItems = () => {
  const {data: projects = []} = api.project.getItems.useQuery();
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
    return projects.map((item) => <ProjectItem key={item.id} onDelete={() => setSelectedProject(item)} {...item} />);
  }

  return (
    <Dialog>
      <Heading as="h2" size="sm">
        Project items
      </Heading>

      <div className="flex flex-col items-start">
        {displayItems()}

        <Link href="/dashboard/projects/new" className={cn(buttonVariants({variant: "primary"}), "mt-6")}>
          <PlusIcon size={16} className="mr-1" />
          Add new item
        </Link>
      </div>

      <DeleteEntityDialog
        title="Delete project"
        entityName={(selectedProject?.name || "Project").toLowerCase()}
        onClickDeleteBtn={() => void handleDeleteItem()}
      />
    </Dialog>
  );
};

type ProjectItemProps = ProjectItem & {
  onDelete: (e: React.MouseEvent) => void;
};

const ProjectItem = ({id, name, description, onDelete}: ProjectItemProps) => {
  return (
    <article className="flex w-full items-center gap-1 border-b-[1px] border-solid border-slate-200 py-2 last-of-type:border-0">
      {/*       <div className="relative mr-4 h-16 w-16 shrink-0 rounded bg-slate-100">
        <Image src={image} fill className="rounded" style={{objectFit: "cover"}} alt="" />
      </div> */}

      <div className="mr-4 flex flex-1 flex-col items-start">
        <p className="mr-2 text-sm font-semibold leading-6">{name}</p>
        <p className="text-xs leading-6 text-slate-500">{description}</p>
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
