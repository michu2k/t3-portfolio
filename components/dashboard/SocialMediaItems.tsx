import React, {useState} from "react";
import type {SocialMediaLink} from "@prisma/client";
import Link from "next/link";
import {PlusIcon, PencilIcon, TrashIcon} from "lucide-react";
import {Dialog, DialogTrigger} from "~/components/ui/Dialog";
import {Button, buttonVariants} from "~/components/ui/Button";
import {DeleteEntityDialog} from "~/components/dialogs/DeleteEntityDialog";
import {Heading} from "~/components/ui/Heading";
import {cn} from "~/utils/className";
import {api} from "~/utils/api";
import type {SocialMediaIconKeys} from "~/utils/getSocialMediaIcons";
import {getSocialMediaIcon} from "~/utils/getSocialMediaIcons";

const SocialMediaItems = () => {
  const {data: socialMediaItems = []} = api.socialMedia.getItems.useQuery();
  const deleteSocialMediaItem = api.socialMedia.deleteItem.useMutation();
  const [selectedSocialMediaLink, setSelectedSocialMediaLink] = useState<SocialMediaLink | null>(null);
  const utils = api.useContext();

  const {icon} = selectedSocialMediaLink || {};

  async function handleDeleteItem() {
    if (selectedSocialMediaLink?.id) {
      await deleteSocialMediaItem.mutateAsync(
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
      <SingleSocialMediaItem key={item.id} onDelete={() => setSelectedSocialMediaLink(item)} {...item} />
    ));
  }

  return (
    <Dialog>
      <Heading as="h2" size="sm">
        Links
      </Heading>

      <div className="flex flex-col items-start">
        {displayItems()}

        <Link href="/dashboard/social-media/new" className={cn(buttonVariants({variant: "primary"}), "mt-6")}>
          <PlusIcon size={16} className="mr-1" />
          Add new link
        </Link>
      </div>

      <DeleteEntityDialog
        title="Delete link"
        entityName={`${icon || ""} url`}
        onClickDeleteBtn={() => void handleDeleteItem()}
      />
    </Dialog>
  );
};

type SingleSocialMediaItemProps = SocialMediaLink & {
  onDelete: (e: React.MouseEvent) => void;
};

const SingleSocialMediaItem = ({id, icon, url, onDelete}: SingleSocialMediaItemProps) => {
  const Icon = getSocialMediaIcon(icon as SocialMediaIconKeys);

  return (
    <article className="flex w-full items-center gap-1 border-b-[1px] border-solid border-slate-200 py-2 last-of-type:border-0">
      <Icon className="mr-2 h-4 w-4 flex-shrink-0 fill-slate-700" aria-hidden="true" />

      <div className="mr-4 flex-1">
        <p className="text-sm leading-6">{url}</p>
      </div>

      <Link href={`/dashboard/social-media/${id}`}>
        <Button variant="ghost" size="icon">
          <PencilIcon size={16} />
          <span className="sr-only">Edit</span>
        </Button>
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
