
export function concatBy<T>(arr1: T[], arr2: T[], comparator: (a: T, b: T) => boolean) {
  const result = []
  const arr2Copy = [...arr2]

  for(const item of arr1) {
    const index = arr2Copy.findIndex((el) => comparator(el, item))
    if(index !== -1) {
      result.push(arr2Copy[ index ])
      arr2Copy.splice(index, 1)
    } else {
      result.push(item)
    }

  }

  for(const item of arr2Copy) {
    result.push(item)
  }


  return result
}

export function uniqBy<T>(fn: (item: T, i: number, arr: T[]) => unknown, list: T[]): T[] {
  const addedMap = new Map()
  const result: T[] = []

  for(let i = 0; i < list.length; i++) {
    const item = list[ i ]
    const key = fn(item, i, list)
    if(!addedMap.has(key)) {
      result.push(item)
    }
    addedMap.set(key, true)
  }

  return result
}
