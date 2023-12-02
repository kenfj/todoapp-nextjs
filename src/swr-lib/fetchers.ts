import ky from 'ky'

export const findAll = <T>(url: string) => ky.get(url).json<T[]>()

export const findOne = <T>(url: string) => ky.get(url).json<T>()

export const post = <T>(url: string, { arg }: { arg: T }) => {
  return ky.post(url, { json: arg }).json<T>()
}

export const put = <T extends { id: number }>(url: string, { arg }: { arg: T }) => {
  return ky.put(`${url}/${arg.id}`, { json: arg }).json<T>()
}

export type argPatch = { id: number; fields: object; }

export const patch = <T extends { id: number }>(url: string, { arg }: { arg: argPatch }) => {
  return ky.patch(`${url}/${arg.id}`, { json: arg.fields }).json<T>()
}

export const del = <T>(url: string, { arg: id }: { arg: number }) => {
  return ky.delete(`${url}/${id}`).json<T>()
}
