import type {ExperienceItem} from "@prisma/client";
import {differenceInDays} from "date-fns";

function sortExperienceItemsByEndDate(experienceItems: Array<ExperienceItem>) {
  return experienceItems.sort((a, b) => {
    if (!a.endDate) {
      return 0;
    }

    if (!b.endDate) {
      return 1;
    }

    return differenceInDays(new Date(), a.endDate) < differenceInDays(new Date(), b.endDate) ? -1 : 1;
  });
}

export {sortExperienceItemsByEndDate};
