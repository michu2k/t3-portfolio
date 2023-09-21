import React from "react";
import {TrashIcon} from "lucide-react";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "~/components/ui/Dialog";
import {Button} from "~/components/ui/Button";

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

      <div className="flex flex-1 flex-col justify-center">
        <DialogDescription className="mb-2">Are you sure you want to delete this item?</DialogDescription>
        <DialogDescription>
          Selected <strong>{entityName}</strong> will be permanently deleted.
        </DialogDescription>
      </div>

      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline">Cancel</Button>
        </DialogClose>

        <DialogClose asChild>
          <Button variant="destructive" onClick={onClickDeleteBtn}>
            <TrashIcon size={16} className="mr-2" />
            Delete
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
};

export {DeleteEntityDialog};
