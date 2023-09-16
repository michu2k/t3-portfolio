import type {Snippet} from "@prisma/client";

function transformSnippetsDataIntoFormValues(data: Array<Snippet>, formKeys: Array<string>) {
  const filteredValues = data.filter(({name}) => formKeys.includes(name));

  if (filteredValues.length) {
    return formKeys.reduce((acc, key) => {
      const formValue = filteredValues.find(({name}) => name === key);
      return {...acc, [key]: formValue ? formValue.value : undefined};
    }, {});
  }

  return undefined;
}

export {transformSnippetsDataIntoFormValues};
