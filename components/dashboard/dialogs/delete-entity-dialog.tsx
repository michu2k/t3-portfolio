import React from "react";
import {TrashIcon} from "lucide-react";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "~/components/ui/dialog";
import {Button} from "~/components/ui/button";

type DeleteEntityDialogProps = {
  title: string;
  entityName: string | React.ReactNode;
  onClickDeleteBtn: (e: React.MouseEvent) => void;
};

const DeleteEntityDialog = ({title, entityName, onClickDeleteBtn}: DeleteEntityDialogProps) => {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
      </DialogHeader>

      <div className="flex flex-1 flex-col justify-center gap-1 px-2">
        <DialogDescription>Are you sure you want to delete this item?</DialogDescription>
        <DialogDescription>
          Selected <strong>{entityName}</strong> will be permanently deleted.
        </DialogDescription>
      </div>

      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline" className="w-32">
            Cancel
          </Button>
        </DialogClose>

        <DialogClose asChild>
          <Button variant="destructive" className="w-32" onClick={onClickDeleteBtn}>
            <TrashIcon size={16} className="mr-2" />
            Delete
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
};

export {DeleteEntityDialog};
