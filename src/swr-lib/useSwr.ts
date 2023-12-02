import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'
import { argPatch, del, findAll, findOne, patch, post, put } from './fetchers'
import { HTTPError } from 'ky'
import { URLSearchParams } from 'url'

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL

export const useCrud = <T extends { id: number }>(path: string) => {
  const key = `${BASE_URL}${path}`

  const { data, error, isLoading } = useSWR<T[], HTTPError, string>(key, findAll)
  const { trigger: create } = useSWRMutation<T, HTTPError, string, T>(key, post)
  const { trigger: update } = useSWRMutation<T, HTTPError, string, T>(key, put)
  const { trigger: remove } = useSWRMutation<T, HTTPError, string, number>(key, del)

  return { data, error, isLoading, create, update, remove }
}

export const useFindAll = <T>(path: string) => {
  const key = `${BASE_URL}${path}`
  const s = useSWR<T[], HTTPError, string>(key, findAll)

  return { ...s, allData: s.data }
}

export const useFindOne = <T>(path: string, id: number) => {
  const key = `${BASE_URL}${path}/${id}`
  const s = useSWR<T, HTTPError, string>(key, findOne)

  return { ...s, oneData: s.data }
}

// for pagination
export const findOneWithParams = <T>(path: string, urlParams: URLSearchParams) => {
  const url = `${BASE_URL}/${path}?${urlParams}`

  return findOne<T>(url)
}

// https://swr.vercel.app/ja/docs/mutation

export const useCreate = <T,>(path: string) => {
  const key = `${BASE_URL}${path}`
  const s = useSWRMutation<T, Error, string, T>(key, post)

  return { ...s, create: s.trigger }
}

export const useUpdate = <T extends { id: number }>(path: string, id: number) => {
  const key = `${BASE_URL}${path}/${id}`
  const s = useSWRMutation<T, Error, string, T>(key, put)

  return { ...s, update: s.trigger }
}

export const useUpdateFields = <T extends { id: number }>(path: string) => {
  const key = `${BASE_URL}${path}`
  const s = useSWRMutation<T, HTTPError, string, argPatch>(key, patch)

  return { ...s, updateFields: s.trigger }
}

export const useDelete = (path: string) => {
  const key = `${BASE_URL}${path}`
  const s = useSWRMutation(key, del)

  return { ...s, remove: s.trigger }
}
