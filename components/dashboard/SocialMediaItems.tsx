import React, {useState} from "react";
import type {SocialMediaLink} from "@prisma/client";
import Link from "next/link";
import {PlusIcon, PencilIcon, TrashIcon} from "lucide-react";
import {Dialog, DialogTrigger} from "~/components/ui/Dialog";
import {Button, buttonVariants} from "~/components/ui/Button";
import {EmptySection} from "~/components/ui/EmptySection";
import {DeleteEntityDialog} from "~/components/dialogs/DeleteEntityDialog";
import {Heading} from "~/components/ui/Heading";
import {cn} from "~/utils/className";
import {api} from "~/utils/api";
import {getSocialMediaIcon} from "~/utils/getSocialMediaIcon";

const SocialMediaItems = () => {
  const {data: socialMediaItems = [], isLoading} = api.socialMedia.getItems.useQuery();
  const deleteItemMutation = api.socialMedia.deleteItem.useMutation();
  const [selectedSocialMediaLink, setSelectedSocialMediaLink] = useState<SocialMediaLink | null>(null);
  const utils = api.useContext();

  const {icon} = selectedSocialMediaLink || {};

  async function handleDeleteItem() {
    if (selectedSocialMediaLink?.id) {
      await deleteItemMutation.mutateAsync(
        {id: selectedSocialMediaLink.id},
        {
          async onSuccess() {
            await utils.socialMedia.getItems.invalidate();
            setSelectedSocialMediaLink(null);
          }
        }
      );
    }
  }

  function displayItems() {
    return socialMediaItems.map((item) => (
      <SocialMediaCard key={item.id} onDelete={() => setSelectedSocialMediaLink(item)} {...item} />
    ));
  }

  return (
    <Dialog>
      <Heading as="h2" size="sm">
        Links
      </Heading>

      <div className="flex flex-col items-start">
        {isLoading ? null : socialMediaItems.length ? displayItems() : <EmptySection heading="No links found" />}

        <Link href="/dashboard/social-media/new" className={cn(buttonVariants({variant: "primary"}), "mt-6")}>
          <PlusIcon size={16} className="mr-1" />
          Add new link
        </Link>
      </div>

      <DeleteEntityDialog
        title="Delete link"
        entityName={`${icon || ""} url`}
        onClickDeleteBtn={() => handleDeleteItem()}
      />
    </Dialog>
  );
};

type SocialMediaCardProps = SocialMediaLink & {
  onDelete: (e: React.MouseEvent) => void;
};

const SocialMediaCard = ({id, icon, url, onDelete}: SocialMediaCardProps) => {
  const Icon = getSocialMediaIcon(icon);

  return (
    <article className="flex w-full items-center gap-1 border-b-[1px] border-solid border-slate-200 py-2 last-of-type:border-0">
      <Icon className="mr-2 h-4 w-4 flex-shrink-0 fill-slate-700" aria-hidden="true" />

      <div className="mr-4 flex-1">
        <p className="text-sm leading-6">{url}</p>
      </div>

      <Link href={`/dashboard/social-media/${id}`} className={buttonVariants({variant: "ghost", size: "icon"})}>
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

export {SocialMediaItems};
