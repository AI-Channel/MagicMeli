interface tagsObject {
  tag: string
}
function tagsObjectToArray(tagsObjectArray: tagsObject[]) {
  const outputArray: string[] = []
  for (const item of tagsObjectArray) {
    outputArray.push(item.tag)
  }
  return outputArray
}

export { tagsObject, tagsObjectToArray }
