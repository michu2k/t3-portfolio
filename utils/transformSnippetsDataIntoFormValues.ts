import type {Snippet} from "@prisma/client";

function transformSnippetsDataIntoFormValues(data: Array<Snippet>, formKeys: Array<string>) {
  const filteredValues = data.filter(({name}) => formKeys.includes(name));

  if (filteredValues.length) {
    return filteredValues.reduce((acc, {name, value}) => (
      {...acc, [name]: value}
    ), {});
  }

  return undefined;
}

export {transformSnippetsDataIntoFormValues};