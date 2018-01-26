import { AxiosRequestConfig, AxiosInstance } from 'axios'

export function axiosSuccess(data: object) {
    return jest.fn().mockReturnValue(Promise.resolve({data}))
}
export function expectAxiosGet(axios: AxiosInstance, path: string, context: AxiosRequestConfig) {
    expect(axios.get).toHaveBeenCalledWith(path, context)
}