import { signIn } from '~/auth'

export const authAction = async () => {
    'use server'
    await signIn('github')
}
