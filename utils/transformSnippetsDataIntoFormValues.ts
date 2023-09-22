import type {Snippet} from "@prisma/client";

// This function is used to transform the data from the database into the form values.
function transformSnippetsDataIntoFormValues(data: Array<Snippet>) {
  if (data.length) {
    return data.reduce((acc, {name, value}) => ({...acc, [name]: value}), {});
  }

  return undefined;
}

export {transformSnippetsDataIntoFormValues};
